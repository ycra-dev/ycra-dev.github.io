---
title: "멀티프로세서 스케줄링 (Multiprocessor Scheduling)"
description: "여러 CPU(또는 코어)가 있는 시스템에서 프로세스/스레드를 어떤 프로세서에 할당할지 결정하는 스케줄링"
tags: ["OS", "Scheduling", "Multiprocessor"]
created: 2026-01-27
updated: 2026-01-27
draft: false
slug: knowledge/os/multiprocessor-scheduling
sidebar:
  order: 10
---

## 핵심 개념

멀티프로세서 스케줄링은 여러 CPU(또는 코어)가 있는 시스템에서 프로세스/스레드를 어떤 프로세서에 할당할지 결정합니다. 단일 CPU 스케줄링 기법을 그대로 적용하면 부하 불균형과 캐시 비효율이 발생합니다.

## 동작 원리

### 비대칭 vs 대칭 멀티프로세싱

- **비대칭(Asymmetric)**: 하나의 마스터 프로세서가 모든 스케줄링 결정. 단순하지만 병목 발생.
- **대칭(SMP)**: 각 프로세서가 자체 스케줄링 수행. 현대 OS의 표준(Windows, Linux, macOS).

### Ready Queue 구성

| 방식 | 장점 | 단점 |
|------|------|------|
| **공용 큐** | 부하 균형 자동 | Lock 경합 |
| **프로세서별 큐** | 경합 없음, 캐시 친화적 | 부하 불균형 가능 |

### 멀티스레드 프로세서와 메모리 스톨

```
단일 스레드:
Thread ──▶ [Compute]──▶[Memory Stall]──▶[Compute]──▶[Memory Stall]

멀티스레드 (SMT):
Thread0 ──▶ [C]──▶[Stall]──▶     [C]──▶[Stall]
Thread1 ──▶      [C]──▶[Stall]──▶     [C]──▶[Stall]
                   ↑ 스톨 동안 다른 스레드 실행
```

메모리 스톨(캐시 미스 등)로 CPU가 최대 50% 유휴 상태가 될 수 있으며, 하드웨어 스레드 간 전환으로 이를 활용합니다.

### 부하 균형 (Load Balancing)

- **Push Migration**: 과부하 프로세서에서 유휴 프로세서로 이동
- **Pull Migration**: 유휴 프로세서가 바쁜 프로세서에서 가져옴
- Linux CFS는 둘 다 구현

## 예시

- 공용 큐: 여러 계산대가 있는 마트에서 하나의 줄
- 프로세서별 큐: 각 계산대마다 별도 줄

4코어 CPU, 각 코어에 2개 하드웨어 스레드(Intel i7)면 OS는 8개의 논리 CPU를 인식합니다. 스케줄링은 2단계: OS→하드웨어스레드, 코어→실행스레드 선택.

## 관련 개념

- [멀티프로세서 시스템 (Multiprocessor System)](/knowledge/os/multiprocessor-system/)
- [동시성 vs 병렬성](/knowledge/os/concurrency-vs-parallelism/)
- [UNIX CPU 스케줄링](/knowledge/os/unix-cpu-scheduling/)
- [캐시 일관성 (Cache Coherency)](/knowledge/os/cache-coherency/)
