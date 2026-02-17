---
title: "Refactoring"
description: "리팩토링은 소프트웨어의 외부 동작(기능)은 변경하지 않으면서 코드의 내부 구조를 개선하여 이해도와 유지보수성을 높이는 프로그램 개선 기법이다"
tags: ['Refactoring', 'Code Smell', 'Clean Code', 'Code Improvement', 'Preventive Maintenance']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/software-engineering/refactoring
sidebar:
  order: 3
---

## 핵심 개념

리팩토링은 Fowler 등이 체계화했으며, 코드 품질을 저하시키는 "나쁜 냄새(bad smells)"를 식별하고 개선하는 과정이다. 대표적인 나쁜 냄새로는 중복 코드(duplicate code), 긴 메서드(long methods), switch 문, 데이터 뭉침(data clumps), 추측성 일반화(speculative generality) 등이 있다. 리팩토링은 애자일 개발의 핵심 실천법으로, 변경에 의한 코드 구조 저하를 예방하는 "예방적 유지보수"로 볼 수 있다. 리엔지니어링과 달리, 리팩토링은 개발 과정 내내 지속적으로 수행된다.

## 예시

리팩토링 변환 예시:
```java
// Before: 중복 코드 (bad smell)
void printOwing() {
    System.out.println("name: " + name);
    System.out.println("amount: " + getAmount());
}
void printDetails() {
    System.out.println("name: " + name);
    System.out.println("amount: " + getAmount());
}

// After: Extract Method 리팩토링
void printBanner() {
    System.out.println("name: " + name);
    System.out.println("amount: " + getAmount());
}
void printOwing() { printBanner(); }
void printDetails() { printBanner(); }
```

## 관련 개념

- [Software Reengineering](/knowledge/software-engineering/software-reengineering/)
- [Software Maintenance](/knowledge/software-engineering/software-maintenance/)
- [Extreme Programming](/knowledge/software-engineering/extreme-programming/)
- [Test-driven Development](/knowledge/software-engineering/test-driven-development/)
