---
title: "객체 지향 프로그래밍 (OOP)"
description: "객체 지향 프로그래밍은 데이터와 그 데이터를 조작하는 메서드를 하나의 객체로 묶어 프로그램을 구성하는 프로그래밍 패러다임이다."
tags: ["Software Engineering", "OOP", "Programming Paradigm", "Classes"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/design-and-evolution/object-oriented-programming
sidebar:
  order: 24
---

## 핵심 개념

OOP는 클래스(class)와 객체(object)를 중심으로 코드를 구성한다. 4가지 핵심 원칙:

- **캡슐화(Encapsulation)**: 데이터와 메서드를 하나로 묶고, 내부 구현을 숨김
- **상속(Inheritance)**: 부모 클래스의 특성을 자식 클래스가 물려받음
- **다형성(Polymorphism)**: 같은 인터페이스로 다양한 타입을 처리
- **추상화(Abstraction)**: 복잡한 내부를 숨기고 필요한 인터페이스만 노출

C++는 C에 객체 지향 기능을 추가하기 위해 만들어졌으며, Java와 C#은 처음부터 객체 지향 언어로 설계되었다.

## 동작 원리

현대의 많은 프로그래밍 언어는 순수한 OOP가 아니라 **멀티 패러다임**으로 발전하고 있다. Python이나 Ruby도 객체 지향을 지원하면서 동시에 절차적, 함수형 프로그래밍이 가능하다.

| 언어 | 특징 |
|------|------|
| C++ | C에 클래스, 가상 함수, 상속 등 OOP 기능 추가 |
| Java | 처음부터 OOP 설계, "Everything is an object" |
| C# | Microsoft가 설계한 우아한 OOP 언어, Java와 매우 유사 |
| Python | OOP, 절차적, 함수형 모두 지원하는 멀티 패러다임 |

## 예시

```java
// Java - 객체 지향 언어의 클래스 예시
public class Car {
    private String model;
    private int speed;

    public Car(String model) {
        this.model = model;
        this.speed = 0;
    }

    public void accelerate(int amount) {
        this.speed += amount;
    }

    public int getSpeed() {
        return this.speed;
    }
}
```

## 관련 개념

- [객체지향 설계 (Object-Oriented Design)](/knowledge/software-engineering/design-and-evolution/object-oriented-design/)
- [함수형 프로그래밍 (Functional Programming)](/knowledge/software-engineering/foundations/functional-programming/)
- [리팩토링 (Refactoring)](/knowledge/software-engineering/design-and-evolution/refactoring/)
