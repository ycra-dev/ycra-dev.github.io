---
title: "CronJob"
description: "CronJob은 crontab 형식의 스케줄에 따라 Job을 주기적으로 생성하는 Kubernetes API 오브젝트로, 특정 시간이나 정기적인 간격으로 유한 작업을 자동 실행할 수 있게 한다"
tags: ['Cronjob', 'Scheduling', 'Cron', 'Periodic Job', 'Kubernetes']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/kubernetes/cronjob
sidebar:
  order: 36
---

## 핵심 개념

CronJob은 Job을 감싸는 래퍼(wrapper)이다. CronJob의 spec에는 두 가지 핵심 요소가 있다:
- **schedule**: crontab 형식의 스케줄 (분, 시, 일, 월, 요일)
- **jobTemplate**: Job 매니페스트 템플릿

crontab 형식: `분 시 일 월 요일`
- `* * * * *`: 매분
- `0 3 * * *`: 매일 3시
- `*/5 18 * * *`: 18시에 5분마다
- `0 0 * * 1-5`: 평일 자정
- 특수 값: `@hourly`, `@daily`, `@weekly`, `@monthly`, `@yearly`

주요 설정:
- **concurrencyPolicy**: 동시 Job 실행 제어 (Allow, Forbid, Replace)
- **startingDeadlineSeconds**: 스케줄 실행 지연 허용 시간
- **successfulJobsHistoryLimit**: 보존할 성공 Job 수 (기본 3)
- **failedJobsHistoryLimit**: 보존할 실패 Job 수 (기본 1)
- **suspend**: true면 스케줄 실행 중단
- **timeZone**: 스케줄에 사용할 시간대

CronJob 컨트롤러가 Job을 생성하면, Job 컨트롤러가 Pod를 생성한다. CronJob은 Job에 자동 레이블을 추가하지 않으므로, Pod/Job 조회를 위해 Job 템플릿에 직접 레이블을 추가해야 한다.

주의: Day of month와 Day of week 필드는 OR 조건으로 결합된다. `* * 13 * 5`는 "13일이면서 금요일"이 아니라 "13일 또는 금요일"에 실행된다.

## 예시

```yaml
apiVersion: batch/v1
kind: CronJob
metadata:
  name: aggregate-responses-every-minute
spec:
  schedule: "* * * * *"       # 매분 실행
  timeZone: CET               # 시간대 설정
  concurrencyPolicy: Forbid   # 이전 Job 실행 중이면 건너뜀
  successfulJobsHistoryLimit: 3
  failedJobsHistoryLimit: 1
  jobTemplate:
    metadata:
      labels:
        app: aggregate-responses-today
    spec:
      template:
        metadata:
          labels:
            app: aggregate-responses-today
        spec:
          restartPolicy: OnFailure
          containers:
          - name: updater
            image: mongo:5
            command: [...]
```

```bash
kubectl get cj                           # CronJob 목록
kubectl get cj -o wide                   # 컨테이너/이미지 정보 포함
kubectl get jobs -l app=aggregate-responses-today  # 생성된 Job 확인
kubectl get pods -l app=aggregate-responses-today  # 생성된 Pod 확인
```

CronJob 상태:
```bash
kubectl get cj aggregate-responses-every-minute -o yaml
# status:
#   active: [...]                    # 현재 실행 중인 Job
#   lastScheduleTime: "..."         # 마지막 스케줄 시각
#   lastSuccessfulTime: "..."       # 마지막 성공 시각
```

CronJob 일시 중단/재개:
```bash
kubectl patch cj my-cronjob -p '{"spec":{"suspend": true}}'
kubectl patch cj my-cronjob -p '{"spec":{"suspend": false}}'
```

## 관련 개념

- [Job](/knowledge/kubernetes/job/) - CronJob이 생성하는 오브젝트
- [Job Completions and Parallelism](/knowledge/kubernetes/job-completions-and-parallelism/) - 생성되는 Job의 설정
- [Controller](/knowledge/kubernetes/controller/) - CronJob 컨트롤러의 스케줄 관리
- [Reconciliation Control Loop](/knowledge/kubernetes/reconciliation-control-loop/) - CronJob 컨트롤러의 동작 원리
