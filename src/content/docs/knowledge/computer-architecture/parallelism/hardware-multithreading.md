---
title: "Hardware Multithreading"
description: "하드웨어 멀티스레딩은 하나의 프로세서에서 여러 스레드가 기능 유닛을 겹치는 방식으로 공유하여 하드웨어 자원 활용률을 높이는 기술이다"
tags: ['Thread', 'Smt', 'Fine Grained', 'Coarse Grained', 'Processor Utilization']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/hardware-multithreading
sidebar:
  order: 12
---

## 핵심 개념

하드웨어 멀티스레딩을 위해 각 스레드의 독립적 상태(레지스터 파일, 프로그램 카운터 등)를 복제해야 한다. 스레드 전환은 프로세스 전환(수백~수천 사이클)보다 훨씬 빠르게 즉각적으로 이루어져야 한다.

세 가지 주요 방식:

1. **세밀한 멀티스레딩(Fine-grained):** 매 명령어마다 스레드를 전환한다. 짧고 긴 정지를 모두 숨길 수 있지만, 개별 스레드의 실행이 느려진다.

2. **거친 멀티스레딩(Coarse-grained):** 마지막 레벨 캐시 미스 같은 비용이 큰 정지에서만 스레드를 전환한다. 개별 스레드 실행 속도 저하가 적지만, 파이프라인 시작 비용으로 인해 짧은 정지를 숨기기 어렵다.

3. **동시 멀티스레딩(SMT):** 다중 발행, 동적 스케줄링 프로세서의 자원을 활용하여 스레드 수준 병렬성과 명령어 수준 병렬성을 동시에 활용한다. 여러 스레드의 명령어가 같은 클럭 사이클에서 이슈 슬롯을 사용한다.

Intel Core i7은 코어당 2개의 하드웨어 스레드를 지원하며, PARSEC 벤치마크에서 평균 1.31배 속도 향상과 1.07배 에너지 효율 향상을 달성한다.

## 예시

```
# 4개 스레드, 4-wide 슈퍼스칼라 프로세서
# (각 사이클에 최대 4개 명령어 발행)

슈퍼스칼라 (멀티스레딩 없음):
  사이클1: [T1][T1][  ][  ]  <- ILP 부족으로 빈 슬롯
  사이클2: [T1][  ][  ][  ]  <- 캐시 미스로 정지
  사이클3: [  ][  ][  ][  ]  <- 완전 정지

세밀한 멀티스레딩:
  사이클1: [T1][T1][  ][  ]
  사이클2: [T2][T2][T2][  ]  <- T1 정지, T2 실행
  사이클3: [T3][T3][  ][  ]  <- T2 후 T3 실행

SMT:
  사이클1: [T1][T1][T2][T3]  <- 여러 스레드의 명령어 혼합
  사이클2: [T2][T3][T4][T1]  <- ILP + TLP 동시 활용
  사이클3: [T1][T2][T3][T4]  <- 최대 활용
```

## 관련 개념

- [Simultaneous Multithreading](/knowledge/computer-architecture/simultaneous-multithreading/)
- [Multiprocessor](/knowledge/computer-architecture/multiprocessor/)
- [GPU](/knowledge/computer-architecture/gpu/)
- [Context Switch](/knowledge/computer-architecture/context-switch/)
