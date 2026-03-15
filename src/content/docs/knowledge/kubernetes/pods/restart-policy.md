---
title: "재시작 정책 (Restart Policy)"
description: "Restart Policy는 Pod 수준에서 설정되는 컨테이너 재시작 정책으로, 컨테이너가 종료될 때 자동으로 재시작할지 여부와 조건을 결정한다"
tags: ['Kubernetes', 'Pod', 'Restart', 'Container', 'Lifecycle', 'Resilience']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/kubernetes/restart-policy
sidebar:
  order: 13
---

## 핵심 개념

Kubernetes는 컨테이너의 메인 프로세스가 종료되면 자동으로 컨테이너를 재시작할 수 있다. 이 동작은 Pod의 `spec.restartPolicy` 필드로 제어된다.

| 정책 | 설명 |
|------|------|
| **Always** | 프로세스의 종료 코드와 관계없이 항상 재시작. **기본값** |
| **OnFailure** | 프로세스가 비정상 종료(0이 아닌 종료 코드)한 경우에만 재시작 |
| **Never** | 실패하더라도 재시작하지 않음 |

중요한 특징:
- 재시작 정책은 Pod 수준에서 설정되며, 개별 컨테이너별로 설정할 수 없다
- "재시작"이라고 표현하지만 실제로는 기존 컨테이너를 폐기하고 새 컨테이너를 생성하는 것이다
- 컨테이너의 파일 시스템에 기록된 데이터는 재시작 시 손실된다 (볼륨 사용으로 보존 가능)

**Exponential Back-off (지수적 백오프):**
컨테이너가 반복적으로 종료되면 재시작 사이에 점점 증가하는 대기 시간이 삽입된다:
- 첫 번째 재시작: 즉시
- 두 번째: 10초 대기
- 이후: 20초, 40초, 80초, 160초로 두 배씩 증가
- 최대 대기 시간: 5분
- 컨테이너가 10분 이상 정상 실행되면 대기 시간이 0으로 리셋

대기 중인 컨테이너의 상태는 `CrashLoopBackOff`로 표시된다.

## 예시

Pod에 재시작 정책 설정:

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: my-pod
spec:
  restartPolicy: OnFailure    # 실패 시에만 재시작
  containers:
  - name: my-container
    image: my-image:1.0
```

CrashLoopBackOff 상태 확인:

```bash
kubectl get po kiada-ssl -o json | jq .status.containerStatuses
# "state": {
#   "waiting": {
#     "message": "back-off 40s restarting failed container=envoy ...",
#     "reason": "CrashLoopBackOff"
#   }
# }
```

종료 코드 해석:
- `0`: 정상 종료
- `137` (128+9): KILL 시그널에 의한 강제 종료
- `143` (128+15): TERM 시그널에 의한 종료

## 관련 개념

- [파드 (Pod)](/knowledge/kubernetes/pod/) - 재시작 정책이 설정되는 리소스
- [라이브니스 프로브 (Liveness Probe)](/knowledge/kubernetes/liveness-probe/) - 프로브 실패 시 재시작 정책에 따라 동작
- [스타트업 프로브 (Startup Probe)](/knowledge/kubernetes/startup-probe/) - 시작 프로브 실패도 재시작 정책의 영향을 받음
- [종료 유예 기간 (Termination Grace Period)](/knowledge/kubernetes/termination-grace-period/) - 재시작 전 컨테이너 종료 과정
- [잡 (Job)](/knowledge/kubernetes/job/) - OnFailure/Never 정책을 주로 사용하는 워크로드
