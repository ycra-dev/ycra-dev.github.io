---
title: "UNIX 아이노드 (Inode)"
description: "파일의 메타데이터와 데이터 블록 위치를 저장하는 디스크 상의 자료구조"
tags: ["OS", "Storage", "FileSystem", "Inode"]
created: 2026-01-23
updated: 2026-01-27
draft: true
slug: knowledge/os/unix-inode
sidebar:
  order: 5
---

## 핵심 개념

아이노드(index node)는 파일의 메타데이터와 데이터 블록 위치를 저장하는 디스크 상의 자료구조입니다. 파일 데이터가 디스크 여러 곳에 흩어져 있을 수 있고 파일명만으로는 파일을 관리할 수 없으므로, 파일명과 파일 데이터를 분리하여 하드 링크와 효율적인 메타데이터 관리를 지원합니다.

## 동작 원리

파일 시스템은 `<장치 번호, 아이노드 번호>` 쌍으로 파일을 고유하게 식별합니다.

### 아이노드 내용

- 소유자 (UID, GID)
- 파일 유형 (일반 파일, 디렉토리, 심볼릭 링크, 장치 등)
- 권한 모드 (rwxrwxrwx)
- 타임스탬프 (수정, 접근, 변경 시간)
- 하드 링크 카운트
- 파일 크기

### 15개 블록 포인터 구조

- **12개**: 직접 블록 (direct blocks) → 데이터 직접 참조
- **1개**: 단일 간접 (single indirect) → 블록 포인터들의 블록
- **1개**: 이중 간접 (double indirect)
- **1개**: 삼중 간접 (triple indirect) → 4.2BSD에서는 불필요 (2^32 바이트 한계)

```
┌─────────────────┐
│     inode       │
├─────────────────┤
│ mode, uid, gid  │
│ timestamps(3)   │
│ size, links     │
├─────────────────┤
│ direct[0-11] ───┼──> data block
│ single indirect─┼──> [ptr|ptr|...] ──> data
│ double indirect─┼──> [ptr] ──> [ptr] ──> data
│ triple indirect │
└─────────────────┘
```

## 예시

아이노드는 "도서관 카드"와 같습니다. 책의 제목(파일명)은 별도 목록(디렉토리)에 있고, 카드에는 책의 위치(블록 포인터), 저자(소유자), 대출 기록(타임스탬프)이 기록됩니다.

4KB 블록 크기에서 최대 파일 크기:
- 직접 블록: 12 x 4KB = 48KB
- 단일 간접: 1024 x 4KB = 4MB
- 이중 간접: 1024 x 1024 x 4KB = 4GB
- 총 약 4GB (32비트 파일 오프셋 한계와 일치)

- 파일명과 메타데이터 분리로 하드 링크 지원
- 작은 파일은 직접 블록으로 빠른 접근, 큰 파일도 간접 블록으로 효율적 지원
- 단점: 큰 파일 접근 시 간접 블록 추가 I/O 발생, 아이노드 개수 고정(Version 7)

## 관련 개념

- [UNIX 파일 디스크립터 (File Descriptor)](/knowledge/os/unix-file-descriptor/)
- [BSD 실린더 그룹 (Cylinder Group)](/knowledge/os/bsd-cylinder-group/)
- [저장장치 계층구조 (Storage Hierarchy)](/knowledge/os/storage-hierarchy/)
