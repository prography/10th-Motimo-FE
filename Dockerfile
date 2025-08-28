# 베이스 이미지로 Node.js 20-alpine 버전을 사용합니다. alpine은 경량화된 버전입니다.
FROM node:20-alpine

# 작업 디렉토리를 /app으로 설정합니다.
WORKDIR /app

# package.json과 package-lock.json (또는 yarn.lock)을 복사합니다.
COPY package*.json ./

# 의존성을 설치합니다.
RUN npm install

# 프로젝트의 모든 파일을 작업 디렉토리로 복사합니다.
COPY . .


############## 빌드 시점 환경 변수 주입하기.
ARG NEXT_PUBLIC_FRONTEND_BASE_URL

ENV NEXT_PUBLIC_FRONTEND_BASE_URL=$NEXT_PUBLIC_FRONTEND_BASE_URL


# Next.js 애플리케이션을 빌드합니다.
RUN npm run build

# 3000번 포트를 외부에 노출합니다.
EXPOSE 3000

# 컨테이너가 시작될 때 실행할 명령어를 설정합니다.
CMD ["npm", "start"]