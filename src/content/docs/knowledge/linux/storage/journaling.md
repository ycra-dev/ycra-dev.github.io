---
title: "저널링 (Journaling)"
description: "저널링(Journaling)은 파일시스템 연산의 변경사항을 먼저 저널(로그)에 기록한 뒤 실제 파일시스템에 반영하는 기법으로, 정전이나 충돌 시 데이터 구조의 일관성을 보장한다"
tags: ['Journaling', 'Filesystem', 'Crash Recovery', 'Ext4', 'Xfs', 'Data Integrity']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/linux/journaling
sidebar:
  order: 7
---

## 핵심 개념

**작동 원리:**
1. 파일시스템 연산 시 필요한 변경사항을 저널에 기록
2. 커밋 레코드(commit record)를 저널에 작성하여 항목 완료 표시
3. 실제 파일시스템 구조를 수정
4. 충돌 발생 시, 저널을 재생(replay)하여 일관된 파일시스템 상태를 복구

**메타데이터 vs 데이터 저널링:** 대부분의 파일시스템은 메타데이터 변경만 저널링한다. 실제 파일 데이터는 직접 기록. 일부 파일시스템은 데이터도 저널링할 수 있지만 성능 비용이 크다.

**fsck에 미치는 영향:** 저널링 이전에는 fsck가 디스크 전체를 스캔해야 했으므로 대용량 드라이브에서 수 시간 소요. 저널링 이후 장애 시점의 활동만 확인하면 되어 약 1초로 단축.

**ext2 -> ext3 -> ext4 진화:** ext2(저널링 없음) -> ext3(저널링 추가) -> ext4(익스텐트 기반 할당, 크기 제한 완화). XFS는 SGI에서 개발한 초기 익스텐트 기반 저널링 파일시스템. UFS는 FreeBSD의 기본 파일시스템.

**Copy-on-Write와의 비교:** ZFS, Btrfs는 저널링 대신 CoW 방식으로 항상 일관성을 유지하므로 별도의 저널이 불필요하다.

## 예시

```bash
# 파일시스템 저널 확인 (ext4)
sudo tune2fs -l /dev/sda1 | grep "Journal"

# 파일시스템 정기 검사 횟수 설정
sudo tune2fs -c 50 /dev/sda1

# fsck 수행 (저널 재생)
sudo fsck -y /dev/sda1

# XFS 파일시스템 생성 (저널링 기본 포함)
sudo mkfs.xfs /dev/sdb1
```

## 관련 개념

- [파일 시스템 (Filesystem)](/knowledge/linux/filesystem/)
- [기록 시 복사 (Copy-on-Write)](/knowledge/linux/copy-on-write/)
- [아이노드 (Inode)](/knowledge/linux/inode/)
- [ZFS (Z 파일 시스템)](/knowledge/linux/zfs/)
- [Btrfs (B-트리 파일 시스템)](/knowledge/linux/btrfs/)
