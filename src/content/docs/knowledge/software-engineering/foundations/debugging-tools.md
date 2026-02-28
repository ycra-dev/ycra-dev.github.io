---
title: "디버깅 도구 (Debugging Tools)"
description: "버그를 찾고 진단하는 데 사용하는 소프트웨어로, 디버거, print문, 로그, 어서션, 메모리 검사기, 정적 분석기 등을 포함한다"
tags: ["Software-Engineering", "Debugging", "Tools", "Debugger"]
created: 2026-02-25
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/debugging-tools
sidebar:
  order: 114
---

## 핵심 개념

디버깅 도구는 버그를 찾고 진단하는 데 사용하는 소프트웨어로, 디버거, print문, 로그, 어서션, 메모리 검사기, 정적 분석기 등을 포함한다.

도구를 활용하되 도구에만 의존하지 말라. "도구를 사용하라(Use tools)"지만 "타이핑하기 전에 읽어라(Read before typing)."

## 동작 원리

**디버거 (Debugger):**
- 브레이크포인트(breakpoint): 특정 지점에서 실행을 멈춤
- 단계 실행(single-step): 한 줄씩 실행하며 상태 변화 관찰
- 변수 검사(variable inspection): 현재 값 확인
- 조건부 브레이크포인트: 특정 조건일 때만 멈춤
- 주의: 디버거에서 단계 실행만 하면 "나무는 보지만 숲은 못 본다"

**Print 문 / 로그:**
- 가장 간단하지만 여전히 강력한 도구
- 핵심 변수의 값을 전략적 위치에서 출력
- 로그 레벨로 상세도를 조절 (DEBUG, INFO, WARN, ERROR)

**메모리 검사기:**
- Valgrind, AddressSanitizer: 메모리 누수, 버퍼 오버플로, use-after-free 감지
- 런타임에 모든 메모리 접근을 추적

**정적 분석기:**
- 코드를 실행하지 않고 잠재적 버그를 찾음
- 미초기화 변수, 타입 불일치, 도달 불가능 코드

## 예시

```c
/* 전략적 print 디버깅 */
#ifdef DEBUG
#define dprintf(...) fprintf(stderr, __VA_ARGS__)
#else
#define dprintf(...)
#endif

char *csvgetline(FILE *f) {
    dprintf("csvgetline: entering, line=%p\n", (void*)line);
    /* ... */
    dprintf("csvgetline: nfield=%d\n", nfield);
    return line;
}
```

```bash
# Valgrind으로 메모리 버그 찾기
$ valgrind --leak-check=full ./csvtest
==1234== Invalid read of size 1
==1234==    at 0x401234: split (csv.c:42)
==1234==    by 0x401567: csvgetline (csv.c:78)
==1234== Address 0x5204041 is 0 bytes after a block of size 1 alloc'd

# 컴파일러 경고를 정적 분석으로 활용
$ gcc -Wall -Wextra -Werror -fsanitize=address csv.c
```

## 관련 개념

- [디버깅 전략 (Debugging Strategy)](/knowledge/software-engineering/debugging/) - 도구를 활용한 체계적 디버깅
- [스택 트레이스 (Stack Trace)](/knowledge/software-engineering/stack-trace/) - 디버거가 보여주는 핵심 정보
- [어서션 (Assertion)](/knowledge/software-engineering/assertion/) - 코드에 삽입하는 불변식 검사
