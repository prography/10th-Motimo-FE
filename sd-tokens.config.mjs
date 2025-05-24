import StyleDictionary from "style-dictionary";

const token2TailwindTypeMap = {
  color: "color",
  sizing: "dimension",
  spacing: "dimension",
  dimension: "dimension",
  borderWidth: "border-witdh",
  borderRadius: "radius",
  border: "color",
  opacity: "opacity",
  boxShadow: "shadow",
  fontFamilies: "font",
  fontWeights: "font-weight",
  lineHeights: "leading",
  fontSizes: "font-size",
  letterSpacing: "tracking",
};

// 커스텀 포맷 등록
StyleDictionary.registerFormat({
  name: "css/theme-variables",

  format: function ({ dictionary }) {
    return [
      "@theme {",
      ...dictionary.allTokens.map(
        (prop) =>
          `  --${token2TailwindTypeMap?.[prop.type] ?? "non-mapped"}-${prop.name}: ${prop.value};`,
      ),
      "}",
    ].join("\n");
  },
});

const recursliveParsingHelper = (setName, curKey, curValue) => {
  // 종료 조건
  if (Object.keys(curValue).includes("type")) {
    const prevValueHandled = curValue.value.slice(1, -1);
    return { ...curValue, value: `{${setName}.${prevValueHandled}}` };
  }

  const resultValue = Object.entries(curValue).reduce(
    (acc, [nextKey, innerObj]) => {
      const resValue = recursliveParsingHelper(setName, nextKey, innerObj);
      return { ...acc, [nextKey]: resValue };
    },
    {},
  );
  return { [curKey]: resultValue };
};

StyleDictionary.registerParser({
  name: "json-parser",
  pattern: /\.json$/,
  parser: ({ filePath, contents }) => {
    const parsed = JSON.parse(contents);

    const convertedParsed = Object.entries(parsed).reduce(
      (accAllTokens, [setName, tokens]) => {
        if (setName.startsWith("Primitive") || setName.startsWith("$"))
          return { ...accAllTokens, [setName]: tokens };

        const primitiveSet = setName.replace("Semantic", "Primitive");

        const semanticTokens = Object.entries(tokens).reduce(
          (accSemanticTokens, [key, value]) => {
            const newSemanticTokens = recursliveParsingHelper(
              primitiveSet,
              key,
              value,
            );
            return { ...accSemanticTokens, ...newSemanticTokens };
          },
          {},
        );
        return { ...accAllTokens, [setName]: semanticTokens };
      },
      {},
    );

    return convertedParsed;
  },
});

export default {
  source: ["tokens/**/*.json"],

  parsers: ["json-parser"],
  platforms: {
    css: {
      transformGroup: "css",
      buildPath: "app/", //변환한 파일을 저장할 경로
      files: [
        {
          format: "css/theme-variables",
          destination: "tokens.css", //파일명
        },
      ],
    },
  },
};
