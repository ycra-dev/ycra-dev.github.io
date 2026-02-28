---
title: "인터페이스 설계 원칙 (Interface Design Principles)"
description: "모듈 간의 경계를 정의하는 것으로, 구현 세부사항을 숨기고 사용자에게 필요한 최소한의 기능만 노출하는 원칙"
tags: ["Software-Engineering", "Interface", "API-Design", "Modularity"]
created: 2026-02-25
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/interface-design
sidebar:
  order: 107
---

## 핵심 개념

소프트웨어 인터페이스 설계는 모듈 간의 경계를 정의하는 것으로, 구현 세부사항을 숨기고 사용자에게 필요한 최소한의 기능만 노출하는 원칙을 따른다.

## 동작 원리

**좋은 인터페이스 설계의 네 가지 핵심 원칙:**

1. **구현 세부사항을 숨겨라 (Hide implementation details)**: 내부 데이터 구조와 알고리즘을 노출하지 않는다. 사용자는 "무엇을" 할 수 있는지만 알면 된다.

2. **작고 직교적인 프리미티브 집합을 선택하라 (Choose a small orthogonal set of primitives)**: 각 함수는 하나의 일을 잘 수행해야 하며, 기능이 겹치지 않아야 한다. 적은 수의 조합 가능한 연산이 많은 수의 특수 연산보다 낫다.

3. **사용자 뒤에서 몰래 행동하지 마라 (Don't reach behind the user's back)**: 전역 상태를 변경하거나, 예상치 못한 부작용을 일으키지 않는다. 함수 호출의 결과는 예측 가능해야 한다.

4. **같은 일은 같은 방식으로 하라 (Do the same thing the same way everywhere)**: 일관성이 핵심이다. 비슷한 연산은 비슷한 이름, 비슷한 인자 순서, 비슷한 반환값을 가져야 한다.

좋은 인터페이스는 한 번에 나오지 않는다. 프로토타입에서 시작해 사용 경험을 바탕으로 개선해야 한다.

## 예시

```c
/* 나쁜 인터페이스: 내부 구조 노출 */
struct CSV {
    char **fields;   /* 사용자가 직접 접근 */
    int nfields;
    char *line;
};

/* 좋은 인터페이스: 접근 함수 제공 */
char *csvgetline(FILE *f);    /* 한 줄 읽기 */
char *csvfield(int n);         /* n번째 필드 반환 */
int csvnfield(void);           /* 필드 수 반환 */
```

직교성의 예: `stdio` 라이브러리에서 `fopen`, `fclose`, `fread`, `fwrite`는 각각 독립적인 연산을 수행하며, 조합하여 모든 파일 I/O를 처리할 수 있다.

## 관련 개념

- [정보 은닉 (Information Hiding)](/knowledge/software-engineering/information-hiding/) - 인터페이스 설계의 핵심 원칙
- [추상화 (Abstraction)](/knowledge/software-engineering/abstraction/) - 구현과 사용자 사이의 추상화 계층
- [API](/knowledge/software-engineering/api-basics/) - 공개 인터페이스의 설계 원칙
