---
title: "동시 멀티스레딩 (SMT)"
description: "동시 멀티스레딩(SMT)은 다중 발행, 동적 스케줄링 파이프라인 프로세서의 자원을 활용하여 스레드 수준 병렬성(TLP)과 명령어 수준 병렬성(ILP)을 동시에 활용하는 하드웨어 멀티스레딩의 변형이다"
tags: ['Hardware Multithreading', 'Out Of Order Execution', 'Thread Level Parallelism', 'Instruction Level Parallelism', 'Superscalar']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/simultaneous-multithreading
sidebar:
  order: 13
---

## 핵심 개념

SMT의 핵심 통찰은 다중 발행 프로세서가 대부분의 단일 스레드가 효과적으로 사용할 수 있는 것보다 더 많은 기능 유닛 병렬성을 갖고 있다는 것이다. 레지스터 리네이밍과 동적 스케줄링을 통해, 독립적인 여러 스레드의 명령어가 의존성에 관계없이 발행될 수 있다.

SMT는 세밀한 멀티스레딩과 달리 매 사이클마다 자원을 전환하지 않는다. 대신 항상 여러 스레드의 명령어를 동시에 실행하며, 하드웨어가 명령어 슬롯과 리네이밍된 레지스터를 적절한 스레드에 연결하는 것을 처리한다.

이상적으로 SMT에서의 이슈 슬롯 사용은 여러 스레드에 걸친 자원 요구와 자원 가용성의 불균형에 의해서만 제한된다. Intel의 Hyper-Threading이 SMT의 상용 구현 예이다.

## 예시

```
# SMT vs 다른 멀티스레딩 비교 (4-wide 슈퍼스칼라)

Fine-grained (사이클당 하나의 스레드만):
  사이클1: [T1][T1][  ][  ]  <- T1만 (ILP 부족으로 2슬롯만 사용)
  사이클2: [T2][T2][T2][  ]  <- T2만

Coarse-grained (정지 시에만 전환):
  사이클1: [T1][T1][  ][  ]
  사이클2: [T1][  ][  ][  ]  <- T1 계속 (ILP 부족)
  사이클3: [  ][  ][  ][  ]  <- 캐시 미스! 파이프라인 비움
  사이클4: [T2][T2][  ][  ]  <- T2로 전환 (시작 오버헤드)

SMT (여러 스레드 동시):
  사이클1: [T1][T1][T2][T3]  <- 세 스레드의 명령어가 한 사이클에!
  사이클2: [T2][T3][T4][T1]  <- ILP + TLP 모두 활용
  # -> 이슈 슬롯 활용률 극대화

# Intel Core i7: 코어당 2 SMT 스레드
# PARSEC 벤치마크 결과:
# 평균 속도 향상: 1.31배
# 평균 에너지 효율 향상: 1.07배
```

## 관련 개념

- [하드웨어 멀티스레딩 (Hardware Multithreading)](/knowledge/computer-architecture/hardware-multithreading/)
- [멀티프로세서 (Multiprocessor)](/knowledge/computer-architecture/multiprocessor/)
- [GPU (그래픽 처리 장치)](/knowledge/computer-architecture/gpu/)
- [MIMD (다중 명령어 다중 데이터)](/knowledge/computer-architecture/mimd/)
