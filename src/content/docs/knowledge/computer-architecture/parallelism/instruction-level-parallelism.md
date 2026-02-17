---
title: "Instruction-Level Parallelism"
description: "명령어 수준 병렬성(ILP, Instruction-Level Parallelism)은 프로그래머에게 순차적 실행의 추상화를 유지하면서, 하드웨어와 컴파일러가 암묵적으로 발견하여 활용하는 명령어 간의 병렬성이다"
tags: ['Parallelism', 'Pipelining', 'Superscalar', 'Out Of Order', 'Performance']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/instruction-level-parallelism
sidebar:
  order: 1
---

## 핵심 개념

ILP는 병렬성을 프로그래머에게 보이지 않게 하드웨어 수준에서 활용하는 기법이다. 파이프라이닝이 대표적인 ILP 기법이며, 더 공격적인 기법으로는 다중 명령어 발행(multiple issue), 비순서 실행(out-of-order execution), 분기 예측(branch prediction) 등이 있다. 1990년대에는 암묵적 병렬성을 발견하는 데 막대한 투자가 이루어졌으나, 2002년 이후 성능 향상의 한계에 도달하면서 명시적 병렬성(멀티코어)으로 전환되었다. ILP의 장점은 프로그래머가 순차적으로 프로그래밍할 수 있다는 것이고, 단점은 하드웨어와 에너지 비용이 증가한다는 것이다.

ILP를 증가시키는 두 가지 주요 방법이 있다: (1) 파이프라인 깊이를 늘려 더 많은 명령어를 중첩시키기, (2) 다중 발행(multiple issue)으로 한 클록 사이클에 여러 명령어를 시작시키기. 다중 발행이 적용되면 CPI가 1 미만이 될 수 있어 IPC(Instructions Per Clock)로 측정하기도 한다. 그러나 데이터 의존성과 제어 의존성이 ILP 활용의 상한선을 결정한다. 투기(speculation)는 명령어의 결과를 예측하여 의존성을 줄이고 더 많은 ILP를 활용할 수 있게 하지만, 잘못된 투기는 오히려 성능을 저하시킬 수 있다.

## 예시

```
ILP 기법의 종류:

1. 파이프라이닝: 명령어 실행 단계를 겹침
   IF-ID-EX-MEM-WB 를 여러 명령어에 대해 동시 진행

2. 슈퍼스칼라: 클럭 사이클당 여러 명령어 발행
   사이클 1: add와 mul 동시 실행

3. 비순서 실행: 데이터 의존성이 없는 명령어를 먼저 실행
   add $t0, $s0, $s1  # 먼저 실행 가능
   lw  $t1, 0($s2)    # 캐시 미스로 지연
   add $t2, $s3, $s4   # $t1에 의존하지 않으므로 먼저 실행

4. 분기 예측: 분기 결과를 예측하여 추측 실행
```

```
ILP 향상 방법:
1. 파이프라인 깊이 증가: 4단계 -> 6단계 (더 많은 중첩)
2. 다중 발행: 4 GHz, 4-way 프로세서
   - 최대 처리율: 16 billion instructions/sec
   - 최적 CPI = 0.25 (IPC = 4)
   - 실행 중 명령어: 5 x 4 = 20개

실제 성능 제한:
- 데이터/제어 의존성
- 분기 예측 실패
- 메모리 계층 지연
- 실제 IPC: 일반적으로 2 이하
```

## 관련 개념

- [Pipelining](/knowledge/computer-architecture/pipelining/)
- [Multicore Processor](/knowledge/computer-architecture/multicore-processor/)
- [CPI](/knowledge/computer-architecture/cpi/)
- [Central Processing Unit](/knowledge/computer-architecture/central-processing-unit/)
- [Multiple Issue](/knowledge/computer-architecture/multiple-issue/)
- [Speculation](/knowledge/computer-architecture/speculation/)
- [Superscalar](/knowledge/computer-architecture/superscalar/)
- [Loop Unrolling](/knowledge/computer-architecture/loop-unrolling/)
