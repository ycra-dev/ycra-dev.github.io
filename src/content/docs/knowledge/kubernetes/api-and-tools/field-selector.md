---
title: "필드 셀렉터 (Field Selector)"
description: "Field Selector(필드 선택기)는 Kubernetes API에서 특정 필드 값을 기준으로 객체를 필터링하는 메커니즘이다"
tags: ['Kubernetes', 'Field Selector', 'Filtering', 'API', 'Kubectl']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/kubernetes/field-selector
sidebar:
  order: 7
---

## 핵심 개념

Field Selector는 Kubernetes API에 내장된 필터링 기능으로, 대량의 객체 중에서 특정 조건에 맞는 객체만 조회할 때 유용하다.

**사용 방법:**
- `kubectl get <resource> --field-selector <field>=<value>` 형식으로 사용
- 지정된 필드의 값이 selector 값과 일치하는 객체만 반환됨
- 필드 이름과 허용되는 값은 `kubectl explain` 명령으로 확인 가능

**일반적인 사용 사례:**
- Event 객체에서 Warning 이벤트만 필터링: `--field-selector type=Warning`
- 특정 상태의 Pod만 조회: `--field-selector status.phase=Running`
- 특정 네임스페이스의 객체 필터링
- 특정 노드에서 실행 중인 Pod 조회

**특징:**
- API 서버 수준에서 필터링이 수행되므로 효율적
- 모든 필드에 대해 사용할 수 있는 것은 아님 (리소스 유형에 따라 지원되는 필드가 다름)
- Label Selector(`-l` 옵션)와는 다른 메커니즘 (Label은 사용자 정의 메타데이터, Field Selector는 객체의 고유 필드)

**주의사항:**
- 필드 이름의 대소문자와 값의 정확한 형식을 지켜야 함
- 지원되지 않는 필드에 대해 사용하면 에러 발생

`metadata.name`과 `metadata.namespace`는 모든 오브젝트 종류에서 지원되며, 그 외 지원되는 필드는 오브젝트 종류마다 다르다. Field Selector는 동등(`=`, `==`)과 부정(`!=`) 연산자를 지원하며, 쉼표로 여러 셀렉터를 결합할 수 있다. Label Selector와 달리 집합 기반 연산자는 지원되지 않는다. Field Selector는 kubectl이나 Kubernetes API 클라이언트에서만 사용되며, Service나 Deployment 같은 Kubernetes 내부 오브젝트에서는 사용되지 않는다.

## 예시

```bash
# Warning 이벤트만 조회
$ kubectl get events --field-selector type=Warning
No resources found in default namespace.

# Normal 이벤트만 조회
$ kubectl get events --field-selector type=Normal

# 실행 중인 Pod만 조회
$ kubectl get pods --field-selector status.phase=Running

# 특정 노드에서 실행 중인 Pod 조회
$ kubectl get pods --field-selector spec.nodeName=kind-worker2

# 여러 조건 결합 (쉼표로 구분)
$ kubectl get pods --field-selector status.phase=Running,spec.nodeName=kind-worker

# 필드 이름과 값을 kubectl explain으로 확인
$ kubectl explain events
# type 필드: Normal 또는 Warning 값 가능

$ kubectl explain pod.status.phase
# phase 필드: Pending, Running, Succeeded, Failed, Unknown 값 가능
```

```
Field Selector vs Label Selector:

Field Selector:
  --field-selector type=Warning     (객체 고유 필드로 필터링)
  --field-selector status.phase=Running

Label Selector:
  -l app=kiada                      (사용자 정의 레이블로 필터링)
  -l environment=production
```

부정 연산자 사용 예시:

```bash
# 실행 중이 아닌 파드 찾기
kubectl get pods --field-selector status.phase!=Running

# 모든 네임스페이스에서 실행 중이 아닌 파드 찾기
kubectl get pods --field-selector status.phase!=Running --all-namespaces
```

## 관련 개념

- [쿠버네티스 API (Kubernetes API)](/knowledge/kubernetes/kubernetes-api/) - Field Selector가 적용되는 API
- [이벤트 객체 (Event Object)](/knowledge/kubernetes/event-object/) - Field Selector로 Warning 이벤트를 필터링하는 대표적 사례
- [kubectl](/knowledge/kubernetes/kubectl/) - Field Selector를 사용하는 CLI 도구
- [오브젝트 매니페스트 (Object Manifest)](/knowledge/kubernetes/object-manifest/) - 필터링 대상이 되는 객체의 필드 구조
- [레이블 셀렉터 (Label Selector)](/knowledge/kubernetes/label-selector/) - 레이블 기반 필터링 (Field Selector와 대비)
- [어노테이션 (Annotation)](/knowledge/kubernetes/annotation/) - Field Selector로 필터링할 수 없는 메타데이터
