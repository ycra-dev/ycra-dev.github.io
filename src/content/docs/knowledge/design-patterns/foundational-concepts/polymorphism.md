---
title: "Polymorphism"
description: "동일한 인터페이스를 가진 객체들을 런타임에 상호 교체할 수 있는 객체지향의 핵심 메커니즘"
tags: ['Polymorphism', 'Object Oriented', 'Dynamic Binding', 'Substitutability']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/language/design-patterns/polymorphism
sidebar:
  order: 3
---

## 핵심 개념

다형성은 동적 바인딩(dynamic binding)에 의해 가능해진다. 요청(request)이 객체에 전달될 때, 실행될 연산은 요청과 수신 객체 모두에 의해 결정된다. 클라이언트 객체는 특정 인터페이스를 지원하는지만 확인하면 되므로, 다른 객체에 대한 가정을 최소화할 수 있다. 이를 통해 객체 간 결합도를 낮추고, 런타임에 관계를 동적으로 변경할 수 있다. 다형성은 "인터페이스에 대해 프로그래밍하라"는 원칙의 기반이 된다.

## 예시

```cpp
// 다형성 예시
class Shape {
public:
    virtual void draw() = 0;  // 순수 가상 함수
};

class Circle : public Shape {
public:
    void draw() override { /* 원 그리기 */ }
};

class Rectangle : public Shape {
public:
    void draw() override { /* 사각형 그리기 */ }
};

// 클라이언트 코드 - Shape 인터페이스만 알면 됨
void render(Shape* shape) {
    shape->draw();  // 동적 바인딩으로 적절한 draw() 호출
}
```

## 관련 개념

[Encapsulation](/knowledge/language/design-patterns/encapsulation/), [Abstract Class](/knowledge/language/design-patterns/abstract-class/), [Program to Interface](/knowledge/language/design-patterns/program-to-interface/)
