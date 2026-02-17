---
title: "Kubernetes Operator Pattern"
description: "Kubernetes Operator는 특정 애플리케이션의 운영 지식을 코드로 구현한 커스텀 컨트롤러로, CustomResourceDefinition(CRD)을 통해 Kubernetes API를 확장하고 복잡한 상태 유지 워크로드의 생명주기를 자동으로 관리한다"
tags: ['Operator', 'Custom Resource', 'Controller', 'Automation', 'Kubernetes']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/kubernetes/kubernetes-operator-pattern
sidebar:
  order: 23
---

## 핵심 개념

StatefulSet만으로는 분산 데이터베이스 같은 복잡한 상태 유지 워크로드를 완전히 자동화하기 어렵다. 예를 들어 MongoDB replica set의 초기화, 멤버 추가/제거, 백업, 복구 등은 StatefulSet이 제공하지 않는 기능이다.

Operator 패턴은 이러한 운영 작업을 자동화한다:
1. **CRD 정의**: 애플리케이션에 특화된 새로운 리소스 타입을 정의 (예: MongoDBReplicaSet)
2. **커스텀 컨트롤러**: 조정 루프를 실행하며 CRD 오브젝트의 원하는 상태를 구현
3. **도메인 지식 코드화**: 스케일링, 업그레이드, 백업, 장애 복구 로직을 컨트롤러에 내장

대표적인 Operator 예시:
- MongoDB Community/Enterprise Operator
- PostgreSQL Operator (Zalando, CrunchyData)
- Redis Operator
- Elasticsearch Operator (ECK)

Operator는 OperatorHub.io에서 검색하여 사용할 수 있으며, Operator SDK나 Kubebuilder를 사용하여 직접 개발할 수도 있다.

Operator를 사용하면 사용자는 StatefulSet, Service, ConfigMap 등을 개별적으로 관리하는 대신, 단일 커스텀 리소스를 통해 전체 애플리케이션을 선언적으로 관리할 수 있다.

## 예시

MongoDB Operator 사용 예:
```yaml
# Operator가 정의한 커스텀 리소스
apiVersion: mongodbcommunity.mongodb.com/v1
kind: MongoDBCommunity
metadata:
  name: quiz-mongodb
spec:
  members: 3                    # replica set 멤버 수
  type: ReplicaSet
  version: "5.0.0"
  security:
    authentication:
      modes: ["SCRAM"]
```

```bash
# Operator가 자동으로 생성하는 리소스들:
# - StatefulSet
# - Headless Service
# - PersistentVolumeClaims
# - ConfigMaps
# - Secrets
# + MongoDB replica set 초기화 및 구성
```

## 관련 개념

- [StatefulSet](/knowledge/kubernetes/statefulset/) - Operator가 내부적으로 생성하는 오브젝트
- [Controller](/knowledge/kubernetes/controller/) - Operator는 커스텀 컨트롤러의 한 형태
- [Reconciliation Control Loop](/knowledge/kubernetes/reconciliation-control-loop/) - Operator의 핵심 동작 원리
- [Declarative Model](/knowledge/kubernetes/declarative-model/) - 커스텀 리소스를 통한 선언적 관리
- [API Server](/knowledge/kubernetes/api-server/) - CRD를 통해 API 확장
