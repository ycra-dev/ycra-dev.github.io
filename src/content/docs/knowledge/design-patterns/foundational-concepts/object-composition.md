---
title: "Object Composition"
description: "다른 객체에 대한 참조를 통해 런타임에 동적으로 기능을 조합하는 재사용 기법으로, 블랙박스 재사용이라고도 한다"
tags: ['Composition', 'Black Box Reuse', 'Has A', 'Runtime Flexibility']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/language/design-patterns/object-composition
sidebar:
  order: 6
---

## 핵심 개념

객체 합성은 클래스 상속의 대안으로, 객체들이 잘 정의된 인터페이스를 통해서만 상호작용하므로 캡슐화를 유지한다. 런타임에 동적으로 구성을 변경할 수 있으며, 동일한 타입의 다른 객체로 교체가 가능하다. 합성을 사용하면 각 클래스가 하나의 책임에 집중하게 되어 클래스 계층이 작고 관리 가능한 상태를 유지한다. 반면 객체 수가 증가하고 시스템 행위가 객체 간 상호관계에 의존하게 되어 이해하기 어려울 수 있다. GoF의 두 번째 설계 원칙: "클래스 상속보다 객체 합성을 선호하라." 대부분의 디자인 패턴은 객체 합성을 활용한다.

## 예시

```cpp
// 상속 대신 합성 사용
// Bad: class Window : public Rectangle { ... };
// Good:
class Window {
private:
    Rectangle* bounds;  // 합성으로 Rectangle 행위 재사용
public:
    int area() { return bounds->area(); }  // 위임
    // 런타임에 Circle로 교체 가능 (같은 Shape 인터페이스라면)
};
```

## 관련 개념

[Class Inheritance](/knowledge/language/design-patterns/class-inheritance/), [Delegation](/knowledge/language/design-patterns/delegation/), [Encapsulation](/knowledge/language/design-patterns/encapsulation/), [Strategy Pattern](/knowledge/language/design-patterns/strategy-pattern/)
