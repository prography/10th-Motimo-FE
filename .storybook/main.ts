import type { StorybookConfig } from "@storybook/nextjs";
import path from "path";
// 커맨드 내 환경 변수 확인 (STORYBOOK_SCOPE가 'shared'이면 공유 컴포넌트만 로드)
const STORYBOOK_SCOPE = process.env.STORYBOOK_SCOPE;

const config: StorybookConfig = {
  stories: [
    "./Introduction.mdx",
    "./CHANGELOG.mdx",
    ...(STORYBOOK_SCOPE
      ? [
          "../components/shared/**/*.stories.@(js|jsx|mjs|ts|tsx)",
          "../components/shared/**/*.mdx",
        ]
      : ["../components/**/*.stories.@(js|jsx|mjs|ts|tsx)"]),
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
    options: {},
  },
  staticDirs: [path.resolve(__dirname, "../public")],
};
export default config;
