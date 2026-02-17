---
title: "Abstract Factory"
description: "구체적인 클래스를 지정하지 않고 관련 또는 의존적인 객체 군(family)을 생성하기 위한 인터페이스를 제공하는 생성 패턴"
tags: ['Abstract Factory', 'Creational Pattern', 'Family Of Products', 'Kit']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/language/design-patterns/abstract-factory
sidebar:
  order: 2
---

## 핵심 개념

Abstract Factory 패턴은 제품 군(product family)의 생성을 캡슐화한다. 예를 들어 GUI 툴킷에서 Motif와 PM의 위젯(스크롤바, 버튼 등)을 생성할 때, 클라이언트 코드에서 구체적 클래스명을 사용하지 않고 추상 팩토리 인터페이스만 사용한다.

핵심 참여자: AbstractFactory(인터페이스 선언), ConcreteFactory(구체적 제품 생성 구현), AbstractProduct(제품 유형 인터페이스), ConcreteProduct(구체적 제품 구현), Client(추상 인터페이스만 사용).

장점: (1) 구체 클래스 격리, (2) 제품 군 교체 용이, (3) 제품 간 일관성 보장. 단점: 새로운 종류의 제품 추가가 어려움(팩토리 인터페이스 변경 필요).

구현 전략: 팩토리를 Singleton으로, 팩토리 메서드나 Prototype으로 제품 생성, 확장 가능한 팩토리를 위해 매개변수화.

## 예시

```cpp
// 추상 팩토리와 구체 팩토리
class GUIFactory {
public:
    virtual ScrollBar* createScrollBar() = 0;
    virtual Button* createButton() = 0;
};

class MotifFactory : public GUIFactory {
public:
    ScrollBar* createScrollBar() override {
        return new MotifScrollBar;
    }
    Button* createButton() override {
        return new MotifButton;
    }
};

// 클라이언트 코드 - 구체 클래스 모름
void createUI(GUIFactory* factory) {
    ScrollBar* sb = factory->createScrollBar();
    Button* btn = factory->createButton();
}
```

## 관련 개념

- [Factory Method](/knowledge/language/design-patterns/factory-method/)
- [Singleton](/knowledge/language/design-patterns/singleton/)
- [Prototype Pattern](/knowledge/language/design-patterns/prototype-pattern/)
- [Builder Pattern](/knowledge/language/design-patterns/builder-pattern/)
- [Program to Interface](/knowledge/language/design-patterns/program-to-interface/)
