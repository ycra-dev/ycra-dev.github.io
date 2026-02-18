---
title: "Warp"
description: "워프(Warp)는 SIMT 아키텍처에서 동일한 명령어를 함께 실행하는 병렬 스레드의 집합이다"
tags: ['Warp', 'Simt', 'GPU Scheduling', 'Parallel Execution']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/warp
sidebar:
  order: 8
---

## 핵심 개념

워프는 GPU SIMT 실행의 기본 스케줄링 단위이다. Tesla 아키텍처에서 워프 크기는 32 스레드이며, 8개의 SP 코어에서 4 클럭에 걸쳐 실행된다 (코어당 4 스레드).

**워프 스케줄링**:
- 멀티프로세서는 최대 16개 워프(총 512 스레드)의 풀을 관리
- 매 스케줄링 사이클마다 스케줄러가 실행 준비된 워프를 선택
- 레지스터 의존성 스코어보드로 준비 상태 판단
- 워프 유형, 명령어 유형, 공정성을 고려한 우선순위 결정
- 서로 다른 워프는 독립적으로 실행되므로 의존성은 같은 워프 내 순차 명령어에만 존재

**워프 유형과 구성**:
- 정점, 기하, 픽셀, 컴퓨팅 등 같은 유형의 스레드로 구성
- 픽셀 프래그먼트 셰이더의 기본 단위: 2x2 픽셀 쿼드 (4 스레드)
- 스레드 블록은 하나 이상의 워프로 구성
- 서로 다른 워프 유형을 동시에 실행 가능

**워프 분기(Divergence)**:
- 모든 스레드가 같은 경로 → 최대 효율
- 데이터 의존적 분기 시 경로가 직렬화됨
- 모든 경로 완료 후 스레드가 합류
- 이전 GPU보다 훨씬 효율적 (워프가 SIMD 폭보다 훨씬 좁음)

## 예시

```
워프 스케줄링 타임라인:

사이클 | 실행 워프 | 상태
-------+-----------+--------------------
  0    | Warp 3    | 정점 셰이더 실행
  1    | Warp 7    | 픽셀 셰이더 실행
  2    | Warp 1    | CUDA 컴퓨팅 실행
  3    | Warp 12   | 픽셀 셰이더 실행
  4    | Warp 3    | 텍스처 페치 대기 → 스킵
  4    | Warp 5    | CUDA 컴퓨팅 실행
  ...

→ 멀티스레딩으로 메모리 지연 숨김:
  Warp 3이 텍스처 페치를 기다리는 동안
  Warp 5가 실행되어 프로세서 활용률 유지

워프 크기와 효율:
- 32 스레드 워프에서 모든 활성: 100% 효율
- if-else 분기 (같은 길이): 50% 효율
- 8개 분기 경로: 12.5% 효율
→ 코드에서 워프 내 분기를 최소화하는 것이 성능에 중요
```

## 관련 개념

- [SIMT](/knowledge/computer-architecture/simt/)
- [Streaming Multiprocessor](/knowledge/computer-architecture/streaming-multiprocessor/)
- [Thread Block](/knowledge/computer-architecture/thread-block/)
- [Cooperative Thread Array](/knowledge/computer-architecture/cooperative-thread-array/)
