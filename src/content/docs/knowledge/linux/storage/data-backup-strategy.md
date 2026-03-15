---
title: "데이터 백업 전략 (Data Backup Strategy)"
description: "데이터 백업 전략은 하드웨어 장애, 보안 침해, 랜섬웨어 등으로부터 중요 데이터를 보호하기 위해 불변의(immutable) 시점 복원본(point-in-time backup)을 생성하고 관리하는 체계적 계획이다"
tags: ['Backup', 'Disaster Recovery', 'Snapshot', 'Immutability', 'Data Protection']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/linux/data-backup-strategy
sidebar:
  order: 15
---

## 핵심 개념

RAID는 단일 하드웨어 장애만 보호하며, 파일 삭제, 랜섬웨어, 컨트롤러 장애, 화재 등에는 무력하다. 손상된 데이터의 자동 복제는 피해를 확산시킬 뿐이다. 따라서 RAID 외에 별도의 백업이 필수적이다.

**백업 계획 필수 항목:**
- **전략:** 백업 대상 데이터, 사용 기술, 저장 위치, 암호화 여부 및 키 관리, 장기 비용
- **일정:** 백업 빈도, 검증/복원 테스트 주기, 보존 기간
- **인력:** 백업 데이터/암호화 키 접근 권한자, 실행/검증 책임자
- **활용 및 보호:** 긴급 복원 절차, 불변성(immutability) 보장 방법, 적대적 환경(클라우드/벤더/정부)으로부터의 보호

**현대적 백업:** 클라우드 플랫폼에서 스냅샷 기반 자동화된 시점 백업이 가능하며, 보존 정책을 유연하게 설정할 수 있다. 자기 테이프는 디스크 용량 증가를 따라가지 못해 대부분 퇴역했다.

Google 연구에 따르면 HDD의 5년 생존 확률이 75% 미만이므로, 장애가 발생할 것이라는 가정하에 인프라를 설계해야 한다.

## 예시

```bash
# ZFS 스냅샷 기반 백업
sudo zfs snapshot -r tank@daily-$(date +%Y%m%d)

# ZFS 스냅샷을 원격으로 전송
sudo zfs send tank@daily-20260212 | ssh backup-server zfs recv backup/tank

# rsync를 이용한 증분 백업
rsync -avz --delete /data/ backup-server:/backup/data/

# LVM 스냅샷 기반 일관된 백업
sudo lvcreate -L 10G -s -n backup-snap /dev/vg/data
# 스냅샷에서 백업 수행 후 삭제
sudo lvremove /dev/vg/backup-snap
```

## 관련 개념

- [RAID (독립 디스크의 중복 배열)](/knowledge/linux/raid/)
- [ZFS (Z 파일 시스템)](/knowledge/linux/zfs/)
- [Btrfs (B-트리 파일 시스템)](/knowledge/linux/btrfs/)
- [논리 볼륨 관리자 (Logical Volume Manager)](/knowledge/linux/logical-volume-manager/)
