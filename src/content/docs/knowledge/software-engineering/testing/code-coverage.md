---
title: "Code Coverage"
description: "테스트 스위트가 실행한 코드 라인의 비율을 측정하는 지표"
tags: ["Software Engineering", "Testing", "Metrics"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/testing/code-coverage
sidebar:
  order: 14
---

## 핵심 개념

코드 커버리지(Code Coverage)는 테스트 스위트가 실행한 코드 라인의 비율을 측정하는 지표이다. 목표는 65~85% 수준이 적정하며, 100% 커버리지가 코드 정확성을 보장하지는 않는다. 코드를 실행하는 것과 유용하게 검증하는 것은 다르다.

## 동작 원리

커버리지 지표 활용 원칙:
- **65~85%가 적정 목표**: 100% 달성을 위해 무의미한 테스트를 작성하지 않는다
- **자동 생성 코드 제외**: 커버리지 도구에서 생성 코드는 제외 설정
- **리스크 매트릭스 활용**: 발생 가능성 x 영향도 → 고위험 영역에 테스트 집중
- **가이드로 사용, 규칙이 아님**: 커버리지 수치보다 실질적 검증 품질이 중요

커버리지를 올려도 가치 없는 경우:
- DB 래퍼 함수
- 기본 변수 할당
- 써드파티 라이브러리 연동 코드

대신 비즈니스 로직의 엣지 케이스에 집중해야 한다.

## 예시

```python
# 커버리지는 높지만 실제로 검증하지 못하는 나쁜 테스트
def test_charge_does_not_throw():
    charge(amount=100)  # 어설션 없음 - 100% 커버리지지만 무의미

# 의미 있는 테스트
def test_charge_fails_with_insufficient_balance():
    account = Account(balance=50)
    with pytest.raises(InsufficientBalanceError):
        charge(account, amount=100)

def test_charge_deducts_from_balance():
    account = Account(balance=200)
    charge(account, amount=100)
    assert account.balance == 100
```

리스크 기반 커버리지 전략:
```
# 고위험 영역 (높은 커버리지 목표 >90%)
- 결제 처리 로직
- 인증/권한 부여 코드
- 데이터 유효성 검사

# 저위험 영역 (낮은 커버리지도 허용 <50%)
- 로깅 코드
- 설정 파일 파싱
- 단순한 CRUD 작업
```

## 관련 개념

- [Unit Testing](/knowledge/software-engineering/testing/unit-testing/)
- [Test-Driven Development](/knowledge/software-engineering/testing/test-driven-development/)
- [Integration Testing](/knowledge/software-engineering/testing/integration-testing/)
