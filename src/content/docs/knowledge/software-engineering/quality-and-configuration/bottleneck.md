---
title: "병목 (Bottleneck)"
description: "전체 시스템 성능을 제한하는 가장 느린 구간으로, 대개 프로그램의 작은 일부분이 전체 실행 시간의 대부분을 차지한다"
tags: ["Software-Engineering", "Performance", "Bottleneck", "Optimization"]
created: 2026-02-25
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/bottleneck
sidebar:
  order: 202
---

## 핵심 개념

병목(bottleneck)은 전체 시스템 성능을 제한하는 가장 느린 구간으로, 대개 프로그램의 작은 일부분이 전체 실행 시간의 대부분을 차지한다.

Pareto 원칙이 소프트웨어 성능에도 적용된다: 코드의 소수 부분이 실행 시간의 대부분을 차지한다.

**핵심 교훈**: 알고리즘 개선이 코드 최적화보다 항상 우선한다.

## 동작 원리

병목을 해결하려면 반드시 **프로파일링을 먼저** 수행하여 실제 병목 지점을 파악해야 한다.

**병목의 일반적인 원인:**
- **비효율적인 알고리즘**: O(n²)을 O(n log n)으로 바꾸면 극적인 개선
- **불필요한 I/O**: 디스크나 네트워크 접근이 CPU보다 수만 배 느림
- **잘못된 데이터 구조**: 선형 탐색 대신 해시 테이블 사용
- **메모리 할당 패턴**: 잦은 malloc/free가 성능 저하 유발

## 예시

```c
/* 스팸 필터 병목 예시 */

// Before: O(n²) - 모든 패턴을 순차적으로 비교
int is_spam(char *msg, char **patterns, int npatterns) {
    for (int i = 0; i < npatterns; i++)
        if (strstr(msg, patterns[i]) != NULL)
            return 1;
    return 0;
}

// After: O(n log n) - 패턴을 정렬하고 이진 탐색
// 또는 해시 기반 멀티패턴 매칭 (Aho-Corasick)
// → 패턴 수가 많을수록 개선 효과 극대화

/* 실제 결과:
 * 1000개 패턴, 10000개 메시지:
 * Before: 45초
 * After:   0.3초 (150배 개선)
 */
```

## 관련 개념

- [프로파일링 (Profiling)](/knowledge/software-engineering/profiling/) - 병목을 찾는 도구
- [코드 최적화 (Code Optimization)](/knowledge/software-engineering/code-optimization/) - 병목 지점에만 최적화를 적용한다
