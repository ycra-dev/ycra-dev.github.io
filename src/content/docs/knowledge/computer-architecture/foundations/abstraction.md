---
title: "Abstraction"
description: "추상화(Abstraction)는 설계를 다양한 수준의 표현으로 나타내어 하위 수준의 세부 사항을 숨기고 상위 수준에서 더 단순한 모델을 제공하는 기법이다"
tags: ['Computer Architecture', 'Design Principle', 'Software Engineering', 'Hardware Design']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/abstraction
sidebar:
  order: 1
---

## 핵심 개념

추상화는 컴퓨터 아키텍처의 7대 아이디어 중 하나로, 하드웨어와 소프트웨어 모두에서 생산성을 높이는 핵심 기법이다. 하드웨어와 소프트웨어는 계층적 레이어로 구성되며, 각 하위 계층은 상위 계층에서 세부 사항을 숨긴다. 가장 중요한 추상화 중 하나는 명령어 집합 구조(ISA)로, 하드웨어와 최하위 수준 소프트웨어 사이의 인터페이스 역할을 한다. 이 추상 인터페이스를 통해 비용과 성능이 다른 여러 구현이 동일한 소프트웨어를 실행할 수 있다.

## 예시

운영체제는 I/O 장치의 세부 사항을 캡슐화하여 애플리케이션 프로그래머가 저수준 시스템 기능을 직접 다룰 필요가 없게 한다.

```
고수준 언어 (C, Java)
    ↓ 컴파일러
어셈블리 언어
    ↓ 어셈블러
기계어 (바이너리)
    ↓
하드웨어
```

각 계층은 아래 계층의 세부 사항을 숨기며, 프로그래머는 자신이 작업하는 수준에서만 사고할 수 있다.

## 관련 개념

- [Instruction Set Architecture](/knowledge/computer-architecture/instruction-set-architecture/)
- [Compiler](/knowledge/language/compiler/)
- [Operating System](/knowledge/computer-architecture/operating-system/)
- [Application Binary Interface](/knowledge/computer-architecture/application-binary-interface/)
