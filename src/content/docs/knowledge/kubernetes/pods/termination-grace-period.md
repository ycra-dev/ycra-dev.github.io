---
title: "종료 유예 기간 (Termination Grace Period)"
description: "Termination Grace Period는 컨테이너가 자발적으로 종료할 수 있도록 주어지는 유예 시간으로, 이 시간이 경과하면 프로세스가 KILL 시그널로 강제 종료된다"
tags: ['Kubernetes', 'Pod', 'Termination', 'Graceful Shutdown', 'Lifecycle']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/kubernetes/termination-grace-period
sidebar:
  order: 16
---

## 핵심 개념

Kubernetes에서 컨테이너 종료는 정해진 시퀀스를 따른다:

**컨테이너 단위 종료 (Liveness Probe 실패 등):**
1. Pre-Stop Hook 실행 (정의된 경우)
2. TERM 시그널 전송
3. `terminationGracePeriodSeconds`만큼 대기
4. 대기 시간 초과 시 KILL 시그널로 강제 종료

**Pod 삭제 시 (Deletion Grace Period):**
- Pod 삭제 시에는 `metadata.deletionGracePeriodSeconds`가 사용된다
- 기본적으로 `spec.terminationGracePeriodSeconds`의 값이 사용되지만, `kubectl delete --grace-period` 옵션으로 재정의 가능
- Pod의 모든 컨테이너가 병렬로 종료된다
- 각 컨테이너의 Pre-Stop Hook이 동시에 호출된다

**중요 사항:**
- 타이머는 Pre-Stop Hook이 호출될 때 시작된다 (Hook이 없으면 TERM 시그널 전송 시)
- Pre-Stop Hook의 실행 시간도 유예 시간에 포함된다
- `--grace-period 0`으로 삭제하면 Pre-Stop Hook이 실행되지 않는다
- Pod가 30초 이상 종료에 걸린다면 컨테이너 중 하나가 TERM 시그널을 처리하지 않는 것이 원인일 수 있다

**일반적인 해결 방법:**
- 유예 시간을 줄이는 것보다 애플리케이션에 TERM 시그널 핸들러를 추가하는 것이 올바른 방법
- 애플리케이션이 정상적으로 종료하는 데 오래 걸리면 유예 시간을 늘려야 한다

## 예시

Pod 매니페스트에서 종료 유예 시간 설정:

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: kiada-ssl-shortgraceperiod
spec:
  terminationGracePeriodSeconds: 5    # 기본 30초에서 5초로 변경
  containers:
  - name: kiada
    image: luksa/kiada:0.3
```

삭제 시 유예 시간 재정의:

```bash
# 10초의 유예 시간으로 삭제
kubectl delete po kiada-ssl --grace-period 10

# 즉시 삭제 (Pre-Stop Hook 실행 안 됨)
kubectl delete po kiada-ssl --grace-period 0
```

삭제를 기다리지 않고 진행:

```bash
kubectl delete po kiada --wait=false
```

## 관련 개념

- [Pre-Stop 훅 (Pre-Stop Hook)](/knowledge/kubernetes/pre-stop-hook/) - 유예 시간 내에 실행되는 종료 전 훅
- [재시작 정책 (Restart Policy)](/knowledge/kubernetes/restart-policy/) - 종료 후 컨테이너 재시작 여부를 결정
- [파드 페이즈 (Pod Phase)](/knowledge/kubernetes/pod-phase/) - 종료 중 Pod는 Terminating 상태를 표시
- [파드 (Pod)](/knowledge/kubernetes/pod/) - 유예 시간이 설정되는 리소스
- [Kubelet](/knowledge/kubernetes/kubelet/) - 실제 컨테이너 종료를 수행하는 에이전트
