---
title: "sar (시스템 활동 리포터)"
description: "sar(System Activity Reporter)는 CPU, 디스크, 네트워크 등의 시스템 활동을 수집하고 보고하는 성능 모니터링 도구로, vmstat/iostat과 달리 **과거 데이터에 대한 히스토리 조회**가 가능하다"
tags: ['Performance', 'Monitoring', 'Historical Data', 'Sysstat', 'CPU', 'Disk', 'Network']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/linux/sar
sidebar:
  order: 15
---

## 핵심 개념

sar는 초기 AT&T UNIX에서 기원한 오래된 도구이지만, 히스토리 데이터 조회 기능 덕분에 여전히 유용하다. Linux에서는 **sysstat** 패키지에 포함되어 있다.

**동작 원리:**
- sa1 스크립트를 cron으로 주기적으로 실행하여 데이터 수집
- 수집된 데이터는 `/var/log` 디렉토리 하위에 바이너리 형식으로 저장
- 옵션 없이 실행하면 자정 이후 10분 간격의 CPU 사용률 보고

**주요 옵션:**
- `sar` (기본): 당일 CPU 사용률 히스토리
- `sar -d`: 당일 디스크 활동 요약
- `sar -n DEV`: 네트워크 인터페이스 통계
- `sar -A`: 사용 가능한 모든 정보 보고

**한계:**
- 명령줄 구문이 다소 난해함
- 빠른 히스토리 확인에는 적합하지만, 장기적 성능 모니터링에는 Grafana 같은 전용 플랫폼을 권장

## 예시

```bash
# 당일 CPU 사용률 히스토리
sar

# 당일 디스크 활동 요약
sar -d

# 네트워크 인터페이스 통계
sar -n DEV

# 모든 사용 가능한 정보 출력
sar -A

# 특정 날짜의 데이터 조회 (바이너리 파일 지정)
sar -f /var/log/sa/sa15

# 2초 간격으로 10회 실시간 모니터링
sar 2 10

# sysstat 패키지 설치 (RHEL/CentOS)
sudo yum install sysstat
# cron에 sa1 스크립트 설정 (보통 패키지 설치 시 자동 설정)
```

## 관련 개념

- [vmstat (가상 메모리 통계 도구)](/knowledge/linux/vmstat/) - 실시간 시스템 통계 모니터링
- [iostat (I/O 통계 도구)](/knowledge/linux/iostat/) - 디스크 I/O 성능 모니터링
- [Grafana (그라파나)](/knowledge/linux/grafana/) - 장기 성능 모니터링 대시보드
- [크론 (Cron)](/knowledge/linux/cron/) - sa1 데이터 수집 스케줄링
