---
title: "Object-Oriented Language"
description: "객체 지향 언어(Object-Oriented Language)는 동작(action)이나 논리(logic)보다 객체(object)를 중심으로 설계된 프로그래밍 언어이다"
tags: ['Java', 'Class', 'Inheritance', 'Method Invocation', 'Polymorphism']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/object-oriented-language
sidebar:
  order: 20
---

## 핵심 개념

객체 지향 프로그래밍의 핵심 아이디어는 프로그래머가 추상 객체 관점에서 사고하고, 각 타입의 객체와 연산을 연관짓는 것이다. 새로운 타입은 기존 타입의 정제로 볼 수 있어 코드 재사용이 용이하다. Java에서의 주요 용어: 클래스(class)는 객체의 타입 정의, 인스턴스(instance)는 클래스의 특정 객체, 메서드(method)는 클래스의 연산, 필드(field)는 클래스의 변수이다. Java의 메서드 호출은 C의 프로시저 호출보다 비용이 높은데, 조건 분기(null 검사), 메서드 테이블 로드, 메서드 주소 로드, 간접 점프가 필요하기 때문이다.

## 예시

```java
// Java 객체 지향 코드 예시
public class Sort {
    public static void sort(Comparable[] v) {
        for (int i = 0; i < v.length; i++)
            for (int j = i-1; j >= 0 && v[j].compareTo(v[j+1]) > 0; j--)
                swap(v, j);
    }

    protected static void swap(Comparable[] v, int k) {
        Comparable temp = v[k];
        v[k] = v[k+1];
        v[k+1] = temp;
    }
}
```

## 관련 개념

- [Java Virtual Machine](/knowledge/computer-architecture/java-virtual-machine/)
- [Java Bytecode](/knowledge/computer-architecture/java-bytecode/)
- [Compiler](/knowledge/computer-architecture/compiler/)
