---
title: "Pipelining"
description: "파이프라이닝(Pipelining)은 여러 명령어의 실행을 겹쳐서(overlap) 처리하는 병렬 처리 기법으로, 명령어 수준 병렬성(ILP)의 대표적인 형태이다"
tags: ['Computer Architecture', 'Parallelism', 'Performance', 'Instruction Execution']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/pipelining
sidebar:
  order: 11
---

## 핵심 개념

파이프라이닝은 컴퓨터 아키텍처의 7대 아이디어 중 하나로, 특정 패턴의 병렬성을 나타낸다. "양동이 릴레이(bucket brigade)"에 비유되며, 각 단계(stage)가 동시에 서로 다른 명령어의 일부를 처리한다. 프로세서의 명령어 실행을 여러 단계로 나누어 각 단계가 파이프의 한 섹션처럼 동작하며, 하나의 명령어가 완전히 끝나기 전에 다음 명령어의 처리를 시작할 수 있다. 이를 통해 단일 명령어의 실행 시간은 줄어들지 않지만 전체 처리량(throughput)은 크게 향상된다.

MIPS 파이프라인은 5단계로 구성된다: IF(명령어 인출), ID(명령어 해독/레지스터 읽기), EX(실행/주소 계산), MEM(메모리 접근), WB(결과 기록). 이상적인 조건에서 파이프라이닝 속도 향상은 파이프라인 단계 수와 같다. 그러나 단계 간 불균형, 파이프라인 오버헤드, 해저드(hazard) 등으로 인해 실제 속도 향상은 이보다 작다. MIPS ISA는 파이프라인 실행을 위해 설계되었으며, 고정 길이 명령어, 대칭적 명령어 포맷, load/store 아키텍처 등이 이를 지원한다.

## 예시

5단계 파이프라인의 경우:
```
시간:  T1   T2   T3   T4   T5   T6   T7
I1:   [IF] [ID] [EX] [MEM][WB]
I2:        [IF] [ID] [EX] [MEM][WB]
I3:             [IF] [ID] [EX] [MEM][WB]

IF = Instruction Fetch (명령어 인출)
ID = Instruction Decode (명령어 해독)
EX = Execute (실행)
MEM = Memory Access (메모리 접근)
WB = Write Back (결과 쓰기)
```

파이프라인이 없으면 3개의 명령어를 실행하는 데 15 클럭 사이클이 필요하지만, 파이프라인을 사용하면 7 사이클로 줄어든다.

```
파이프라인 성능 공식:
Time(pipelined) = Time(non-pipelined) / Number of stages

예: 5단계 파이프라인
- 비파이프라인: 800 ps/명령어
- 파이프라인: 200 ps/명령어 (가장 느린 단계에 맞춤)
- 이론적 속도향상: 4배 (800/200)
- 이상적 속도향상: 5배 (5단계)
```

## 관련 개념

- [Instruction-Level Parallelism](/knowledge/computer-architecture/instruction-level-parallelism/)
- [Clock Cycle](/knowledge/computer-architecture/clock-cycle/)
- [Throughput](/knowledge/computer-architecture/throughput/)
- [Multicore Processor](/knowledge/computer-architecture/multicore-processor/)
- [Pipeline Register](/knowledge/computer-architecture/pipeline-register/)
- [Forwarding](/knowledge/computer-architecture/forwarding/)
- [Single-Cycle Implementation](/knowledge/computer-architecture/single-cycle-implementation/)
