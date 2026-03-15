---
title: "모킹 (Mocking)"
description: "테스트 시 실제 의존성(데이터베이스, API, 외부 서비스) 대신 그 동작을 흉내내는 가짜 객체를 사용하여 단위를 격리 테스트하는 기법이다."
tags: ["Software Engineering", "Testing", "Unit Testing", "Dependency"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/testing/mocking
sidebar:
  order: 10
---

## 핵심 개념

목(Mock)은 실제 객체처럼 동작하는 가짜 대체물이다. 단위 테스트에서 데이터베이스나 외부 API에 실제로 접근하면 느리고, 불안정하고, 테스트마다 같은 결과를 보장하기 어렵다. 목을 사용하면 "이 외부 서비스가 X를 반환한다고 가정하고, 내 코드가 올바르게 동작하는가?"를 빠르고 안정적으로 테스트할 수 있다.

## 동작 원리

테스트 더블의 종류:

| 종류 | 설명 |
|------|------|
| **Stub** | 미리 정해진 값을 반환 (행위 검증 안 함) |
| **Mock** | 호출 여부·인자·횟수를 검증 |
| **Fake** | 실제 동작하지만 단순화된 구현 (인메모리 DB 등) |
| **Spy** | 실제 객체를 감싸서 호출을 관찰 |

```python
# pytest-mock으로 외부 API 목킹
def test_send_email_on_signup(mocker):
    mock_send = mocker.patch('myapp.email.send_email')
    signup(email='user@example.com')
    mock_send.assert_called_once_with(to='user@example.com', subject='Welcome!')
```

## 예시

- 데이터베이스 목: `UserRepository`가 `[User(id=1)]`를 반환하도록 설정하고 서비스 레이어 테스트
- HTTP 클라이언트 목: 실제 API 호출 없이 응답 JSON을 고정 값으로 반환
- 시간 목킹: `datetime.now()`를 특정 시점으로 고정하여 날짜 관련 로직 테스트
- 결제 모듈 목: 실제 결제 없이 "결제 성공" 시나리오와 "결제 실패" 시나리오 모두 테스트

## 관련 개념

- [단위 테스트](/knowledge/software-engineering/testing/unit-testing/)
- [테스트 주도 개발](/knowledge/software-engineering/agile-methods/test-driven-development/)
- [자동화 테스트](/knowledge/software-engineering/testing/automated-testing/)
