---
title: "Factory Method"
description: "객체 생성을 위한 인터페이스를 정의하되, 어떤 클래스를 인스턴스화할지는 서브클래스가 결정하게 하여 인스턴스화를 서브클래스에 위임하는 생성 패턴"
tags: ['Factory Method', 'Creational Pattern', 'Virtual Constructor', 'Class Pattern']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/language/design-patterns/factory-method
sidebar:
  order: 1
---

## 핵심 개념

Factory Method는 프레임워크가 추상 클래스로 객체 간의 관계를 정의하고 유지할 때 유용하다. Application-Document 예시에서, Application은 언제 새 Document를 생성해야 하는지 알지만, 어떤 종류의 Document를 생성할지는 모른다. Factory Method(createDocument)가 이 지식을 캡슐화하여 서브클래스(DrawingApplication)가 적절한 제품(DrawingDocument)을 반환한다.

Creator가 추상 클래스인 경우와 구체 클래스(기본 구현 제공)인 경우의 두 가지 주요 변형이 있다. 매개변수화된 팩토리 메서드는 매개변수로 생성할 제품 종류를 지정한다. C++에서 템플릿을 사용하면 서브클래싱 없이도 팩토리 메서드를 활용할 수 있다.

또한 지연 초기화(lazy initialization)를 통해 팩토리 메서드를 최적화할 수 있다. Factory Method는 Template Method 내에서 자주 호출된다.

## 예시

```cpp
// Factory Method 패턴
class Application {
public:
    virtual Document* createDocument() = 0;  // 팩토리 메서드
    void newDocument() {
        Document* doc = createDocument();  // 서브클래스가 결정
        docs.push_back(doc);
        doc->open();
    }
};

class DrawingApplication : public Application {
public:
    Document* createDocument() override {
        return new DrawingDocument;  // 구체 제품 생성
    }
};

// 매개변수화된 팩토리 메서드
Product* Creator::create(ProductId id) {
    if (id == MINE) return new MyProduct;
    if (id == YOURS) return new YourProduct;
    return nullptr;
}
```

## 관련 개념

- [Abstract Factory](/knowledge/language/design-patterns/abstract-factory/)
- [Template Method](/knowledge/language/design-patterns/template-method/)
- [Prototype Pattern](/knowledge/language/design-patterns/prototype-pattern/)
- [Program to Interface](/knowledge/language/design-patterns/program-to-interface/)
