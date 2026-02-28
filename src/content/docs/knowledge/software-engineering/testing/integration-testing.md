---
title: "Integration Testing"
description: "여러 컴포넌트가 함께 올바르게 동작하는지 검증하는 테스트"
tags: ["Software Engineering", "Testing", "Quality Assurance"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/testing/integration-testing
sidebar:
  order: 13
---

## 핵심 개념

통합 테스트(Integration Testing)는 여러 컴포넌트가 함께 올바르게 동작하는지 검증하는 테스트이다. 단위 테스트보다 느리고 설정이 복잡하지만, 개별 단위 테스트로는 발견하기 어려운 문제를 탐지한다.

## 동작 원리

테스트 피라미드에서 통합 테스트는 중간 레벨에 위치한다:
- **단위 테스트(Unit Test)**: 개별 함수/클래스를 격리하여 테스트. 빠르고 많이 작성
- **통합 테스트(Integration Test)**: 여러 모듈의 상호작용 검증. 중간 수준
- **시스템 테스트(E2E Test)**: 전체 시스템 동작 검증. 느리고 적게 작성

통합 테스트에서 검증하는 것:
- 여러 객체를 인스턴스화하고 상호작용 테스트
- 데이터베이스, API, 메시지 큐 등 실제 서비스와의 통합
- 단위 테스트에서 모킹했던 외부 의존성의 실제 동작

피드백 루프가 길어 덜 자주 실행하게 된다. 다양한 테스트 레벨도 있다:
- **수용 테스트(Acceptance Test)**: 고객이 인수 기준 충족 여부 검증
- **성능 테스트**: 다양한 부하에서의 성능 측정

## 예시

식기세척기 사례: 개별 제품은 완벽하지만 주방 코너에 설치하면 서랍과 충돌한다. 각 컴포넌트 단위 테스트로는 발견 불가능한 통합 문제이다.

```python
# 단위 테스트는 DB를 mock하지만
# 통합 테스트는 실제 DB를 사용
import pytest

@pytest.fixture
def db():
    db = TestDatabase()
    db.migrate()
    yield db
    db.cleanup()

def test_user_creation_and_retrieval(db):
    # Arrange
    user_service = UserService(database=db)

    # Act
    user_id = user_service.create_user("alice@example.com")
    retrieved_user = user_service.get_user(user_id)

    # Assert
    assert retrieved_user.email == "alice@example.com"
```

## 관련 개념

- [Unit Testing](/knowledge/software-engineering/testing/unit-testing/)
- [Deterministic Testing](/knowledge/software-engineering/testing/deterministic-testing/)
- [Mocking](/knowledge/software-engineering/testing/mocking/)
- [Test-Driven Development](/knowledge/software-engineering/testing/test-driven-development/)
