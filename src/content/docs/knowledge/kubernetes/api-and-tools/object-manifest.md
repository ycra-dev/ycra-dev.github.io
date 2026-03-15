---
title: "오브젝트 매니페스트 (Object Manifest)"
description: "Object Manifest(객체 매니페스트)는 Kubernetes API 객체의 구조화된 텍스트 표현으로, YAML 또는 JSON 형식으로 작성된다"
tags: ['Kubernetes', 'Manifest', 'YAML', 'JSON', 'API Object']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/kubernetes/object-manifest
sidebar:
  order: 2
---

## 핵심 개념

Kubernetes 객체를 생성하거나 조회할 때 사용되는 매니페스트는 대부분의 객체에서 공통된 구조를 따른다.

**매니페스트의 4가지 주요 섹션:**

1. **Type Metadata** (`apiVersion`, `kind`)
   - 객체의 유형을 나타내는 정보
   - `apiVersion`: API 그룹 및 버전 (예: `v1`, `apps/v1`)
   - `kind`: 객체 유형 (예: `Node`, `Deployment`, `Pod`)

2. **Object Metadata** (`metadata`)
   - 객체 인스턴스의 기본 정보
   - `name`: 인스턴스 이름
   - `labels`: 레이블 (분류 및 선택용)
   - `annotations`: 주석 (추가 메타데이터)
   - `resourceVersion`: 리소스 버전
   - `uid`: 고유 식별자
   - `creationTimestamp`: 생성 시간
   - 모든 객체 유형에서 동일한 필드 구조

3. **Spec** (`spec`)
   - 객체의 **원하는 상태(desired state)**를 기술
   - 사용자가 작성하는 부분
   - 객체 유형마다 필드가 다름

4. **Status** (`status`)
   - 객체의 **현재 실제 상태(actual state)**
   - 컨트롤러가 작성하는 부분
   - 객체 유형마다 필드가 다름

불행히도 API Server가 반환하는 YAML/JSON에서 필드는 알파벳 순서로 정렬되어 있어 가독성이 떨어질 수 있다. `spec`과 `status` 섹션이 있는 객체는 최상위 필드가 비교적 잘 정리되어 있지만, Event 같은 객체는 그렇지 않다.

## 예시

```yaml
# Node 객체 매니페스트 예시
apiVersion: v1                    # Type Metadata: API 버전
kind: Node                       # Type Metadata: 객체 유형
metadata:                         # Object Metadata
  name: kind-control-plane
  creationTimestamp: "2020-05-03T15:09:17Z"
  labels:
    kubernetes.io/hostname: kind-control-plane
  uid: 16dc1e0b-8d34-4cfb-8ade-3b0e91ec838b
  resourceVersion: "3220054"
spec:                             # Spec: 원하는 상태
  podCIDR: 10.244.0.0/24
  taints:
  - effect: NoSchedule
    key: node-role.kubernetes.io/master
status:                           # Status: 현재 상태
  addresses:
  - address: 172.18.0.2
    type: InternalIP
  capacity:
    cpu: "8"
    memory: 32720824Ki
  conditions:
  - type: Ready
    status: "True"
```

```bash
# YAML 형식으로 객체 조회
$ kubectl get node kind-control-plane -o yaml

# JSON 형식으로 객체 조회
$ kubectl get node kind-control-plane -o json

# 필드 문서 조회
$ kubectl explain nodes
$ kubectl explain node.spec
$ kubectl explain node.status
```

## 관련 개념

- [쿠버네티스 API (Kubernetes API)](/knowledge/kubernetes/kubernetes-api/) - 매니페스트가 사용되는 API
- [스펙과 상태 (Spec and Status)](/knowledge/kubernetes/spec-and-status/) - 매니페스트의 핵심 섹션
- [선언적 모델 (Declarative Model)](/knowledge/kubernetes/declarative-model/) - 매니페스트를 통한 선언적 설정
- [컨트롤러 (Controller)](/knowledge/kubernetes/controller/) - Spec을 읽고 Status를 작성하는 컴포넌트
- [kubectl](/knowledge/kubernetes/kubectl/) - 매니페스트를 조회하고 적용하는 도구
