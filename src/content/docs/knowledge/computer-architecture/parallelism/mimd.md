---
title: "MIMD (다중 명령어 다중 데이터)"
description: "MIMD(Multiple Instruction streams, Multiple Data streams)는 여러 명령어 스트림이 여러 데이터 스트림을 처리하는 멀티프로세서 아키텍처이다"
tags: ['Parallel Computing', 'Multiprocessor', 'Spmd', 'Instruction Stream', 'Data Stream']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/mimd
sidebar:
  order: 22
---

## 핵심 개념

MIMD는 Flynn의 분류 체계에서 가장 유연한 병렬 컴퓨터 범주이다. 기존의 멀티프로세서(멀티코어 포함)가 여기에 해당한다.

실제로 MIMD 컴퓨터에서 프로그래머들은 보통 각 프로세서에서 별도의 프로그램을 작성하지 않고, 모든 프로세서에서 단일 프로그램을 실행한다. 프로세서마다 다른 코드 섹션을 실행해야 할 때는 조건문을 사용한다. 이 방식을 SPMD(Single Program Multiple Data)라 하며, MIMD 컴퓨터의 일반적인 프로그래밍 모델이다.

Flynn의 분류 체계:
- SISD: 단일 명령어, 단일 데이터 (유니프로세서)
- SIMD: 단일 명령어, 다중 데이터 (벡터/배열 프로세서)
- MISD: 다중 명령어, 단일 데이터 (스트림 프로세서)
- MIMD: 다중 명령어, 다중 데이터 (멀티프로세서)

## 예시

```
# SPMD 프로그래밍 모델 (MIMD에서 일반적)
# 모든 프로세서가 같은 프로그램 실행

int my_id = get_processor_id();
int total_procs = get_num_processors();

// 각 프로세서가 다른 데이터 부분 처리
int start = my_id * (N / total_procs);
int end = start + (N / total_procs);

for (i = start; i < end; i++)
    result[i] = process(data[i]);

// 필요시 프로세서별 다른 동작
if (my_id == 0) {
    // 마스터 프로세서만 수행하는 작업
    aggregate_results();
}
```

## 관련 개념

- [SIMD (단일 명령어 다중 데이터)](/knowledge/computer-architecture/simd/)
- [멀티프로세서 (Multiprocessor)](/knowledge/computer-architecture/multiprocessor/)
- [공유 메모리 멀티프로세서 (SMP)](/knowledge/computer-architecture/shared-memory-multiprocessor/)
- [하드웨어 멀티스레딩 (Hardware Multithreading)](/knowledge/computer-architecture/hardware-multithreading/)
- [GPU (그래픽 처리 장치)](/knowledge/computer-architecture/gpu/)
