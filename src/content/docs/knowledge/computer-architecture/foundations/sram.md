---
title: "Static Random Access Memory"
description: "SRAM(Static Random Access Memory)은 집적회로로 구현된 메모리로, DRAM보다 빠르지만 밀도가 낮고 비용이 높으며, 주로 캐시 메모리에 사용된다"
tags: ['Memory', 'Cache', 'Integrated Circuit', 'Volatile', 'Fast Memory']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/sram
sidebar:
  order: 22
---

## 핵심 개념

SRAM은 "Static"이라는 이름에서 알 수 있듯이 전원이 공급되는 한 데이터를 유지하기 위한 별도의 재충전(refresh)이 필요 없다. 이는 DRAM과의 핵심적인 차이점이다. SRAM은 일반적으로 6~8개의 트랜지스터로 하나의 비트를 저장하며, DRAM은 1개의 트랜지스터와 1개의 커패시터로 구성된다. 이 때문에 SRAM은 더 빠르지만 칩 면적을 더 많이 차지하여 밀도가 낮고 비용이 높다. SRAM과 DRAM은 메모리 계층구조의 두 계층을 형성하며, SRAM은 캐시에, DRAM은 메인 메모리에 사용된다.

SRAM은 단일 접근 포트를 가진 메모리 배열로, 읽기 또는 쓰기를 제공한다. 리프레시가 필요 없으므로 접근 시간(0.5-2.5ns)이 사이클 시간에 매우 근접한다. 2020년 기준 기가바이트당 비용은 $500-$1000이다. 과거에는 별도의 SRAM 칩을 캐시에 사용했으나, 무어의 법칙 덕분에 현재는 모든 수준의 캐시가 프로세서 칩에 통합되어 있어 독립 SRAM 칩 시장은 거의 사라졌다. 대기 모드에서도 최소 전력만으로 데이터를 유지할 수 있다.

대형 SRAM은 레지스터 파일처럼 거대한 멀티플렉서로 구현하는 것이 비실용적이므로, 3상태 버퍼(tristate buffer)를 사용하는 공유 비트 라인으로 구현한다. 3상태 버퍼는 활성, 비활성, 고임피던스의 세 가지 상태를 가지며, 여러 메모리 셀이 하나의 출력 라인을 공유할 수 있게 한다. 대형 SRAM은 2단계 디코딩을 사용하여 거대한 디코더 없이 효율적으로 구현한다. 예를 들어 4Mx8 SRAM은 4Kx1024 배열로 구성된다. 동기식 SRAM(SSRAM)은 클럭 신호를 사용하여 버스트 모드로 연속 주소의 데이터를 빠르게 전송할 수 있다. SRAM은 셀당 4-6개 트랜지스터를 사용하므로 DRAM(1개 트랜지스터)보다 밀도가 낮지만 접근 속도가 빠르다.

## 예시

```
SRAM의 특징:
- 접근 시간: ~1-2 나노초
- 구성: 비트당 6 트랜지스터 (플립플롭 기반)
- 재충전: 불필요 (전원 공급 시 데이터 유지)
- 용도: L1, L2, L3 캐시

DRAM의 특징:
- 접근 시간: ~50 나노초
- 구성: 비트당 1 트랜지스터 + 1 커패시터
- 재충전: 필요 (주기적 리프레시)
- 용도: 메인 메모리
```

```
SRAM 내부 구조 (4x2 SRAM 예시):

                 비트라인0  비트라인1
워드라인0 ──→  [D 래치]  [D 래치]
워드라인1 ──→  [D 래치]  [D 래치]
워드라인2 ──→  [D 래치]  [D 래치]
워드라인3 ──→  [D 래치]  [D 래치]
                  ↓          ↓
              3상태버퍼   3상태버퍼
                  ↓          ↓
               출력 비트0  출력 비트1

2단계 디코딩 (4Mx8 SRAM):
  22비트 주소 → [행 디코더(12비트)] → 4K 행 중 1개 선택
              → [열 멀티플렉서(10비트)] → 1024비트 중 8비트 선택
```

## 관련 개념

- [Cache Memory](/knowledge/computer-architecture/cache-memory/)
- [DRAM](/knowledge/computer-architecture/dram/)
- [Memory Hierarchy](/knowledge/computer-architecture/memory-hierarchy/)
- [Transistor](/knowledge/computer-architecture/transistor/)
- [Register File](/knowledge/computer-architecture/register-file/)
