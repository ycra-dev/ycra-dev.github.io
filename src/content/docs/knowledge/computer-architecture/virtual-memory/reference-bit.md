---
title: "참조 비트 (Reference Bit)"
description: "참조 비트(reference bit 또는 use bit)는 페이지가 접근될 때마다 설정되는 필드로, LRU 또는 기타 교체 알고리즘을 구현하는 데 사용된다"
tags: ['Virtual Memory', 'Page Replacement', 'Lru', 'Page Table', 'Operating System']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/reference-bit
sidebar:
  order: 7
---

## 핵심 개념

완전히 정확한 LRU 방식의 구현은 모든 메모리 참조마다 데이터 구조를 업데이트해야 하므로 비용이 너무 크다. 대신 대부분의 운영체제는 참조 비트를 사용하여 LRU를 근사한다.

동작 방식: 운영체제가 주기적으로 모든 참조 비트를 클리어한 뒤, 나중에 기록된 참조 비트를 확인하여 특정 시간 동안 어떤 페이지가 접근되었는지를 판단한다. 참조 비트가 꺼져 있는 페이지(최근에 참조되지 않은 페이지)를 교체 대상으로 선택한다.

하드웨어가 참조 비트를 제공하지 않는 경우, 운영체제는 다른 방법으로 페이지 접근 여부를 추정해야 한다. TLB에도 참조 비트가 포함되어 있으며, TLB 엔트리 교체 시 이 비트를 페이지 테이블 엔트리로 다시 복사해야 한다.

## 예시

```
# 참조 비트를 이용한 LRU 근사 알고리즘
시간 T0: OS가 모든 페이지의 참조 비트를 0으로 클리어
시간 T0~T1: 하드웨어가 접근된 페이지의 참조 비트를 1로 설정
시간 T1: OS가 참조 비트 기록
  페이지 A: ref = 1 (접근됨)
  페이지 B: ref = 0 (접근 안 됨) -> 교체 후보
  페이지 C: ref = 1 (접근됨)
  페이지 D: ref = 0 (접근 안 됨) -> 교체 후보
```

## 관련 개념

- [가상 메모리 (Virtual Memory)](/knowledge/computer-architecture/virtual-memory/)
- [페이지 테이블 (Page Table)](/knowledge/computer-architecture/page-table/)
- [더티 비트 (Dirty Bit)](/knowledge/computer-architecture/dirty-bit/)
- [페이지 폴트 (Page Fault)](/knowledge/computer-architecture/page-fault/)
