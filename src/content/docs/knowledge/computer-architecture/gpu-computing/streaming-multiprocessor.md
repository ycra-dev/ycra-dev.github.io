---
title: "SM (스트리밍 멀티프로세서)"
description: "Streaming Multiprocessor(SM)는 GPU의 기본 다중 스레드 처리 단위로, 여러 개의 Streaming Processor(SP) 코어, 특수 기능 유닛(SFU), 명령어 캐시, 공유 메모리 등을 포함하는 통합 프로세서 블록이다"
tags: ['Streaming Multiprocessor', 'GPU Architecture', 'Nvidia', 'Tesla']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/streaming-multiprocessor
sidebar:
  order: 12
---

## 핵심 개념

SM은 GPU 아키텍처의 핵심 빌딩 블록이다. NVIDIA Tesla 아키텍처(GeForce 8800)의 SM은 다음으로 구성된다:

- **8개의 SP 코어**: 각각 1024개의 32비트 레지스터를 가진 스칼라 프로세서
- **2개의 SFU**: 특수 함수(역수, 삼각함수 등) 및 속성 보간 처리
- **16 KB 공유 메모리**: 블록 내 스레드 간 데이터 공유
- **명령어 캐시**: 명령어 페치 효율성 향상
- **상수 캐시**: 읽기 전용 상수 데이터 브로드캐스트
- **다중 스레드 명령어 유닛**: SIMT 방식으로 워프 스케줄링

SM은 최대 512개(또는 768개)의 동시 스레드를 관리할 수 있으며, 정점, 기하, 픽셀 셰이더 프로그램과 CUDA 컴퓨팅 프로그램을 통합적으로 실행한다. GPU의 성능은 SM 수를 조절하여 확장된다.

## 예시

```
GeForce 8800 GPU 구성:
- 14개 SM × 8 SP/SM = 112 SP 코어
- 7개 TPC (Texture Processing Cluster)
  각 TPC = 2 SM + 1 텍스처 유닛

SM 리소스 할당 예시:
- 프로그램이 스레드당 16 레지스터 요구:
  1024 레지스터 / 16 = 64 스레드/SP 가능
  64 × 8 SP = 512 스레드/SM

- 프로그램이 스레드당 32 레지스터 요구:
  1024 레지스터 / 32 = 32 스레드/SP
  32 × 8 SP = 256 스레드/SM
  → 레지스터 압력이 높을수록 동시 스레드 수 감소
```

## 관련 개념

- [SIMT (단일 명령어 다중 스레드)](/knowledge/computer-architecture/simt/)
- [워프 (Warp)](/knowledge/computer-architecture/warp/)
- [SP (스트리밍 프로세서)](/knowledge/computer-architecture/streaming-processor/)
- [스레드 블록 (Thread Block)](/knowledge/computer-architecture/thread-block/)
