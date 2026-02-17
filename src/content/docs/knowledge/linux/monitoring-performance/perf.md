---
title: "perf"
description: "perf는 Linux 커널 2"
tags: ['Performance', 'Profiling', 'Linux Kernel', 'CPU', 'Perf Events', 'Tracing']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/linux/perf
sidebar:
  order: 16
---

## 핵심 개념

perf는 커널의 성능 메트릭 이벤트 스트림을 읽고 분석하는 강력한 도구이다. 사용자 수준에서 커널의 성능 카운터에 접근할 수 있으며, CPU 사용, 캐시 미스, 분기 예측 실패 등의 하드웨어 이벤트도 추적 가능하다.

**perf top 출력 해석:**
- **Overhead**: CPU가 해당 함수에 있을 때 샘플링된 시간 비율
- **Shared Object**: 함수가 존재하는 구성 요소 (커널, 공유 라이브러리, 프로세스)
- **Symbol**: 함수 이름 (심볼 정보가 제거되지 않은 경우)

**설치 요구사항:**
- linux-tools 패키지 전체 세트가 필요
- `perf top`으로 시스템 전반의 CPU 사용을 top과 유사한 형태로 확인 가능

**활용 범위:**
- CPU 핫스팟 식별
- 커널/사용자 공간 함수별 오버헤드 분석
- 캐시 미스, 분기 예측 실패 등 하드웨어 이벤트 추적
- 특정 프로세스의 상세 프로파일링

## 예시

```bash
# linux-tools 패키지 설치 (Ubuntu)
sudo apt-get install linux-tools-common linux-tools-$(uname -r)

# 시스템 전반 CPU 프로파일링 (top과 유사)
sudo perf top

# 특정 명령의 성능 프로파일링
sudo perf stat ls

# 프로파일 데이터 기록
sudo perf record -g ./my_program

# 기록된 데이터 분석
sudo perf report

# 특정 이벤트 카운팅
sudo perf stat -e cache-misses,cache-references ./my_program
```

## 관련 개념

- [vmstat](/knowledge/linux/vmstat/) - 시스템 전반 성능 요약
- [Load Average](/knowledge/linux/load-average/) - 시스템 부하 측정 지표
- [iostat](/knowledge/linux/iostat/) - 디스크 I/O 성능 분석
- [strace](/knowledge/linux/strace/) - 시스템 콜 수준 추적
