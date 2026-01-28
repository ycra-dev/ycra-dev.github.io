---
title: "BSD 실린더 그룹 (Cylinder Group)"
description: "BSD Fast File System(FFS)에서 관련 데이터를 디스크의 인접 영역에 배치하여 seek 시간을 최소화하는 할당 단위"
tags: ["OS", "Storage", "FileSystem", "FFS"]
created: 2026-01-23
updated: 2026-01-27
draft: true
slug: knowledge/os/bsd-cylinder-group
sidebar:
  order: 6
---

## 핵심 개념

실린더 그룹(Cylinder Group)은 BSD Fast File System(FFS)에서 관련 데이터를 디스크의 인접 영역에 배치하여 seek 시간을 최소화하는 할당 단위입니다. Version 7 파일 시스템은 아이노드와 데이터 블록이 디스크 전체에 흩어져 seek 오버헤드가 컸기 때문에, 파일의 아이노드와 데이터 블록을 가깝게 배치하여 성능을 향상시켰습니다.

## 동작 원리

디스크는 여러 실린더로 구성되며, 같은 실린더 내 접근은 seek가 불필요합니다.

### 실린더 그룹 구성 (각 그룹마다)

- **슈퍼블록 사본** (복구용, 다른 오프셋에 배치)
- **실린더 블록** (free 블록/아이노드 비트맵, 할당 통계)
- **아이노드 배열**
- **데이터 블록**

### 할당 정책

- 파일의 아이노드: 부모 디렉토리와 같은 실린더 그룹
- 새 디렉토리의 아이노드: 다른 실린더 그룹 (분산)
- 데이터 블록: 아이노드와 같은 실린더 그룹
- 큰 파일(>2MB): 일정 크기마다 다른 실린더 그룹으로 리다이렉트

### 블록과 프래그먼트

큰 블록(4-8KB)과 작은 프래그먼트(512-1024B) 조합으로 내부 단편화를 감소시킵니다.

```
┌─────────────────────────────────────────────────────┐
│                    파일 시스템                       │
├─────────────────┬─────────────────┬─────────────────┤
│ Cylinder Group 0│ Cylinder Group 1│ Cylinder Group 2│
├─────────────────┼─────────────────┼─────────────────┤
│ superblock*     │ superblock*     │ superblock*     │
│ cylinder block  │ cylinder block  │ cylinder block  │
│ inodes          │ inodes          │ inodes          │
│ data blocks     │ data blocks     │ data blocks     │
└─────────────────┴─────────────────┴─────────────────┘
* 슈퍼블록은 복구를 위해 각 그룹에 복사, 오프셋은 다름
```

## 예시

실린더 그룹은 "도서관의 서가"와 같습니다. 관련 책(파일)을 같은 서가(실린더 그룹)에 모아두면 찾기 쉽습니다.

`/home/user/doc.txt` 생성 시:
1. user 디렉토리의 실린더 그룹에서 free inode 할당
2. 같은 실린더 그룹에서 데이터 블록 할당
3. `ls /home/user/` 시 모든 inode가 근처에 있어 빠름

- 디스크 seek 시간 대폭 감소 (관련 데이터 근접)
- 슈퍼블록 복제로 안정성 향상
- Version 7 대비 약 10배 성능 향상 (3% → 30% 디스크 대역폭 활용)
- 단점: 10% 정도 여유 공간 필요, 프래그먼트 재할당 시 복사 오버헤드

## 관련 개념

- [UNIX 아이노드 (Inode)](/knowledge/os/unix-inode/)
- [UNIX 블록 버퍼 캐시 (Block Buffer Cache)](/knowledge/os/unix-block-buffer-cache/)
- [저장장치 계층구조 (Storage Hierarchy)](/knowledge/os/storage-hierarchy/)
