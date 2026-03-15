---
title: "서킷 브레이커 (Circuit Breaker)"
description: "운영 이벤트에 의해 자동으로 제어되는 특수한 기능 비활성화 메커니즘"
tags: ["Software Engineering", "Resilience", "Fault Tolerance", "Design Pattern"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/quality-and-configuration/circuit-breaker
sidebar:
  order: 33
---

## 핵심 개념

서킷 브레이커(Circuit Breaker)는 운영 이벤트(지연 급증, 예외 발생 등)에 의해 자동으로 제어되는 특수한 기능 비활성화 메커니즘이다. 전기 회로의 차단기처럼 과부하가 걸리면 자동으로 차단하여 시스템 전체의 장애 전파를 방지한다.

## 동작 원리

세 가지 상태:
- **Closed (닫힘)**: 정상 상태. 모든 요청이 통과
- **Open (열림)**: 차단 상태. 모든 요청을 즉시 거부 (빠른 실패)
- **Half-Open (반열림)**: 회복 테스트 중. 소량의 요청만 허용

상태 전환:
```
Closed → Open: 에러율이 임계값 초과 시 자동 전환
Open → Half-Open: 일정 시간 후 자동 전환
Half-Open → Closed: 소량 요청 성공 시 복구
Half-Open → Open: 소량 요청 실패 시 재차단
```

Feature Flag와의 차이:
- Feature Flag: 수동 제어, 영구적, 기능 롤아웃용
- Circuit Breaker: 자동 제어, 일시적, 장애 격리용

## 예시

```python
import time

class CircuitBreaker:
    def __init__(self, failure_threshold=5, recovery_timeout=60):
        self.failure_count = 0
        self.failure_threshold = failure_threshold
        self.recovery_timeout = recovery_timeout
        self.last_failure_time = None
        self.state = "closed"

    def call(self, func, *args, **kwargs):
        if self.state == "open":
            if time.time() - self.last_failure_time > self.recovery_timeout:
                self.state = "half-open"
            else:
                raise CircuitOpenError("Circuit breaker is OPEN")

        try:
            result = func(*args, **kwargs)
            if self.state == "half-open":
                self.state = "closed"
                self.failure_count = 0
            return result
        except Exception as e:
            self.failure_count += 1
            self.last_failure_time = time.time()
            if self.failure_count >= self.failure_threshold:
                self.state = "open"
            raise e
```

실제 사용 사례:
```
결제 서비스 응답 시간 > 5초 → circuit breaker가 자동 트립
→ 신규 결제 요청을 즉시 거부 (TimeoutError 대신 즉시 응답)
→ 운영팀 알림
→ 60초 후 Half-Open으로 전환
→ 소량 요청으로 복구 확인
→ 자동으로 Closed로 복귀

이점: 결제 서비스가 느릴 때 사용자가 5초 동안 기다리지 않아도 됨
```

## 관련 개념

- [기능 플래그 (Feature Flag)](/knowledge/software-engineering/quality-and-configuration/feature-flag/)
- [지수 백오프 (Exponential Backoff)](/knowledge/software-engineering/foundations/exponential-backoff/)
- [방어적 프로그래밍 (Defensive Programming)](/knowledge/software-engineering/foundations/defensive-programming/)
- [서비스 수준 목표 (Service Level Objective)](/knowledge/software-engineering/quality-and-configuration/service-level-objective/)
