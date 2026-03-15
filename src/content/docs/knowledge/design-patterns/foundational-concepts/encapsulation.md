---
title: "캡슐화 (Encapsulation)"
description: "객체의 내부 상태와 구현을 외부로부터 숨기고, 오직 정의된 인터페이스를 통해서만 접근을 허용하는 원칙"
tags: ['Encapsulation', 'Information Hiding', 'Object Oriented', 'Modularity']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/language/design-patterns/encapsulation
sidebar:
  order: 4
---

## 핵심 개념

캡슐화에 의해 객체의 내부 데이터는 직접 접근이 불가능하며, 요청(request)을 통해서만 연산을 실행하고 상태를 변경할 수 있다. 이로써 내부 표현(representation)이 외부에 노출되지 않아, 구현 변경이 클라이언트에 영향을 주지 않는다. 디자인 패턴에서 캡슐화는 "변화하는 개념을 캡슐화하라(encapsulate the concept that varies)"라는 핵심 테마로 반복 등장한다. Strategy는 알고리즘을, State는 상태 전이를, Bridge는 구현을, Abstract Factory는 객체 생성을 캡슐화한다. 상속은 부모 클래스의 구현을 자식 클래스에 노출시키므로, "상속은 캡슐화를 깨뜨린다"는 점에 주의해야 한다.

## 예시

```cpp
// 캡슐화 예시 - 내부 표현 변경이 클라이언트에 무영향
class Stack {
private:
    // 내부 표현: 배열 → 연결 리스트로 바꿔도 인터페이스 불변
    int data[100];
    int top;
public:
    void push(int val);
    int pop();
    bool isEmpty();
};
```

## 관련 개념

[Polymorphism](/knowledge/language/design-patterns/polymorphism/), [Object Composition](/knowledge/language/design-patterns/object-composition/), [Class Inheritance](/knowledge/language/design-patterns/class-inheritance/), [Program to Interface](/knowledge/language/design-patterns/program-to-interface/)
