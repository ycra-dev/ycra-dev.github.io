---
title: "Flaky Tests"
description: "코드에 변경이 없음에도 때로는 성공하고 때로는 실패하는 비결정적(nondeterministic) 테스트"
tags: ["Software Engineering", "Testing"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/testing/flaky-tests
sidebar:
  order: 52
---

## 핵심 개념

Flaky test(불안정한 테스트)는 코드에 변경이 없음에도 때로는 성공하고 때로는 실패하는 비결정적(nondeterministic) 테스트를 말한다. 테스트 스위트의 건강을 심각하게 해치며, Google 규모에서는 이 문제가 특히 심각하다. "울프 크라이(양치기 소년)" 효과처럼, 반복적인 거짓 실패가 모든 실패에 대한 주의력을 떨어뜨린다.

## 동작 원리

**주요 원인**:
- 비격리(non-hermetic) 테스트: 외부 서비스, 네트워크, 시스템 시계 등에 의존
- 멀티스레딩에 의한 경쟁 조건(race condition)
- 테스트 간 공유 상태(shared state)
- 테스트 실행 순서에 대한 암묵적 의존

**위험성**:
- 엔지니어들이 테스트 결과를 불신하게 된다
- 실제 버그를 나타내는 실패도 무시하게 된다

**Google의 대응**:
- Google에서는 16개의 자동화된 테스트 중 1개가 일정 수준의 불안정성을 보인다
- 불안정한 테스트를 자동으로 감지하고 격리하는 시스템을 운영한다
- 불안정한 테스트가 발견되면 해당 테스트를 수정하거나 비활성화한다
- 수정할 수 없는 불안정한 테스트는 삭제하는 것이 나을 수 있다

## 예시

불안정한 테스트의 전형적 예시:
```python
def test_response_time():
    start = time.now()
    result = api.call()
    elapsed = time.now() - start
    assert elapsed < 100  # ms - 시스템 부하에 따라 실패할 수 있음
```

이 테스트는 시스템 부하, 네트워크 상태에 따라 결과가 달라지므로 불안정하다.

## 관련 개념

- [Test Size](/knowledge/software-engineering/testing/test-size/)
- [Hermetic Testing](/knowledge/software-engineering/testing/hermetic-testing/)
- [Larger Test Challenges](/knowledge/software-engineering/testing/larger-test-challenges/)
