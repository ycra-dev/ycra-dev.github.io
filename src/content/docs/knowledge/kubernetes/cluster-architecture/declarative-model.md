---
title: "선언적 모델 (Declarative Model)"
description: "쿠버네티스의 선언적 모델(Declarative Model)은 사용자가 시스템의 원하는 상태(desired state)를 기술하면 쿠버네티스가 현재 상태를 원하는 상태에 맞추어 자동으로 조정하는 방식이다"
tags: ['Kubernetes', 'Declarative', 'Desired State', 'Configuration']
created: 2026-02-12
updated: 2026-03-15
draft: false
slug: knowledge/kubernetes/declarative-model
sidebar:
  order: 3
---

## 핵심 개념

선언적 모델은 쿠버네티스의 가장 근본적인 원칙 중 하나이다. 명령적(imperative) 접근 방식이 "이 작업을 수행하라"라고 지시하는 것과 달리, 선언적 접근 방식은 "이 상태가 되어야 한다"라고 선언한다.

이 모델의 핵심 동작 원리:
1. 사용자가 YAML 또는 JSON 매니페스트 파일로 애플리케이션의 구성 요소를 기술
2. 쿠버네티스가 이 기술(description)을 기반으로 실행 중인 애플리케이션을 생성
3. 기술을 변경하면 쿠버네티스가 필요한 조치를 취해 실행 중인 애플리케이션을 새로운 기술에 맞춤
4. 애플리케이션이 실패하면 쿠버네티스가 자동으로 재시작하거나 필요한 부분을 재생성

이 접근 방식의 장점:
- **자동 복구**: 애플리케이션이 크래시되면 자동으로 재시작
- **인프라 장애 대응**: 하드웨어 장애 시 자동으로 다른 머신으로 이동
- **일관된 배포**: 온프레미스든 클라우드든 동일한 매니페스트로 배포 가능
- **운영 부담 감소**: 엔지니어가 세부사항 대신 큰 그림에 집중 가능

## 예시

선언적 방식과 명령적 방식의 비교:

```yaml
# 선언적 방식 - "3개의 복제본이 실행되어야 한다"
apiVersion: apps/v1
kind: Deployment
metadata:
  name: web-server
spec:
  replicas: 3
  selector:
    matchLabels:
      app: web-server
  template:
    spec:
      containers:
      - name: web-server
        image: nginx:1.25
```

```bash
# 명령적 방식 - "복제본을 3개로 늘려라"
kubectl scale deployment web-server --replicas=3
# 실제로 이 명령도 내부적으로는 Deployment 객체의 replicas 필드를 3으로 변경하는 것
```

핵심 차이: `kubectl scale` 명령은 직접 "Pod 2개를 추가하라"고 지시하는 것이 아니라, 원하는 복제본 수를 3으로 설정하고 쿠버네티스가 현재 상태와의 차이를 파악하여 필요한 조치를 취하게 한다.

## 관련 개념

- [쿠버네티스 (Kubernetes)](/knowledge/kubernetes/kubernetes/) - 선언적 모델을 핵심 원칙으로 사용하는 플랫폼
- [오브젝트 매니페스트 (Object Manifest)](/knowledge/kubernetes/object-manifest/) - 원하는 상태를 기술하는 YAML/JSON 파일
- [스펙과 상태 (Spec and Status)](/knowledge/kubernetes/spec-and-status/) - 원하는 상태(Spec)와 실제 상태(Status)의 구분
- [컨트롤러 (Controller)](/knowledge/kubernetes/controller/) - 원하는 상태를 실현하는 컴포넌트
- [디플로이먼트 (Deployment)](/knowledge/kubernetes/deployment/) - 선언적 모델의 대표적 사용 예시
