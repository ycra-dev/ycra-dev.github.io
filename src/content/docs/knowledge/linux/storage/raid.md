---
title: "RAID"
description: "RAID(Redundant Array of Inexpensive/Independent Disks)는 여러 디스크에 데이터를 분산하거나 복제하여 성능 향상, 데이터 중복성, 또는 두 가지 모두를 달성하는 시스템이다"
tags: ['Raid', 'Redundancy', 'Striping', 'Mirroring', 'Parity', 'Mdadm', 'Storage']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/linux/raid
sidebar:
  order: 5
---

## 핵심 개념

**RAID 레벨:**
- **RAID 0 (스트라이핑):** 데이터를 여러 디스크에 교대 분산하여 성능 향상. 중복성 없음. 하나라도 고장 나면 전체 데이터 손실.
- **RAID 1 (미러링):** 데이터를 2개 이상의 드라이브에 동시 복제. 읽기 성능 우수, 쓰기 약간 느림. 디스크 효율 50%.
- **RAID 5:** 데이터와 패리티를 N개 디스크에 분산 저장. N-1개 디스크 용량 사용 가능. 1개 디스크 장애 허용. 랜덤 쓰기 시 4회 연산(2읽기+2쓰기)으로 쓰기 성능 저하.
- **RAID 6:** RAID 5와 유사하지만 패리티 디스크 2개. 2개 디스크 동시 장애 허용.
- **RAID 1+0 / 0+1:** 미러링과 스트라이핑의 조합. 최소 4개 디스크 필요.

**RAID 5 쓰기 홀(Write Hole):** 데이터-패리티 간 비동기 업데이트로 정전 시 불일치 발생 가능. ZFS의 RAID-Z는 가변 폭 스트라이프로 이 문제를 해결한다. 정기적 스크러빙으로 패리티 블록을 검증하여 잠재적 오류를 탐지할 수 있다.

**소프트웨어 vs 하드웨어 RAID:** 하드웨어 RAID는 비휘발성 메모리를 통한 쓰기 캐시와 RAID 5 쓰기 홀 보호를 제공할 수 있지만, 컨트롤러 자체의 장애 위험이 있다. 저가형 RAID 카드는 실질적 이점 없이 소프트웨어 RAID에 불과하다.

**Linux mdadm:** Linux의 표준 소프트웨어 RAID 구현. `mdadm --create`로 어레이 생성, `/proc/mdstat`로 상태 모니터링, `mdadm --monitor`로 장애 알림 설정.

## 예시

```bash
# RAID 5 어레이 생성 (3개 디스크)
sudo mdadm --create /dev/md/extra --level=5 \
  --raid-devices=3 /dev/sdb1 /dev/sdc1 /dev/sdd1

# RAID 상태 확인
cat /proc/mdstat

# mdadm.conf에 어레이 정보 기록
sudo mdadm --detail --scan >> /etc/mdadm/mdadm.conf

# 디스크 장애 시뮬레이션
sudo mdadm /dev/md/extra --fail /dev/sdc1

# 장애 디스크 제거 및 교체
sudo mdadm /dev/md/extra --remove /dev/sdc1
sudo mdadm /dev/md/extra --add /dev/sde1

# RAID 모니터링 데몬 활성화
sudo systemctl enable mdmonitor
```

## 관련 개념

- [Logical Volume Manager](/knowledge/linux/logical-volume-manager/)
- [ZFS](/knowledge/linux/zfs/)
- [Btrfs](/knowledge/linux/btrfs/)
- [Disk Partitioning](/knowledge/linux/disk-partitioning/)
- [Filesystem](/knowledge/linux/filesystem/)
