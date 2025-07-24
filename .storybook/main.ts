const path = require("path");

// 커맨드 내 환경 변수 확인 (STORYBOOK_SCOPE가 'shared'이면 공유 컴포넌트만 로드)
const STORYBOOK_SCOPE = process.env.STORYBOOK_SCOPE;

const config = {
  stories: [
    "./Introduction.mdx",
    "./CHANGELOG.mdx",
    ...(STORYBOOK_SCOPE
      ? [
          "../components/shared/**/*.stories.@(js|jsx|mjs|ts|tsx)",
          "../components/shared/**/*.mdx",
        ]
      : [
          "../components/**/*.stories.@(js|jsx|mjs|ts|tsx)",
          "../app/**/*.stories.@(js|jsx|mjs|ts|tsx)"
        ]),
  ],
  addons: [
    {
      name: "@storybook/addon-essentials",
      options: {
        docs: false,
      },
    },
    "@storybook/addon-docs",
    "@storybook/addon-designs",
    "@storybook/addon-interactions",
    "@chromatic-com/storybook",
  ],
  framework: {
    name: "@storybook/nextjs",
    options: {
      nextConfigPath: "../next.config.ts",
    },
  },
  staticDirs: [path.resolve(__dirname, "../public")],
  typescript: {
    reactDocgen: "react-docgen-typescript",
  },
  webpackFinal: async (config) => {
    if (!config.module || !config.module.rules) {
      return config;
    }

    config.module.rules = [
      ...config.module.rules.map((rule) => {
        if (!rule || rule === "...") {
          return rule;
        }
        if (rule.test && /svg/.test(String(rule.test))) {
          return { ...rule, exclude: /\.svg$/i };
        }
        return rule;
      }),
      {
        test: /\.svg$/,
        use: ["@svgr/webpack"],
      },
    ];

    // Mock Next.js navigation module
    if (!config.resolve) {
      config.resolve = {};
    }
    if (!config.resolve.alias) {
      config.resolve.alias = {};
    }
    config.resolve.alias["next/navigation"] = path.resolve(
      __dirname,
      "nextjs-mock.ts",
    );

    return config;
  },
};

module.exports = config;
