---
title: "어노테이션 (Annotation)"
description: "Annotation은 Kubernetes 오브젝트에 부착하는 키-값 쌍으로, 레이블과 달리 비식별 메타데이터를 저장하며 오브젝트 필터링에는 사용할 수 없지만 최대 256KB의 임의 문자열을 저장할 수 있다"
tags: ['Kubernetes', 'Annotation', 'Metadata', 'Non Identifying']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/kubernetes/annotation
sidebar:
  order: 5
---

## 핵심 개념

Annotation은 레이블과 유사하지만 목적이 다르다. 레이블은 오브젝트를 식별하고 선택하기 위한 것이고, Annotation은 추가 정보를 저장하기 위한 것이다. 레이블 값은 63자 이하에 특수문자 제한이 있지만, Annotation 값은 최대 256KB까지 가능하고 공백, 특수문자, YAML, JSON, Base64 인코딩 값 등 모든 문자를 포함할 수 있다. 단, 값은 문자열 타입이어야 한다.

Annotation의 주요 용도:
- 오브젝트 생성자 정보, 연락처, Git 커밋 해시 등 관리 정보 저장
- kubectl이나 컨트롤러가 내부적으로 사용하는 메타데이터 저장
- Kubernetes API 변경 전 새 기능을 먼저 테스트할 때 사용 (새 필드 대신 Annotation으로 도입 후, 검증 뒤 정식 필드로 전환)
- Ingress 컨트롤러 등 외부 도구의 설정 전달

키 문법은 레이블과 동일한 규칙을 따른다(접두사/이름 형식). Annotation은 필터링에 사용할 수 없으므로 Field Selector로도 검색이 불가능하다.

## 예시

매니페스트에서 Annotation 지정:

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: pod-with-annotations
  annotations:
    created-by: Marko Luksa <marko.luksa@xyz.com>
    contact-phone: "+1 234 567 890"
    managed: "yes"
    revision: "3"
```

Annotation 추가/수정/삭제:

```bash
# 추가
kubectl annotate pod kiada-front-end created-by='Marko Luksa <marko.luksa@xyz.com>'

# 수정 (--overwrite 필수)
kubectl annotate pod kiada-front-end created-by='Humpty Dumpty' --overwrite

# 삭제 (키 뒤에 - 추가)
kubectl annotate pod kiada-front-end created-by-
```

Annotation 확인:

```bash
kubectl describe pod pod-with-annotations
kubectl get pod pod-with-annotations -o json | jq .metadata.annotations
```

## 관련 개념

- [레이블 (Label)](/knowledge/kubernetes/label/) - 식별용 메타데이터 (Annotation과 대비)
- [레이블 셀렉터 (Label Selector)](/knowledge/kubernetes/label-selector/) - Annotation은 셀렉터로 필터링 불가
- [인그레스 컨트롤러 (Ingress Controller)](/knowledge/kubernetes/ingress-controller/) - Annotation으로 추가 설정 전달
- [컨트롤러 (Controller)](/knowledge/kubernetes/controller/) - 내부 메타데이터 저장에 Annotation 활용
