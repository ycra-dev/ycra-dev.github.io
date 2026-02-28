---
title: "MIX Computer"
description: "Knuth가 TAOCP에서 알고리즘을 기계어로 표현하기 위해 설계한 가상의 컴퓨터로, 이진수와 십진수를 동시에 지원하는 단순한 구조를 가짐"
tags: ["Algorithms", "Computer Architecture", "Assembly", "TAOCP"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/algorithms/foundations/mix-computer
sidebar:
  order: 31
---

## 핵심 개념

MIX는 TAOCP(The Art of Computer Programming)에서 알고리즘을 기계어 수준에서 표현하기 위해 Knuth가 설계한 가상의 컴퓨터다. 식별 번호는 1009. 1960-70년대 실제 컴퓨터들의 특성을 반영하면서도 단순하게 설계되어 "한 시간 안에 배울 수 있다"고 Knuth는 말한다.

MIX의 가장 특이한 특성은 **이진수와 십진수를 동시에 지원**한다는 점이다. 프로그래머는 이진 컴퓨터를 다루는지 십진 컴퓨터를 다루는지 알 필요가 없다.

## 동작 원리

**기본 데이터 단위 — 바이트(Byte)**:
- 최소 64개의 고유값을 담아야 함 (최대 100개)
- 이진 컴퓨터: 6비트 = 64값 (현대의 8비트와 다름)
- 십진 컴퓨터: 2자리 = 100값

**컴퓨터 워드(Word)**: 부호(sign) + 5바이트

**레지스터 9개**:
| 레지스터 | 크기 | 용도 |
|----------|------|------|
| rA (Accumulator) | 부호 + 5바이트 | 주요 산술/데이터 연산 |
| rX (Extension) | 부호 + 5바이트 | rA 확장, 곱셈/나눗셈 |
| rI1~rI6 (Index) | 부호 + 2바이트 | 카운팅, 가변 주소 |
| rJ (Jump) | 2바이트 | 서브루틴 복귀 주소 |

**메모리**: 4000워드 (위치 0~3999)

**명령어 형식**:
```
[부호][AA][I][F][C]
- AA: 주소 (2바이트)
- I: 인덱스 레지스터 번호 (0이면 인덱싱 없음)
- F: 필드 명세 (8L+R, 부분 워드 접근)
- C: 연산 코드
```

**부분 필드 접근**: `(L:R)` 표기로 워드의 특정 바이트만 접근/수정:
- `(0:5)` = 전체 워드
- `(1:5)` = 부호 제외
- `(4:5)` = 마지막 2바이트

**후계자 — MMIX**: RISC 방식의 64비트 컴퓨터. MIX를 대체할 예정.

## 예시

MIX 어셈블리로 배열에서 최대값 찾기 (MAXIMUM 서브루틴):

```mixal
MAXIMUM  STJ EXIT      * J레지스터(복귀 주소) 저장
         ENT3 0,1      * rI3 ← rI1 (탐색 범위)
         JMP  CHANGEM  * 첫 번째 원소를 최대값으로 설정
LOOP     CMPA X,3      * rA와 X[rI3] 비교
         JGE  *+3      * rA >= X[rI3]이면 건너뜀
CHANGEM  ENT2 0,3      * rI2 ← rI3 (최대값 위치)
         LDA  X,3      * rA ← X[rI3]
         DEC3 1        * rI3 감소
         J3P  LOOP     * rI3 > 0이면 반복
EXIT     JMP  *        * 복귀

* 호출 방법:
         JMP  MAXIMUM  * 완료 후 rA = 최대값, rI2 = 위치
```

주요 명령어 카테고리:
- 로딩: LDA, LDX, LDi
- 저장: STA, STX, STi, STJ, STZ
- 산술: ADD, SUB, MUL, DIV
- 비교: CMPA, CMPi
- 점프: JMP, JAZ, JAN, JXZ
- 시프트: SLA, SRA, SLAX, SRAX
- I/O: IN, OUT, IOC

## 관련 개념

- [Algorithm](/knowledge/algorithms/foundations/algorithm/)
- [Subroutine](/knowledge/algorithms/foundations/subroutine/)
- [Coroutine](/knowledge/algorithms/foundations/coroutine/)
