---
title: "지수 백오프 (Exponential Backoff)"
description: "재시도 간격을 지수적으로 증가시키는 재시도 전략"
tags: ["Software Engineering", "Distributed Systems", "Reliability"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/foundations/exponential-backoff
sidebar:
  order: 29
---

## 핵심 개념

지수 백오프(Exponential Backoff)는 재시도 간격을 지수적으로 증가시키는 재시도 전략이다. 일반적으로 `(재시도 횟수)^2` 공식을 사용한다. 단순 즉시 재시도는 장애가 발생한 시스템의 복구를 방해하므로, 백오프로 대기 시간을 점진적으로 늘려 시스템에 회복 시간을 제공한다.

## 동작 원리

핵심 요소:
- **지수적 증가**: 재시도 횟수에 따라 대기 시간이 1s, 4s, 9s, 16s로 증가
- **최대 대기 시간 상한 필수**: 무한 증가를 막기 위해 상한선 설정 (예: 60초)
- **Thundering Herd 문제**: 모든 클라이언트가 동시에 재시도하면 복구 중인 서버에 폭탄이 됨
- **Jitter(무작위 지연)**: 요청을 분산시키기 위해 재시도 간격에 무작위 값을 추가

주의: 데이터 쓰기처럼 부작용이 있는 호출은 멱등성(Idempotency)이 보장되지 않으면 재시도가 위험하다. 이 경우 Fail Fast 전략이 나을 수 있다.

## 예시

재시도 간격 패턴:
```
재시도 1: 1초 대기
재시도 2: 4초 대기
재시도 3: 9초 대기
재시도 4: 16초 대기 (+ jitter 0~2초)
...
최대 60초 상한
```

Python 구현:
```python
import random
import time

def retry_with_backoff(func, max_retries=5, max_wait=60):
    for attempt in range(max_retries):
        try:
            return func()
        except RetryableError:
            wait = min((attempt + 1) ** 2, max_wait)
            jitter = random.uniform(0, wait * 0.1)
            time.sleep(wait + jitter)
    raise MaxRetriesExceeded()
```

## 관련 개념

- [멱등성 (Idempotency)](/knowledge/software-engineering/foundations/idempotency/)
- [방어적 프로그래밍 (Defensive Programming)](/knowledge/software-engineering/foundations/defensive-programming/)
- [서킷 브레이커 (Circuit Breaker)](/knowledge/software-engineering/quality-and-configuration/circuit-breaker/)
