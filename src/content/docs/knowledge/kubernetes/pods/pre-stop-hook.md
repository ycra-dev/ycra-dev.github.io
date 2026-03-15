---
title: "Pre-Stop 훅 (Pre-Stop Hook)"
description: "Pre-Stop Hook은 컨테이너가 종료되기 직전에 실행되는 생명 주기 훅으로, 애플리케이션의 정상적인(graceful) 종료 절차를 수행하거나 추가적인 정리 작업을 실행한다"
tags: ['Kubernetes', 'Lifecycle', 'Hook', 'Container', 'Graceful Shutdown']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/kubernetes/pre-stop-hook
sidebar:
  order: 15
---

## 핵심 개념

컨테이너가 종료될 때의 전체 순서:
1. Pre-Stop Hook 실행 (정의된 경우)
2. Hook 완료 후 (또는 Hook이 없으면) 메인 프로세스에 TERM 시그널 전송
3. `terminationGracePeriodSeconds` 이내에 프로세스가 종료되지 않으면 KILL 시그널로 강제 종료

**주요 특성:**
- Post-Start Hook과 동일하게 `exec` 또는 `httpGet` 유형을 지원 (`tcpSocket`은 미지원)
- Hook의 실행 실패나 비정상 종료 코드와 관계없이 컨테이너는 종료된다
- 실패 시 `FailedPreStopHook` 경고 이벤트가 생성된다
- Pre-Stop Hook은 종료 유예 시간(grace period) 타이머가 시작된 후에 실행된다
- Hook 실행 시간도 유예 시간에 포함된다
- 컨테이너 내 프로세스가 스스로 종료한 경우에는 호출되지 않는다

**중요 주의사항:**
- Pre-Stop Hook은 컨테이너 수준의 이벤트이며 Pod 수준이 아니다
- Pod 종료 시뿐만 아니라 Liveness Probe 실패 등으로 컨테이너가 재시작될 때도 실행된다
- Pod 전체 종료 시에만 필요한 작업에는 적합하지 않다

**TERM 시그널이 애플리케이션에 도달하지 않는 문제:**
Dockerfile에서 shell form의 ENTRYPOINT를 사용하면 셸이 root process가 되어 TERM 시그널을 자식 프로세스에 전달하지 않는다. 이 경우 Pre-Stop Hook 대신 exec form의 ENTRYPOINT를 사용하는 것이 올바른 해결책이다.

## 예시

Nginx의 graceful shutdown을 위한 Pre-Stop Hook:

```yaml
lifecycle:
  preStop:
    exec:
      command:
      - nginx
      - -s
      - quit
```

종료 유예 시간 설정과 함께 사용:

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: kiada-ssl-shortgraceperiod
spec:
  terminationGracePeriodSeconds: 5    # 종료 유예 시간
  containers:
  - name: kiada
    image: luksa/kiada:0.3
    lifecycle:
      preStop:
        exec:
          command: ["sh", "-c", "sleep 2"]
```

Node.js 애플리케이션에서 TERM 시그널 처리 (코드 수준):

```javascript
process.on('SIGTERM', function () {
  console.log("Received SIGTERM. Server shutting down...");
  server.close(function () {
    process.exit(0);
  });
});
```

## 관련 개념

- [Post-Start 훅 (Post-Start Hook)](/knowledge/kubernetes/post-start-hook/) - 컨테이너 시작 시 실행되는 생명 주기 훅
- [종료 유예 기간 (Termination Grace Period)](/knowledge/kubernetes/termination-grace-period/) - Pre-Stop Hook 실행 시간을 포함하는 종료 유예 시간
- [라이브니스 프로브 (Liveness Probe)](/knowledge/kubernetes/liveness-probe/) - 프로브 실패로 인한 컨테이너 종료 시에도 Pre-Stop Hook이 실행됨
- [재시작 정책 (Restart Policy)](/knowledge/kubernetes/restart-policy/) - 종료 후 재시작 여부를 결정
- [파드 (Pod)](/knowledge/kubernetes/pod/) - 훅이 속하는 리소스
