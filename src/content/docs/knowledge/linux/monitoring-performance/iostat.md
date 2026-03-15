---
title: "iostat (I/O 통계 도구)"
description: "iostat은 디스크 I/O 성능을 모니터링하는 명령으로, 각 디스크 장치의 초당 전송 수(tps), 읽기/쓰기 속도, 총 읽기/쓰기 바이트를 보여준다"
tags: ['Performance', 'Disk I/O', 'Monitoring', 'Storage', 'Iops', 'Throughput']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/linux/iostat
sidebar:
  order: 14
---

## 핵심 개념

iostat은 vmstat과 유사하게 초 단위 간격과 반복 횟수를 인수로 받으며, 첫 줄 출력은 부팅 이후 요약이다. 각 디스크에 대해 다음 컬럼을 표시한다:

- **tps**: 초당 전송 수 (transfers per second)
- **kB_read/s**: 초당 읽은 킬로바이트
- **kB_wrtn/s**: 초당 쓴 킬로바이트
- **kB_read / kB_wrtn**: 총 읽기/쓰기 킬로바이트

**기계식 디스크 성능의 핵심 요소:**
- 시크(seek) 비용이 가장 중요한 성능 결정 요인
- 연속 섹터 읽기 시 수백 MB/s 전송 가능하나, 시크는 초당 100~300회만 가능
- 시크당 한 섹터만 전송하면 최대 처리량의 5% 미만을 사용하게 됨
- SSD는 플래터 회전이나 헤드 이동이 없어 기계식 디스크보다 상당한 이점

**성능 최적화 전략:**
- 함께 사용되는 파일시스템은 별도 디스크에 배치 (예: 웹 서버 데이터와 로그 분리)
- 스왑(페이징) 영역을 여러 디스크에 분산하여 전체 시스템 성능 영향 최소화
- lsof와 fuser 명령으로 프로세스와 파일시스템 간 상호작용을 분석하여 디스크 I/O 병목 격리

## 예시

```bash
# 기본 iostat 실행 (부팅 이후 요약)
iostat

# 2초 간격으로 5회 반복 모니터링
iostat 2 5

# 확장된 디스크 통계
iostat -x 2

# 특정 디스크만 모니터링
iostat -d sda sdb 2

# fio로 스토리지 성능 벤치마크
# IOPS, 평균 지연 시간, 최대 지연 시간 측정
fio --name=randread --ioengine=libaio --rw=randread \
    --bs=4k --numjobs=4 --size=1G --runtime=60
```

## 관련 개념

- [vmstat (가상 메모리 통계 도구)](/knowledge/linux/vmstat/) - CPU, 메모리, 페이징 활동 모니터링
- [메모리 페이징 (Memory Paging)](/knowledge/linux/memory-paging/) - 스왑 영역 분산의 중요성
- [I/O 스케줄러 (I/O Scheduler)](/knowledge/linux/io-scheduler/) - 디스크 I/O 스케줄링 알고리즘
- [솔리드 스테이트 드라이브 (Solid State Drive)](/knowledge/linux/solid-state-drive/) - SSD와 기계식 디스크의 성능 차이
- [sar (시스템 활동 리포터)](/knowledge/linux/sar/) - 히스토리 기반 디스크 활동 보고
