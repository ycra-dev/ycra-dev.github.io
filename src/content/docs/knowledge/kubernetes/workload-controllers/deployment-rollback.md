---
title: "디플로이먼트 롤백 (Deployment Rollback)"
description: "Deployment 롤백은 결함이 있는 버전의 배포를 이전 버전으로 되돌리는 기능으로, Deployment의 리비전 히스토리(이전 ReplicaSet들)를 활용하여 특정 리비전으로 복원할 수 있다"
tags: ['Deployment', 'Rollback', 'Revision History', 'Kubernetes']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/kubernetes/deployment-rollback
sidebar:
  order: 12
---

## 핵심 개념

Deployment의 리비전 히스토리는 Deployment 오브젝트 자체가 아닌, 연관된 ReplicaSet들에 저장된다. 각 ReplicaSet이 하나의 리비전을 나타내며, 이것이 업데이트 후 이전 ReplicaSet을 삭제하지 않는 이유이다. `revisionHistoryLimit` 필드(기본값 10)로 보존할 ReplicaSet 수를 제한한다.

`kubectl rollout undo`는 Pod 템플릿만 되돌리고, 업데이트 전략이나 replicas 수 등 다른 변경사항은 유지한다. 반면 `kubectl apply`로 이전 매니페스트를 적용하면 모든 변경사항이 덮어씌워진다.

rollingUpdate 중에도 undo 명령을 실행하여 진행 중인 롤아웃을 취소할 수 있다. Deployment가 pause 상태이면 resume 후에야 undo가 동작한다.

결함 버전 감지를 위해 `progressDeadlineSeconds` (기본값 600초)를 설정하면, 롤아웃이 지정 시간 내에 진행되지 않을 경우 `ProgressDeadlineExceeded` 상태 조건이 설정된다. 단, Kubernetes는 이 경우에도 롤아웃을 자동으로 중단하지 않는다.

## 예시

```bash
# 이전 버전으로 롤백
kubectl rollout undo deployment kiada

# 리비전 히스토리 확인
kubectl rollout history deploy kiada

# 특정 리비전 상세 정보
kubectl rollout history deploy kiada --revision 2

# 특정 리비전으로 롤백
kubectl rollout undo deployment kiada --to-revision=1

# Pod 재시작 (동일 템플릿으로 재생성)
kubectl rollout restart deployment kiada
```

ReplicaSet의 리비전 번호 확인:
```bash
kubectl get rs -o wide  # 이미지 태그로 버전 구분
# ReplicaSet의 annotations에서 리비전 번호 확인
```

## 관련 개념

- [디플로이먼트 (Deployment)](/knowledge/kubernetes/deployment/) - 롤백 대상 오브젝트
- [레플리카셋 (ReplicaSet)](/knowledge/kubernetes/replicaset/) - 리비전 히스토리를 저장하는 오브젝트
- [레디니스 프로브 (Readiness Probe)](/knowledge/kubernetes/readiness-probe/) - 결함 있는 Pod 감지에 사용
