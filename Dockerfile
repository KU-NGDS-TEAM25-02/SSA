# 1단계: Build Stage (Node.js 환경에서 리액트 빌드)
FROM node:20-alpine as build-stage

# 작업 디렉토리 설정
WORKDIR /app

# 의존성 파일 복사 및 설치
COPY package.json package-lock.json ./
RUN npm ci

# 소스 코드 복사 및 빌드 실행
# (이때 .env.production 파일이 자동으로 적용되어 배포 주소가 설정됨)
COPY . .
RUN npm run build

# ------------------------------------------------

# 2단계: Production Stage (Nginx로 빌드된 파일 서빙)
FROM nginx:alpine as production-stage

# 1단계에서 빌드한 결과물(dist 폴더)을 Nginx 경로로 복사
COPY --from=build-stage /app/dist /usr/share/nginx/html

# 우리가 만든 nginx 설정 파일 덮어쓰기
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 80번 포트 노출
EXPOSE 80

# Nginx 실행 (daemon off는 컨테이너가 꺼지지 않게 함)
CMD ["nginx", "-g", "daemon off;"]