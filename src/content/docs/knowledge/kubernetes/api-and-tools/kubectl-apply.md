---
title: "kubectl apply"
description: "`kubectl apply`는 YAML 또는 JSON 매니페스트 파일을 Kubernetes API에 제출하여 오브젝트를 생성하거나 기존 오브젝트를 업데이트하는 선언적(declarative) 명령어이다"
tags: ['Kubernetes', 'Kubectl', 'Declarative', 'Manifest', 'Deployment']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/kubernetes/kubectl-apply
sidebar:
  order: 9
---

## 핵심 개념

`kubectl apply`는 Kubernetes에서 오브젝트를 관리하는 주요 방법으로, 매니페스트 파일을 클러스터에 "적용"하는 개념이다. 이 명령은 생성과 업데이트를 모두 처리한다:

- **생성**: 오브젝트가 아직 존재하지 않으면 새로 생성
- **업데이트**: 오브젝트가 이미 존재하면 매니페스트의 변경 사항을 반영 (일부 필드는 변경 불가능하여 실패할 수 있음)

YAML 매니페스트 파일을 사용하는 이점:
1. **재현성**: 셸 스크립트 없이도 애플리케이션 배포를 반복 가능
2. **버전 관리**: VCS(Version Control System)에 저장하여 변경 이력 추적
3. **선언적 관리**: 원하는 상태를 기술하면 Kubernetes가 이를 달성

`kubectl create`와의 차이점은, `create`는 오브젝트 생성만 가능하고 이미 존재하면 에러를 반환하는 반면, `apply`는 생성과 업데이트 모두 수행한다는 것이다. 단, `generateName` 필드를 사용하는 매니페스트는 `apply` 대신 `create`를 사용해야 한다.

## 예시

단일 매니페스트 파일 적용:

```bash
kubectl apply -f pod.kiada.yaml
```

디렉터리 내 모든 매니페스트 적용:

```bash
kubectl apply -f Chapter05/
```

여러 파일 동시 적용:

```bash
kubectl apply -f pod.kiada.yaml,pod.kiada-ssl.yaml
```

하위 디렉터리 포함:

```bash
kubectl apply -f Chapter05/ --recursive
```

매니페스트로부터 오브젝트 삭제:

```bash
kubectl delete -f pod.kiada-ssl.yaml
```

dry-run으로 매니페스트 생성:

```bash
kubectl run kiada --image=luksa/kiada:0.1 --dry-run=client -o yaml > mypod.yaml
```

## 관련 개념

- [kubectl](/knowledge/kubernetes/kubectl/) - apply 명령이 속한 CLI 도구
- [오브젝트 매니페스트 (Object Manifest)](/knowledge/kubernetes/object-manifest/) - apply의 입력이 되는 오브젝트 정의 파일
- [선언적 모델 (Declarative Model)](/knowledge/kubernetes/declarative-model/) - 쿠버네티스의 선언적 관리 모델
- [쿠버네티스 API 서버 (Kubernetes API Server)](/knowledge/kubernetes/api-server/) - 매니페스트가 제출되는 대상
- [파드 (Pod)](/knowledge/kubernetes/pod/) - 가장 흔하게 apply되는 리소스 종류 중 하나
