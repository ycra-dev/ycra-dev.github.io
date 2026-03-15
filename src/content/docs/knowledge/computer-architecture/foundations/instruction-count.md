---
title: "명령어 수 (Instruction Count)"
description: "명령어 수(Instruction Count)는 프로그램 실행 중 실행된 명령어의 총 수로, CPU 성능 방정식의 세 가지 핵심 요소 중 하나이다"
tags: ['Performance', 'Compiler', 'Isa', 'Program Execution', 'Measurement']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/instruction-count
sidebar:
  order: 18
---

## 핵심 개념

명령어 수는 ISA에 의존하지만 정확한 구현에는 의존하지 않으므로, 구현의 세부 사항을 모르고도 측정할 수 있다. 명령어 수는 소프트웨어 프로파일링 도구, 아키텍처 시뮬레이터, 또는 대부분의 프로세서에 포함된 하드웨어 카운터를 통해 측정할 수 있다. 알고리즘, 프로그래밍 언어, 컴파일러가 명령어 수에 직접 영향을 미친다. 그러나 명령어 수만으로 성능을 평가하면 위험하다. 더 많은 명령어를 실행하더라도 각 명령어가 더 빠르면(CPI가 낮으면) 전체 실행 시간이 더 짧을 수 있다. 명령어 믹스(instruction mix)는 프로그램에서 각 명령어 유형의 동적 빈도를 나타내며, CPI와 함께 분석해야 한다.

## 예시

```
코드 비교 예시:
                 클래스 A(CPI=1)  클래스 B(CPI=2)  클래스 C(CPI=3)
코드 시퀀스 1:     2개              1개              2개 → 총 5개
코드 시퀀스 2:     4개              1개              1개 → 총 6개

총 클럭 사이클:
시퀀스 1: (2×1)+(1×2)+(2×3) = 10 사이클
시퀀스 2: (4×1)+(1×2)+(1×3) = 9 사이클

→ 시퀀스 2는 명령어가 더 많지만 실행 시간이 더 짧음
```

## 관련 개념

- [CPU 성능 방정식 (CPU Performance Equation)](/knowledge/computer-architecture/cpu-performance-equation/)
- [명령어당 사이클 수 (CPI)](/knowledge/computer-architecture/cpi/)
- [컴파일러 (Compiler)](/knowledge/language/compiler/)
- [ISA (명령어 집합 아키텍처)](/knowledge/computer-architecture/instruction-set-architecture/)
