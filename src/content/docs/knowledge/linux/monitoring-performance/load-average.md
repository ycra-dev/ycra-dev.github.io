---
title: "Load Average"
description: "로드 평균(Load Average)은 시스템에서 실행 가능한(runnable) 프로세스의 평균 수를 나타내는 지표로, 1분, 5분, 15분 평균으로 CPU 파이가 얼마나 많은 조각으로 나뉘는지 보여준다"
tags: ['Performance', 'CPU', 'Monitoring', 'Uptime', 'System Metrics']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/linux/load-average
sidebar:
  order: 11
---

## 핵심 개념

로드 평균은 시스템의 전체적인 부하를 특성화하는 핵심 지표이다. uptime 명령으로 쉽게 확인할 수 있으며, /proc/loadavg에서 직접 읽을 수도 있다.

**해석 방법:**
- 로드 평균이 높을수록 시스템의 종합 성능이 더 중요해짐
- 실행 가능한 프로세스가 하나뿐이면 단일 자원(보통 디스크 대역폭이나 CPU)에 의해 제한됨
- 여러 프로세스가 CPU, 디스크, 메모리를 혼합 사용하면 단일 자원에 의한 병목 가능성이 줄어듦

**성능 기준선으로의 활용:**
- 정상일 때의 로드 평균을 파악해두면 문제 발생 시 진단에 도움
- 정상 범위 내이면 다른 곳(네트워크 등)에서 성능 문제를 찾아야 함
- 정상 범위를 초과하면 시스템 자체의 프로세스를 조사해야 함

**성능에 영향을 미치는 4대 자원:**
1. CPU 사용률 (및 가상 환경에서의 도난 사이클)
2. 메모리
3. 스토리지 I/O
4. 네트워크 I/O

CPU가 가장 중요한 요소로 여겨지지만, 실제로는 디스크 대역폭이 더 흔한 병목이다.

## 예시

```bash
# 로드 평균 확인
uptime
# 12:00:00 up 45 days, 3:22, 2 users, load average: 1.20, 0.95, 0.85

# /proc에서 직접 읽기 (Linux)
cat /proc/loadavg
# 1.20 0.95 0.85 3/245 12345

# FreeBSD에서 sysctl로 확인
sysctl -n vm.loadavg

# 높은 로드의 원인 프로세스 확인
ps aux --sort=-%cpu | head -10
# 또는
top -bn1 | head -20

# CPU 사용량이 높은 프로세스 우선순위 낮추기
renice +10 -p <PID>

# I/O 집약적 프로세스의 I/O 우선순위 낮추기 (Linux)
ionice -c 3 -p <PID>
```

## 관련 개념

- [vmstat](/knowledge/linux/vmstat/) - CPU 사용률과 함께 성능 분석
- [process](/knowledge/linux/process/) - 시스템 부하를 생성하는 프로세스
- [memory-paging](/knowledge/linux/memory-paging/) - 메모리 부족이 성능에 미치는 영향
- [proc-filesystem](/knowledge/linux/proc-filesystem/) - 로드 평균 데이터의 출처
