---
title: "Heap File"
description: "힙 파일(Heap File)은 레코드를 파일 내 공간이 있는 임의의 위치에 배치하는 파일 조직 방식으로, 레코드 간 특별한 순서가 없다"
tags: ['Heap File', 'Free Space Map', 'Record Insertion', 'File Organization', 'Unordered Storage']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/database/heap-file
sidebar:
  order: 7
---

## 핵심 개념

힙 파일 조직에서 레코드는 한 번 배치되면 일반적으로 이동하지 않는다. 새 레코드 삽입 시 파일 끝에 추가하거나, 삭제로 인해 생긴 빈 공간을 재활용한다.

빈 공간을 효율적으로 찾기 위해 프리 스페이스 맵(free-space map)이라는 자료 구조를 사용한다. 프리 스페이스 맵은 릴레이션의 각 블록마다 하나의 엔트리를 가지는 배열로, 해당 블록의 여유 공간 비율을 나타낸다. 예를 들어 PostgreSQL에서는 1바이트 엔트리를 사용하며, 저장된 값을 256으로 나누어 여유 공간 비율을 얻는다.

대형 파일에서 프리 스페이스 맵 검색을 가속화하기 위해 2단계 프리 스페이스 맵을 구성할 수 있다. 2단계 맵은 1단계 맵의 100개 엔트리마다 최댓값 하나를 저장하여, 검색 시간을 1/100로 줄인다. 매우 큰 릴레이션에는 더 많은 레벨을 추가할 수 있다.

프리 스페이스 맵은 매번 디스크에 쓰지 않고 주기적으로 기록하므로, 시스템 재시작 시 약간의 부정확성이 발생할 수 있다. 릴레이션을 주기적으로 스캔하여 프리 스페이스 맵을 재계산한다.

## 예시

프리 스페이스 맵의 동작 예시:

```
16개 블록을 가진 파일의 프리 스페이스 맵 (3비트 사용):
1단계: [4, 2, 1, 4, 7, 3, 6, 5, 1, 2, 0, 1, 1, 0, 5, 6]
  → 값 7: 블록의 최소 7/8이 비어 있음
  → 값 0: 블록이 거의 가득 참

2단계 (4개 엔트리마다 최댓값):
[4, 7, 2, 6]
  → 새 레코드 삽입 시, 2단계에서 충분한 여유 공간이 있는 그룹을 먼저 찾음
  → 해당 그룹의 1단계 엔트리를 검색하여 적절한 블록을 선택
```

## 관련 개념

- [File Organization](/knowledge/database/file-organization/)
- [Sequential File](/knowledge/database/sequential-file/)
- [Slotted Page](/knowledge/database/slotted-page/)
- [Buffer Pool](/knowledge/database/buffer-pool/)
