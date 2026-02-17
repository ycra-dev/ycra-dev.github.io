---
title: "I/O Scheduler"
description: "I/O 스케줄러는 디스크 I/O를 위해 경쟁하는 프로세스들 사이를 중재하여, 디스크 요청의 순서와 타이밍을 최적화하는 Linux 커널의 알고리즘이다"
tags: ['Performance', 'Linux', 'Disk', 'Storage', 'Scheduling', 'Kernel']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/linux/io-scheduler
sidebar:
  order: 12
---

## 핵심 개념

Linux 커널은 세 가지 I/O 스케줄링 알고리즘을 제공한다:

- **CFQ (Completely Fair Queuing)**: 기본 알고리즘. 범용 서버의 기계식 하드디스크에 최적. I/O 대역폭을 공정하게 분배
- **Deadline**: 각 요청의 지연 시간을 최소화하고 요청을 재정렬하여 성능 향상
- **NOOP**: 단순 FIFO 큐. I/O 요청이 드라이버나 장치에 의해 이미 최적화된 경우에 적합. SSD 드라이브에 최적 (가변 검색 지연이 없으므로), 일부 SAN 환경에도 적합

**디스크 성능의 핵심 요소:**
- 기계식 디스크: 탐색(seek) 비용이 가장 중요한 성능 요소. 초당 100-300회 탐색 가능
- SSD: 기계적 움직임이 없어 탐색 지연이 없는 것이 큰 장점
- 각 디스크 접근은 수백만 CPU 명령어에 해당하는 지연을 유발

**I/O 스케줄러 설정:**
- `/sys/block/disk/queue/scheduler`를 통해 조회/변경 가능
- 재부팅 시 유지하려면 GRUB의 `elevator=algorithm` 커널 인자 사용

## 예시

```bash
# 현재 I/O 스케줄러 확인
cat /sys/block/sda/queue/scheduler
# noop deadline [cfq]    (cfq가 활성화)

# I/O 스케줄러 변경 (런타임)
echo noop > /sys/block/sda/queue/scheduler

# SSD 디스크를 위해 NOOP 설정
echo noop > /sys/block/nvme0n1/queue/scheduler

# 부팅 시 영구 설정 (GRUB)
# /etc/default/grub에서:
# GRUB_CMDLINE_LINUX="elevator=noop"
# 이후: sudo update-grub

# fio로 디스크 I/O 성능 테스트
fio --name=randread --ioengine=libaio --rw=randread \
    --bs=4k --numjobs=4 --size=1G --runtime=60 \
    --time_based --group_reporting
```

## 관련 개념

- [iostat](/knowledge/linux/iostat/) - 디스크 I/O 성능 모니터링
- [vmstat](/knowledge/linux/vmstat/) - 시스템 전체 I/O 활동 확인
- [filesystem](/knowledge/linux/filesystem/) - I/O 스케줄러가 동작하는 파일시스템 레이어
- [grub](/knowledge/linux/grub/) - I/O 스케줄러 부팅 설정
