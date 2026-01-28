---
title: "NTFS 구조 (NTFS Structure)"
description: "MFT 기반 구조, 다중 데이터 스트림, B+ 트리 디렉토리를 지원하는 Windows 파일 시스템"
tags: ["OS", "Storage", "Windows"]
created: 2026-01-27
updated: 2026-01-27
draft: true
slug: knowledge/os/ntfs-structure
sidebar:
  order: 15
---

## 핵심 개념

NTFS(New Technology File System)는 Windows의 기본 파일 시스템으로, **MFT(Master File Table) 기반 구조**와 다중 데이터 스트림을 지원한다. "모든 것은 파일이다" — 메타데이터조차 파일로 저장한다. FAT 파일 시스템이 지원하지 않는 보안(ACL), 대용량, 안정성(저널링)을 제공한다.

비유하면, MFT는 도서관 카탈로그이다. 각 카드(MFT Entry)에 책 정보(속성)가 기록되어 있고, 책이 작으면 카드에 직접 붙여두고(Resident), 크면 서가 위치(Run List)만 기록한다.

## 동작 원리

### 볼륨 구조

```
┌───────────────────────────────────────────────────────────────┐
│                        NTFS Volume                            │
├───────────────────────────────────────────────────────────────┤
│  Boot Sector  │  MFT  │  Log File  │  Data Area              │
│  (부트 코드,  │       │  (저널)    │  (실제 파일 데이터)      │
│   MFT 위치)   │       │            │                          │
└───────────────────────────────────────────────────────────────┘
```

### 클러스터와 주소 체계

- **클러스터**: 디스크 할당의 최소 단위 (기본 4KB)
- **LCN (Logical Cluster Number)**: 볼륨 시작부터의 클러스터 번호
- **VCN (Virtual Cluster Number)**: 파일 내 상대적 클러스터 번호

### MFT (Master File Table)

볼륨의 모든 파일을 설명하는 레코드 배열이다.

| Entry | 설명 |
|-------|------|
| 0 | $MFT - MFT 자체 |
| 1 | $MFTMirr - MFT 처음 16개 엔트리 미러 |
| 2 | $LogFile - 트랜잭션 로그 |
| 3 | $Volume - 볼륨 이름, NTFS 버전 |
| 4 | $AttrDef - 속성 정의 테이블 |
| 5 | . (루트 디렉토리) |
| 6 | $Bitmap - 클러스터 할당 비트맵 |
| 7 | $Boot - 부트 섹터 및 부트 코드 |
| 8 | $BadClus - 불량 클러스터 목록 |
| ... | 사용자 파일들 |

### MFT Entry (파일 구조)

```
MFT Entry (1~4KB)
┌──────────────────────────────────────────┐
│ Header                                   │
├──────────────────────────────────────────┤
│ $STANDARD_INFORMATION (생성/수정 시간)   │ ← Resident
├──────────────────────────────────────────┤
│ $FILE_NAME (파일명, 부모 참조)            │ ← Resident
├──────────────────────────────────────────┤
│ $DATA (파일 내용)                         │ ← Resident 또는 Non-resident
│   작은 파일: MFT에 직접 저장              │
│   큰 파일: Run List (클러스터 포인터)     │
├──────────────────────────────────────────┤
│ $SECURITY_DESCRIPTOR (ACL)               │ ← 공유 참조
├──────────────────────────────────────────┤
│ $DATA:thumbnail (명명된 스트림 - 선택적)  │
└──────────────────────────────────────────┘
```

### 상주 vs 비상주 속성

- **상주 (Resident)**: 작은 속성은 MFT 레코드 내에 직접 저장 → 별도 디스크 접근 불필요
- **비상주 (Non-resident)**: 큰 속성은 별도 클러스터에 저장, MFT에는 익스텐트 포인터만 기록

### 다중 데이터 스트림

파일은 여러 개의 명명된 데이터 스트림을 가질 수 있다. `filename:streamname`으로 접근하며, Macintosh 리소스 포크, 썸네일, 메타데이터 등에 활용된다.

### 디렉토리 인덱스

B+ 트리 구조로 파일명을 인덱스하여 O(log n) 검색을 제공한다. 디렉토리 리스팅 시 MFT 조회 없이 파일명, 크기, 시간 복사본을 직접 참조할 수 있다.

## 예시

1. 파일 `report.docx` 생성 → MFT에 새 레코드 할당
2. 파일명, 생성 시간, 보안 디스크립터 속성 저장
3. 파일 내용이 작으면 MFT 레코드 내 직접 저장 (상주)
4. 파일이 커지면 별도 클러스터에 저장, MFT에 포인터 기록 (비상주)

## 관련 개념

- [NTFS 복구 메커니즘](/knowledge/os/ntfs-recovery/) - 트랜잭션 로깅 기반 복구
- [저널링 파일 시스템 (Journaling)](/knowledge/os/journaling/) - 트랜잭션 로그로 일관성 보장
- [UNIX 아이노드 (Inode)](/knowledge/os/unix-inode/) - UNIX 파일 시스템의 메타데이터 구조
- [논리 블록 주소 (LBA)](/knowledge/os/lba/) - 저장장치 주소 체계
