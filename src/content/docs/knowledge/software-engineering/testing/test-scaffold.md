---
title: "테스트 스캐폴드 (Test Scaffold)"
description: "테스트를 지원하기 위해 임시로 만드는 코드로, 테스트 데이터로 함수를 호출하는 드라이버와 아직 없는 컴포넌트를 흉내 내는 스텁이 포함된다"
tags: ["Software-Engineering", "Testing", "Scaffold", "Driver", "Stub"]
created: 2026-02-25
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/test-scaffold
sidebar:
  order: 101
---

## 핵심 개념

테스트 스캐폴드(scaffold)는 테스트를 지원하기 위해 임시로 만드는 코드이다. 건물을 지을 때 비계(scaffold)를 세우듯, 소프트웨어를 테스트할 때도 임시 지지 구조가 필요하다.

## 동작 원리

**드라이버 (Driver):**
- 테스트 대상 함수를 호출하는 작은 프로그램
- 테스트 데이터를 준비하고, 함수를 호출하고, 결과를 검증한다
- `main()` 함수가 없는 라이브러리 함수를 독립적으로 테스트할 수 있게 해준다

**스텁 (Stub):**
- 아직 구현되지 않은 함수의 단순화된 대체물
- 하드코딩된 값을 반환하거나, 호출 여부만 기록한다
- 테스트 대상을 의존성으로부터 격리한다

**자체 완결적 테스트 프로그램:**
- 외부 파일이나 환경에 의존하지 않는 테스트
- 테스트 데이터를 코드 안에 포함
- 어디서든 컴파일하고 실행할 수 있다

## 예시

```c
/* CSV 파서 테스트 드라이버 */
#include <stdio.h>
#include "csv.h"

int main(void) {
    char *line;

    /* 테스트 데이터를 stdin으로 제공 */
    while ((line = csvgetline(stdin)) != NULL) {
        printf("line = '%s'\n", line);
        for (int i = 0; i < csvnfield(); i++)
            printf("field[%d] = '%s'\n", i, csvfield(i));
        printf("---\n");
    }
    return 0;
}
```

```c
/* 스텁 예시: 네트워크 함수를 로컬 파일로 대체 */
/* 테스트용 스텁 */
int fetch_url(const char *url, char *buf, int size) {
    /* 하드코딩된 테스트 데이터 반환 */
    strncpy(buf, "name,age\nAlice,30\n", size);
    return 0;  /* 성공 */
}
```

```c
/* 자체 완결적 테스트 */
struct {
    char *input;
    int nfields;
    char *fields[10];
} tests[] = {
    {"",          0, {}},
    {"hello",     1, {"hello"}},
    {"a,b,c",     3, {"a", "b", "c"}},
    {"\"a,b\",c", 2, {"a,b", "c"}},
    {NULL,        0, {}}
};
```

## 관련 개념

- [테스트 자동화 (Test Automation)](/knowledge/software-engineering/automated-testing/) - 드라이버를 자동화하면 회귀 테스트가 된다
- [경계값 테스팅 (Boundary Testing)](/knowledge/software-engineering/boundary-testing/) - 드라이버로 경계값을 체계적으로 테스트한다
- [회귀 테스팅 (Regression Testing)](/knowledge/software-engineering/regression-testing/) - 자체 완결적 테스트를 회귀 테스트로 활용한다
