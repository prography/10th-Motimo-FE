import StyleDictionary from 'style-dictionary';

// 커스텀 포맷 등록
StyleDictionary.registerFormat({
  name: 'css/theme-variables',
  format: function ({ dictionary }) {
    console.log('dictionaory: ', dictionary);
    return [
      '@theme {',
      ...dictionary.allTokens.map((prop) => `  --${prop.name}: ${prop.value};`),
      '}',
    ].join('\n');
  },
});

export default {
  source: ['tokens/**/*.json'],
  platforms: {
    css: {
      transformGroup: 'css',
      buildPath: 'app/', //변환한 파일을 저장할 경로
      files: [
        {
          format: 'css/theme-variables',
          // format: 'css/variables',
          destination: 'tokens.css', //파일명
        },
      ],
    },
  },
};
