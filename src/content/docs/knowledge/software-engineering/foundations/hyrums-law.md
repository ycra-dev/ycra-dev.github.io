---
title: "하이럼의 법칙 (Hyrum's Law)"
description: "API 사용자가 충분히 많아지면 명시된 계약과 무관하게 모든 관찰 가능한 동작에 의존자가 생긴다는 암묵적 의존성의 법칙"
tags: ["Software Engineering", "Foundations", "API", "Dependencies"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/foundations/hyrums-law
sidebar:
  order: 15
---

## 핵심 개념

"API의 사용자가 충분히 많아지면, 계약에서 무엇을 약속했는지는 중요하지 않다. 시스템의 모든 관찰 가능한 동작은 누군가에 의해 의존된다." 암묵적 의존성의 법칙으로도 불린다.

## 동작 원리

Hyrum's Law는 시간에 따른 소프트웨어 변경을 논의할 때 지배적인 요소이다. 엔트로피와 개념적으로 유사하다: 변경과 유지보수에 관한 논의는 반드시 Hyrum's Law를 인식해야 하며, 효율성이나 열역학 논의에서 엔트로피를 고려해야 하는 것과 같다.

엔트로피가 절대 감소하지 않는다고 해서 효율성을 추구하지 말아야 하는 것은 아니듯, Hyrum's Law가 적용된다고 해서 계획을 세우거나 이해하려는 노력을 포기해서는 안 된다. **완화할 수는 있지만, 완전히 근절할 수는 없다.**

이 법칙은 API 소유자가 "사소한" 변경을 할 때 예기치 않은 곳에서 문제가 발생하는 이유를 설명한다. 해시 순서, 에러 메시지 텍스트, 타이밍 등 공식 계약에 포함되지 않은 동작에도 사용자는 의존하게 된다.

## 예시

xkcd 1172 만화는 이를 잘 보여준다: 누군가가 코 안에서 바람이 부는 느낌을 주는 버그에 의존하고 있었다.

Python의 `hash()` 함수 구현도 대표적인 사례다. 공식 명세에서 결정론적 순서를 보장하지 않지만, 많은 사용자가 특정 순서에 의존하는 코드를 작성했다. HashDoS 공격에 대응하여 해시 알고리즘을 변경했을 때, 그 암묵적 의존성 때문에 코드가 깨졌다.

## 관련 개념

- [시간에 걸친 프로그래밍 통합 (Programming Integrated Over Time)](/knowledge/software-engineering/foundations/programming-integrated-over-time/)
- [기술 부채 (Technical Debt)](/knowledge/software-engineering/design-and-evolution/technical-debt/)
- [트레이드오프와 비용 (Trade-offs and Costs)](/knowledge/software-engineering/foundations/trade-offs-and-costs/)
- [시프트 레프트 (Shifting Left)](/knowledge/software-engineering/foundations/shifting-left/)
