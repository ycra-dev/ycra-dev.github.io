---
title: "메모리 계층 구조 (Memory Hierarchy)"
description: "메모리 계층구조(Memory Hierarchy)는 속도, 크기, 비용이 다른 여러 수준의 메모리를 계층적으로 배치하여, 프로그래머에게 빠르고 크고 저렴한 메모리의 환상(illusion)을 제공하는 구조이다"
tags: ['Computer Architecture', 'Memory', 'Cache', 'Performance', 'Storage']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/memory-hierarchy
sidebar:
  order: 1
---

## 핵심 개념

프로그래머는 메모리가 빠르고, 크고, 저렴하기를 원하지만 이 세 가지는 상충된다. 컴퓨터 아키텍트들은 메모리 계층구조를 통해 이 모순을 해결한다. 계층의 꼭대기에는 가장 빠르고 작고 비싼 메모리(레지스터, 캐시)가, 바닥에는 가장 느리고 크고 저렴한 메모리(디스크, 플래시)가 위치한다. 캐시를 통해 메인 메모리가 계층 꼭대기만큼 빠르면서 바닥만큼 크고 저렴한 것처럼 보이게 한다. 이는 프로그램의 지역성(locality) 원리를 활용한다.

메모리 계층구조의 기본 동작 단위는 블록(block) 또는 라인(line)이며, 인접한 두 계층 사이에서 블록 단위로 데이터가 복사된다. 상위 계층에서 요청 데이터를 찾으면 히트(hit), 못 찾으면 미스(miss)라 한다. 히트율(hit rate)은 상위 계층에서 찾은 메모리 접근의 비율이고, 미스율(miss rate = 1 - hit rate)은 그 반대이다. 히트 시간(hit time)은 상위 계층 접근 시간이며, 미스 패널티(miss penalty)는 하위 계층에서 블록을 가져오는 데 걸리는 시간이다. 대부분의 시스템에서 메모리 계층은 포함적(inclusive)이어서 레벨 i의 데이터는 레벨 i+1에도 반드시 존재한다.

## 예시

```
레지스터 (가장 빠름, ~1ns, ~수 KB)
    ↓
L1 캐시 (SRAM, ~2ns, ~32KB)
    ↓
L2 캐시 (SRAM, ~10ns, ~256KB)
    ↓
메인 메모리 (DRAM, ~50ns, ~수 GB)
    ↓
보조 저장장치 (플래시/디스크, ~μs-ms, ~수 TB)
```

## 관련 개념

- [캐시 메모리 (Cache Memory)](/knowledge/computer-architecture/cache-memory/)
- [DRAM (동적 랜덤 액세스 메모리)](/knowledge/computer-architecture/dram/)
- [SRAM (정적 랜덤 액세스 메모리)](/knowledge/computer-architecture/sram/)
- [플래시 메모리 (Flash Memory)](/knowledge/computer-architecture/flash-memory/)
- [레지스터 (Register)](/knowledge/computer-architecture/register/)
- [시간 지역성 (Temporal Locality)](/knowledge/computer-architecture/temporal-locality/)
- [공간 지역성 (Spatial Locality)](/knowledge/computer-architecture/spatial-locality/)
- [직접 사상 캐시 (Direct-Mapped Cache)](/knowledge/computer-architecture/direct-mapped-cache/)
- [다단계 캐시 (Multilevel Cache)](/knowledge/computer-architecture/multilevel-cache/)
