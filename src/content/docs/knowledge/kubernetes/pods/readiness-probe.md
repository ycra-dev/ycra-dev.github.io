---
title: "Readiness Probe"
description: "Readiness Probe는 컨테이너가 트래픽을 수신할 준비가 되었는지 주기적으로 확인하는 메커니즘으로, 실패 시 해당 파드를 서비스 엔드포인트에서 제거하여 준비되지 않은 파드로의 트래픽 전달을 방지한다"
tags: ['Kubernetes', 'Probe', 'Readiness', 'Service', 'Health Check']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/kubernetes/readiness-probe
sidebar:
  order: 11
---

## 핵심 개념

Readiness Probe는 Liveness Probe와 유사하지만 목적이 다르다. Liveness Probe 실패 시 컨테이너가 재시작되지만, Readiness Probe 실패 시 컨테이너는 재시작되지 않고 서비스 엔드포인트에서만 제거된다. 프로브가 다시 성공하면 엔드포인트에 다시 추가된다.

세 가지 프로브 타입을 지원한다: `exec`(명령 실행), `httpGet`(HTTP 요청), `tcpSocket`(TCP 연결). 실행 주기는 `initialDelaySeconds`, `periodSeconds`, `failureThreshold`, `successThreshold`, `timeoutSeconds`로 설정한다. Liveness Probe와 달리 `successThreshold`(연속 성공 횟수)를 1 이상으로 설정할 수 있다.

설계 지침:
- Readiness Probe를 정의하지 않으면 파드 생성 즉시 서비스 엔드포인트가 되어, 애플리케이션 준비 전에 트래픽을 받을 수 있다. 항상 정의하는 것이 권장된다.
- 외부 의존성(다른 서비스)을 체크하면 일시적 네트워크 지연으로 모든 파드가 동시에 제거될 위험이 있다. 내부 의존성만 체크하는 것이 안전하다.
- 파드 삭제 시 Kubernetes가 자동으로 서비스에서 제거하므로, 종료 시나리오에 대한 특별한 처리는 불필요하다.

## 예시

간단한 HTTP 기반 Readiness Probe:

```yaml
readinessProbe:
  httpGet:
    port: 8080
    path: /
    scheme: HTTP
```

전용 헬스체크 엔드포인트 사용:

```yaml
readinessProbe:
  httpGet:
    port: 8080
    path: /healthz/ready
    scheme: HTTP
```

exec 기반 Readiness Probe (파일 존재 확인):

```yaml
readinessProbe:
  exec:
    command:
    - ls
    - /var/ready
  initialDelaySeconds: 10
  periodSeconds: 5
  failureThreshold: 3
  successThreshold: 2
  timeoutSeconds: 2
```

Go 언어로 구현된 전용 readiness 엔드포인트:

```go
func (s *HTTPServer) handleReadiness(res http.ResponseWriter, req *http.Request) {
    conn, err := s.db.Connect()
    if err != nil {
        res.WriteHeader(http.StatusInternalServerError)
        return
    }
    defer conn.Close()
    res.WriteHeader(http.StatusOK)
}
```

## 관련 개념

- [Liveness Probe](/knowledge/kubernetes/liveness-probe/) - 컨테이너 생존 여부 확인 (Readiness와 목적이 다름)
- [Startup Probe](/knowledge/kubernetes/startup-probe/) - 느린 시작 애플리케이션을 위한 프로브
- [Service](/knowledge/kubernetes/service/) - Readiness Probe 결과에 따라 엔드포인트 변경
- [Endpoints Object](/knowledge/kubernetes/endpoints-object/) - Ready/NotReady 상태를 반영하는 오브젝트
