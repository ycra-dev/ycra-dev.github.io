---
title: "스트레스 테스팅 (Stress Testing)"
description: "극단적인 입력(거대한 데이터, 무작위 데이터, 빠른 연속 요청)으로 프로그램을 시험하는 것으로, 정상적인 테스트와는 다른 종류의 버그를 발견한다"
tags: ["Software-Engineering", "Testing", "Stress-Test", "Fuzz-Testing", "Robustness"]
created: 2026-02-25
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/stress-testing
sidebar:
  order: 102
---

## 핵심 개념

스트레스 테스팅은 극단적인 입력(거대한 데이터, 무작위 데이터, 빠른 연속 요청)으로 프로그램을 시험하는 것이다. 정상적인 테스트 케이스는 프로그래머가 예상한 상황을 검증하지만, 스트레스 테스트는 "예상 밖"의 상황을 시뮬레이션한다.

## 동작 원리

**극단적 크기:**
- 수백만 줄의 입력
- 수십 MB의 단일 줄
- 수만 개의 필드
- 메모리 한계에 근접하는 데이터

**무작위 입력 (Random/Fuzz Testing):**
- 무작위 문자열을 생성하여 입력으로 사용
- 유효한 형식의 무작위 데이터 (구조는 맞지만 내용은 랜덤)
- 부분적으로 손상된 입력
- 프로그래머가 생각하지 못한 조합을 탐색

**빠른 연속 실행:**
- 같은 연산을 수천 번 반복
- 메모리 누수 감지 (시간이 지날수록 메모리 사용량 증가)
- 타이밍 관련 버그 (race condition)

무작위 테스트의 핵심: 정답을 알 수 없더라도, 크래시하지 않는 것은 확인할 수 있다.

## 예시

```c
/* 무작위 CSV 데이터 생성기 */
#include <stdlib.h>
#include <stdio.h>

void gen_random_csv(int nlines, int maxfields, int maxlen) {
    for (int i = 0; i < nlines; i++) {
        int nf = rand() % maxfields + 1;
        for (int j = 0; j < nf; j++) {
            if (j > 0) putchar(',');
            int len = rand() % maxlen;
            int quoted = rand() % 3 == 0;
            if (quoted) putchar('"');
            for (int k = 0; k < len; k++) {
                char c = 'a' + rand() % 26;
                putchar(c);
            }
            if (quoted) putchar('"');
        }
        putchar('\n');
    }
}
```

```bash
# 스트레스 테스트 실행

# 1. 거대한 입력
./gen_random_csv 1000000 100 1000 | ./csvtest

# 2. 반복 실행으로 메모리 누수 확인
for i in $(seq 1 10000); do
    echo "a,b,c" | ./csvtest > /dev/null
done

# 3. valgrind과 함께 무작위 입력
./gen_random_csv 10000 50 500 | valgrind ./csvtest > /dev/null
```

## 관련 개념

- [경계값 테스팅 (Boundary Testing)](/knowledge/software-engineering/boundary-testing/) - 경계값 테스트의 더 극단적인 형태
- [테스트 커버리지 (Test Coverage)](/knowledge/software-engineering/test-coverage/) - 스트레스 테스트로 발견되지 않은 경로를 커버리지로 확인한다
