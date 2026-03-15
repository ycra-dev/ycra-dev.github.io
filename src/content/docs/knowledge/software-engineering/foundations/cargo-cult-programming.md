---
title: "카고 컬트 프로그래밍 (Cargo Cult Programming)"
description: "실제로 효과가 있어서가 아니라, 다른 개발자들이 하고 있거나 '모범 사례'로 여겨지기 때문에 특정 방법을 따르는 프로그래밍 경향이다."
tags: ["Software Engineering", "Anti-Pattern", "Critical Thinking", "Best Practices"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/foundations/cargo-cult-programming
sidebar:
  order: 43
---

## 핵심 개념

이 용어는 태평양 섬주민들이 비행기 모형을 만들면 화물이 올 것이라고 믿었던 **카고 컬트**에서 유래했다. 형식만 모방하고 본질을 이해하지 못하는 것이다.

카고 컬트 프로그래밍의 형태:
- 이유 없이 디자인 패턴을 적용 ("GoF 패턴이니까 써야 한다")
- 성능 영향을 이해하지 못한 채 마이크로서비스 아키텍처를 맹목적으로 채택
- "시니어 개발자가 이렇게 하니까"라는 이유만으로 코딩 관행을 따름
- TDD를 이해 없이 형식적으로만 적용

## 동작 원리

다른 분야에서 전환한 개발자들은 이런 집단적 사고에 덜 영향받을 수 있다. 선입관에 얽매이지 않는 **비관습적 사고**가 오히려 큰 장점이 될 수 있다.

카고 컬트 프로그래밍을 극복하는 방법:
1. **근본 원리 이해**: "왜 이것을 하는가?"를 항상 물어보라
2. **비판적 사고**: 모범 사례도 맥락에 따라 다르게 적용된다
3. **실험**: 직접 해보고 결과를 측정하라
4. **트레이드오프 인식**: 모든 기술적 선택에는 장단점이 있다

## 예시

```
좋은 질문들:
- "마이크로서비스를 쓰는 이유가 뭔가요? 우리 규모에 맞나요?"
- "이 디자인 패턴이 실제로 이 문제를 해결하나요?"
- "TDD를 적용했을 때 실제로 버그가 줄었나요?"

카고 컬트 프로그래밍:
- "다들 Docker를 쓰니까 우리도 써야 해"
- "이건 Clean Code에서 본 거야, 무조건 따라야 해"
```

## 관련 개념

- [애자일 개발 (Agile Development)](/knowledge/software-engineering/agile-methods/agile-development/)
- [객체지향 설계 (Object-Oriented Design)](/knowledge/software-engineering/design-and-evolution/object-oriented-design/)
- [Mid-Career Switch to Development](/knowledge/career/professional-development/mid-career-switch-to-development/)
