---
title: "Deterministic Testing"
description: "동일 입력에 항상 동일 출력을 보장하는 테스트 작성 원칙"
tags: ["Software Engineering", "Testing", "Reliability"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/testing/deterministic-testing
sidebar:
  order: 15
---

## 핵심 개념

결정적 테스트(Deterministic Testing)는 동일 입력에 항상 동일 출력을 보장하는 테스트를 작성하는 원칙이다. 비결정적 테스트(Flapping Test / Flaky Test)는 간헐적으로 실패하여 테스트 스위트의 신뢰성을 떨어뜨리고, CI/CD 파이프라인을 불안정하게 만든다.

## 동작 원리

비결정적 원인과 해결 방법:

| 원인 | 해결 방법 |
|------|---------|
| 난수 생성기(RNG) | 상수 시드로 고정 |
| 원격 시스템 의존 | Mock 사용 |
| 시간 의존 (현재 시각) | 주입 가능한 클록 사용 |
| sleep/timeout | 구조 변경 (이벤트 기반) |
| 리소스 누수 (소켓/파일) | setup/teardown에서 정리 |
| 포트 충돌 | 포트 0 바인딩 (OS가 빈 포트 선택) |
| 파일 경로 충돌 | 고유 임시 경로 생성 |
| 남은 상태 | setup/teardown으로 초기화 |
| 테스트 순서 의존 | 독립적 테스트 설계 |

## 예시

```python
# Bad: 비결정적 테스트
def test_user_age():
    user = User(birth_date=date(1990, 1, 1))
    assert user.age() == 36  # 매년 달라짐!

# Good: 시간 주입
def test_user_age():
    user = User(birth_date=date(1990, 1, 1))
    today = date(2026, 1, 1)
    assert user.age(as_of=today) == 36  # 항상 동일

# Bad: 포트 충돌 가능
server = TestServer(port=8080)  # 이미 사용 중이면 실패

# Good: OS가 빈 포트 자동 선택
server = TestServer(port=0)
actual_port = server.port  # 실제 할당된 포트 사용

# Bad: 비결정적 난수
random.seed()  # 시스템 시계 기반
result = simulate_lottery()

# Good: 고정 시드
random.seed(42)  # 항상 같은 결과
result = simulate_lottery()
```

테스트 격리 패턴:
```python
@pytest.fixture(autouse=True)
def clean_state(db):
    """각 테스트 전후로 상태를 초기화"""
    yield
    db.rollback()  # 테스트가 만든 모든 변경 사항 되돌리기
```

## 관련 개념

- [Unit Testing](/knowledge/software-engineering/testing/unit-testing/)
- [Mocking](/knowledge/software-engineering/testing/mocking/)
- [Integration Testing](/knowledge/software-engineering/testing/integration-testing/)
