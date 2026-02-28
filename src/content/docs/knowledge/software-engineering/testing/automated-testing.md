---
title: "Automated Testing"
description: "사람이 수동으로 실행하는 대신, 코드로 작성된 테스트를 자동으로 반복 실행하여 소프트웨어의 정확성을 지속적으로 검증하는 기법이다."
tags: ["Software Engineering", "Testing", "Automation", "CI/CD"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/testing/automated-testing
sidebar:
  order: 9
---

## 핵심 개념

자동화 테스트는 "코드를 테스트하는 코드"를 작성하여 반복 가능하고 빠르며 신뢰할 수 있는 검증 시스템을 구축하는 것이다. 수동 테스트는 시간이 걸리고 실수가 생기지만, 자동화 테스트는 버튼 하나로 수천 개의 테스트를 수 분 만에 실행한다.

## 동작 원리

테스트 피라미드:

```
         [E2E Tests]        ← 적게, 느리게, 실제 환경
       [Integration Tests]  ← 중간
    [Unit Tests]            ← 많이, 빠르게, 격리됨
```

자동화 테스트의 핵심 원칙:
- **빠름(Fast)**: 테스트가 느리면 실행하지 않게 됨
- **독립적(Independent)**: 테스트 간 의존성 없음
- **반복 가능(Repeatable)**: 어떤 환경에서도 같은 결과
- **자기 검증(Self-validating)**: 통과/실패를 자동 판별
- **적시성(Timely)**: 코드와 함께 작성

CI/CD 파이프라인에서 코드 푸시 시 자동으로 테스트 실행 → 실패 시 머지 차단.

## 예시

```python
# pytest로 작성한 자동화 단위 테스트
def test_calculate_discount():
    result = calculate_discount(100, 0.2)
    assert result == 80

def test_calculate_discount_zero_percent():
    result = calculate_discount(100, 0)
    assert result == 100
```

- GitHub Actions로 PR 생성 시 자동 테스트 실행
- Selenium으로 브라우저 E2E 테스트 자동화
- Jest로 React 컴포넌트 렌더링 자동 검증

## 관련 개념

- [단위 테스트](/knowledge/software-engineering/testing/unit-testing/)
- [테스트 주도 개발](/knowledge/software-engineering/agile-methods/test-driven-development/)
- [지속적 통합](/knowledge/software-engineering/agile-methods/continuous-integration/)
- [회귀 테스트](/knowledge/software-engineering/testing/regression-testing/)
