---
title: "스택 트레이스 (Stack Trace)"
description: "프로그램이 실패한 시점의 호출 스택 스냅샷으로, 가장 가치 있는 디버깅 단서이다"
tags: ["Software-Engineering", "Debugging", "Call-Stack", "Crash-Analysis"]
created: 2026-02-25
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/stack-trace
sidebar:
  order: 113
---

## 핵심 개념

스택 트레이스(Stack Trace)는 프로그램이 실패한 시점의 호출 스택(call stack) 스냅샷이다. 가장 가치 있는 디버깅 단서로, 크래시가 발생하면 즉시 스택 트레이스를 확보해야 한다.

## 동작 원리

스택 트레이스는 에러가 발생한 지점까지의 함수 호출 체인을 보여준다.

1. **어디서 죽었는가**: 크래시가 발생한 정확한 함수와 라인을 알 수 있다.
2. **어떻게 거기까지 갔는가**: 호출 경로를 역추적하여 문제의 근본 원인을 파악한다.
3. **각 프레임의 상태**: 각 함수 호출 시점의 지역 변수와 인자 값을 확인한다.

**스택 트레이스를 읽는 법:**
- **가장 위 (top)**: 실제로 크래시가 발생한 함수
- **아래로 내려갈수록**: 호출자(caller)를 보여줌
- **가장 아래 (bottom)**: 보통 `main()` 또는 스레드 시작 함수

크래시가 발생하면 **즉시** 스택 트레이스를 얻어라. 코어 덤프를 디버거에 로드하거나, 예외의 스택 트레이스를 출력하라. 나중에 재현하려고 하면 상황이 달라질 수 있다.

## 예시

```bash
# GDB에서 스택 트레이스 확인
$ gdb ./program core
(gdb) bt
#0  0x00401234 in split (line=0x0) at csv.c:42
#1  0x00401567 in csvgetline (f=0x7fff5fc01050) at csv.c:78
#2  0x00401890 in process_file (name="data.csv") at main.c:23
#3  0x00401abc in main (argc=2, argv=0x7fff5fbff8a0) at main.c:45

# 해석:
# - split()에서 line이 NULL (0x0) → 널 포인터 역참조
# - csvgetline()이 split()에 NULL을 전달한 것이 원인
# - csv.c:78을 확인하면 line 초기화 누락 발견
```

```java
// Java 예외 스택 트레이스
Exception in thread "main" java.lang.NullPointerException
    at CsvParser.split(CsvParser.java:42)
    at CsvParser.getLine(CsvParser.java:78)
    at Main.processFile(Main.java:23)
    at Main.main(Main.java:45)
```

## 관련 개념

- [디버깅 전략 (Debugging Strategy)](/knowledge/software-engineering/debugging/) - 스택 트레이스를 활용한 체계적 디버깅
- [디버깅 도구 (Debugging Tools)](/knowledge/software-engineering/debugging-tools/) - GDB, IDE 등 스택 트레이스를 확인하는 도구
