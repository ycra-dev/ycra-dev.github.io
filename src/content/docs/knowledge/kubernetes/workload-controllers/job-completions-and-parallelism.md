---
title: "Job Completions and Parallelism"
description: "Job의 `completions`와 `parallelism` 필드는 작업이 몇 번 완료되어야 하는지, 그리고 동시에 몇 개의 Pod를 실행할 수 있는지를 제어하며, 이 두 필드의 조합으로 순차 실행, 병렬 실행, 워크 큐 처리 등 다양한 패턴을 구현할 수 있다"
tags: ['Job', 'Parallelism', 'Completions', 'Batch Processing', 'Kubernetes']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/kubernetes/job-completions-and-parallelism
sidebar:
  order: 31
---

## 핵심 개념

completions와 parallelism의 주요 조합:

| completions | parallelism | 동작 |
|------------|-------------|------|
| 미설정 | 미설정 | 단일 Pod 실행 (기본값 둘 다 1) |
| 5 | 미설정 | 5개 Pod를 하나씩 순차 실행 |
| 5 | 2 | 최대 2개를 동시 실행하며 총 5번 완료 |
| 5 | 5 | 5개 Pod 동시 실행, 모두 완료 시 Job 완료 |
| 미설정 | 5 | 5개 Pod 동시 실행, **1개만** 성공하면 Job 완료 |
| 2 | 5 | 2개만 생성 (completions < parallelism이면 completions만큼) |

completions만 설정하고 parallelism을 미설정하면 순차 실행된다. parallelism만 설정하면 워크 큐 패턴에 해당하며, 하나의 Pod만 성공하면 Job이 완료된다.

completions=5, parallelism=2인 경우의 실행 흐름:
1. 2개 Pod 동시 시작
2. 하나가 완료되면 즉시 새 Pod 생성 (항상 2개 유지)
3. 5개 Pod가 성공적으로 완료될 때까지 반복

parallelism이 completions보다 크면 completions 수만큼만 Pod를 생성한다.

## 예시

```yaml
apiVersion: batch/v1
kind: Job
metadata:
  name: generate-responses
spec:
  completions: 5     # 5번 완료 필요
  parallelism: 2     # 최대 2개 동시 실행
  template:
    spec:
      restartPolicy: OnFailure
      containers:
      - name: mongo
        image: mongo:5
        command: [...]
```

```bash
# 진행 상태 확인
kubectl get job generate-responses
# NAME                 COMPLETIONS   DURATION   AGE
# generate-responses   3/5           60s        60s

# Pod 상태 확인 - 최대 2개가 Running
kubectl get po -l job-name=generate-responses
# generate-responses-7kqw4   Running
# generate-responses-98mh8   Completed
# generate-responses-tbgns   Running
```

## 관련 개념

- [Job](/knowledge/kubernetes/job/) - completions와 parallelism이 설정되는 오브젝트
- [Job Failure Handling](/knowledge/kubernetes/job-failure-handling/) - 실패한 Pod가 completions 수에 미치는 영향
- [Indexed Job Completion Mode](/knowledge/kubernetes/indexed-job-completion-mode/) - Pod별 고유 인덱스를 제공하는 모드
