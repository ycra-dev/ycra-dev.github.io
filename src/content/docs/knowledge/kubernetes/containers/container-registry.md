---
title: "Container Registry"
description: "컨테이너 레지스트리는 컨테이너 이미지를 저장하고 배포하기 위한 저장소(repository)이다"
tags: ['Container', 'Registry', 'Docker Hub', 'Image Distribution']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/kubernetes/container-registry
sidebar:
  order: 4
---

## 핵심 개념

컨테이너 레지스트리는 이미지의 교환을 가능하게 하는 핵심 인프라이다. Docker의 세 가지 핵심 개념(이미지, 레지스트리, 컨테이너) 중 하나로, 이미지 배포의 중심 역할을 한다.

레지스트리의 유형:
- **공개(Public) 레지스트리**: 누구나 이미지를 pull할 수 있음
  - Docker Hub (docker.io) - 가장 대표적인 공개 레지스트리
  - Quay.io - Red Hat이 운영하는 공개 레지스트리
  - Google Container Registry (gcr.io)
- **비공개(Private) 레지스트리**: 인증 자격증명이 있는 개인, 조직, 컴퓨터만 접근 가능

이미지 이름 규칙:
- 기본적으로 Docker Hub에서 이미지를 pull
- 다른 레지스트리를 사용하려면 이미지 이름에 레지스트리 지정 필요
  - 예: `quay.io/some/image` (Quay.io 레지스트리)
  - 예: `gcr.io/project/image` (Google Container Registry)

이미지 배포 흐름:
1. 개발자가 로컬에서 이미지 빌드
2. 레지스트리에 이미지 push (업로드)
3. 다른 사용자 또는 머신이 레지스트리에서 이미지 pull (다운로드)
4. pull된 이미지로 컨테이너 생성 및 실행

## 예시

```bash
# Docker Hub에 로그인
$ docker login -u yourid docker.io

# 이미지를 Docker Hub에 push
$ docker push yourid/kiada:0.1

# 다른 머신에서 이미지 pull 및 실행
$ docker run --name kiada-container -p 1234:8080 -d luksa/kiada:0.1

# Quay.io 레지스트리의 이미지 실행
$ docker run quay.io/some/image

# Kubernetes에서 이미지 레지스트리 지정
$ kubectl create deployment kiada --image=luksa/kiada:0.1
# 기본적으로 Docker Hub에서 pull
$ kubectl create deployment kiada --image=quay.io/luksa/kiada:0.1
# Quay.io에서 pull
```

## 관련 개념

- [Container Image](/knowledge/kubernetes/container-image/) - 레지스트리에 저장되는 이미지
- [Container](/knowledge/kubernetes/container/) - 레지스트리에서 pull한 이미지로 생성되는 실행 인스턴스
- [Dockerfile](/knowledge/kubernetes/dockerfile/) - 이미지를 빌드하는 명세 파일
- [Deployment](/knowledge/kubernetes/deployment/) - Kubernetes에서 이미지를 지정하여 배포하는 객체
