---
title: "멱등성 (Idempotency)"
description: "동일한 연산을 여러 번 적용해도 결과가 같은 특성"
tags: ["Software Engineering", "Distributed Systems", "Reliability"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/foundations/idempotency
sidebar:
  order: 28
---

## 핵심 개념

멱등성(Idempotency)은 동일한 연산을 여러 번 적용해도 결과가 같은 특성이다. 집합에 값 추가가 대표적 예 — 몇 번을 추가해도 한 번만 존재한다. 네트워크 실패 시 재시도 안전성의 핵심이다.

## 동작 원리

문제 상황: 요청이 성공했는지 불확실할 때
- 재시도하면 이중 처리 위험
- 포기하면 데이터 손실 위험

해결: 클라이언트가 고유 ID를 요청에 포함하고, 서버가 중복 요청을 감지 및 무시한다. 모든 연산을 멱등하게 만들면 시스템 상호작용이 크게 단순화된다.

HTTP 메서드별 멱등성:
- GET, PUT, DELETE: 멱등 (사양상)
- POST: 멱등 아님 (별도 설계 필요)

## 예시

결제 시스템에서의 멱등성:

```
POST /charge
{
    "request_id": "abc-123",  // 클라이언트가 생성한 고유 ID
    "amount": 100,
    "currency": "KRW"
}

→ 네트워크 타임아웃 발생
→ 동일 request_id로 재시도
→ 서버가 이미 처리된 요청임을 인식
→ 중복 청구 방지, 기존 결과 반환
```

구현 패턴:
```python
def process_payment(request_id: str, amount: float) -> PaymentResult:
    # 기존 처리 결과 확인
    if existing := cache.get(f"payment:{request_id}"):
        return existing  # 중복 요청: 기존 결과 반환

    result = charge(amount)
    cache.set(f"payment:{request_id}", result, ttl=3600)
    return result
```

## 관련 개념

- [방어적 프로그래밍 (Defensive Programming)](/knowledge/software-engineering/foundations/defensive-programming/)
- [지수 백오프 (Exponential Backoff)](/knowledge/software-engineering/foundations/exponential-backoff/)
