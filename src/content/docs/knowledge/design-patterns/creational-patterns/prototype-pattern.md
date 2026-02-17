---
title: "Prototype Pattern"
description: "원형(prototype) 인스턴스를 사용하여 생성할 객체의 종류를 명시하고, 이 원형을 복제(clone)하여 새로운 객체를 생성하는 생성 패턴"
tags: ['Prototype', 'Creational Pattern', 'Cloning', 'Deep Copy']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/language/design-patterns/prototype-pattern
sidebar:
  order: 4
---

## 핵심 개념

Prototype 패턴은 객체 생성에 클래스를 명시하는 대신 프로토타입 인스턴스를 복제한다. 음악 편집기 예시에서 GraphicTool은 생성할 Graphic의 프로토타입으로 매개변수화되어, 다양한 음표를 만들기 위해 매번 서브클래스를 정의할 필요가 없다.

장점: (1) 런타임에 제품 추가/제거 가능, (2) 값을 변경하여 새로운 객체 명세 가능, (3) 구조를 변경하여 새로운 객체 명세 가능, (4) 서브클래싱 감소, (5) 클래스를 동적으로 구성(dynamic loading 지원).

주요 구현 이슈: 프로토타입 매니저(레지스트리)를 사용한 프로토타입 관리, 얕은 복사 vs 깊은 복사(shallow vs deep copy) 문제, Clone 후 초기화(Initialize 연산).

주요 단점은 각 Prototype 서브클래스가 Clone 연산을 구현해야 하며, 순환 참조가 있는 복잡한 구조에서는 이것이 어려울 수 있다는 것이다.

## 예시

```cpp
// Prototype 패턴
class Graphic {
public:
    virtual Graphic* clone() = 0;
    virtual void draw(Position) = 0;
};

class MusicalNote : public Graphic {
public:
    Graphic* clone() override {
        return new MusicalNote(*this);  // 복사 생성자 활용
    }
};

// GraphicTool이 프로토타입을 복제하여 새 객체 생성
class GraphicTool {
    Graphic* prototype;
public:
    GraphicTool(Graphic* p) : prototype(p) {}
    void manipulate() {
        Graphic* copy = prototype->clone();
        // copy를 문서에 추가
    }
};

// 사용: 전체 음표 도구 생성
GraphicTool* wholeTool = new GraphicTool(new WholeNote);
```

## 관련 개념

- [Abstract Factory](/knowledge/language/design-patterns/abstract-factory/)
- [Composite Pattern](/knowledge/language/design-patterns/composite-pattern/)
- [Decorator Pattern](/knowledge/language/design-patterns/decorator-pattern/)
- [Factory Method](/knowledge/language/design-patterns/factory-method/)
