---
title: "Swap Space"
description: "스왑 공간은 프로세스의 전체 가상 메모리 공간을 위해 디스크에 예약된 공간이다"
tags: ['Virtual Memory', 'Disk', 'Page Fault', 'Operating System', 'Secondary Storage']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/swap-space
sidebar:
  order: 8
---

## 핵심 개념

가상 메모리에서 메모리 내의 페이지가 언제 대체될지 미리 알 수 없기 때문에, 운영체제는 프로세스 생성 시 모든 가상 페이지를 저장할 수 있는 디스크 공간을 미리 준비한다. 이를 통해 페이지 폴트 발생 시 대체되는 페이지를 디스크에 기록할 수 있다.

운영체제는 각 가상 페이지가 디스크 어디에 저장되어 있는지를 기록하는 데이터 구조도 함께 생성한다. 이 구조는 페이지 테이블의 일부이거나 페이지 테이블과 같은 방식으로 인덱싱되는 보조 데이터 구조일 수 있다.

대체할 페이지를 선택할 때, 운영체제는 LRU(Least Recently Used) 근사 방식을 사용한다. 하드웨어가 제공하는 참조 비트(reference bit)를 활용하여 최근에 접근되지 않은 페이지를 찾아 교체 대상으로 선정한다.

## 예시

```
# 스왑 공간의 동작
프로세스 생성 시:
  1. OS가 가상 주소 공간 크기만큼 디스크에 스왑 공간 할당
  2. 각 가상 페이지의 디스크 위치를 기록하는 데이터 구조 생성

페이지 폴트 발생 시:
  1. 대체할 물리 페이지 선택 (LRU 근사)
  2. 더티 비트 확인:
     - dirty = 1: 페이지를 스왑 공간에 기록 후 새 페이지 로드
     - dirty = 0: 바로 새 페이지 로드 (변경 없으므로 기록 불필요)
  3. 디스크에서 필요한 페이지를 물리 메모리로 로드
```

## 관련 개념

- [Virtual Memory](/knowledge/computer-architecture/virtual-memory/)
- [Page Fault](/knowledge/computer-architecture/page-fault/)
- [Page Table](/knowledge/computer-architecture/page-table/)
- [Write-Back](/knowledge/computer-architecture/write-back/)
