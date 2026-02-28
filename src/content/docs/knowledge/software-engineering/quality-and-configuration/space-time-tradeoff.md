---
title: "공간-시간 트레이드오프 (Space-Time Tradeoff)"
description: "메모리(공간)를 더 사용하여 속도(시간)를 높이거나, 반대로 시간을 들여 메모리를 절약하는 설계 전략"
tags: ["Software-Engineering", "Performance", "Trade-off", "Caching", "Memory"]
created: 2026-02-25
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/space-time-tradeoff
sidebar:
  order: 203
---

## 핵심 개념

공간-시간 트레이드오프는 메모리(공간)를 더 사용하여 속도(시간)를 높이거나, 반대로 시간을 들여 메모리를 절약하는 설계 전략이다.

컴퓨팅에서 공간과 시간은 대체 관계에 있는 경우가 많다. 어떤 자원이 더 제한적인지에 따라 전략을 선택한다.

## 동작 원리

**시간을 줄이기 위해 공간을 사용하는 경우:**
- **캐싱(Caching)**: 계산 결과를 저장하여 재계산 방지
- **룩업 테이블(Lookup Table)**: 미리 계산한 값의 테이블을 조회
- **메모이제이션(Memoization)**: 함수 호출 결과를 기억
- **인덱싱**: 검색 속도를 높이기 위한 추가 데이터 구조

**공간을 줄이기 위해 시간을 사용하는 경우:**
- **압축(Compression)**: 데이터를 압축하여 저장, 사용 시 해제
- **재계산(Recomputation)**: 저장 대신 필요할 때 다시 계산
- **스트리밍 처리**: 전체를 메모리에 올리지 않고 순차 처리

선택 기준은 해당 시스템의 **제약 조건**이다. 메모리가 충분하면 캐싱을, 메모리가 부족하면 재계산을 선택한다.

## 예시

```c
/* 룩업 테이블: sin 값을 미리 계산 */
double sin_table[360];

void init_sin_table(void) {
    for (int i = 0; i < 360; i++)
        sin_table[i] = sin(i * M_PI / 180.0);
}

double fast_sin(int degrees) {
    return sin_table[degrees % 360];  // O(1) 조회
}

/* 메모이제이션: 피보나치 */
// Before: O(2^n) - 지수적 시간
int fib(int n) {
    if (n <= 1) return n;
    return fib(n-1) + fib(n-2);
}

// After: O(n) - 선형 시간, O(n) 공간 사용
int memo[MAX_N] = {0};
int fib_memo(int n) {
    if (n <= 1) return n;
    if (memo[n] != 0) return memo[n];
    memo[n] = fib_memo(n-1) + fib_memo(n-2);
    return memo[n];
}
```

## 관련 개념

- [코드 최적화 (Code Optimization)](/knowledge/software-engineering/code-optimization/) - 공간-시간 트레이드오프의 실제 적용
- [메모리 할당자 (Memory Allocator)](/knowledge/software-engineering/memory-allocator/) - 메모리를 미리 할당하여 시간을 절약하는 예
