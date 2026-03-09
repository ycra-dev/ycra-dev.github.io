---
title: "Signal"
description: "시그널(Signal)은 프로세스 수준의 인터럽트 요청으로, 약 30종이 정의되어 있으며 프로세스 간 통신, 종료 요청, 에러 알림 등에 사용된다"
tags: ['Signal', 'Process', 'Ipc', 'Unix', 'Kill', 'Interrupt']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/linux/signal
sidebar:
  order: 2
---

## 핵심 개념

시그널을 수신하면 (1) 프로세스가 등록한 핸들러 루틴이 호출되거나, (2) 커널이 기본 동작(종료, 코어 덤프 등)을 수행한다. 시그널은 캐치(catch), 무시(ignore), 블록(block) 설정이 가능하지만, KILL과 STOP은 예외이다.

**관리자가 알아야 할 주요 시그널:**
| 시그널 | 번호 | 의미 |
|--------|------|------|
| HUP | 1 | 행업/설정 리로드 (데몬에서) |
| INT | 2 | Ctrl+C 인터럽트 |
| QUIT | 3 | 종료 + 코어 덤프 |
| KILL | 9 | 무조건 강제 종료 (캐치 불가) |
| TERM | 15 | 정상 종료 요청 (기본값) |
| CONT | 18 | 중지된 프로세스 재개 |
| STOP | 19 | 프로세스 일시 중지 (캐치 불가) |
| TSTP | 20 | Ctrl+Z 소프트 중지 |
| USR1/2 | - | 사용자 정의 시그널 |

**HUP의 이중 의미:** 데몬에서는 설정 리로드 요청, 터미널 드라이버에서는 연결 종료 시 프로세스 정리. `nohup`으로 백그라운드 프로세스를 HUP으로부터 보호 가능.

## 예시

```bash
# TERM 시그널 전송 (기본)
kill 12345

# KILL 시그널로 강제 종료
kill -9 12345

# 이름으로 프로세스 종료
killall httpd

# 사용자의 모든 프로세스에 TERM
pkill -u ben

# HUP으로 데몬 설정 리로드
kill -HUP $(pidof nginx)
```

## 관련 개념

- [Process](/knowledge/linux/process/)
- [Systemd](/knowledge/linux/systemd/)
