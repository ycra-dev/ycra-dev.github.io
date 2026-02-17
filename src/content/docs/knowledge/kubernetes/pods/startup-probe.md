---
title: "Startup Probe"
description: "Startup Probe는 컨테이너 내 애플리케이션이 완전히 시작되었는지 확인하는 프로브로, 시작에 오랜 시간이 걸리는 애플리케이션이 Liveness Probe에 의해 조기 재시작되는 것을 방지한다"
tags: ['Kubernetes', 'Health Check', 'Startup', 'Probe', 'Container']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/kubernetes/startup-probe
sidebar:
  order: 12
---

## 핵심 개념

Startup Probe는 Liveness Probe와 시작 시간이 긴 애플리케이션 사이의 불일치를 해결하기 위해 도입되었다. Liveness Probe만 사용할 경우, 기본 설정으로 20-30초 내에 응답하지 않으면 컨테이너가 재시작된다. 시작에 수 분이 걸리는 애플리케이션은 끝없는 재시작 루프에 빠질 수 있다.

**동작 원리:**
1. 컨테이너가 시작되면 Startup Probe만 실행된다
2. Startup Probe가 성공하면 Kubernetes가 Liveness Probe로 전환한다
3. Startup Probe가 실패해도 정상이다 - 단지 애플리케이션이 아직 시작되지 않았음을 의미한다
4. `failureThreshold`에 도달할 만큼 충분히 실패하면 Liveness Probe 실패와 동일하게 컨테이너가 종료된다

**Liveness Probe의 설정을 조정하는 것보다 Startup Probe가 나은 이유:**
- `initialDelaySeconds`, `periodSeconds`, `failureThreshold`를 늘리면 정상 운영 중 문제 감지가 느려진다
- Startup Probe는 시작 단계에만 관대한 설정을 적용하고, 정상 운영에서는 빠른 감지를 유지할 수 있다

일반적으로 Startup Probe와 Liveness Probe는 같은 HTTP 엔드포인트를 사용하지만, 다른 엔드포인트를 사용할 수도 있다. exec 또는 tcpSocket 유형으로도 구성 가능하다.

## 예시

Startup Probe와 Liveness Probe를 조합한 구성:

```yaml
containers:
- name: kiada
  image: luksa/kiada:0.1
  ports:
  - name: http
    containerPort: 8080
  startupProbe:
    httpGet:
      path: /
      port: http
    periodSeconds: 10        # 10초마다 확인
    failureThreshold: 12     # 최대 12번 실패 허용 = 120초 시작 시간
  livenessProbe:
    httpGet:
      path: /
      port: http
    periodSeconds: 5         # 5초마다 확인 (더 빠른 감지)
    failureThreshold: 2      # 2번 실패 시 재시작 (약 10초 내 감지)
```

위 구성의 동작:
- 시작 단계: 최대 120초(10초 x 12회) 동안 시작 대기
- 정상 운영: 최대 10초(5초 x 2회) 내에 비정상 감지 및 재시작

## 관련 개념

- [Liveness Probe](/knowledge/kubernetes/liveness-probe/) - Startup Probe 성공 후 전환되는 상시 헬스 체크
- [Restart Policy](/knowledge/kubernetes/restart-policy/) - 프로브 실패 시 재시작 동작을 결정
- [Pod Phase](/knowledge/kubernetes/pod-phase/) - 프로브 결과에 따른 Pod 상태 변화
- [Init Container](/knowledge/kubernetes/init-container/) - 또 다른 시작 지연 메커니즘
- [Pod](/knowledge/kubernetes/pod/) - 프로브가 정의되는 리소스
