// plopfile.js
const fs = require("fs");
const path = require("path");
const glob = require("glob"); // glob 라이브러리 사용

// --- 설정 (프로젝트에 맞게 수정) ---
const COMPONENTS_BASE_PATH = "components"; // 컴포넌트 파일들이 위치한 기본 경로
const STORY_TEMPLATE_FILE = "plop-templates/story.tsx.hbs"; // 스토리 파일 템플릿 경로
const STORY_FILE_SUFFIX = ".stories.tsx"; // 생성될 스토리 파일의 접미사
const EXCLUDED_PATTERNS = [
  // 컴포넌트 스캔 시 제외할 파일 패턴
  `**/*${STORY_FILE_SUFFIX}`,
  "**/*.test.{tsx,jsx}",
  "**/*.spec.{tsx,jsx}",
  "icons/*.tsx", // svg 컴포넌트화 한 거라.
  "group/*.tsx", // 컴포넌트 제작 완료한 곳이라.
  // 필요시 다른 제외 패턴 추가
];
// --- 설정 끝 ---

module.exports = function (plop) {
  // Plop이 제공하는 기본 헬퍼 외에 추가 헬퍼가 필요하면 여기에 정의
  // plop.setHelper('customHelper', function (text) { return text.toUpperCase(); });

  plop.setGenerator("story", {
    description: "Generate Storybook story files for components recursively",
    prompts: [
      {
        type: "input",
        name: "componentPathPattern",
        message: `Enter component file path or pattern relative to '${COMPONENTS_BASE_PATH}' (e.g., Button/Button, Forms/Input, **/*Button, or leave blank to scan all):`,
        filter: (input) => (input ? input.trim() : input),
      },
    ],
    actions: function (data) {
      const actions = [];
      const basePath = path.resolve(COMPONENTS_BASE_PATH); // 절대 경로로 변환

      if (!fs.existsSync(STORY_TEMPLATE_FILE)) {
        console.error(
          `\n❌ ERROR: Story template file not found at "${STORY_TEMPLATE_FILE}"`,
        );
        return [];
      }

      const ignorePatterns = EXCLUDED_PATTERNS.map(
        (ex) => path.join(basePath, ex).replace(/\\/g, "/"), // glob 패턴은 '/' 사용
      );

      let componentFilesToProcess = [];

      if (data.componentPathPattern) {
        // 1. 특정 경로 또는 패턴이 입력된 경우
        const pattern = path.join(basePath, data.componentPathPattern);
        // 사용자가 확장자를 입력했을 수도, 안했을 수도 있으므로 .tsx, .jsx 둘 다 고려
        // 사용자가 Button/Button 처럼 입력하면 Button/Button.tsx, Button/Button.jsx 등을 찾음
        // 사용자가 Button/Button.tsx 처럼 입력하면 해당 파일만 찾음
        // 사용자가 **/*Button 처럼 입력하면 해당 패턴에 맞는 파일을 찾음
        let searchPatterns = [];
        if (/\.(tsx|jsx)$/i.test(data.componentPathPattern)) {
          // 확장자가 이미 포함된 경우
          searchPatterns.push(pattern);
        } else if (
          data.componentPathPattern.includes("*") ||
          data.componentPathPattern.includes("?")
        ) {
          // glob 패턴인 경우
          searchPatterns.push(`${pattern}.{tsx,jsx}`); // 패턴에 확장자 추가
          searchPatterns.push(`${pattern}/index.{tsx,jsx}`); // 패턴이 폴더를 가리킬 경우 index 파일도 고려
        } else {
          // 확장자 없는 경로/이름인 경우
          searchPatterns.push(`${pattern}.tsx`);
          searchPatterns.push(`${pattern}.jsx`);
          searchPatterns.push(path.join(pattern, "index.tsx")); // 폴더 내 index.tsx
          searchPatterns.push(path.join(pattern, "index.jsx")); // 폴더 내 index.jsx
        }

        searchPatterns.forEach((p) => {
          const foundFiles = glob.sync(p, {
            cwd: process.cwd(), // 현재 작업 디렉토리 기준
            nodir: true, // 디렉토리는 제외
            ignore: ignorePatterns, // 제외 패턴 적용
          });
          componentFilesToProcess.push(
            ...foundFiles.filter((f) => fs.existsSync(f)),
          ); // 실제 존재하는 파일만
        });

        componentFilesToProcess = [...new Set(componentFilesToProcess)]; // 중복 제거

        if (componentFilesToProcess.length === 0) {
          console.log(
            `\n🤷 No component files found matching pattern "${data.componentPathPattern}" in "${COMPONENTS_BASE_PATH}".`,
          );
          return [];
        }
        if (
          componentFilesToProcess.length > 1 &&
          !data.componentPathPattern.includes("*")
        ) {
          // 사용자가 특정 파일명을 입력했는데 여러개가 찾아진 경우 (예: Button 입력했는데 여러 Button.tsx가 있는 경우)
          // 이 부분은 더 정교한 처리가 필요할 수 있으나, 일단 찾은 모든 파일에 대해 생성 시도
          console.warn(
            `\n⚠️ WARNING: Multiple component files found for "${data.componentPathPattern}". Stories will be generated for all found files if they don't exist:`,
          );
          componentFilesToProcess.forEach((f) =>
            console.warn(`  - ${path.relative(process.cwd(), f)}`),
          );
        }
      } else {
        // 2. 입력이 없는 경우 (전체 스캔)
        console.log(
          `\nScanning for component files in "${COMPONENTS_BASE_PATH}"/**/*.{tsx,jsx}...`,
        );
        const allComponentFilesPattern = path
          .join(basePath, "**/*.{tsx,jsx}")
          .replace(/\\/g, "/");

        componentFilesToProcess = glob.sync(allComponentFilesPattern, {
          cwd: process.cwd(),
          nodir: true,
          ignore: ignorePatterns,
        });

        if (componentFilesToProcess.length === 0) {
          console.log(
            `\n🤷 No component files found in "${COMPONENTS_BASE_PATH}".`,
          );
          return [];
        }
      }

      let storiesToCreateCount = 0;
      componentFilesToProcess.forEach((componentFilePath) => {
        const componentFileAbsolutePath = path.resolve(componentFilePath);
        const componentDir = path.dirname(componentFileAbsolutePath);
        const componentFileExt = path.extname(componentFileAbsolutePath);
        const componentFileNameWithoutExt = path.basename(
          componentFileAbsolutePath,
          componentFileExt,
        );

        let componentNameForStory = componentFileNameWithoutExt;
        let importPath = `./${componentFileNameWithoutExt}`; // 기본 임포트 경로

        if (componentFileNameWithoutExt.toLowerCase() === "index") {
          // 파일명이 index.tsx 또는 index.jsx인 경우, 부모 디렉토리 이름을 컴포넌트 이름으로 사용
          componentNameForStory = path.basename(componentDir);
          importPath = "."; // 부모 디렉토리에서 index 파일을 임포트하므로 '.'
        }
        const componentNamePascalCase = plop.getHelper("pascalCase")(
          componentNameForStory,
        );

        // 스토리 파일 경로 생성
        const storyFileName = `${componentNameForStory}${STORY_FILE_SUFFIX}`;
        const storyFileAbsolutePath = path.join(componentDir, storyFileName);

        // Storybook title 생성 로직
        // 예: src/components/Forms/Input/Input.tsx -> Forms/Input/Input
        // 예: src/components/Button/index.tsx -> Button
        let relativePathForTitle = path.relative(basePath, componentDir);
        if (componentFileNameWithoutExt.toLowerCase() !== "index") {
          relativePathForTitle = path.join(
            relativePathForTitle,
            componentNameForStory,
          );
        } else if (relativePathForTitle === "") {
          // components/index.tsx 같은 경우
          relativePathForTitle = componentNameForStory; // 이 경우 'Components'가 될 수도 있음, 조정 필요
        }
        // 경로 구분자를 '/'로 통일 (Windows에서도 Storybook title은 '/' 사용)
        const storyTitle = relativePathForTitle.split(path.sep).join("/");

        if (!fs.existsSync(storyFileAbsolutePath)) {
          actions.push({
            type: "add",
            path: storyFileAbsolutePath,
            templateFile: STORY_TEMPLATE_FILE,
            data: {
              name: componentNamePascalCase, // 템플릿에서 {{pascalCase name}}으로 사용
              storyTitle: storyTitle, // 템플릿에서 {{storyTitle}}로 사용
              importPath: importPath, // 템플릿에서 {{importPath}}로 사용
            },
            skipIfExists: true, // 이미 위에서 체크했지만, 이중 안전장치
          });
          storiesToCreateCount++;
        }
      });

      if (storiesToCreateCount === 0 && componentFilesToProcess.length > 0) {
        console.log(
          "\n✅ All found components already have story files or no suitable components found to add stories for.",
        );
      } else if (storiesToCreateCount > 0) {
        // Plop이 생성 메시지를 보여줌
      }

      return actions;
    },
  });
};
