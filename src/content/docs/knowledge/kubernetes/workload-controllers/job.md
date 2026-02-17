---
title: "Job"
description: "Job은 유한(finite) 작업을 실행하기 위한 Kubernetes API 오브젝트로, 하나 이상의 Pod를 생성하여 작업을 완료까지 실행하며, Pod가 성공적으로 종료되면 Job이 완료된 것으로 간주한다"
tags: ['Job', 'Finite Workload', 'Batch', 'Kubernetes']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/kubernetes/job
sidebar:
  order: 30
---

## 핵심 개념

Job은 `batch/v1` API 그룹에 속한다. Pod 템플릿의 `restartPolicy`는 반드시 `OnFailure` 또는 `Never`로 설정해야 한다 (`Always`는 허용되지 않음).

Job의 주요 필드:
- **completions**: 성공적으로 완료해야 하는 Pod 수 (기본값 1)
- **parallelism**: 동시에 실행할 수 있는 Pod 수 (기본값 1)
- **backoffLimit**: 실패 허용 횟수 (기본값 6, 초과 시 Job 실패)
- **activeDeadlineSeconds**: Job 전체의 시간 제한
- **ttlSecondsAfterFinished**: 완료 후 자동 삭제까지의 시간
- **suspend**: true로 설정하면 Job이 일시 중단됨

Job 컨트롤러는 Pod에 `job-name`과 `controller-uid` 레이블을 자동으로 추가한다. `job-name` 레이블로 Job의 Pod를 쉽게 조회할 수 있다.

Job과 Pod 직접 생성의 차이: Pod를 직접 생성하면 노드 장애나 실수로 삭제된 경우 자동 재생성되지 않지만, Job을 통해 생성하면 자동으로 처리된다.

완료된 Job의 Pod는 삭제되지 않으므로 로그를 확인할 수 있다. Job을 삭제하면 Pod도 함께 삭제된다.

## 예시

기본 Job 매니페스트:
```yaml
apiVersion: batch/v1
kind: Job
metadata:
  name: quiz-init
spec:
  template:
    metadata:
      labels:
        app: quiz
        task: init
    spec:
      restartPolicy: OnFailure
      initContainers:
      - name: init
        image: mongo:5
        command: [...]
      containers:
      - name: import
        image: mongo:5
        command:
        - mongoimport
        - mongodb+srv://quiz-pods.kiada.svc.cluster.local/kiada
```

```bash
kubectl get jobs                     # Job 상태 확인
kubectl get pods -l job-name=quiz-init  # Job의 Pod 조회
kubectl logs job/quiz-init --all-containers --prefix  # 로그 확인
kubectl delete job quiz-init         # Job과 Pod 삭제
```

Job 일시 중단/재개:
```bash
kubectl patch job demo-suspend -p '{"spec":{"suspend": false}}'
kubectl patch job demo-suspend -p '{"spec":{"suspend": true}}'
```

## 관련 개념

- [CronJob](/knowledge/kubernetes/cronjob/) - Job을 스케줄에 따라 실행하는 래퍼 오브젝트
- [Job Completions and Parallelism](/knowledge/kubernetes/job-completions-and-parallelism/) - 병렬 실행과 다중 완료 설정
- [Job Failure Handling](/knowledge/kubernetes/job-failure-handling/) - 실패 처리 메커니즘
- [Pod Lifecycle](/knowledge/kubernetes/pod-lifecycle/) - Job Pod의 특수한 생명주기
- [Init Container](/knowledge/kubernetes/init-container/) - Job Pod에서 초기화 작업에 사용
