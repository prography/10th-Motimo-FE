import StyleDictionary from "style-dictionary";
import { usesReferences } from "style-dictionary/utils";

/**
 * tailwind에서 사용되는 prefix 매핑
 */
const token2TailwindTypeMap = {
  color: "color",
  sizing: "spacing",
  spacing: "spacing",
  dimension: "spacing",
  // border는 합쳐져서 오기 때문에 다르게 처리해야 함.
  borderWidth: "border-witdh", // 얘는 일단 없어져야함.
  borderRadius: "radius", // 얘는 따로임.
  border: "border",
  //
  opacity: "opacity",
  boxShadow: "shadow",
  // 폰트도 체크해볼 것.
  fontFamilies: "font",
  fontWeights: "font-weight",
  lineHeights: "leading",
  fontSizes: "text",
  letterSpacing: "tracking",

  // paragraphSpacing는 token type에 존재는 하지만 값을 0으로 해 안쓰는 듯. tailwind엔 없음.
};

/**
 * 파싱에서 아예 제외시킬 토큰들.
 * tailwind에서 사용되지 않으면서 에러를 일으키는 경우들.
 * EX)
 * semantic의 토큰을 참조값으로 사용하는 semantic 토큰의 경우
 */
const excludingTokenNames = ["title", "body", "caption"];

/**
 * tailwind에서 사용할 수 있도록 formatting
 */
StyleDictionary.registerFormat({
  name: "css/theme-variables",

  format: function ({ dictionary }) {
    return [
      "@theme {",
      ...dictionary.allTokens
        // .filter((prop) => !prop.name.includes("primitive"))
        .map((prop) => {
          const isPrimitive = prop.name.includes("primitive");
          const nameFromPath = prop.path.slice(1).join("-");

          if (isPrimitive) {
            console.log("prop: ", prop.name, prop.type, prop.path);
            const middleName = prop.type === "color" ? "Color-" : "";
            return `  --${token2TailwindTypeMap?.[prop.type] ?? "non-mapped"}-${middleName}${nameFromPath}: ${prop.value};`;
          } else {
            return `  --${token2TailwindTypeMap?.[prop.type] ?? "non-mapped"}-${nameFromPath}: ${prop.value};`;
          }
        }),
      "}",
    ].join("\n");
  },
});

/**
 * 참조값을 사용하는 토큰들에 대해 처리.
 * 피참조값은 Primitive로 가정함.
 */
StyleDictionary.registerTransform({
  name: "value/cssVarRef",
  type: "value",
  transitive: true,
  filter: function (token) {
    // 이 토큰이 다른 토큰을 참조하는지 확인합니다.
    const filterRes =
      typeof token.original.value === "string" &&
      token.original.value.startsWith("{") &&
      token.original.value.endsWith("}");

    return filterRes;
  },
  transform: function (token, options) {
    const originalValue = token.original.value;
    if (usesReferences(originalValue)) return undefined;

    throw new Error("transform 내부 transform defer 에러");
  },
});

/**
 * 아래는 사용될 토큰들에 대해 Semantic에서의 참조값은 Primitive의 것으로
 * 참조 경로 재구성하는 작업.
 */

const convertRef = (stringValue, setName) => {
  if (stringValue.startsWith("{"))
    // 참조인 "{","}"내부에 setName추가
    return `{${setName}.${stringValue.slice(1, -1)}}`;

  // 참조가 아니라면
  return stringValue;
};

const recursliveParsingHelper = (setName, curKey, curValue) => {
  // 종료 조건
  if (Object.keys(curValue).includes("type")) {
    const newValue =
      typeof curValue.value === "string"
        ? convertRef(curValue.value, setName)
        : // object인 경우
          Object.entries(curValue.value).reduce(
            (acc, [tokenEleKey, tokenELeValue]) => {
              if (tokenELeValue.startsWith("{"))
                return {
                  ...acc,
                  [tokenEleKey]: convertRef(tokenELeValue, setName),
                };
              return { ...acc, [tokenEleKey]: tokenELeValue };
            },
            {},
          );
    return {
      [curKey]: { ...curValue, value: newValue },
    };
  }

  const resultValue = Object.entries(curValue).reduce(
    (acc, [nextKey, innerObj]) => {
      const resToken = recursliveParsingHelper(setName, nextKey, innerObj);
      return { ...acc, ...resToken };
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
        if (setName.startsWith("Primitive") || setName.startsWith("$")) {
          return { ...accAllTokens, [setName]: tokens };
        }

        const primitiveTargetSet = setName.replace("Semantic", "Primitive");

        const semanticTokens = Object.entries(tokens).reduce(
          (accSemanticTokens, [key, value]) => {
            // 제외시킬 토큰은 파싱 제외.
            if (excludingTokenNames.includes(key))
              return { ...accSemanticTokens };

            const newSemanticTokens = recursliveParsingHelper(
              primitiveTargetSet,
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

/**
 * 토큰 처리 설정
 */

export default {
  source: ["tokens/**/*.json"],

  parsers: ["json-parser"],
  platforms: {
    css: {
      transformGroup: "css",

      transforms: ["value/cssVarRef"],
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
