---
title: "위임 (Delegation)"
description: "요청을 받은 객체가 연산 수행을 다른 객체(위임자)에게 전달하여 합성으로 상속과 동일한 코드 재사용을 달성하는 기법"
tags: ['Delegation', 'Composition', 'Forwarding', 'Runtime Behavior']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/language/design-patterns/delegation
sidebar:
  order: 7
---

## 핵심 개념

위임에서는 두 객체가 요청 처리에 관여한다. 수신 객체가 위임 객체에게 연산을 전달하면서 자기 자신(this/self)의 참조를 함께 넘긴다. 이는 상속에서 부모 클래스가 this를 통해 수신 객체를 참조하는 것과 유사한 효과를 준다. 위임의 핵심 장점은 런타임에 행위 조합을 변경할 수 있다는 것이다. 예를 들어 Window가 Rectangle 인스턴스를 Circle로 교체하면 런타임에 모양이 바뀐다. 단점은 동적이고 매개변수화된 소프트웨어가 정적 소프트웨어보다 이해하기 어렵다는 것과 런타임 비효율이 있다는 것이다. State, Strategy, Visitor 패턴은 위임에 크게 의존한다.

## 예시

```cpp
class Rectangle {
public:
    double area() { return width * height; }
private:
    double width, height;
};

class Window {
private:
    Rectangle* shape;  // 위임 대상
public:
    double area() {
        return shape->area();  // Rectangle에 위임
    }
    void setShape(Rectangle* s) {
        shape = s;  // 런타임에 위임 대상 변경 가능
    }
};
```

## 관련 개념

[Object Composition](/knowledge/language/design-patterns/object-composition/), [State Pattern](/knowledge/language/design-patterns/state-pattern/), [Strategy Pattern](/knowledge/language/design-patterns/strategy-pattern/), [Visitor Pattern](/knowledge/language/design-patterns/visitor-pattern/)
