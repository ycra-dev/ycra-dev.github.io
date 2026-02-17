---
title: "Cooperative Thread Array (CTA)"
description: "CTA(Cooperative Thread Array)는 동일한 스레드 프로그램을 실행하고 결과를 계산하기 위해 협력할 수 있는 동시 실행 스레드의 집합이다"
tags: ['Cta', 'Cuda', 'Thread Block', 'GPU Architecture']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/cooperative-thread-array
sidebar:
  order: 9
---

## 핵심 개념

CTA는 CUDA 스레드 블록의 하드웨어 수준 구현이다. 멀티프로세서 컨트롤러가 CTA를 생성하고 관리한다.

**CTA 생성 과정**:
1. 컨트롤러가 모든 CTA 워프를 생성하고 모든 CTA 리소스를 할당할 수 있을 때만 CTA 생성
2. 스레드, 레지스터, 공유 메모리, 배리어 등 필요한 모든 리소스를 프로그램이 선언
3. 워프 스케줄링 속도로 CTA 워프를 생성하여 즉시 실행 시작
4. 모든 CTA 스레드가 종료되면 공유 리소스와 워프 리소스를 해제

**CTA의 메모리 모델**:
- CTA별 공유 메모리는 해당 CTA의 스레드에만 가시적
- 공유 메모리는 CTA 생성부터 종료까지의 수명을 가짐
- CTA 간 통신은 전역 메모리와 원자적 연산을 통해 수행
- `bar.sync` 명령어로 CTA 내 스레드 간 엄격한 메모리 순서 보장

## 예시

```
CTA 리소스 할당 예시:

프로그램 요구사항:
- 스레드당 32 레지스터
- 블록당 16 KB 공유 메모리
- 256 스레드/블록 (8 워프)

SM 리소스 (GeForce 8800):
- 8192 레지스터 (8 SP × 1024 레지스터)
- 16 KB 공유 메모리

할당 가능 CTA 수:
- 레지스터: 8192 / (256 × 32) = 1 CTA
- 공유 메모리: 16KB / 16KB = 1 CTA
→ SM당 최대 1개 CTA 동시 실행

다른 프로그램 (스레드당 16 레지스터, 4 KB 공유 메모리):
- 레지스터: 8192 / (256 × 16) = 2 CTA
- 공유 메모리: 16KB / 4KB = 4 CTA
→ SM당 최대 2개 CTA 동시 실행
```

## 관련 개념

- [Thread Block](/knowledge/computer-architecture/thread-block/)
- [Warp](/knowledge/computer-architecture/warp/)
- [Streaming Multiprocessor](/knowledge/computer-architecture/streaming-multiprocessor/)
- [Synchronization Barrier](/knowledge/computer-architecture/synchronization-barrier/)
- [CUDA](/knowledge/computer-architecture/cuda/)
