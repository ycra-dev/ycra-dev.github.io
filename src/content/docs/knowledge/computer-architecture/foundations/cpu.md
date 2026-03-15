---
title: "중앙처리장치 (CPU)"
description: "중앙처리장치(CPU, Central Processing Unit)는 컴퓨터의 능동적 부분으로, 프로그램의 명령어에 따라 데이터를 처리하고 제어하는 핵심 장치이다"
tags: ['Processor', 'Datapath', 'Control', 'Hardware', 'Computer Organization']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/cpu
sidebar:
  order: 8
---

## 핵심 개념

CPU는 컴퓨터의 5대 고전적 구성요소(입력, 출력, 메모리, 데이터패스, 제어) 중 데이터패스와 제어를 결합한 것이다. 데이터패스는 산술 연산을 수행하는 "근육" 역할을, 제어는 데이터패스, 메모리, I/O 장치에 무엇을 할지 지시하는 "두뇌" 역할을 한다. CPU는 프로그램의 명령어를 그대로 따르며, 숫자를 더하고, 비교하고, I/O 장치를 활성화하는 등의 작업을 수행한다. 현대 마이크로프로세서는 단일 집적회로(칩)에 여러 개의 CPU 코어를 포함하며, 이를 멀티코어 프로세서라 한다.

## 예시

Apple A12 프로세서의 구조:
```
- 2개의 고성능(big) ARM 코어
- 4개의 저전력(little) ARM 코어
- 클럭 속도: 2.5 GHz
- GPU (그래픽 처리 장치)
- NPU (신경망 처리 장치)
- L2 캐시 메모리
```

## 관련 개념

- [데이터패스 (Datapath)](/knowledge/computer-architecture/datapath/)
- [클록 주기 (Clock Cycle)](/knowledge/computer-architecture/clock-cycle/)
- [ISA (명령어 집합 아키텍처)](/knowledge/computer-architecture/instruction-set-architecture/)
- [멀티코어 프로세서 (Multicore Processor)](/knowledge/computer-architecture/multicore-processor/)
- [CPU 성능 방정식 (CPU Performance Equation)](/knowledge/computer-architecture/cpu-performance-equation/)
