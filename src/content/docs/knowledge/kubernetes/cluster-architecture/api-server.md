---
title: "쿠버네티스 API 서버 (Kubernetes API Server)"
description: "Kubernetes API Server는 RESTful Kubernetes API를 외부에 노출하는 Control Plane의 핵심 컴포넌트이다"
tags: ['Kubernetes', 'API Server', 'Control Plane', 'Restful API']
created: 2026-02-12
updated: 2026-03-15
draft: false
slug: knowledge/kubernetes/api-server
sidebar:
  order: 5
---

## 핵심 개념

API Server는 Kubernetes 클러스터와 상호작용하는 유일한 진입점이다. 모든 통신은 API Server를 거치며, 이는 클러스터의 중앙 허브 역할을 한다.

주요 특징:
- **상태 비저장(Stateless)**: API Server 자체는 상태를 저장하지 않으며, 모든 데이터는 etcd에 영구 저장됨
- **etcd와의 독점 통신**: Control Plane 컴포넌트 중 오직 API Server만이 etcd와 직접 통신함
- **인증 및 인가**: TLS를 사용하며 클라이언트 인증서 또는 토큰을 통한 인증이 필요함
- **알림 메커니즘**: 새 객체가 생성되면 관심 있는 모든 컴포넌트(컨트롤러 등)에 알림

API 동작 흐름:
1. kubectl이 YAML/JSON 파일을 개별 객체로 분할
2. 각 객체에 대해 HTTP PUT 또는 POST 요청을 API로 전송
3. API Server가 객체를 검증(validate)하고 etcd에 저장
4. 관련 컴포넌트에 새 객체 생성을 알림

## 예시

API Server에 직접 접근하는 방법:

```bash
# kubectl proxy를 통해 로컬에서 API에 접근
$ kubectl proxy
Starting to serve on 127.0.0.1:8001

# 다른 터미널에서 API 호출
$ curl http://127.0.0.1:8001/api/v1/nodes
$ curl http://127.0.0.1:8001/api/v1/namespaces/default/pods

# kubectl을 통한 일반적인 접근
$ kubectl get nodes
$ kubectl create deployment web-server --image=nginx:1.25
```

API Server는 HTTP 기반 RESTful API이므로 표준 HTTP 메서드를 사용한다:
- `POST`: 객체 생성
- `GET`: 객체 조회
- `PUT`/`PATCH`: 객체 수정
- `DELETE`: 객체 삭제

## 관련 개념

- [컨트롤 플레인 (Control Plane)](/knowledge/kubernetes/control-plane/) - API Server가 속한 Control Plane
- [etcd](/knowledge/kubernetes/etcd/) - API Server가 데이터를 저장하는 유일한 저장소
- [kubectl](/knowledge/kubernetes/kubectl/) - API Server와 통신하는 CLI 도구
- [쿠버네티스 API (Kubernetes API)](/knowledge/kubernetes/kubernetes-api/) - API Server가 제공하는 RESTful API의 구조
- [컨트롤러 (Controller)](/knowledge/kubernetes/controller/) - API Server의 알림을 수신하여 작업을 수행하는 컴포넌트
