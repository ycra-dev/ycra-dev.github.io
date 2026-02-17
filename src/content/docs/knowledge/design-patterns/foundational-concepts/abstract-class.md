---
title: "Abstract Class"
description: "하위 클래스들의 공통 인터페이스를 정의하는 것이 주 목적인 클래스로, 일부 또는 전부의 구현을 하위 클래스에 위임하며 직접 인스턴스화할 수 없다"
tags: ['Abstract Class', 'Interface', 'Pure Virtual', 'Subtyping']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/language/design-patterns/abstract-class
sidebar:
  order: 8
---

## 핵심 개념

추상 클래스는 구현하지 않고 선언만 하는 추상 연산(abstract operations)을 포함한다. 추상 클래스가 아닌 클래스를 구체 클래스(concrete class)라 한다. 자식 클래스는 추상 연산을 구현하여 부모의 행위를 정제(refine)하거나 재정의(override)할 수 있다. 추상 클래스만을 통해 객체를 조작하면 구현 의존성이 크게 줄어든다. 이것이 "인터페이스에 대해 프로그래밍하라"는 원칙의 핵심이다. 클래스(class)와 타입(type)의 차이를 이해하는 것이 중요하다: 클래스는 구현을, 타입은 인터페이스를 정의한다.

## 예시

```cpp
// 추상 클래스 예시
class Glyph {
public:
    virtual void draw(Window*) = 0;       // 순수 가상 (추상 연산)
    virtual void bounds(Rect&) = 0;
    virtual void insert(Glyph*, int) {}   // 기본 구현 제공 가능
    virtual ~Glyph() {}
};

class Character : public Glyph {
public:
    void draw(Window* w) override { w->drawChar(c); }
    void bounds(Rect& r) override { /* 구현 */ }
private:
    char c;
};
// Glyph* g = new Glyph(); // 오류! 추상 클래스 인스턴스화 불가
```

## 관련 개념

[Polymorphism](/knowledge/language/design-patterns/polymorphism/), [Class Inheritance](/knowledge/language/design-patterns/class-inheritance/), [Program to Interface](/knowledge/language/design-patterns/program-to-interface/), [Encapsulation](/knowledge/language/design-patterns/encapsulation/)
