---
title: "분기 명령어 (Branch Instruction)"
description: "프로그램의 실행 흐름을 변경하는 명령어로 무조건 분기(GOTO)와 조건 분기(IFZERO)가 있으며 반복문과 조건문의 하드웨어적 기반"
tags: ["Computer-Architecture", "CPU", "Branch", "Control-Flow", "Instruction"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/computer-architecture/branch-instruction
sidebar:
  order: 40
---

## 핵심 개념

분기 명령어(Branch Instruction)는 프로그램의 실행 흐름을 변경하는 명령어이다. GOTO(무조건 분기)는 항상 지정된 주소로 점프하고, IFZERO(조건 분기)는 특정 조건이 만족될 때만 점프한다. 반복문과 조건문의 하드웨어적 기반이 된다.

## 동작 원리

일반적으로 CPU는 명령어를 메모리 주소 순서대로 하나씩 실행한다(프로그램 카운터가 1씩 증가). 분기 명령어는 이 순차적 흐름을 깨고 **다른 위치로 점프**하게 만든다.

### 두 가지 유형

1. **무조건 분기 (GOTO / JUMP)**
   - 항상 지정된 주소로 프로그램 카운터를 변경한다.
   - 사용 예: 함수 호출, 무한 루프

2. **조건 분기 (IFZERO / Branch if condition)**
   - 특정 조건(예: 누산기 값이 0인가?)을 검사하여, 조건이 참이면 점프하고 거짓이면 다음 명령어로 진행한다.
   - 사용 예: if-else 문, while 루프, for 루프

### 프로그래밍과의 관계
고급 프로그래밍 언어의 모든 제어 구조는 궁극적으로 분기 명령어로 번역된다:
- **if-else**: 조건 분기로 구현
- **while/for 루프**: 조건 분기 + 무조건 분기(루프 시작으로 돌아감)의 조합
- **함수 호출**: 무조건 분기 + 돌아올 주소 저장

분기 명령어 덕분에 컴퓨터는 **범용 계산 기계**가 될 수 있다.

## 예시

조건 분기로 구현하는 "1부터 10까지의 합" (가상 어셈블리):

```
주소  명령어         의미                    고급 언어 대응
100   LOAD  #0      누산기 = 0              sum = 0
101   STORE 300     메모리[300] = 0
102   LOAD  #1      누산기 = 1              i = 1
103   STORE 301     메모리[301] = 1
104   LOAD  300     누산기 = sum            ← 루프 시작
105   ADD   301     누산기 = sum + i        sum = sum + i
106   STORE 300     메모리[300] = sum
107   LOAD  301     누산기 = i
108   ADD   #1      누산기 = i + 1          i = i + 1
109   STORE 301     메모리[301] = i
110   ADD   #-11    누산기 = i - 11
111   IFZERO 113    i==11이면 종료로 점프    if i > 10: break
112   GOTO  104     루프 시작으로 점프
113   ...           루프 종료 후 계속
```

이것이 고급 언어에서는 단순히:

```python
sum = 0
for i in range(1, 11):
    sum += i
```

## 관련 개념

- [명령어 실행 주기 (Fetch-Decode-Execute Cycle)](/knowledge/computer-architecture/fetch-decode-execute-cycle/) - 분기 명령어가 프로그램 카운터를 변경하는 시점
- [CPU](/knowledge/computer-architecture/cpu-basics/) - 분기 명령어를 실행하는 하드웨어
- [튜링 머신 (Turing Machine)](/knowledge/computer-architecture/turing-machine/) - 분기가 범용 계산 능력의 핵심 요소

## 출처

- Understanding the Digital World, Chapter 3
