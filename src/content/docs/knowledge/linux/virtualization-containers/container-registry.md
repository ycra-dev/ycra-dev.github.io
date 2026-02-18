---
title: "Container Registry"
description: "컨테이너 레지스트리(Container Registry)는 Docker 이미지를 저장하고 배포하는 중앙 집중식 서비스로, HTTP를 통해 이미지를 push/pull할 수 있으며, Docker Hub이 기본 공개 레지스트리이다"
tags: ['Container Registry', 'Docker Hub', 'Image', 'Docker', 'Repository']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/linux/container-registry
sidebar:
  order: 13
---

## 핵심 개념

레지스트리는 컨테이너 기반 워크플로의 핵심 인프라이다. `docker pull`로 이미지를 다운로드하고, `docker push`로 커스텀 이미지를 업로드한다. 로컬에 없는 이미지를 요청하면 dockerd가 자동으로 레지스트리에서 다운로드한다.

**주요 레지스트리 서비스:**
- **Docker Hub**: 기본 레지스트리, 공개/비공개 저장소 지원
- **Google Container Registry**: GCP 기반
- **Amazon ECR**: AWS EC2 Container Registry
- **quay.io**: CoreOS의 레지스트리
- **Artifactory**: JFrog의 범용 아티팩트 관리

**프라이빗 레지스트리 운영:**
- 오픈소스 레지스트리를 컨테이너로 쉽게 실행 가능
- 인증: token 방식(외부 위임) 또는 htpasswd 방식(HTTP 기본 인증)
- 반드시 TLS로 실행해야 함
- 프로덕션 환경에서는 저장 공간, 인증/인가, 이미지 정리 등 고려 필요
- 클라우드 환경에서는 S3, Google Cloud Storage 등 오브젝트 스토어를 백엔드로 사용 가능

**보안 고려사항:**
- Docker 콘텐츠 트러스트(content trust)로 이미지 무결성과 게시자 검증
- Docker Hub의 대부분 콘텐츠는 서명되지 않아 신뢰할 수 없음
- `DOCKER_CONTENT_TRUST=1` 환경 변수로 신뢰하지 않는 이미지 풀 방지

## 예시

```bash
# Docker Hub에서 이미지 풀
docker pull nginx

# 프라이빗 레지스트리에서 풀
docker pull myregistry.com:5000/myapp:v1

# 이미지 태깅 및 푸시
docker tag myapp:latest myregistry.com:5000/myapp:v1
docker login myregistry.com:5000
docker push myregistry.com:5000/myapp:v1

# 프라이빗 레지스트리 실행
docker run -d -p 5000:5000 --name registry registry:2

# 콘텐츠 트러스트 활성화
export DOCKER_CONTENT_TRUST=1
```

## 관련 개념

- [Docker](/knowledge/linux/docker/)
- [Dockerfile](/knowledge/linux/dockerfile/)
- [Container](/knowledge/linux/container/)
