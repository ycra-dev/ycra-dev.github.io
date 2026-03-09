---
title: "Liveness Probe"
description: "Liveness Probe는 컨테이너 내 애플리케이션이 정상적으로 동작하고 있는지 주기적으로 확인하는 메커니즘으로, 프로브가 실패하면 컨테이너를 비정상으로 판단하여 재시작한다"
tags: ['Kubernetes', 'Health Check', 'Liveness', 'Probe', 'Container', 'Resilience']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/kubernetes/liveness-probe
sidebar:
  order: 10
---

## 핵심 개념

애플리케이션이 종료되지 않고도 응답 불능 상태(무한 루프, 데드락, 메모리 누수 등)에 빠질 수 있다. Liveness Probe는 이러한 상황을 외부에서 감지하여 자동으로 컨테이너를 재시작하는 자가 치유(self-healing) 기능을 제공한다.

**세 가지 프로브 유형:**
1. **HTTP GET**: 지정된 경로와 포트로 HTTP GET 요청을 보내고, 2xx/3xx 응답을 성공으로 판단
2. **TCP Socket**: 지정된 포트에 TCP 연결을 시도하고, 연결 성공 여부로 판단
3. **Exec**: 컨테이너 내부에서 명령을 실행하고, 종료 코드 0이면 성공으로 판단

**주요 설정 파라미터:**
- `initialDelaySeconds`: 컨테이너 시작 후 첫 프로브까지의 대기 시간 (기본값: 0)
- `periodSeconds`: 프로브 실행 간격 (기본값: 10)
- `timeoutSeconds`: 프로브 응답 대기 시간 (기본값: 1)
- `failureThreshold`: 비정상으로 판단하기 위한 연속 실패 횟수 (기본값: 3)

**효과적인 Liveness Probe 작성 지침:**
- 모든 Pod에 liveness probe를 정의해야 한다
- 프로브 핸들러는 가볍게 유지해야 한다 (리소스 사용이 컨테이너 제한에 포함됨)
- 외부 서비스 의존성을 확인하지 말아야 한다 (연쇄 장애 위험)
- 핸들러 내에 재시도 로직을 구현하지 말고 `failureThreshold`를 사용해야 한다
- 인증이 필요하지 않은 엔드포인트를 사용해야 한다

## 예시

HTTP GET Liveness Probe 정의:

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: kiada-liveness
spec:
  containers:
  - name: kiada
    image: luksa/kiada:0.1
    ports:
    - name: http
      containerPort: 8080
    livenessProbe:
      httpGet:
        path: /
        port: 8080
  - name: envoy
    image: luksa/kiada-ssl-proxy:0.1
    ports:
    - name: https
      containerPort: 8443
    - name: admin
      containerPort: 9901
    livenessProbe:
      httpGet:
        path: /ready
        port: admin       # 포트 이름으로 참조 가능
      initialDelaySeconds: 10
      periodSeconds: 5
      timeoutSeconds: 2
      failureThreshold: 3
```

TCP Socket Probe:

```yaml
livenessProbe:
  tcpSocket:
    port: 1234
  periodSeconds: 2
  failureThreshold: 1
```

Exec Probe:

```yaml
livenessProbe:
  exec:
    command:
    - /usr/bin/healthcheck
  periodSeconds: 2
  timeoutSeconds: 1
  failureThreshold: 1
```

## 관련 개념

- [Startup Probe](/knowledge/kubernetes/startup-probe/) - 시작이 느린 애플리케이션을 위한 보완적 프로브
- [Restart Policy](/knowledge/kubernetes/restart-policy/) - 프로브 실패 시 컨테이너 재시작 동작을 결정
- [Pod Conditions](/knowledge/kubernetes/pod-conditions/) - 프로브 결과가 반영되는 Pod 상태 조건
- [Container Port](/knowledge/kubernetes/container-port/) - 프로브 대상이 되는 포트 정의
- [Pod](/knowledge/kubernetes/pod/) - 프로브가 정의되는 리소스
