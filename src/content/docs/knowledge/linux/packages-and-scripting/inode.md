---
title: "아이노드 (Inode)"
description: "Inode(index node)는 파일시스템에서 파일의 메타데이터(소유자, 권한, 크기, 타임스탬프, 데이터 블록 위치 등)를 저장하는 데이터 구조로, 파일 이름과는 별도로 관리된다"
tags: ['Inode', 'Filesystem', 'Hard Link', 'Symbolic Link', 'Unix']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/linux/inode
sidebar:
  order: 2
---

## 핵심 개념

파일의 이름은 디렉토리에 저장되며, 디렉토리 엔트리는 이름과 inode 번호의 매핑이다. 하나의 inode에 여러 디렉토리 엔트리가 가리킬 수 있으며, 이것이 하드 링크이다.

**하드 링크 vs 심볼릭 링크:**
- **하드 링크**: 같은 inode를 직접 참조. 파일시스템 경계를 넘을 수 없음. 모든 링크가 동등하며 원본/복사 구분 없음. `ln`으로 생성. 파일시스템이 링크 카운트를 유지하고 마지막 링크 삭제 시 데이터 해제.
- **심볼릭 링크**: 파일 이름(경로)을 참조. 다른 파일시스템을 가리킬 수 있음. 존재하지 않는 파일도 가리킬 수 있음. `ln -s`로 생성. 자체 권한은 무의미(더미 값 `lrwxrwxrwx`).

`ls -i`로 inode 번호를 확인할 수 있고, `ls -l`의 두 번째 필드가 링크 카운트이다. 모든 디렉토리는 최소 2개의 하드 링크를 가진다: 부모 디렉토리의 엔트리와 자기 자신의 `.`.

## 예시

```bash
# inode 번호 확인
ls -li /usr/bin/gzip

# 하드 링크 생성
ln oldfile newfile

# 심볼릭 링크 생성
ln -s /var/data/archived/secure /var/data/secure

# 같은 inode를 가진 파일 찾기 (하드 링크 탐색)
find /usr/bin -xdev -inum 12345 -print
```

**저장소 관점(Ch.20):** Inode는 고정 길이 테이블 항목으로, 각각 하나의 파일 정보를 저장한다. 전통적으로 파일시스템 생성 시 미리 할당되었지만, 일부 현대 파일시스템은 동적으로 생성한다. Superblock은 디스크 블록 크기, inode 테이블 위치, 블록 맵, 블록 그룹 크기 등 파일시스템 특성을 기록하는 구조로, 손상 방지를 위해 여러 복사본이 유지된다. fsck가 부모 디렉토리를 찾지 못한 파일을 lost+found에 inode 번호로 저장한다.

## 관련 개념

- [파일 시스템 (Filesystem)](/knowledge/linux/filesystem/)
- [파일 권한 (File Permissions)](/knowledge/linux/file-permissions/)
- [ZFS (Z 파일 시스템)](/knowledge/linux/zfs/)
- [Btrfs (B-트리 파일 시스템)](/knowledge/linux/btrfs/)
