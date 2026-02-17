---
title: "Dockerfile"
description: "Dockerfile은 Docker가 컨테이너 이미지를 빌드할 때 실행할 명령어(directive) 목록을 담은 텍스트 파일이다"
tags: ['Docker', 'Dockerfile', 'Container Image', 'Build', 'DevOps']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/kubernetes/dockerfile
sidebar:
  order: 5
---

## 핵심 개념

Dockerfile은 컨테이너 이미지를 재현 가능하게(reproducible) 빌드하기 위한 명세이다. 각 지시어(directive)는 이미지에 새로운 레이어를 생성한다.

주요 Dockerfile 지시어:
- **FROM**: 베이스 이미지를 지정. 모든 Dockerfile은 FROM으로 시작
- **COPY**: 로컬 파일을 이미지 내로 복사
- **RUN**: 빌드 중 컨테이너 내에서 명령어를 실행 (패키지 설치 등)
- **ENTRYPOINT**: 컨테이너 시작 시 실행할 명령어를 지정

빌드 프로세스:
1. `docker build` 명령 실행 시 빌드 컨텍스트(현재 디렉토리)가 Docker 데몬에 업로드됨
2. Docker 데몬이 Dockerfile의 지시어를 순차적으로 처리
3. 각 지시어마다 새로운 레이어가 생성됨
4. 최종 이미지에 지정된 태그가 부여됨

중요한 주의사항:
- 빌드 디렉토리에 불필요한 파일을 두지 말 것 (빌드 속도 저하)
- RUN 지시어 사용 시 임시 파일을 명령어 종료 전에 삭제할 것 (레이어 크기 최적화)
- 파일 삭제는 새로운 레이어에서 "삭제 표시"만 하므로 이미지 크기가 줄어들지 않음
- 파일 권한이나 소유자 변경도 전체 파일의 새 복사본을 생성함

## 예시

```dockerfile
# Listing 2.1: Kiada 애플리케이션을 위한 Dockerfile
FROM node:16            # 베이스 이미지 (Node.js 16)
COPY app.js /app.js     # 애플리케이션 파일 복사
COPY html/ /html        # HTML 디렉토리 복사
ENTRYPOINT ["node", "app.js"]  # 컨테이너 시작 명령
```

```bash
# 이미지 빌드 (-t로 태그 지정, .은 빌드 컨텍스트)
$ docker build -t kiada:latest .
Step 1/4 : FROM node:16
Step 2/4 : COPY app.js /app.js
Step 3/4 : COPY html/ /html
Step 4/4 : ENTRYPOINT ["node", "app.js"]
Successfully built b0ecc49d7a1d
Successfully tagged kiada:latest

# 빌드된 이미지의 레이어 확인
$ docker history kiada:latest
IMAGE         CREATED     CREATED BY                            SIZE
b0ecc49d7a1d  7 min ago   ENTRYPOINT ["node", "app.js"]         0B
1d4de446f0f0  7 min ago   COPY dir:6ecee... (html/)             534kB
28d67701d6d9  7 min ago   COPY file:2ed5... (app.js)            2.8kB
```

## 관련 개념

- [Container Image](/knowledge/kubernetes/container-image/) - Dockerfile로 빌드되는 이미지
- [Image Layer](/knowledge/kubernetes/image-layer/) - Dockerfile의 각 지시어로 생성되는 레이어
- [Container Registry](/knowledge/kubernetes/container-registry/) - 빌드된 이미지가 배포되는 저장소
- [Copy-on-Write](/knowledge/kubernetes/copy-on-write/) - 이미지 레이어의 CoW 메커니즘
