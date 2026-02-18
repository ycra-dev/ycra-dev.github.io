---
title: "vmstat"
description: "vmstat(Virtual Memory Statistics)는 CPU 사용률, 메모리, 페이징, 디스크 I/O, 프로세스 상태 등의 시스템 성능 정보를 실시간으로 요약하여 출력하는 성능 모니터링 명령이다"
tags: ['Performance', 'CPU', 'Memory', 'Paging', 'Monitoring', 'Linux Command']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/linux/vmstat
sidebar:
  order: 10
---

## 핵심 개념

vmstat은 시스템 성능 분석의 기본 도구로, 두 가지 인자를 받는다: 각 출력 줄에 대한 모니터링 간격(초)과 보고서 출력 횟수이다.

**CPU 통계 (오른쪽 열):**
- `us`: 사용자 시간 (계산 작업 지표)
- `sy`: 시스템(커널) 시간 (시스템 콜/I/O 지표)
- `id`: 유휴 시간
- `wa`: I/O 대기 시간
- `st`: 하이퍼바이저에 의해 도난된 시간 (가상 환경)

**CPU 사용률 경험 법칙:**
- 비유휴 시간의 약 50%가 사용자 공간, 50%가 시스템 공간이 이상적
- 전체 유휴 시간이 0이 아니어야 함
- 단일 CPU 집약적 애플리케이션 서버는 대부분 사용자 공간에서 시간을 보내야 함

**추가 지표:**
- `cs` (context switches): 커널이 실행 중인 프로세스를 전환한 횟수. 매우 높은 값은 하드웨어 오작동 징후
- `in` (interrupts): 인터럽트 횟수
- `si`/`so` (swap in/out): 페이징 활동

## 예시

```bash
# 2초 간격으로 vmstat 실행
vmstat 2
# procs -----------memory---------- ---swap-- -----io---- -system-- ------cpu-----
#  r  b   swpd   free   buff  cache   si   so    bi    bo   in   cs us sy id wa st
#  1  0      0 1234568  12340 456780    0    0     1     5    3    4  2  1 97  0  0

# 30개 보고서 생성 (2초 간격)
vmstat 2 30

# 멀티프로세서 CPU별 통계 (Linux mpstat)
mpstat -P ALL 2

# 가상 환경에서 CPU 도난 확인
# st 열이 0이 아니면 하이퍼바이저가 CPU를 제한하고 있음

# top에서 CPU steal 확인
top
# %Cpu(s): 50.0 us, 10.0 sy, 0.0 ni, 23.8 id, 0.0 wa, 0.0 hi, 0.0 si, 16.2 st
```

## 관련 개념

- [load-average](/knowledge/linux/load-average/) - CPU 부하 측정의 또 다른 방식
- [memory-paging](/knowledge/linux/memory-paging/) - vmstat으로 확인하는 메모리 페이징 활동
- [iostat](/knowledge/linux/iostat/) - 디스크 I/O 성능의 상세 분석
