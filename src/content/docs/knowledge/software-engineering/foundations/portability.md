---
title: "이식성 (Portability)"
description: "소프트웨어가 최소한의 변경으로 서로 다른 시스템, 컴파일러, 플랫폼에서 동작할 수 있는 능력"
tags: ["Software-Engineering", "Portability", "Cross-Platform", "Standards"]
created: 2026-02-25
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/portability
sidebar:
  order: 115
---

## 핵심 개념

이식성(portability)은 소프트웨어가 최소한의 변경으로 서로 다른 시스템, 컴파일러, 플랫폼에서 동작할 수 있는 능력이다.

"표준을 따르라. 주류에서 프로그래밍하라(Stick to the standard. Program in the mainstream)."

이식 가능한 코드를 작성하면 자연스럽게 더 깔끔하고 유지보수하기 좋은 코드가 된다. 이식성은 처음부터 고려해야 한다 — 나중에 추가하는 것은 매우 비용이 크다.

## 동작 원리

**핵심 원칙들:**
1. **표준 준수**: ANSI C, POSIX 등 공식 표준만 사용하라
2. **주류 코딩**: 컴파일러마다 다르게 해석될 수 있는 모호한 구문을 피하라
3. **정의되지 않은 동작(undefined behavior) 회피**: 언어 스펙에서 보장하지 않는 동작에 의존하지 마라
4. **조건부 컴파일 최소화**: `#ifdef`는 코드를 읽고 테스트하기 어렵게 만든다
5. **플랫폼 의존성 격리**: 시스템 의존 코드를 별도 파일에 모아 인터페이스 뒤에 숨겨라

## 예시

```c
/* 나쁜 예: 플랫폼 의존적 */
int x = 0x12345678;
char *p = (char *)&x;
if (*p == 0x12)  // 바이트 순서에 의존!
    printf("big-endian\n");

/* 좋은 예: 타입 크기 가정 금지 */
// Bad:  int가 32비트라고 가정
// Good: <stdint.h> 사용
#include <stdint.h>
int32_t value;  // 명시적으로 32비트

/* 좋은 예: 시스템 의존성 격리 */
// platform.h
#ifdef _WIN32
    #define PATH_SEP '\\'
#else
    #define PATH_SEP '/'
#endif

// 나머지 코드에서는 PATH_SEP만 사용
// → #ifdef가 한 곳에만 존재
```

## 관련 개념

- [바이트 순서 (Byte Order)](/knowledge/software-engineering/byte-order/) - 이식성 문제의 주요 원인 중 하나
- [조건부 컴파일 (Conditional Compilation)](/knowledge/software-engineering/conditional-compilation/) - 이식성을 위한 도구이지만 남용 금지
- [국제화 (Internationalization)](/knowledge/software-engineering/internationalization/) - 이식성의 언어/로케일 측면
- [데이터 교환 형식 (Data Exchange Format)](/knowledge/software-engineering/data-exchange-format/) - 플랫폼 간 데이터 교환 방법
