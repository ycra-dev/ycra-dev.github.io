---
title: "인터페이스에 맞춘 프로그래밍 (Program to Interface)"
description: "구체 클래스가 아닌 추상 클래스나 인터페이스에 의존하여 프로그래밍함으로써 구현과의 결합을 최소화하는 설계 원칙"
tags: ['Program To Interface', 'Design Principle', 'Abstraction', 'Decoupling']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/language/design-patterns/program-to-interface
sidebar:
  order: 9
---

## 핵심 개념

GoF의 첫 번째 설계 원칙: "구현이 아닌 인터페이스에 대해 프로그래밍하라." 변수를 구체 클래스의 인스턴스로 선언하지 말고, 추상 클래스가 정의한 인터페이스에만 의존하라. 이렇게 하면 클라이언트는 사용하는 객체의 구체적 타입을 알 필요가 없고, 구현 클래스도 알 필요가 없다. 이 원칙을 따르면 서브시스템 간 구현 의존성이 크게 감소한다. 생성 패턴(Abstract Factory, Builder, Factory Method, Prototype, Singleton)은 이 원칙을 실현하기 위해 객체 생성 과정을 추상화한다.

## 예시

```cpp
// Bad: 구현에 의존
MotifScrollBar* sb = new MotifScrollBar;

// Good: 인터페이스에 의존
ScrollBar* sb = factory->createScrollBar();
// factory가 MotifFactory인지 MacFactory인지 몰라도 됨
// ScrollBar 인터페이스만 사용
sb->scroll(10);
```

## 관련 개념

[Abstract Class](/knowledge/language/design-patterns/abstract-class/), [Polymorphism](/knowledge/language/design-patterns/polymorphism/), [Abstract Factory](/knowledge/language/design-patterns/abstract-factory/), [Object Composition](/knowledge/language/design-patterns/object-composition/)
