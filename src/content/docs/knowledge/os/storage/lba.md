---
title: "논리 블록 주소 (LBA)"
description: "저장장치를 물리적 세부사항과 무관하게 0부터 시작하는 연속된 블록 배열로 추상화한 주소 체계"
tags: ["OS", "Storage", "Abstraction"]
created: 2026-01-27
updated: 2026-01-27
draft: true
slug: knowledge/os/lba
sidebar:
  order: 8
---

## 핵심 개념

논리 블록 주소(LBA, Logical Block Address)는 저장장치를 물리적 세부사항과 무관하게 0부터 시작하는 연속된 블록 배열로 추상화한 주소 체계입니다. HDD는 (실린더, 헤드, 섹터), SSD는 (칩, 블록, 페이지) 등 물리적 구조가 다르므로, OS가 단순한 선형 블록 배열로 접근하고 물리적 매핑은 컨트롤러에 맡깁니다.

## 동작 원리

### LBA 개념

- 저장장치를 **1차원 논리 블록 배열**로 표현 (0, 1, 2, ... N-1)
- 논리 블록 크기: 보통 512B 또는 4KB
- OS는 LBA만 사용 → "LBA 100번 읽어줘"
- 컨트롤러가 LBA → 물리 주소 변환

```
추상화 계층:
    응용 프로그램
         ↓
    파일 시스템 (파일명, 오프셋)
         ↓
    OS 블록 계층 (LBA)
         ↓
    장치 드라이버
         ↓
    저장장치 컨트롤러 (LBA → 물리 주소 변환)
         ↓
    물리 미디어 (HDD: CHS, SSD: 칩/블록/페이지)
```

### HDD에서의 매핑

- 이론적 변환: LBA → (실린더, 헤드, 섹터) 튜플
- 현대 HDD는 내부적으로 매핑 관리, 호스트에 노출 안 함
- 결함 섹터는 예비 섹터로 대체 → LBA는 연속, 물리 위치는 불연속

### SSD에서의 매핑

- **FTL**(Flash Translation Layer)이 LBA → (칩, 블록, 페이지) 변환
- 덮어쓰기 불가 → 같은 LBA도 매번 다른 물리 위치에 기록될 수 있음
- 매핑 테이블이 RAM에 상주

### 기록 밀도 방식

| 방식 | 설명 | 용도 |
|------|------|------|
| **CLV** (Constant Linear Velocity) | 비트 밀도 균일, 회전 속도 가변 | CD/DVD |
| **CAV** (Constant Angular Velocity) | 회전 속도 고정, 외곽 밀도 감소 | HDD |

## 예시

아파트 주소 체계와 같습니다. LBA = "101동 202호"(논리 주소), 물리 주소 = 실제 건물 내 GPS 좌표. 우편배달부(OS)는 "101동 202호"만 알면 되고, 건물 내부 구조는 건물 관리(컨트롤러)가 처리합니다.

1TB HDD: LBA 0 ~ 1,953,125,000 (512B 섹터 기준). OS가 "LBA 1,000,000 읽기" 요청 → 컨트롤러가 실제 실린더/헤드/섹터 계산하여 수행.

- 장점: 저장장치 추상화로 OS 단순화, 장치 독립적 프로그래밍, 물리적 결함 은닉
- 단점: LBA와 물리 위치 관계가 불투명, HDD에서 LBA 순서와 물리 인접이 항상 일치하지 않음

## 관련 개념

- [저장장치 계층구조 (Storage Hierarchy)](/knowledge/os/storage-hierarchy/)
- [DMA (Direct Memory Access)](/knowledge/os/dma/)
- [I/O 스케줄링 (I/O Scheduling)](/knowledge/os/io-scheduling/)
