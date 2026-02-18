---
title: "Single-Instruction Multiple-Thread (SIMT)"
description: "SIMT(Single-Instruction Multiple-Thread)는 하나의 명령어를 여러 독립적인 스레드에 병렬로 적용하는 프로세서 아키텍처이다"
tags: ['Simt', 'GPU Architecture', 'Parallel Execution', 'Warp']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/simt
sidebar:
  order: 10
---

## 핵심 개념

SIMT는 GPU 멀티프로세서의 핵심 실행 모델로, SIMD와 멀티스레딩의 장점을 결합한다.

**SIMT vs SIMD 차이점**:
- SIMD: 하나의 명령어가 여러 데이터 레인을 함께 제어. 소프트웨어가 데이터 병렬성을 명시적으로 표현
- SIMT: 하나의 명령어가 여러 독립적 스레드에 적용. 런타임에 데이터 병렬성을 자동 발견
- SIMT 스레드는 독립적으로 분기하고 실행할 수 있음
- SIMT 명령어는 개별 스레드를 제어하며, 효율성을 위해 워프 단위로 발행

**실행 메커니즘**:
- 멀티프로세서는 동시 스레드를 워프(warp)라는 병렬 스레드 그룹으로 관리
- 각 워프는 32개의 병렬 스레드로 구성
- 모든 스레드가 같은 실행 경로를 취하면 최대 효율 달성
- 스레드가 분기(diverge)하면 각 분기 경로가 직렬화됨
- 분기 동기화 스택을 사용하여 분기/합류 관리

SIMT는 프로그래머에게 SIMD의 성능과 멀티스레딩의 생산성을 동시에 제공한다. 프로그래머는 개별 스레드의 동작만 기술하면 되며, 명시적인 SIMD 벡터 코딩이 불필요하다.

## 예시

```
SIMT 워프 실행 예시 (32 스레드 워프, 8 SP 코어):

시간  | SP0    | SP1    | SP2    | ... | SP7
------+--------+--------+--------+-----+--------
clk 0 | T0     | T1     | T2     | ... | T7
clk 1 | T8     | T9     | T10    | ... | T15
clk 2 | T16    | T17    | T18    | ... | T23
clk 3 | T24    | T25    | T26    | ... | T31

→ 하나의 SIMT 명령어가 4 클럭에 걸쳐 32 스레드에 실행

워프 분기(divergence) 예시:
if (threadIdx.x < 16) {  // path A
    ...
} else {                  // path B
    ...
}

실행 순서:
1. 스레드 0-15: path A 실행 (스레드 16-31은 비활성)
2. 스레드 16-31: path B 실행 (스레드 0-15는 비활성)
3. 합류: 모든 32 스레드 활성
→ 동일 길이 분기에서 50% 효율
```

## 관련 개념

- [Warp](/knowledge/computer-architecture/warp/)
- [Streaming Multiprocessor](/knowledge/computer-architecture/streaming-multiprocessor/)
- [SPMD](/knowledge/computer-architecture/spmd/)
- [CUDA](/knowledge/computer-architecture/cuda/)
