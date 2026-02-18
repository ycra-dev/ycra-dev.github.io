---
title: "Streaming Processor (SP)"
description: "Streaming Processor(SP)는 GPU 멀티프로세서 내의 기본 스레드 명령어 프로세서 코어로, 스칼라 정수 및 부동소수점 연산을 수행한다"
tags: ['Streaming Processor', 'GPU Core', 'Nvidia', 'Tesla']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/streaming-processor
sidebar:
  order: 13
---

## 핵심 개념

SP는 GPU에서 실제 연산을 수행하는 최소 단위의 프로세서 코어이다.

**SP의 구성**:
- **레지스터 파일(RF)**: 1024개의 스칼라 32비트 레지스터, 최대 64 스레드에 분할
- **정수/부동소수점 ALU**: 스칼라 연산 수행
- **하드웨어 멀티스레딩**: 최대 64개 동시 스레드 관리

**SP의 연산 능력**:
- 부동소수점: add.f32, mul.f32, mad.f32, min.f32, max.f32, setp.f32
- IEEE 754 단정밀도 호환 (NaN, infinity 포함)
- 기본 반올림 모드: round-to-nearest-even
- mad.f32: 곱셈(truncation) 후 덧셈(round-to-nearest-even)
- 32비트 및 64비트 정수 산술/비교/변환/논리 명령어

**SP와 벡터 아키텍처의 차이**:
이전 GPU는 4-컴포넌트 벡터 명령어를 사용했으나, SIMT 아키텍처의 SP는 스칼라 명령어를 사용한다. 32개 독립적 스레드에 걸쳐 병렬화하는 것이 4개 벡터 컴포넌트 내에서 병렬화하는 것보다 효율적이다. 스칼라 명령어는 더 단순하고 컴파일러 친화적이다.

## 예시

```
SP 코어의 레지스터 할당:

총 레지스터: 1024개 (32비트)

시나리오 1: 스레드당 16 레지스터
  1024 / 16 = 64 스레드 동시 실행 가능
  → 메모리 지연 숨기기에 유리

시나리오 2: 스레드당 32 레지스터
  1024 / 32 = 32 스레드 동시 실행 가능
  → 복잡한 커널에 더 많은 레지스터 제공

시나리오 3: 스레드당 64 레지스터
  1024 / 64 = 16 스레드 동시 실행 가능
  → 레지스터 스필링은 줄지만 병렬성 감소

SM (8 SP) 전체:
  시나리오 1: 8 × 64 = 512 스레드
  시나리오 2: 8 × 32 = 256 스레드
  시나리오 3: 8 × 16 = 128 스레드
```

## 관련 개념

- [Streaming Multiprocessor](/knowledge/computer-architecture/streaming-multiprocessor/)
- [SIMT](/knowledge/computer-architecture/simt/)
- [PTX ISA](/knowledge/computer-architecture/ptx-isa/)
