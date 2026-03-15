---
title: "레이블 (Label)"
description: "Label은 Kubernetes 오브젝트에 부착하는 키-값 쌍으로, 오브젝트를 식별하고 그룹화하여 시스템의 역할과 구조를 명확하게 표현하는 데 사용된다"
tags: ['Kubernetes', 'Label', 'Organization', 'Metadata']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/kubernetes/label
sidebar:
  order: 3
---

## 핵심 개념

Label은 Kubernetes의 가장 강력하면서도 단순한 조직화 기능이다. 하나의 오브젝트에 여러 레이블을 부착할 수 있으며(키는 고유해야 함), 이를 통해 오브젝트를 다차원으로 분류할 수 있다. 예를 들어 `app` 레이블로 애플리케이션별, `rel` 레이블로 릴리스별(stable/canary)로 파드를 조직화할 수 있다.

레이블 키는 선택적 접두사와 필수 이름으로 구성된다. 접두사는 DNS 서브도메인(253자 이하), 이름은 63자 이하의 알파벳/숫자/하이픈/언더스코어/점으로 구성된다. `kubernetes.io/`와 `k8s.io/` 접두사는 Kubernetes 시스템용으로 예약되어 있다. 레이블 값도 63자 이하이며 빈 문자열이 허용된다.

Kubernetes 커뮤니티에서 권장하는 표준 레이블로는 `app.kubernetes.io/name`, `app.kubernetes.io/version`, `app.kubernetes.io/component`, `app.kubernetes.io/part-of`, `app.kubernetes.io/managed-by` 등이 있다. 이를 사용하면 도구와 사용자가 오브젝트의 역할을 쉽게 파악할 수 있다.

## 예시

파드 매니페스트에 레이블 지정:

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: kiada-001
  labels:
    app: kiada
    rel: stable
```

레이블 추가/변경/삭제:

```bash
# 레이블 추가
kubectl label pod kiada-canary app=kiada rel=canary

# 레이블 값 변경 (--overwrite 필수)
kubectl label pod quote-canary app=quote --overwrite

# 모든 파드에 레이블 추가
kubectl label pod --all suite=kiada-suite

# 레이블 삭제 (키 뒤에 - 추가)
kubectl label pod kiada-canary suite-
```

레이블 표시:

```bash
# 모든 레이블 표시
kubectl get pods --show-labels

# 특정 레이블을 컬럼으로 표시
kubectl get pods -L app,rel
```

## 관련 개념

- [레이블 셀렉터 (Label Selector)](/knowledge/kubernetes/label-selector/) - 레이블을 기반으로 오브젝트 필터링
- [어노테이션 (Annotation)](/knowledge/kubernetes/annotation/) - 비식별 메타데이터를 위한 유사 기능
- [네임스페이스 (Namespace)](/knowledge/kubernetes/namespace/) - 더 큰 범위의 오브젝트 분리
- [서비스 (Service)](/knowledge/kubernetes/service/) - 레이블 셀렉터로 백엔드 파드 결정
- [디플로이먼트 (Deployment)](/knowledge/kubernetes/deployment/) - 레이블로 관리 대상 파드 식별
