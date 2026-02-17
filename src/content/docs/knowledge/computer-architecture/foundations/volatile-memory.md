---
title: "Volatile Memory"
description: "휘발성 메모리(Volatile Memory)는 전원이 차단되면 저장된 데이터가 소실되는 메모리이다"
tags: ['Memory', 'Dram', 'Sram', 'Power', 'Main Memory']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/volatile-memory
sidebar:
  order: 24
---

## 핵심 개념

DRAM과 SRAM은 대표적인 휘발성 메모리이다. 프로그램 실행 중 데이터와 명령어를 보관하는 메인 메모리(주 메모리, primary memory)로 사용된다. 반면, 프로그램 실행 사이에 데이터와 프로그램을 저장하는 보조 메모리(secondary memory)에는 비휘발성 기술(플래시, 자기 디스크, DVD 등)이 사용된다. 이 구분은 메모리 계층구조에서 중요한 역할을 하며, 컴퓨터 시스템 설계에서 데이터의 영속성을 보장하기 위한 핵심 고려사항이다.

## 예시

```
휘발성 메모리 (전원 차단 시 데이터 소실):
- SRAM: 캐시 메모리
- DRAM: 메인 메모리

비휘발성 메모리 (전원 차단 후에도 데이터 유지):
- 플래시 메모리: SSD, USB 드라이브
- 자기 디스크: 하드 드라이브 (HDD)
- 광학 디스크: DVD, Blu-ray
```

## 관련 개념

- [DRAM](/knowledge/computer-architecture/dram/)
- [SRAM](/knowledge/computer-architecture/sram/)
- [Flash Memory](/knowledge/computer-architecture/flash-memory/)
- [Memory Hierarchy](/knowledge/computer-architecture/memory-hierarchy/)
