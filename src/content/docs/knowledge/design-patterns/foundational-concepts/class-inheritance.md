---
title: "Class Inheritance"
description: "기존 클래스의 구현을 재사용하여 새로운 클래스를 정의하는 컴파일 타임 메커니즘으로, 화이트박스 재사용이라고도 한다"
tags: ['Inheritance', 'White Box Reuse', 'Subclassing', 'Code Reuse']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/language/design-patterns/class-inheritance
sidebar:
  order: 5
---

## 핵심 개념

클래스 상속은 부모 클래스의 데이터와 연산을 자식 클래스가 물려받아, 기존 구현 위에 새로운 기능을 빠르게 추가할 수 있게 한다. 하지만 컴파일 타임에 정적으로 결정되므로 런타임에 변경할 수 없고, 부모 클래스의 구현이 자식 클래스에 노출되어 캡슐화를 깨뜨릴 수 있다. 부모 클래스 변경 시 자식 클래스에 영향이 전파되어 유연성과 재사용성이 제한된다. GoF는 "클래스 상속보다 객체 합성을 선호하라(Favor object composition over class inheritance)"를 핵심 원칙으로 제시한다. 인터페이스 상속(interface inheritance, subtyping)과 구현 상속(implementation inheritance)을 구분하는 것이 중요하다.

## 예시

```cpp
// 클래스 상속의 장단점
class Window {
public:
    virtual void draw();
protected:
    int width, height;  // 자식에게 내부 구현 노출 (캡슐화 약화)
};

class IconWindow : public Window {
public:
    void draw() override;  // 부모 메서드 재정의
    // width, height에 직접 접근 가능 → 부모 변경 시 영향받음
};
```

## 관련 개념

[Object Composition](/knowledge/language/design-patterns/object-composition/), [Abstract Class](/knowledge/language/design-patterns/abstract-class/), [Encapsulation](/knowledge/language/design-patterns/encapsulation/), [Delegation](/knowledge/language/design-patterns/delegation/)
