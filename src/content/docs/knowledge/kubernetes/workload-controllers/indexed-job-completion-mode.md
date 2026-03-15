---
title: "인덱스드 잡 완료 모드 (Indexed Job Completion Mode)"
description: "Indexed completion mode는 Job의 각 Pod에 고유한 완료 인덱스(0부터 시작)를 부여하여 각 Pod가 서로 다른 작업을 수행할 수 있게 하는 Job 모드로, `JOB_COMPLETION_INDEX` 환경 변수와 Pod 어노테이션을 통해 인덱스..."
tags: ['Job', 'Indexed', 'Completion Mode', 'Parameterization', 'Kubernetes']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/kubernetes/indexed-job-completion-mode
sidebar:
  order: 33
---

## 핵심 개념

두 가지 completion mode:
- **NonIndexed** (기본값): 모든 Pod가 동일한 작업 수행. 서로 구분 불가.
- **Indexed**: 각 Pod에 고유 인덱스 부여. 인덱스별로 다른 작업 수행 가능.

Indexed 모드의 특징:
- Pod 이름에 인덱스 포함: `{job-name}-{index}-{random}`
- Pod hostname에도 인덱스 포함: `{job-name}-{index}`
- `JOB_COMPLETION_INDEX` 환경 변수가 자동 설정됨
- `batch.kubernetes.io/job-completion-index` 어노테이션도 설정됨
- 특정 인덱스의 Pod가 실패하면 동일 인덱스의 새 Pod가 생성됨
- Job은 각 인덱스에 대해 하나의 성공적 완료가 있어야 완료됨

고급 활용: 인덱스가 단순 정수이지만, init 컨테이너를 사용하여 복잡한 입력 데이터로 변환 가능. 예를 들어 init 컨테이너가 인덱스를 기반으로 네트워크 볼륨의 특정 파일에 대한 심볼릭 링크를 생성하고, 메인 컨테이너는 해당 파일을 처리하는 방식.

NonIndexed 모드에서 파라미터화하려면 각 값마다 별도의 Job을 생성해야 하지만, Indexed 모드에서는 단일 Job으로 처리 가능.

## 예시

```yaml
apiVersion: batch/v1
kind: Job
metadata:
  name: aggregate-responses-2021
spec:
  completionMode: Indexed
  completions: 12         # 12개 인덱스 (0-11)
  parallelism: 3
  template:
    spec:
      restartPolicy: OnFailure
      containers:
      - name: updater
        image: mongo:5
        env:
        - name: YEAR
          value: "2021"
        # JOB_COMPLETION_INDEX는 자동으로 설정됨
```

스크립트에서 인덱스 사용:
```javascript
var year = parseInt(process.env["YEAR"]);
var month = parseInt(process.env["JOB_COMPLETION_INDEX"]) + 1;
// month = 인덱스 + 1 (0-based → 1-based)
```

Downward API로 인덱스를 다른 환경 변수로 전달:
```yaml
env:
- name: MONTH
  valueFrom:
    fieldRef:
      fieldPath: metadata.annotations['batch.kubernetes.io/job-completion-index']
```

```bash
kubectl get pods -l job-name=aggregate-responses-2021
# aggregate-responses-2021-0-kptfr   Running   (인덱스 0)
# aggregate-responses-2021-1-r4vfq   Running   (인덱스 1)
# aggregate-responses-2021-2-snz4m   Running   (인덱스 2)
```

## 관련 개념

- [잡 (Job)](/knowledge/kubernetes/job/) - Indexed mode가 설정되는 오브젝트
- [잡 완료 횟수와 병렬성 (Job Completions and Parallelism)](/knowledge/kubernetes/job-completions-and-parallelism/) - completions가 인덱스 범위 결정
- [초기화 컨테이너 (Init Container)](/knowledge/kubernetes/init-container/) - 인덱스를 복잡한 입력으로 변환하는 데 사용
- [Downward API](/knowledge/kubernetes/downward-api/) - 어노테이션의 인덱스 값을 환경 변수로 전달
- [컨피그맵 (ConfigMap)](/knowledge/kubernetes/configmap/) - 스크립트를 Pod에 주입하는 데 사용
