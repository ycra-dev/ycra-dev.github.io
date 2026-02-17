---
title: "Address Translation"
description: "주소 변환(address translation 또는 address mapping)은 프로세서가 생성한 가상 주소를 메인 메모리에 접근하기 위한 물리 주소로 변환하는 과정이다"
tags: ['Virtual Memory', 'Page Table', 'Tlb', 'Virtual Address', 'Physical Address']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/address-translation
sidebar:
  order: 2
---

## 핵심 개념

가상 메모리 시스템에서 프로세서는 가상 주소를 생성하고, 이것이 하드웨어와 소프트웨어의 조합을 통해 물리 주소로 변환된다. 가상 주소는 가상 페이지 번호(VPN)와 페이지 오프셋으로 분할된다. 가상 페이지 번호는 페이지 테이블 또는 TLB를 통해 물리 페이지 번호(PPN)로 변환되고, 페이지 오프셋은 변경 없이 물리 주소의 하위 부분을 구성한다.

주소 변환은 또한 메모리 보호를 강제하는 메커니즘을 제공한다. 가상 주소 공간의 페이지 수가 물리 주소 공간의 페이지 수보다 많을 수 있으며, 이것이 사실상 무한한 가상 메모리의 환상을 제공하는 기반이다.

주소 변환의 성능 향상을 위해 TLB(Translation Lookaside Buffer)가 사용되며, 이는 최근 사용된 변환을 캐싱하여 페이지 테이블에 대한 메모리 접근을 줄인다. TLB 없이 모든 메모리 접근이 페이지 테이블을 참조해야 한다면, 가상 메모리의 비용이 너무 높아 캐시가 무의미해질 것이다.

## 예시

```
# 주소 변환 과정 (4 KiB 페이지, 32비트 주소)
가상 주소: 0x00003A7C
  = [VPN: 0x00003] [오프셋: 0xA7C]

1단계: TLB에서 VPN 0x00003 검색
  - TLB 히트 -> 바로 물리 페이지 번호 획득
  - TLB 미스 -> 페이지 테이블 참조

2단계: 물리 주소 구성
  VPN 0x00003 -> PPN 0x1F (페이지 테이블/TLB에서)
  물리 주소 = [PPN: 0x1F] [오프셋: 0xA7C]
            = 0x0001FA7C
```

## 관련 개념

- [Virtual Memory](/knowledge/computer-architecture/virtual-memory/)
- [Page Table](/knowledge/computer-architecture/page-table/)
- [Translation Lookaside Buffer](/knowledge/computer-architecture/translation-lookaside-buffer/)
- [Virtual Machine](/knowledge/computer-architecture/virtual-machine/)
