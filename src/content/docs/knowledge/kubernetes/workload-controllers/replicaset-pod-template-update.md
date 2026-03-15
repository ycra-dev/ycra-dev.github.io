---
title: "레플리카셋 파드 템플릿 업데이트 (ReplicaSet Pod Template Update)"
description: "ReplicaSet의 Pod 템플릿을 변경하면 이후 새로 생성되는 Pod에만 적용되며, 기존 실행 중인 Pod에는 영향을 주지 않는 특성으로, 이것이 ReplicaSet 대신 Deployment를 사용하는 주된 이유이다"
tags: ['Replicaset', 'Pod Template', 'Update', 'Kubernetes']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/kubernetes/replicaset-pod-template-update
sidebar:
  order: 6
---

## 핵심 개념

ReplicaSet의 Pod 템플릿은 "쿠키 커터(cookie cutter)"와 같다. 템플릿을 변경하면 커터의 모양만 바뀌고, 이미 찍어낸 쿠키(기존 Pod)에는 아무런 영향이 없다. 새 Pod가 생성될 때만 변경된 템플릿이 적용된다.

이 동작은 ReplicaSet의 근본적인 한계이다. 애플리케이션을 새 버전으로 업데이트하려면 기존 Pod를 수동으로 삭제하고 ReplicaSet이 새 템플릿으로 재생성하도록 해야 한다. 이 과정에서 서비스 중단이 발생할 수 있다.

이러한 한계 때문에 실제 운영 환경에서는 ReplicaSet 대신 Deployment를 사용한다. Deployment는 Pod 템플릿 변경 시 자동으로 롤링 업데이트를 수행한다.

참고로 ReplicaSet의 selector는 불변이므로 변경할 수 없지만, template 내의 labels는 selector의 labels를 포함하는 한(subset 관계) 자유롭게 추가할 수 있다.

## 예시

Pod 템플릿에 레이블 추가 후 확인:

```bash
kubectl edit rs kiada
# template.metadata.labels에 ver: '0.5' 추가

# 기존 Pod - 새 레이블 없음
kubectl get pods -l app=kiada --show-labels
# kiada-dl7vz  app=kiada,rel=stable
# kiada-dn9fb  app=kiada,rel=stable

# 스케일 업 후 새 Pod에만 적용
kubectl scale rs kiada --replicas 3
kubectl get pods -l app=kiada --show-labels
# kiada-dl7vz  app=kiada,rel=stable           (기존)
# kiada-dn9fb  app=kiada,rel=stable           (기존)
# kiada-z9dp2  app=kiada,rel=stable,ver=0.5   (새 Pod)
```

## 관련 개념

- [레플리카셋 (ReplicaSet)](/knowledge/kubernetes/replicaset/) - 템플릿 업데이트의 대상
- [디플로이먼트 (Deployment)](/knowledge/kubernetes/deployment/) - 템플릿 업데이트 시 자동 롤아웃을 지원하는 상위 오브젝트
- [조정 제어 루프 (Reconciliation Control Loop)](/knowledge/kubernetes/reconciliation-control-loop/) - 기존 Pod를 업데이트하지 않는 이유와 관련
