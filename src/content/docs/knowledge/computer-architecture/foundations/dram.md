---
title: "DRAM (동적 랜덤 액세스 메모리)"
description: "DRAM(Dynamic Random Access Memory)은 집적회로로 구현된 휘발성 메모리로, 어떤 위치든 거의 동일한 시간에 접근할 수 있는 랜덤 액세스 특성을 가지며, 컴퓨터의 메인 메모리에 주로 사용된다"
tags: ['Memory', 'Main Memory', 'Volatile', 'Integrated Circuit', 'Storage']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/dram
sidebar:
  order: 21
---

## 핵심 개념

DRAM은 1975년 이후 메인 메모리(주 메모리)의 주류 기술이다. "Dynamic"이라는 이름은 저장된 데이터를 유지하기 위해 주기적으로 재충전(refresh)해야 하기 때문에 붙여졌다. DRAM은 SRAM보다 밀도가 높고 저렴하지만 속도가 느리다. 접근 시간은 약 50-70나노초이며, 2020년 기준 기가바이트당 비용은 3~6달러이다. 메모리 계층구조에서 DRAM은 캐시(SRAM) 아래, 보조 저장장치(플래시, 디스크) 위에 위치한다.

DRAM은 단일 트랜지스터와 커패시터로 비트를 저장하며, 커패시터의 전하가 수 밀리초 내에 방전되므로 주기적 리프레시가 필요하다. 2단계 디코딩 구조를 사용하여 행(row) 전체를 한 번에 리프레시한다. 행 버퍼는 SRAM처럼 동작하여 같은 행 내 랜덤 접근을 빠르게 처리한다. 현대 DRAM은 Synchronous DRAM(SDRAM)으로 발전했으며, DDR4는 클럭의 상승 및 하강 에지 모두에서 데이터를 전송한다. DDR4-3200은 1600MHz 클럭으로 초당 32억 번 전송한다. 내부적으로 여러 뱅크를 사용하여 주소 인터리빙(address interleaving)으로 대역폭을 높인다. 서버에서는 DIMM(Dual Inline Memory Module) 형태로 사용되며, DDR4-3200 DIMM은 최대 25,600MB/s 대역폭을 제공한다.

읽기 시에는 비트 라인을 중간 전압으로 프리차징한 후 워드 라인을 활성화하여 미세한 전압 변화를 감지 증폭기(sense amplifier)로 감지한다. DRAM은 행 접근(RAS)과 열 접근(CAS) 2단계 디코딩을 사용하며, 동일한 주소 핀을 행과 열 주소에 공유하여 패키지 비용을 절감한다. 접근 시간은 SRAM보다 5-10배 느리다.

## 예시

```
DRAM vs SRAM vs 플래시 비교:

          | DRAM     | SRAM      | 플래시
----------+----------+-----------+---------
휘발성    | 예       | 예        | 아니오
접근 시간 | ~50ns    | ~1-2ns    | ~5-50μs
비용/GB   | $3-$6    | 매우 비쌈  | $0.06-$0.12
용도      | 메인 메모리| 캐시 메모리| 보조 저장장치
```

```
DRAM 셀 구조:
  워드라인 ──→ [패스 트랜지스터] ──→ [커패시터]
                                        │
  비트라인 ←────────────────────────────┘

DRAM 접근 과정:
1. 행 주소 전송 (RAS 활성화)
   → 한 행의 모든 열이 래치에 저장 (예: 2048비트)
2. 열 주소 전송 (CAS 활성화)
   → 래치에서 원하는 비트 선택

4M x 1 DRAM (2048 x 2048 배열):
  11비트 행 주소 → 행 디코더 → 2048개 래치
  11비트 열 주소 → 열 멀티플렉서 → 1비트 출력

리프레시: 전체 행을 읽고 다시 쓰기 (활성 사이클의 1~2%)
SDRAM: 버스트 전송으로 행 내 연속 접근 가속
DDR: 상승+하강 에지 전송 → 2배 대역폭
```

## 관련 개념

- [메모리 계층 구조 (Memory Hierarchy)](/knowledge/computer-architecture/memory-hierarchy/)
- [캐시 메모리 (Cache Memory)](/knowledge/computer-architecture/cache-memory/)
- [SRAM (정적 랜덤 액세스 메모리)](/knowledge/computer-architecture/sram/)
- [플래시 메모리 (Flash Memory)](/knowledge/computer-architecture/flash-memory/)
- [휘발성 메모리 (Volatile Memory)](/knowledge/computer-architecture/volatile-memory/)
- [HBM (고대역폭 메모리)](/knowledge/computer-architecture/high-bandwidth-memory/)
- [오류 검출 코드 (Error Detection Code)](/knowledge/computer-architecture/error-detection-code/)
