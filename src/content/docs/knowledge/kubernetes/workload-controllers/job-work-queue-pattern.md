---
title: "잡 워크 큐 패턴 (Job Work Queue Pattern)"
description: "Job Work Queue 패턴은 외부 큐에서 작업 항목을 가져와 처리하는 방식으로, 정적으로 할당된 작업 대신 동적으로 작업을 분배하며, Coarse(각 Pod가 하나의 항목 처리)와 Fine(각 Pod가 여러 항목 처리) 두 가지 접근 방식이 있다"
tags: ['Job', 'Work Queue', 'Parallel Processing', 'Pattern', 'Kubernetes']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/kubernetes/job-work-queue-pattern
sidebar:
  order: 34
---

## 핵심 개념

Kubernetes 자체는 큐를 제공하지 않는다. 큐와 큐에서 항목을 가져오는 로직은 컨테이너 내부에서 구현해야 한다.

**Coarse 병렬 처리**:
- 각 Pod가 큐에서 하나의 항목을 가져와 처리 후 종료
- `completions` 설정: 처리할 항목 수
- 항목당 하나의 Pod → 오버헤드가 크지만 단순
- `parallelism`으로 동시 처리 Pod 수 제어

**Fine 병렬 처리**:
- 각 Pod가 큐가 빈 될 때까지 여러 항목을 반복 처리
- `completions` 미설정: 하나의 Pod가 성공하면 Job 완료
- `parallelism`으로 동시 처리 Pod 수 제어
- Pod가 적지만 각 Pod가 더 오래 실행
- 한 Pod가 마지막 항목 처리 후 종료해도 다른 Pod는 현재 작업을 완료할 수 있음

Fine 처리에서 중요한 점: completions를 설정하지 않으면 하나의 Pod만 성공적으로 완료하면 Job이 완료된다. 이는 Pod가 큐가 비었음을 발견하고 성공적으로 종료하기 때문이다. 다른 Pod도 자연스럽게 종료된다.

완료된 Job은 큐에 새로 추가된 항목을 처리하지 않는다. 지속적인 큐 모니터링이 필요하면 Deployment를 사용하거나, 정기적 실행이 필요하면 CronJob을 사용한다.

## 예시

Coarse 처리 (항목당 1 Pod):
```yaml
apiVersion: batch/v1
kind: Job
metadata:
  name: aggregate-responses-queue-coarse
spec:
  completions: 6     # 6개 항목 처리
  parallelism: 3     # 3개 동시 실행
  template:
    spec:
      restartPolicy: OnFailure
      containers:
      - name: processor
        image: mongo:5
        command: [...]   # 큐에서 1개 가져와 처리 후 종료
```

Fine 처리 (Pod당 여러 항목):
```yaml
apiVersion: batch/v1
kind: Job
metadata:
  name: aggregate-responses-queue-fine
spec:
  # completions 미설정 → 1개 Pod 성공 시 Job 완료
  parallelism: 3
  template:
    spec:
      restartPolicy: OnFailure
      containers:
      - name: processor
        image: mongo:5
        command: [...]   # 큐가 빌 때까지 반복 처리
```

Fine 처리 스크립트 패턴:
```javascript
while (true) {
    var workItem = db.monthsToProcess.findOneAndDelete({});
    if (workItem == null) {
        print("No work item found. Processing is complete.");
        quit(0);    // 성공 종료 → Job 완료
    }
    // 항목 처리...
}
```

## 관련 개념

- [잡 (Job)](/knowledge/kubernetes/job/) - 워크 큐 패턴의 기반 오브젝트
- [잡 완료 횟수와 병렬성 (Job Completions and Parallelism)](/knowledge/kubernetes/job-completions-and-parallelism/) - Coarse vs Fine의 completions 차이
- [크론잡 (CronJob)](/knowledge/kubernetes/cronjob/) - 정기적 큐 처리를 위한 대안
- [디플로이먼트 (Deployment)](/knowledge/kubernetes/deployment/) - 지속적 큐 처리를 위한 대안
