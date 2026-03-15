---
title: "명령어당 사이클 수 (CPI)"
description: "CPI(Cycles Per Instruction)는 하나의 명령어를 실행하는 데 소요되는 평균 클럭 사이클 수로, 동일한 ISA의 서로 다른 구현을 비교하는 데 사용되는 성능 지표이다"
tags: ['Performance', 'CPU', 'Instruction Execution', 'Benchmark', 'Metric']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/cpi
sidebar:
  order: 17
---

## 핵심 개념

CPI는 프로세서 설계의 효율성을 나타내는 핵심 지표이다. 명령어마다 실행에 필요한 사이클 수가 다르므로(예: 단순 덧셈 vs. 메모리 접근), CPI는 프로그램에서 실행된 모든 명령어의 평균값이다. CPI는 메모리 시스템, 프로세서 구조 등 다양한 설계 세부 사항에 영향을 받으며, 애플리케이션에 따라 달라진다. 명령어 믹스(instruction mix), 즉 프로그램에서 각 명령어 유형의 동적 빈도가 CPI에 직접 영향을 준다. 일부 현대 프로세서는 CPI < 1을 달성하며(동시에 여러 명령어 실행), 이 경우 역수인 IPC(Instructions Per Cycle)를 사용하기도 한다.

## 예시

```
예시: 두 컴퓨터 비교
컴퓨터 A: 클럭 주기 250ps, CPI = 2.0
컴퓨터 B: 클럭 주기 500ps, CPI = 1.2

동일한 프로그램(명령어 수 I) 실행 시:
CPU 시간_A = I × 2.0 × 250ps = 500 × I ps
CPU 시간_B = I × 1.2 × 500ps = 600 × I ps

→ 컴퓨터 A가 1.2배 빠름

CPI 계산:
CPI = Σ(CPI_i × C_i) / 전체 명령어 수
여기서 CPI_i는 클래스 i의 CPI, C_i는 클래스 i의 명령어 수
```

## 관련 개념

- [CPU 성능 방정식 (CPU Performance Equation)](/knowledge/computer-architecture/cpu-performance-equation/)
- [클록 주기 (Clock Cycle)](/knowledge/computer-architecture/clock-cycle/)
- [명령어 수 (Instruction Count)](/knowledge/computer-architecture/instruction-count/)
- [응답 시간 (Response Time)](/knowledge/computer-architecture/response-time/)
- [ISA (명령어 집합 아키텍처)](/knowledge/computer-architecture/instruction-set-architecture/)
