---
title: "Stateful Workload Requirements"
description: "상태 유지 워크로드(stateful workload)는 재시작이나 재배치 시에도 상태를 보존해야 하는 소프트웨어로, 각 복제본에 전용 스토리지와 안정적인 네트워크 주소가 필요하며, Deployment로는 이러한 요구사항을 충족할 수 없다"
tags: ['Stateful', 'Workload', 'Storage', 'Network Identity', 'Kubernetes']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/kubernetes/stateful-workload-requirements
sidebar:
  order: 22
---

## 핵심 개념

상태 유지 워크로드가 필요로 하는 세 가지 핵심 요소:

1. **전용 PersistentVolume**: 각 Pod가 자체 PVC를 가져야 함. Deployment는 모든 Pod가 동일한 PVC를 공유하므로 부적합. ReadWriteMany 지원 스토리지를 사용하면 공유 가능하지만, 대부분의 클라우드 스토리지는 ReadWriteOnce만 지원.

2. **안정적인 네트워크 주소**: 각 복제본이 고유한 주소로 접근 가능해야 함. 분산 시스템(예: MongoDB replica set)에서 멤버 간 통신과 클라이언트 연결에 필요.

3. **Pod 재생성 시 동일성 보장**: 삭제 후 재생성된 Pod가 이전과 동일한 주소와 스토리지를 할당받아야 함.

Deployment로 이를 구현하려면 각 복제본마다 별도의 Deployment, Service, PVC를 생성해야 하므로 매우 복잡해진다. 스케일링 시에도 추가 오브젝트를 수동으로 생성해야 한다.

StatefulSet은 이 세 가지 요구사항을 단일 오브젝트로 해결한다:
- volumeClaimTemplates로 개별 PVC 자동 생성
- Headless Service로 개별 DNS 레코드 자동 생성
- 순서 기반 명명으로 재생성 시 동일성 보장

## 예시

Deployment로 구현 시 복잡한 구조:
```
quiz-0-deployment → quiz-0-service → quiz-0-pvc
quiz-1-deployment → quiz-1-service → quiz-1-pvc
quiz-2-deployment → quiz-2-service → quiz-2-pvc
+ quiz-service (전체 Pod 노출)
```

StatefulSet으로 단순화:
```
quiz StatefulSet → quiz-pods headless Service
  ├─ quiz-0 → db-data-quiz-0 PVC
  ├─ quiz-1 → db-data-quiz-1 PVC
  └─ quiz-2 → db-data-quiz-2 PVC
+ quiz Service (전체 Pod 노출)
```

MongoDB 공유 스토리지 실패 예시:
```bash
kubectl scale deploy quiz --replicas 3
# → 새 Pod에서 오류: "DBPathInUse: Unable to lock the lock file"
# → 동일한 PVC를 여러 Pod가 공유할 수 없음
```

## 관련 개념

- [StatefulSet](/knowledge/kubernetes/statefulset/) - 상태 유지 워크로드를 위한 해결책
- [Deployment](/knowledge/kubernetes/deployment/) - 무상태 워크로드에 적합한 오브젝트
- [PersistentVolumeClaim](/knowledge/kubernetes/persistentvolumeclaim/) - 개별 스토리지 할당에 필요
- [Headless Service for StatefulSet](/knowledge/kubernetes/headless-service-for-statefulset/) - 안정적인 네트워크 정체성 제공
- [PersistentVolume](/knowledge/kubernetes/persistentvolume/) - 실제 스토리지 리소스
