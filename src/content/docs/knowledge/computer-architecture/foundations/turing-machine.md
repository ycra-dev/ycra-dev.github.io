---
title: "튜링 머신 (Turing Machine)"
description: "1930년대 앨런 튜링이 제안한 이론적 컴퓨터 모델로 모든 계산 가능한 문제를 풀 수 있음이 증명된 범용 계산 기계"
tags: ["Computer-Architecture", "Turing", "Theory", "Computation", "Computability"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/computer-architecture/turing-machine
sidebar:
  order: 42
---

## 핵심 개념

튜링 머신(Turing Machine)은 1930년대 영국 수학자 앨런 튜링(Alan Turing)이 제안한 이론적 컴퓨터 모델로, 무한한 테이프, 읽기/쓰기 헤드, 상태 전이 규칙으로 구성된다. 모든 계산 가능한 문제를 풀 수 있음이 증명되었으며, **범용 튜링 머신(Universal Turing Machine)**으로 모든 컴퓨터의 계산 능력이 본질적으로 동치임을 보여준다.

## 동작 원리

튜링 머신은 실제로 만들려는 기계가 아니라, **"계산이란 무엇인가?"**를 수학적으로 정의하기 위한 이론적 도구이다.

### 구성 요소
1. **무한한 테이프**: 셀(cell)로 나뉜 무한 길이의 테이프. 각 셀에 기호(예: 0, 1, 빈칸)가 적혀 있다.
2. **헤드(Head)**: 테이프 위를 좌우로 이동하며 셀의 기호를 읽고 쓴다.
3. **상태 레지스터**: 기계의 현재 상태를 저장한다.
4. **전이 함수(규칙표)**: "현재 상태가 A이고 읽은 기호가 1이면 → 기호를 0으로 쓰고, 오른쪽으로 이동하고, 상태를 B로 변경한다" 와 같은 규칙의 집합.

### 핵심 결과
- **범용 튜링 머신(UTM)**: 다른 튜링 머신의 규칙을 입력으로 받아 그 동작을 흉내낼 수 있는 특별한 튜링 머신. 이것이 바로 **저장 프로그램 방식 컴퓨터**의 이론적 근거이다.
- **처치-튜링 논제(Church-Turing Thesis)**: 효과적으로 계산 가능한 모든 함수는 튜링 머신으로 계산할 수 있다.
- **동치성**: 충분한 시간과 메모리만 주어지면 스마트폰, 슈퍼컴퓨터, 게임 콘솔 모두 동일한 계산을 수행할 수 있다 — 속도만 다를 뿐이다.
- **정지 문제(Halting Problem)**: 튜링은 임의의 프로그램이 멈추는지 여부를 판단하는 범용 알고리즘은 존재할 수 없음을 증명하였다.

## 예시

이진수에 1을 더하는 간단한 튜링 머신:

```
테이프 (초기): ... □ 1 0 1 1 □ ...
                         ↑ (헤드, 최하위 비트에서 시작)

규칙:
  상태 q0, 읽은 값 1 → 쓰기 0, 왼쪽 이동, 상태 q0 유지 (올림)
  상태 q0, 읽은 값 0 → 쓰기 1, 정지                     (올림 완료)
  상태 q0, 읽은 값 □ → 쓰기 1, 정지                     (자릿수 증가)

실행:
  1011 → 읽음=1 → 쓰기 0, 왼쪽
  1010 → 읽음=1 → 쓰기 0, 왼쪽
  1000 → 읽음=0 → 쓰기 1, 정지
  결과: 1100 (= 12, 원래 1011 = 11이므로 11+1 = 12 ✓)
```

현실과의 연결:

```
튜링 머신 구성 요소     →  현대 컴퓨터 대응
무한한 테이프           →  메모리 (RAM + 저장장치)
읽기/쓰기 헤드          →  메모리 접근 회로
상태 레지스터           →  CPU 레지스터
전이 함수(규칙표)       →  CPU 명령어 세트 + 프로그램
범용 튜링 머신          →  저장 프로그램 방식 컴퓨터
```

## 관련 개념

- [폰 노이만 구조 (Von Neumann Architecture)](/knowledge/computer-architecture/von-neumann-architecture-basics/) - 범용 튜링 머신의 실제 구현
- [명령어 실행 주기 (Fetch-Decode-Execute Cycle)](/knowledge/computer-architecture/fetch-decode-execute-cycle/) - 튜링 머신의 "규칙 적용" 과정의 실제 구현
- [분기 명령어 (Branch Instruction)](/knowledge/computer-architecture/branch-instruction/) - 조건부 상태 전이의 하드웨어 구현
- [CPU](/knowledge/computer-architecture/cpu-basics/) - 범용 튜링 머신의 물리적 실현

## 출처

- Understanding the Digital World, Chapter 3
