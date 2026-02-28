---
title: "명령어 실행 주기 (Fetch-Decode-Execute Cycle)"
description: "CPU가 프로그램을 실행하는 기본 동작 순환으로 인출, 해석, 실행의 세 단계를 끊임없이 반복한다"
tags: ["Computer-Architecture", "CPU", "Instruction-Cycle", "Hardware"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/computer-architecture/fetch-decode-execute-cycle
sidebar:
  order: 39
---

## 핵심 개념

명령어 실행 주기(Fetch-Decode-Execute Cycle)는 CPU가 프로그램을 실행하는 기본 동작 순환이다. 메모리에서 명령어를 가져오고(Fetch), 그 명령어를 해석하고(Decode), 해석된 동작을 수행한(Execute) 뒤, 다음 명령어로 넘어가는 과정을 끊임없이 반복한다.

## 동작 원리

컴퓨터가 전원이 켜져 있는 동안 CPU는 이 주기를 초당 수십억 번 반복한다. 아무리 복잡한 프로그램도 결국 이 단순한 세 단계의 반복으로 실행된다.

### 세 단계의 상세

1. **Fetch (인출)**
   - **프로그램 카운터(PC)**가 가리키는 메모리 주소에서 다음 명령어를 가져온다.
   - 가져온 명령어는 **명령어 레지스터(IR)**에 저장된다.
   - 프로그램 카운터가 자동으로 다음 명령어 주소로 증가한다.

2. **Decode (해석)**
   - 명령어 레지스터의 내용을 분석하여 어떤 연산인지, 피연산자가 무엇인지 파악한다.
   - 예: "누산기에 메모리 주소 100번지의 값을 더하라"

3. **Execute (실행)**
   - 해석된 연산을 실제로 수행한다.
   - ALU에서 산술/논리 연산을 하거나, 메모리에서 데이터를 읽고 쓰거나, I/O 장치와 통신한다.

### 핵심 포인트
- 이 주기의 속도는 **클럭 속도**에 의해 결정된다. 3GHz CPU는 초당 30억 번의 클럭 틱을 발생시킨다.
- 현대 CPU는 **파이프라이닝**으로 여러 명령어의 Fetch/Decode/Execute를 동시에 겹쳐서 처리하여 처리량을 높인다.
- 분기 명령어(Branch)를 만나면 프로그램 카운터가 순차적으로 증가하는 대신 지정된 주소로 점프한다.

## 예시

간단한 프로그램의 실행 과정:

```
메모리 주소  명령어          의미
  100       LOAD  200     메모리 200번지의 값을 누산기에 로드
  101       ADD   201     메모리 201번지의 값을 누산기에 더함
  102       STORE 202     누산기의 값을 메모리 202번지에 저장

[Cycle 1]
  Fetch:   PC=100 → 명령어 "LOAD 200"을 가져옴, PC→101
  Decode:  "메모리 200번지의 값을 누산기에 로드하라"
  Execute: 메모리[200]의 값(예: 5)을 누산기에 저장 → 누산기=5

[Cycle 2]
  Fetch:   PC=101 → 명령어 "ADD 201"을 가져옴, PC→102
  Decode:  "메모리 201번지의 값을 누산기에 더하라"
  Execute: 누산기(5) + 메모리[201](3) → 누산기=8

[Cycle 3]
  Fetch:   PC=102 → 명령어 "STORE 202"를 가져옴, PC→103
  Decode:  "누산기의 값을 메모리 202번지에 저장하라"
  Execute: 메모리[202] ← 누산기(8)
```

## 관련 개념

- [CPU](/knowledge/computer-architecture/cpu-basics/) - 이 주기를 수행하는 하드웨어
- [폰 노이만 구조 (Von Neumann Architecture)](/knowledge/computer-architecture/von-neumann-architecture-basics/) - 저장 프로그램 방식이 이 주기의 기반
- [분기 명령어 (Branch Instruction)](/knowledge/computer-architecture/branch-instruction/) - 실행 흐름을 변경하는 명령어
- [캐시 (Cache)](/knowledge/computer-architecture/cache-basics/) - Fetch 단계의 속도를 높이는 메모리 계층
- [RAM](/knowledge/computer-architecture/ram/) - 명령어와 데이터가 저장되는 곳

## 출처

- Understanding the Digital World, Chapter 3
