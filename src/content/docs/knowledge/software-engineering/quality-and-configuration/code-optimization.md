---
title: "코드 최적화 (Code Optimization)"
description: "프로그램의 실행 속도를 높이기 위해 코드 수준에서 적용하는 기법들로, 중요하지 않은 부분은 최적화하지 않는 것이 핵심 원칙이다"
tags: ["Software-Engineering", "Performance", "Optimization", "Compiler"]
created: 2026-02-25
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/code-optimization
sidebar:
  order: 201
---

## 핵심 개념

코드 최적화는 프로그램의 실행 속도를 높이기 위해 코드 수준에서 적용하는 기법들의 모음이다. 최적화의 황금률: **"중요하지 않은 것을 최적화하지 마라."**

프로파일링으로 핫스팟을 찾은 후에만 최적화를 시작한다.

## 동작 원리

**코드 수준 최적화 기법들:**
1. **공통 부분식 수집(Common Subexpression Elimination)**: 반복 계산되는 식을 변수에 저장
2. **비싼 연산을 싼 연산으로 대체**: 나눗셈 → 비트 시프트, 함수 호출 → 인라인
3. **루프 제거 또는 언롤링**: 루프 오버헤드 감소
4. **자주 사용하는 값 캐싱**: 반복 접근하는 결과를 저장
5. **버퍼 I/O**: 작은 단위의 반복 I/O를 모아서 처리

**컴파일러 최적화를 먼저 활성화하라** (`-O2`, `-O3`). 컴파일러가 이미 많은 최적화를 수행할 수 있으며, 수동 최적화보다 안전하다.

## 예시

```c
/* 공통 부분식 수집 */
// Before:
for (i = 0; i < n; i++)
    a[i] = strlen(s) * i;  // strlen을 매번 호출

// After:
int len = strlen(s);
for (i = 0; i < n; i++)
    a[i] = len * i;

/* 비싼 연산 대체 */
// Before:
for (i = 0; i < n; i++)
    result[i] = data[i] / 8;

// After:
for (i = 0; i < n; i++)
    result[i] = data[i] >> 3;  // 비트 시프트가 나눗셈보다 빠름

/* 버퍼 I/O */
// Before: 한 바이트씩 출력
for (i = 0; i < n; i++)
    putchar(data[i]);

// After: 버퍼로 모아서 한 번에 출력
fwrite(data, 1, n, stdout);
```

## 관련 개념

- [프로파일링 (Profiling)](/knowledge/software-engineering/profiling/) - 최적화 전에 반드시 수행한다
- [공간-시간 트레이드오프 (Space-Time Tradeoff)](/knowledge/software-engineering/space-time-tradeoff/) - 메모리와 속도의 교환
- [병목 (Bottleneck)](/knowledge/software-engineering/bottleneck/) - 알고리즘 개선이 코드 최적화보다 우선한다
