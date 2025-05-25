# [motimo=shared-ui]

motimo-shared-ui은(는) Motimo의 UI를 구축하기 위한 통일된 디자인 언어와 재사용 가능한 컴포넌트 세트입니다. 일관된 사용자 경험을 제공하고 개발 효율성을 높이는 것을 목표로 합니다.

[![npm version](https://badge.fury.io/js/motimo-shared-ui.svg)](https://www.npmjs.com/package/motimo-shared-ui)
[![npm downloads](https://img.shields.io/npm/dm/motimo-shared-ui.svg)](https://www.npmjs.com/package/motimo-shared-ui)
[![Build Status](https://img.shields.io/travis/[your-github-username]/[your-repo-name]/main.svg?style=flat-square)](https://travis-ci.org/[your-github-username]/[your-repo-name])

### 📌운영 및 보수 유의점

index.ts를 통해 제작한 컴포넌트 중 패키지화 할 것들을 정리한다.

```typescript
import Test from "./Test";

// 아래와 같이 export한다
export { Test };
```

### ✨ 왜 이 디자인 시스템을 사용해야 할까요?

이 디자인 시스템은 Motimo의 모든 제품에서 일관되고 통일된 사용자 경험을 보장합니다. 디자인 및 개발 프로세스를 간소화하고, 재사용 가능한 컴포넌트를 통해 효율성을 극대화하며, 브랜드 아이덴티티를 강화하는 데 기여합니다.

### 🚀 설치 방법

npm 또는 yarn을 사용하여 패키지를 설치할 수 있습니다.

```bash
# npm 사용 시
npm install [your-package-name]

# yarn 사용 시
yarn add [your-package-name]
```

### 사용 방법 (Usage)

설치 후 컴포넌트를 어떻게 가져와서 사용할 수 있는지 간단한 코드 예시를 제공합니다.

### 💡 사용 예시

```jsx
import React from "react";
import { Test } from "motimo-shared-ui";

function App() {
  return (
    <div>
      <Test />
    </div>
  );
}

export default App;
```

### 문서 (Documentation)

자세한 컴포넌트 사용법, 디자인 원칙, 가이드라인 등을 담고 있는 **문서 링크**를 제공해야 합니다. Storybook, Docusaurus, Next.js 등의 도구를 활용하여 별도의 문서 사이트를 구축하는 것이 일반적입니다.

```markdown
### 📚 전체 문서

각 컴포넌트의 상세한 사용법, props, 디자인 가이드라인 등은 [여기에서]([스토리북 배포 문서 사이트 링크]) 확인하실 수 있습니다.

**주요 문서:**

- [시작하기]([문서 사이트 링크]/getting-started)
- [컴포넌트]([문서 사이트 링크]/components)
- [디자인 토큰]([문서 사이트 링크]/design-tokens)
```

### 🙌 기여하기

이 디자인 시스템의 발전에 기여하고 싶으시다면 언제든지 환영합니다! 자세한 내용은 [기여 가이드라인](CONTRIBUTING.md)을 참조해 주세요.

- [이슈 보고](https://github.com/[your-github-username]/[your-repo-name]/issues/new)
- [풀 리퀘스트 제출](https://github.com/[your-github-username]/[your-repo-name]/pulls)

### 📝 라이선스

이 프로젝트는 [MIT 라이선스](LICENSE)를 따릅니다.
