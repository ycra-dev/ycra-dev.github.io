---
title: "어서션 (Assertion)"
description: "프로그램 실행 중 불변식을 검사하는 런타임 체크로, assert(condition)으로 사전/사후 조건을 검증하고 '불가능한' 상황을 조기에 잡아낸다"
tags: ["Software-Engineering", "Testing", "Debugging", "Defensive-Programming", "Invariant"]
created: 2026-02-25
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/assertion
sidebar:
  order: 103
---

## 핵심 개념

어서션(Assertion)은 프로그램 실행 중 불변식(invariant)을 검사하는 런타임 체크이다. `assert(condition)`으로 사전/사후 조건을 검증하고, "불가능한" 상황을 조기에 잡아내어 방어적으로 프로그래밍한다.

어서션은 "이 시점에서 이 조건은 반드시 참이어야 한다"는 프로그래머의 가정을 코드로 표현한 것이다.

## 동작 원리

**사용 시점:**
- **사전 조건 (Precondition)**: 함수 진입 시 인자가 유효한지 검사
- **사후 조건 (Postcondition)**: 함수 종료 시 결과가 올바른지 검사
- **루프 불변식**: 루프가 반복될 때마다 유지되어야 하는 조건
- **"절대 도달할 수 없는" 코드**: switch의 default, if-else 체인의 끝

**어서션 vs 에러 처리:**
- 어서션: 프로그래머의 실수를 잡음 (버그). 정상 실행에서는 절대 실패하지 않아야 한다.
- 에러 처리: 외부 환경의 문제를 처리 (파일 없음, 네트워크 끊김). 정상적으로 발생할 수 있다.

**프로덕션에서의 어서션:**
- `NDEBUG` 매크로를 정의하면 `assert()`가 제거됨
- 성능 민감한 경로에서는 비활성화 가능
- 가능하면 켜두길 권장: 필드에서 발견하는 버그가 가장 비싸다

## 예시

```c
#include <assert.h>

/* 사전 조건 검사 */
char *csvfield(int n) {
    assert(n >= 0);           /* 음수 인덱스는 버그 */
    assert(n < nfield);       /* 범위 초과는 버그 */
    return field[n];
}

/* 사후 조건 검사 */
int split(char *line) {
    /* ... 파싱 로직 ... */
    assert(nfield >= 0);      /* 필드 수는 0 이상이어야 */
    for (int i = 0; i < nfield; i++)
        assert(field[i] != NULL);  /* 모든 필드가 유효해야 */
    return nfield;
}

/* "불가능한" 상황 */
switch (state) {
    case NORMAL:   /* ... */ break;
    case QUOTED:   /* ... */ break;
    case ESCAPED:  /* ... */ break;
    default:
        assert(0 && "impossible state in CSV parser");
}
```

```c
/* 루프 불변식 */
/* 이진 탐색에서: lo <= target의 위치 <= hi */
int binary_search(int a[], int n, int target) {
    int lo = 0, hi = n - 1;
    while (lo <= hi) {
        assert(lo >= 0 && hi < n);   /* 범위 내 */
        int mid = lo + (hi - lo) / 2;
        if (a[mid] < target)      lo = mid + 1;
        else if (a[mid] > target) hi = mid - 1;
        else return mid;
    }
    return -1;
}
```

## 관련 개념

- [에러 처리 (Error Handling)](/knowledge/software-engineering/error-handling/) - 어서션과 에러 처리의 차이
- [디버깅 도구 (Debugging Tools)](/knowledge/software-engineering/debugging-tools/) - 어서션은 디버깅 도구의 일종이다
- [경계값 테스팅 (Boundary Testing)](/knowledge/software-engineering/boundary-testing/) - 어서션으로 경계 조건 위반을 감지한다
