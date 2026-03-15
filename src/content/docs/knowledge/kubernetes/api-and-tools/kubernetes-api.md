---
title: "쿠버네티스 API (Kubernetes API)"
description: "Kubernetes API는 클러스터와 상호작용하기 위한 HTTP 기반 RESTful API이다"
tags: ['Kubernetes', 'API', 'Restful', 'HTTP', 'Crud']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/kubernetes/kubernetes-api
sidebar:
  order: 1
---

## 핵심 개념

Kubernetes API는 클러스터와의 모든 상호작용의 중심점이다. 사용자뿐만 아니라 Kubernetes 내부 컴포넌트들도 API를 통해 클러스터와 상호작용한다.

**리소스(Resource)와 객체(Object)의 차이:**

RESTful API에서 핵심 개념은 리소스이며, 각 리소스는 고유한 URI를 가진다. 하지만 리소스와 객체는 같은 것이 아니다:

- 하나의 객체가 여러 리소스를 통해 노출될 수 있음
  - 예: Deployment 객체 `mydeploy`는 컬렉션 리소스(`/apis/apps/v1/deployments`)와 개별 리소스 URI 양쪽에서 반환됨
- 같은 객체가 여러 API 버전을 통해 노출될 수 있음
  - 예: `apps/v1` 버전과 `extensions/v1beta1` 버전 (스키마의 작은 차이)
- 일부 리소스는 어떤 객체도 나타내지 않음
  - 예: `subjectaccessreviews` - POST 요청으로 권한 확인만 수행하며 객체를 생성하지 않음

비유: 관계형 데이터베이스에서 리소스는 View, 객체 유형은 Table에 비유할 수 있음

**API 그룹과 버전:**

- API 리소스는 그룹으로 분류됨
- `apiVersion` 필드가 그룹과 버전을 나타냄
  - `v1` - 코어 API 그룹 (그룹 이름 생략)
  - `apps/v1` - apps 그룹의 v1 버전

**객체 표현 형식:**
- JSON (기본)과 YAML 형식 모두 지원
- GET 요청으로 조회, POST/PUT 요청으로 생성/수정 시 두 형식 모두 사용 가능

## 예시

```bash
# kubectl proxy를 통해 API에 직접 접근
$ kubectl proxy
Starting to serve on 127.0.0.1:8001

# 노드 객체 조회 (REST API)
$ curl http://127.0.0.1:8001/api/v1/nodes/kind-control-plane

# 모든 Deployment 목록 (REST API)
$ curl http://127.0.0.1:8001/apis/apps/v1/deployments

# 사용 가능한 모든 리소스 유형 조회
$ kubectl api-resources
NAME         SHORTNAMES   APIVERSION   NAMESPACED   KIND
pods         po           v1           true         Pod
services     svc          v1           true         Service
deployments  deploy       apps/v1      true         Deployment
nodes        no           v1           false        Node
events       ev           v1           true         Event
```

```
API 리소스 구조:

/api/v1/                        (코어 그룹)
    /nodes                      (Node 컬렉션)
    /nodes/<name>               (개별 Node)
    /pods                       (Pod 컬렉션)
    /services                   (Service 컬렉션)

/apis/apps/v1/                  (apps 그룹)
    /deployments                (Deployment 컬렉션)
    /deployments/<name>         (개별 Deployment)
```

## 관련 개념

- [오브젝트 매니페스트 (Object Manifest)](/knowledge/kubernetes/object-manifest/) - API 객체의 YAML/JSON 표현
- [kubectl](/knowledge/kubernetes/kubectl/) - API와 상호작용하는 CLI 도구
- [스펙과 상태 (Spec and Status)](/knowledge/kubernetes/spec-and-status/) - API 객체의 핵심 구조
- [컨트롤러 (Controller)](/knowledge/kubernetes/controller/) - API를 통해 객체를 관리하는 컴포넌트
