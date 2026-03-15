---
title: "레거시 코드 (Legacy Code)"
description: "테스트가 없는 기존 코드, 또는 오래되어 이해하기 어렵고 수정이 위험한 코드 — Michael Feathers의 정의에 따르면 '테스트가 없는 코드는 레거시 코드'"
tags: ["SoftwareEngineering", "Maintenance", "TechnicalDebt", "CodeQuality"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/design-and-evolution/legacy-code
sidebar:
  order: 307
---

## 핵심 개념

레거시 코드(Legacy Code)는 테스트가 없는 기존 코드, 또는 오래되어 이해하기 어렵고 수정이 위험한 코드를 말한다. Michael Feathers의 정의에 따르면 "테스트가 없는 코드는 레거시 코드"다. 대부분의 개발자는 경력의 상당 부분을 레거시 코드와 씨름하며 보낸다.

## 동작 원리

레거시 코드를 다루는 전략:

- **Boy Scout Rule**: 코드를 발견했을 때보다 더 깨끗하게 남기기
- **점진적 개선**: 한 번에 전면 재작성하지 않고 조금씩 개선
- **테스트 추가**: 변경하기 전에 먼저 기존 동작을 테스트로 보호
- **이해 우선**: 수정 전에 코드의 의도와 맥락을 충분히 이해
- **깨진 창문 이론 경계**: 나쁜 코드가 더 나쁜 코드를 부르지 않도록 주의

레거시 코드의 전면 재작성은 거의 항상 실패한다. Joel Spolsky가 말했듯이 "코드를 처음부터 다시 작성하는 것은 소프트웨어 회사가 저지를 수 있는 가장 큰 전략적 실수"다.

**안전하게 변경하는 절차:**
1. 기존 동작을 특성 테스트(characterization test)로 보호
2. 테스트가 통과하는 상태에서 리팩토링
3. 새 기능 추가
4. 테스트 통과 확인

## 예시

```python
# 레거시 코드에 안전하게 변경 적용하기

# 1단계: 기존 동작을 캡처하는 특성 테스트 작성
def test_existing_behavior():
    # 현재 동작을 기록 (버그가 있어도 일단 현재 동작을 기록)
    result = mysterious_function(42, "test")
    assert result == "expected_output"

# 2단계: 리팩토링 (테스트가 보호하는 범위 내에서)
def mysterious_function(x, s):
    # 리팩토링 후에도 기존 테스트가 통과해야 함
    return process(x, s)

# 3단계: 새 기능 추가 (TDD 방식)
def test_new_behavior():
    assert new_feature(42) == expected_new_result

def new_feature(x):
    return mysterious_function(x, "new")
```

## 관련 개념

- [리팩토링 (Refactoring)](/knowledge/software-engineering/design-and-evolution/refactoring/)
- [기술 부채 (Technical Debt)](/knowledge/software-engineering/design-and-evolution/technical-debt/)
- [테스트 주도 개발 (Test-Driven Development)](/knowledge/software-engineering/testing/test-driven-development/)
