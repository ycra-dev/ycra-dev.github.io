---
title: "Memory Paging"
description: "메모리 페이징은 커널이 가상 메모리 페이지를 물리적 RAM과 디스크의 스왑 공간 사이에서 이동시키는 메모리 관리 메커니즘으로, 물리적 메모리보다 더 많은 메모리를 프로세스에 할당할 수 있게 한다"
tags: ['Performance', 'Memory', 'Virtual Memory', 'Swap', 'Oom Killer', 'Kernel']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/linux/memory-paging
sidebar:
  order: 13
---

## 핵심 개념

커널은 보통 4KiB 이상 크기의 페이지 단위로 메모리를 관리한다. 각 가상 페이지는 RAM 또는 디스크의 "백킹 스토어"에 매핑된다.

**LRU 기반 페이지 교체:**
- 최근 접근된 페이지는 메모리에 유지
- 가장 오래 사용되지 않은(LRU) 페이지가 디스크로 이동
- 수정된 "더티" 페이지는 디스크에 기록 후 회수
- 수정되지 않은 "클린" 페이지는 즉시 재사용 가능

**페이지 폴트 유형:**
- **소프트 폴트**: 비활성 목록에 있지만 아직 메모리에 있는 페이지 참조 (디스크 접근 불필요)
- **하드 폴트**: 디스크로 페이지 아웃된 비상주 페이지 참조 (디스크 읽기 필요)

**Linux 특화 기능:**
- `swappiness` 파라미터: /proc/sys/vm/swappiness (0-100)로 스왑 백과 파일 백 페이지 간 균형 조정. 기본값 60
- **OOM Killer**: 커널이 페이지 회수 불가 시 프로세스를 선택적으로 종료하여 메모리 확보

**성능 진단:**
- `swapon -s`: 스왑 공간 사용량 확인
- vmstat의 si/so: 페이지 인/아웃 확인
- 지속적인 페이지 아웃은 물리적 메모리 부족 징후

## 예시

```bash
# 스왑 사용량 확인
swapon -s
free -m

# vmstat으로 페이징 활동 모니터링
vmstat 2
# si: pages swapped in, so: pages swapped out
# so가 지속적으로 0이 아니면 메모리 부족

# 스왑 사용 비율 계산
# VM = 물리적 메모리 크기 + 사용 중인 스왑 공간

# swappiness 확인 및 조정
cat /proc/sys/vm/swappiness
# 60

# 임시 변경
sudo sysctl vm.swappiness=10

# 영구 변경 (/etc/sysctl.conf)
# vm.swappiness = 10

# 프로세스의 메모리 사용 제한 (ulimit)
ulimit -v 32768    # 가상 메모리 32MB 제한
```

## 관련 개념

- [vmstat](/knowledge/linux/vmstat/) - 페이징 활동 모니터링 명령
- [load-average](/knowledge/linux/load-average/) - 메모리 부족이 시스템 부하에 미치는 영향
- [sysctl](/knowledge/linux/sysctl/) - swappiness 파라미터 조정
- [proc-filesystem](/knowledge/linux/proc-filesystem/) - 메모리 관련 커널 파라미터
