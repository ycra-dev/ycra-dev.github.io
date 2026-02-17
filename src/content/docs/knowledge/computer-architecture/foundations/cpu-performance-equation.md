---
title: "CPU Performance Equation"
description: "CPU 성능 방정식은 프로그램의 CPU 실행 시간을 명령어 수(Instruction Count), CPI, 클럭 주기(Clock Cycle Time)의 세 가지 핵심 요소의 곱으로 표현하는 공식이다"
tags: ['Performance', 'CPU Time', 'Instruction Count', 'Cpi', 'Clock Rate']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/cpu-performance-equation
sidebar:
  order: 16
---

## 핵심 개념

이 방정식은 성능에 영향을 미치는 세 가지 핵심 요소를 분리하여 표현한다: CPU 시간 = 명령어 수 x CPI x 클럭 주기. 이는 초/프로그램 = (명령어/프로그램) x (클럭 사이클/명령어) x (초/클럭 사이클)로도 표현된다. 각 요소는 독립적이지 않으며, 하나를 개선하면 다른 것이 악화될 수 있다. 알고리즘은 명령어 수와 CPI에, 프로그래밍 언어와 컴파일러는 명령어 수와 CPI에, ISA는 세 가지 모두에 영향을 미친다. 성능을 평가할 때 세 요소 중 하나만 사용하면 잘못된 결론에 도달할 수 있으므로, 실행 시간(세 요소의 곱)만이 신뢰할 수 있는 성능 측정 지표이다.

## 예시

```
CPU 시간 = 명령어 수 × CPI × 클럭 주기
        = 명령어 수 × CPI / 클럭 속도

예시:
코드 시퀀스 1: 명령어 5개, 총 10 클럭 사이클 → CPI = 2.0
코드 시퀀스 2: 명령어 6개, 총 9 클럭 사이클 → CPI = 1.5

→ 시퀀스 2가 명령어는 더 많지만 전체 클럭 사이클이
  적으므로 더 빠름
→ 명령어 수만으로 성능을 판단하면 안 됨
```

## 관련 개념

- [CPI](/knowledge/computer-architecture/cpi/)
- [Clock Cycle](/knowledge/computer-architecture/clock-cycle/)
- [Instruction Count](/knowledge/computer-architecture/instruction-count/)
- [Response Time](/knowledge/computer-architecture/response-time/)
- [Amdahl's Law](/knowledge/computer-architecture/amdahls-law/)
