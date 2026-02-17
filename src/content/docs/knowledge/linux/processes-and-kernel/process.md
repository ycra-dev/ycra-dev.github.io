---
title: "Process"
description: "프로세스는 실행 중인 프로그램의 추상화로, 메모리, 프로세서 시간, I/O 리소스를 관리하고 모니터링하는 단위이다"
tags: ['Process', 'Pid', 'Fork', 'Exec', 'Unix', 'Kernel']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/linux/process
sidebar:
  order: 1
---

## 핵심 개념

프로세스는 주소 공간(address space)과 커널 내부 데이터 구조로 구성된다. 커널이 추적하는 주요 정보에는 주소 공간 맵, 프로세스 상태(실행/수면/중지), 실행 우선순위, 리소스 사용량, 열린 파일/포트, 시그널 마스크, 소유자가 포함된다.

**프로세스 생명주기:**
1. `fork()` 시스템 콜로 부모 프로세스 복제 → 자식 프로세스 생성
2. `exec()` 패밀리로 새 프로그램 실행
3. `_exit()`으로 종료, exit code 반환 (0 = 성공)
4. 부모가 `wait()`으로 자식의 종료를 확인

**주요 속성:**
- **PID**: 고유 프로세스 ID
- **PPID**: 부모 프로세스 ID (부모 사망 시 init/systemd가 새 부모)
- **UID/EUID**: 실제/유효 사용자 ID (접근 권한 결정)
- **Niceness**: 스케줄링 우선순위 힌트 (-20~+19, 낮을수록 높은 우선순위)

**스레드**: 프로세스 내의 실행 컨텍스트. 각 스레드는 자체 스택과 CPU 컨텍스트를 가지지만 프로세스의 주소 공간을 공유한다. 멀티코어에서 병렬 실행 가능.

**좀비 프로세스**: 실행은 종료되었지만 부모가 아직 `wait()`을 호출하지 않은 프로세스.

## 예시

```bash
# 프로세스 목록 보기
ps aux

# 상세 기술 정보 포함
ps lax

# PID로 프로세스 찾기
pgrep -a nginx

# niceness 설정하여 실행
nice -n 10 long_running_task

# 실행 중인 프로세스의 niceness 변경
renice +5 -p 12345
```

## 관련 개념

- [Signal](/knowledge/linux/signal/)
- [Cron](/knowledge/linux/cron/)
- [Proc Filesystem](/knowledge/linux/proc-filesystem/)
