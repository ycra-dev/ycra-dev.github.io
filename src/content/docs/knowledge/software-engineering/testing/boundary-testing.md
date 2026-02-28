---
title: "경계값 테스팅 (Boundary Testing)"
description: "입력 도메인의 경계에서 테스트하는 기법으로, 대부분의 버그는 경계에 몰려 있으므로 빈 입력, 단일 원소, 최댓값, off-by-one 등을 집중적으로 검사한다"
tags: ["Software-Engineering", "Testing", "Edge-Cases", "Boundary-Conditions"]
created: 2026-02-25
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/boundary-testing
sidebar:
  order: 100
---

## 핵심 개념

경계값 테스팅은 입력 도메인의 경계(edge)에서 테스트하는 기법이다. 프로그래머들은 "정상적인" 입력에 대해서는 올바르게 코딩하지만, 극단적인 경우를 놓치기 쉽다. 대부분의 버그는 경계에 몰려 있다.

## 동작 원리

**크기 경계:**
- 빈 입력 (0개 원소)
- 하나의 원소
- 정확히 두 개의 원소 (비교/정렬에서 중요)
- 최대 크기 (버퍼 한계)

**값 경계:**
- 0, 1, -1
- 최솟값, 최댓값 (INT_MIN, INT_MAX)
- NULL 포인터
- 빈 문자열 ""

**구조 경계:**
- 첫 번째 원소, 마지막 원소
- 중복 원소 (모두 같은 값)
- 이미 정렬된 입력, 역순 정렬

## 예시

```c
/* 경계값 테스트 케이스 예시: 이진 탐색 */
int binary_search(int a[], int n, int target);

/* 크기 경계 */
test(NULL, 0, 42);           // 빈 배열
test({5}, 1, 5);             // 원소 1개, 찾음
test({5}, 1, 3);             // 원소 1개, 못 찾음
test({1,2}, 2, 1);           // 원소 2개, 첫 번째
test({1,2}, 2, 2);           // 원소 2개, 마지막
test({1,2}, 2, 0);           // 원소 2개, 범위 밖 (작음)
test({1,2}, 2, 3);           // 원소 2개, 범위 밖 (큼)

/* 값 경계 */
test({INT_MIN, 0, INT_MAX}, 3, INT_MIN);
test({INT_MIN, 0, INT_MAX}, 3, INT_MAX);

/* 구조 경계 */
test({1,1,1,1,1}, 5, 1);    // 모두 같은 값
```

```
CSV 파서 경계 테스트:
입력          → 기대 결과
""            → 0 필드
","           → 2개의 빈 필드
"\"\""        → 1개의 빈 따옴표 필드
"a"           → 1개의 필드 "a"
"a,b,c,...(10000개)" → 10000개 필드 (버퍼 확장)
```

## 관련 개념

- [스트레스 테스팅 (Stress Testing)](/knowledge/software-engineering/stress-testing/) - 극단적인 입력으로 테스트하는 기법
- [회귀 테스팅 (Regression Testing)](/knowledge/software-engineering/regression-testing/) - 경계 테스트 케이스를 회귀 테스트로 유지한다
- [어서션 (Assertion)](/knowledge/software-engineering/assertion/) - 경계 조건 위반을 코드에서 감지하는 방법
