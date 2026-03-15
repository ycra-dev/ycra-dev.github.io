---
title: "페이지 테이블 (Page Table)"
description: "페이지 테이블은 가상 메모리 시스템에서 가상 주소를 물리 주소로 변환하는 매핑 정보를 담고 있는 테이블이다"
tags: ['Virtual Memory', 'Address Translation', 'Page Fault', 'Physical Address', 'Operating System']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/page-table
sidebar:
  order: 3
---

## 핵심 개념

페이지 테이블은 각 프로그램(프로세스)마다 고유하게 존재하며, 해당 프로그램의 가상 주소 공간을 메인 메모리로 매핑한다. 하드웨어는 페이지 테이블의 시작 주소를 가리키는 페이지 테이블 레지스터(page table register)를 포함한다.

각 페이지 테이블 엔트리에는 유효 비트(valid bit)가 있어 해당 페이지가 메인 메모리에 있는지 여부를 나타낸다. 페이지 테이블은 모든 가상 페이지에 대한 매핑을 포함하므로 태그가 필요 없다(캐시 용어로 인덱스가 전체 블록 주소에 해당).

페이지 테이블 크기를 줄이기 위한 다양한 기법이 존재한다:
1. 제한 레지스터(limit register)를 사용하여 페이지 테이블 크기 제한
2. 두 개의 세그먼트(스택/힙)로 분할하여 양방향 성장 지원
3. 역 페이지 테이블(inverted page table): 해싱을 사용하여 물리 페이지 수만큼만 유지
4. 다단계 페이지 테이블: 세그먼트 테이블 + 페이지 테이블
5. 페이지 테이블 자체를 페이징 (OS 주소 공간에 배치)

## 예시

```
# 32비트 주소, 4 KiB 페이지 기준
페이지 테이블 레지스터 -> 페이지 테이블 시작 주소

가상 주소: [가상 페이지 번호 (20비트)] [오프셋 (12비트)]
              |
              v
페이지 테이블[가상 페이지 번호]:
  +-------+---+---+---+-------------------+
  | valid | D | R | W | 물리 페이지 번호   |
  +-------+---+---+---+-------------------+
  |   1   | 0 | 1 | 1 | 0x3A2             |  -> 메모리에 있음
  |   0   | - | - | - | 디스크 주소        |  -> 페이지 폴트
  +-------+---+---+---+-------------------+

# 프로세스 전환 시
OS가 페이지 테이블 레지스터를 새 프로세스의 페이지 테이블로 변경
```

## 관련 개념

- [가상 메모리 (Virtual Memory)](/knowledge/computer-architecture/virtual-memory/)
- [주소 변환 (Address Translation)](/knowledge/computer-architecture/address-translation/)
- [페이지 폴트 (Page Fault)](/knowledge/computer-architecture/page-fault/)
- [TLB (변환 색인 버퍼)](/knowledge/computer-architecture/translation-lookaside-buffer/)
- [문맥 교환 (Context Switch)](/knowledge/computer-architecture/context-switch/)
