---
title: "레이블 셀렉터 (Label Selector)"
description: "Label Selector는 레이블의 키-값 쌍을 기준으로 Kubernetes 오브젝트를 필터링하는 메커니즘으로, kubectl 명령어와 Kubernetes 내부 오브젝트(Service, Deployment 등) 모두에서 사용된다"
tags: ['Kubernetes', 'Label Selector', 'Filtering', 'Organization']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/kubernetes/label-selector
sidebar:
  order: 4
---

## 핵심 개념

Label Selector에는 두 가지 유형이 있다:

**동등성 기반(Equality-based) 셀렉터**: 레이블 값의 일치(`=`, `==`) 또는 불일치(`!=`)를 확인한다. 예: `app=quote`, `app!=kiada`.

**집합 기반(Set-based) 셀렉터**: 더 강력한 필터링을 제공한다.
- `app in (quiz, quote)` - 값이 집합에 포함
- `app notin (kiada)` - 값이 집합에 미포함
- `app` - 키가 존재
- `!app` - 키가 부재

여러 셀렉터를 쉼표로 결합하면 AND 조건으로 동작한다(모든 조건 충족 필요). 예: `app=quote,rel=canary`.

Label Selector는 kubectl에서 오브젝트 조회/삭제에 사용될 뿐 아니라, Kubernetes 내부에서도 핵심적인 역할을 한다. Service가 백엔드 파드를 결정하고, ReplicaSet/Deployment가 관리 대상 파드를 식별하며, PersistentVolumeClaim이 바인딩할 PV를 선택하는 데 모두 Label Selector가 사용된다.

API 오브젝트에서는 `matchLabels`(동등성 기반)와 `matchExpressions`(집합 기반, `In`/`NotIn`/`Exists`/`DoesNotExist` 연산자 지원)로 셀렉터를 정의한다.

## 예시

kubectl에서 레이블 셀렉터 사용:

```bash
# 동등성 기반
kubectl get pods -l app=quote
kubectl get pods -l app=quote,rel=canary

# 집합 기반
kubectl get pods -l 'app in (quiz, quote)' -L app
kubectl get pods -l '!rel'

# 레이블 셀렉터로 삭제
kubectl delete pods -l rel=canary
```

PersistentVolumeClaim에서 matchLabels 사용:

```yaml
spec:
  selector:
    matchLabels:
      type: ssd
```

matchExpressions 사용:

```yaml
spec:
  selector:
    matchExpressions:
    - key: type
      operator: NotIn
      values:
      - ssd
    - key: age
      operator: In
      values:
      - old
      - very-old
```

## 관련 개념

- [레이블 (Label)](/knowledge/kubernetes/label/) - 셀렉터가 필터링하는 대상
- [서비스 (Service)](/knowledge/kubernetes/service/) - 파드 셀렉터로 엔드포인트 결정
- [필드 셀렉터 (Field Selector)](/knowledge/kubernetes/field-selector/) - 레이블이 아닌 오브젝트 필드로 필터링
- [레플리카셋 (ReplicaSet)](/knowledge/kubernetes/replicaset/) - 셀렉터로 관리 대상 파드 식별
- [디플로이먼트 (Deployment)](/knowledge/kubernetes/deployment/) - 셀렉터로 파드 세트 관리
