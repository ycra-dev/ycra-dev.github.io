---
title: "플래시 메모리 (Flash Memory)"
description: "플래시 메모리(Flash Memory)는 비휘발성 반도체 메모리로, DRAM보다 저렴하고 느리지만 자기 디스크보다 비싸고 빠르며, 전원이 꺼져도 데이터를 유지한다"
tags: ['Nonvolatile Memory', 'Storage', 'Secondary Memory', 'Semiconductor', 'Nand']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/flash-memory
sidebar:
  order: 23
---

## 핵심 개념

플래시 메모리는 메모리 계층구조에서 메인 메모리(DRAM)와 자기 디스크 사이에 위치하는 보조 저장장치이다. 접근 시간은 약 5~50 마이크로초이며, 2020년 기준 기가바이트당 비용은 0.06~0.12달러이다. 디스크보다 크기가 작고, 내구성이 높으며, 전력 효율이 좋아 스마트폰, 태블릿 등 모바일 기기의 표준 보조 저장장치가 되었다. 그러나 플래시 메모리의 비트는 10만~100만 번의 쓰기 후 마모되는 한계가 있어, 파일 시스템은 쓰기 횟수를 추적하고 자주 사용되는 데이터를 분산하는 전략을 사용해야 한다.

## 예시

```
iPhone Xs Max의 저장 구조:
- 메인 메모리: 2 GiB DRAM (휘발성, 빠름)
- 보조 저장장치: 64 GiB 플래시 (비휘발성, 영구 저장)

메모리 계층에서의 위치:
SRAM (캐시) → DRAM (메인 메모리) → 플래시 → 자기 디스크
  가장 빠름                                    가장 느림
  가장 비쌈                                    가장 저렴
```

## 관련 개념

- [메모리 계층 구조 (Memory Hierarchy)](/knowledge/computer-architecture/memory-hierarchy/)
- [DRAM (동적 랜덤 액세스 메모리)](/knowledge/computer-architecture/dram/)
- [휘발성 메모리 (Volatile Memory)](/knowledge/computer-architecture/volatile-memory/)
