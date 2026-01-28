---
title: "상주 모니터 (Resident Monitor)"
description: "메모리에 항상 상주하며 한 작업에서 다음 작업으로 제어를 자동 전환하는 최초의 운영체제 형태"
tags: ["OS", "History", "BatchSystem"]
created: 2026-01-23
updated: 2026-01-27
slug: knowledge/os/resident-monitor
sidebar:
  order: 9
---

## 핵심 개념

상주 모니터(Resident Monitor)는 메모리에 항상 상주하며 한 작업에서 다음 작업으로 제어를 자동 전환하는 최초의 운영체제 형태입니다. 컴퓨터가 매우 비쌌기 때문에 높은 활용률(utilization)이 필요했고, 작업 전환 시 CPU 유휴 시간을 줄이기 위해 도입되었습니다.

## 동작 원리

1. 컴퓨터 전원 ON 시 resident monitor가 호출됨
2. 제어 카드(control card)를 읽어 실행할 프로그램 결정
3. 프로그램을 메모리에 로드하고 제어 전환
4. 프로그램 종료 시 제어가 monitor로 반환
5. 다음 프로그램을 자동으로 실행

### 구성 요소

```
┌─────────────────────────┐
│   loader                │ ← 프로그램 로드
├─────────────────────────┤
│   job sequencing        │ ← 작업 순서 관리
├─────────────────────────┤
│   control card          │ ← 제어 카드 해석
│   interpreter           │
├─────────────────────────┤
│   user program area     │ ← 사용자 프로그램 공간
└─────────────────────────┘
```

### 제어 카드 예시

```
$JOB    — 작업의 첫 카드
$FTN    — FORTRAN 컴파일러 실행
$ASM    — 어셈블러 실행
$RUN    — 사용자 프로그램 실행
$END    — 작업의 마지막 카드
```

## 예시

FORTRAN 프로그램 컴파일 및 실행:
1. `$FTN` 카드 → 컴파일러 로드 및 실행
2. `$ASM` 카드 → 어셈블러 로드 및 실행
3. `$RUN` 카드 → 사용자 프로그램 실행

공장의 컨베이어 벨트처럼, 작업자가 일일이 물건을 옮기지 않고 자동으로 다음 공정으로 이동합니다.

## 관련 개념

- [[스풀링 (Spooling)]]
- [[멀티프로그래밍 (Multiprogramming)]]
- [[기능 이동 (Feature Migration)]]
