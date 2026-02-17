---
title: "Job Failure Handling"
description: "Job의 실패 처리는 Pod 수준(restartPolicy에 의한 컨테이너 재시작)과 Job 수준(Job 컨트롤러에 의한 새 Pod 생성)의 두 단계로 이루어지며, `backoffLimit`과 `activeDeadlineSeconds`로 무한 실패를 방지한다"
tags: ['Job', 'Failure Handling', 'Backoff Limit', 'Restart Policy', 'Kubernetes']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/kubernetes/job-failure-handling
sidebar:
  order: 32
---

## 핵심 개념

**Pod 수준 실패 처리 (restartPolicy: OnFailure)**:
- 컨테이너가 실패하면 Kubelet이 동일 Pod 내에서 컨테이너를 재시작
- 동일 노드에서 재시작하므로 빠른 복구 가능
- 지수 백오프(exponential backoff) 지연이 적용됨

**Job 수준 실패 처리 (restartPolicy: Never)**:
- 컨테이너 실패 시 전체 Pod가 Failed로 표시
- Job 컨트롤러가 새 Pod를 생성 (다른 노드에 스케줄 가능)
- 이미지 다시 다운로드가 필요할 수 있어 느릴 수 있음
- 실패한 Pod는 Error 상태로 보존됨 (로그 확인 가능)

**backoffLimit** (기본값 6):
- Job이 실패할 수 있는 최대 횟수
- 초과하면 Job 컨트롤러가 실행 중인 Pod를 모두 삭제하고 Job을 Failed로 표시
- `BackoffLimitExceeded` 이벤트가 생성됨
- 실패한 Job을 재시작하려면 삭제 후 재생성해야 함

**activeDeadlineSeconds**:
- Job 전체의 시간 제한 (개별 Pod가 아닌 Job 전체에 적용)
- 시간 초과 시 `DeadlineExceeded` 이벤트 생성
- backoffLimit보다 우선적으로 적용됨

## 예시

```yaml
apiVersion: batch/v1
kind: Job
metadata:
  name: demo-deadline
spec:
  completions: 2
  parallelism: 1
  backoffLimit: 3              # 최대 3번 실패 허용
  activeDeadlineSeconds: 90    # 90초 시간 제한
  template:
    spec:
      restartPolicy: Never     # Job 수준에서 실패 처리
      containers:
      - name: demo
        image: busybox
        command:
        - sleep
        - "60"
```

실패한 Job 확인:
```bash
kubectl describe job demo-always-fails
# Events:
#   Warning  BackoffLimitExceeded  job-controller  Job has reached the specified backoff limit

kubectl get job demo-always-fails -o yaml
# status:
#   conditions:
#   - type: Failed
#     status: "True"
#     reason: BackoffLimitExceeded
```

restartPolicy에 따른 Pod 상태 차이:
```bash
# OnFailure: 동일 Pod 내 재시작 (RESTARTS 수 증가)
# generate-responses-7kqw4  Completed  RESTARTS: 3

# Never: 새 Pod 생성 (Error Pod 보존)
# generate-responses-2dbrn  Error      RESTARTS: 0
# generate-responses-8c8wz  Completed  RESTARTS: 0
```

## 관련 개념

- [Job](/knowledge/kubernetes/job/) - 실패 처리가 적용되는 오브젝트
- [Pod Lifecycle](/knowledge/kubernetes/pod-lifecycle/) - restartPolicy의 역할
- [Liveness Probe](/knowledge/kubernetes/liveness-probe/) - 컨테이너 수준의 건강 확인
- [Job Completions and Parallelism](/knowledge/kubernetes/job-completions-and-parallelism/) - 실패가 completions에 미치는 영향
