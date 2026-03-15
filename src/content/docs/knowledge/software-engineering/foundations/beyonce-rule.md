---
title: "비욘세 규칙 (Beyonce Rule)"
description: "만약 그것을 좋아했다면 테스트를 작성했어야 한다 — CI를 통과한 변경의 책임은 테스트를 작성하지 않은 쪽에 있다는 원칙"
tags: ["Software Engineering", "Foundations", "Testing", "Policy"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/foundations/beyonce-rule
sidebar:
  order: 16
---

## 핵심 개념

"만약 그것을 좋아했다면 테스트를 작성했어야 했다(If you liked it, you should have put a test on it)." 인프라 변경으로 인해 코드가 깨졌을 때, CI 시스템에서 테스트가 통과했다면 변경의 책임은 인프라 팀이 아닌 테스트를 작성하지 않은 쪽에 있다는 원칙이다.

## 동작 원리

Beyonce Rule은 Google에서 대규모 변경 관리를 가능하게 하는 핵심 정책이다. 이 규칙은 두 가지 방향으로 작동한다:

1. **인프라 팀**: CI 테스트를 모두 통과시킬 책임을 부여한다
2. **제품 팀**: 자신의 코드에 대한 중요한 동작을 테스트로 보호할 책임을 부여한다

이 정책은 규모에 따라 잘 확장된다. 테스트를 통해 "계약"을 명시적으로 표현하면, 인프라 변경이 안전하게 이루어질 수 있다. 이는 [하이럼의 법칙 (Hyrum's Law)](/knowledge/software-engineering/foundations/hyrums-law/)의 효과를 완화하는 실용적인 접근법이기도 하다.

## 예시

Google 내부에서 컴파일러 업그레이드나 라이브러리 변경 시, 변경 팀은 Google 전체의 CI 시스템에서 모든 테스트를 실행한다. 테스트가 통과하면 변경을 진행하고, 실패하면 해당 테스트를 수정하거나 변경을 조정한다. 이로 인해 수억 줄의 코드에 대한 인프라 변경이 실질적으로 가능해진다.

## 관련 개념

- [하이럼의 법칙 (Hyrum's Law)](/knowledge/software-engineering/foundations/hyrums-law/)
- [시프트 레프트 (Shifting Left)](/knowledge/software-engineering/foundations/shifting-left/)
- [트레이드오프와 비용 (Trade-offs and Costs)](/knowledge/software-engineering/foundations/trade-offs-and-costs/)
