---
title: "Docker"
description: "Docker는 Go 언어로 작성된 클라이언트/서버 애플리케이션으로, 컨테이너를 빌드하고 관리하는 오픈소스 컨테이너 엔진이며, 컨테이너 기술의 주류 채택을 이끈 핵심 프로젝트이다"
tags: ['Docker', 'Container', 'Containerization', 'Dockerfile', 'Image', 'Registry']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/linux/docker
sidebar:
  order: 9
---

## 핵심 개념

**Docker 아키텍처:**
- **docker**: 모든 관리 작업을 처리하는 CLI 클라이언트
- **dockerd**: 컨테이너와 이미지 오퍼레이션을 구현하는 상주 데몬
- UNIX 도메인 소켓(로컬) 또는 TCP(원격)를 통해 통신

**핵심 개념:**
- **이미지(Image)**: 컨테이너의 템플릿. 읽기 전용 유니온 파일시스템 레이어의 스택
- **컨테이너(Container)**: 이미지 위에 읽기/쓰기 레이어를 추가한 실행 인스턴스
- **레지스트리(Registry)**: 이미지의 중앙 집중식 저장소 (기본: Docker Hub)
- **Dockerfile**: 이미지 빌드 레시피. 기본 이미지 위에 레이어를 추가하는 명령 시퀀스
- **볼륨(Volume)**: 유니온 파일시스템과 별도로 유지되는 독립적인 쓰기 가능 디렉토리

**보안 모범 사례:**
- dockerd에 대한 접근 제한 (docker 그룹 대신 sudo 사용)
- 원격 통신 시 TLS 필수
- 컨테이너 내 프로세스는 비root 사용자로 실행
- `--read-only`로 읽기 전용 루트 파일시스템 사용
- `--cap-drop ALL`로 모든 권한 제거 후 필요한 것만 추가
- 콘텐츠 트러스트(content trust)로 이미지 무결성 검증

**네트워킹 모드:**
- **bridge** (기본): 프라이빗 네임스페이스 네트워크, docker0 브리지 사용
- **host**: 호스트의 네트워크 스택 직접 공유
- **none**: Docker가 네트워킹 구성하지 않음

## 예시

```dockerfile
# Dockerfile 예시
FROM debian:jessie
MAINTAINER admin@example.com

ENV NGINX_VERSION 1.13.1
RUN apt-get update && apt-get install -y nginx=$NGINX_VERSION

RUN ln -sf /dev/stdout /var/log/nginx/access.log
RUN ln -sf /dev/stderr /var/log/nginx/error.log

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

```bash
# 이미지 빌드 및 실행
docker build -t nginx:custom .
docker run -d --name web -p 80:80 nginx:custom

# 볼륨 마운트
docker run -d -v /mnt/data:/data nginx

# 보안 강화된 실행
docker run --read-only --cap-drop ALL \
  --cap-add NET_BIND_SERVICE nginx

# 이미지 레지스트리 관리
docker pull nginx
docker push myregistry.com:5000/myimage:v1
docker login myregistry.com:5000
```

## 관련 개념

- [Container](/knowledge/linux/container/)
- [Dockerfile](/knowledge/linux/dockerfile/)
- [Container Registry](/knowledge/linux/container-registry/)
- [Container Orchestration](/knowledge/linux/container-orchestration/)
- [Linux Namespaces](/knowledge/linux/linux-namespaces/)
- [Cgroups](/knowledge/linux/cgroups/)
