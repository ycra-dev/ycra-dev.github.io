---
title: "Dockerfile (도커파일)"
description: "Dockerfile은 Docker 이미지를 빌드하기 위한 레시피 파일로, 기본 이미지 위에 각 명령이 새로운 레이어로 커밋되는 일련의 지시어(instruction)와 셸 명령을 포함한다"
tags: ['Dockerfile', 'Docker', 'Container', 'Image Building', 'Layers']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/linux/dockerfile
sidebar:
  order: 10
---

## 핵심 개념

Dockerfile의 각 명령은 이미지의 새 레이어를 생성한다. `docker build` 명령이 Dockerfile을 읽고 순서대로 명령을 실행하여 최종 이미지를 생성한다. 각 레이어는 이전 레이어의 변경분만 포함하며, 유니온 파일시스템이 레이어를 병합하여 컨테이너의 루트 파일시스템을 구성한다.

**주요 Dockerfile 지시어:**
| 지시어 | 설명 |
|--------|------|
| `FROM` | 기본 이미지 지정 (첫 번째 명령) |
| `RUN` | 빌드 시 셸 명령 실행, 결과를 새 레이어로 커밋 |
| `COPY` | 호스트의 파일을 이미지로 복사 |
| `ENV` | 환경 변수 설정 |
| `EXPOSE` | 컨테이너가 수신하는 포트 선언 |
| `CMD` | 컨테이너 시작 시 실행할 기본 명령 |
| `USER` | 이후 명령을 실행할 사용자 지정 |
| `VOLUME` | 볼륨 마운트 포인트 선언 |
| `ENTRYPOINT` | 컨테이너의 실행 가능 엔트리포인트 |

**기본 이미지 선택 원칙:**
- 가능한 한 작은 풋프린트 (Alpine Linux: 5MB, Ubuntu: 188MB)
- 모든 이미지가 동일한 기본 이미지를 사용하면 다운로드 데이터 감소, 시작 속도 향상
- 기본 이미지의 Dockerfile과 숨겨진 의존성을 철저히 검토

**로그 컨벤션:** 컨테이너 앱은 로그를 파일 대신 STDOUT/STDERR로 출력해야 한다. 파일 로깅만 지원하는 소프트웨어는 심볼릭 링크로 `/dev/stdout`, `/dev/stderr`에 리다이렉트한다.

## 예시

```dockerfile
# 파생 이미지 빌드
FROM nginx:latest
COPY index.html /usr/share/nginx/html/index.html

# 빌드 및 실행
# docker build -t nginx:custom .
# docker run -d -p 80:80 nginx:custom
```

```dockerfile
# 멀티스테이지 빌드 예시 (최소 이미지)
FROM golang:1.13 AS builder
WORKDIR /app
COPY . .
RUN go build -o myapp

FROM alpine:latest
COPY --from=builder /app/myapp /usr/local/bin/
USER nobody
CMD ["myapp"]
```

## 관련 개념

- [도커 (Docker)](/knowledge/linux/docker/)
- [컨테이너 (Container)](/knowledge/linux/container/)
- [컨테이너 레지스트리 (Container Registry)](/knowledge/linux/container-registry/)
- [유니온 파일 시스템 (Union Filesystem)](/knowledge/linux/union-filesystem/)
