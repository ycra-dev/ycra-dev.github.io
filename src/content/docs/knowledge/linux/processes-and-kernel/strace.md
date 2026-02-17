---
title: "Strace"
description: "strace(Linux) / truss(FreeBSD)는 프로세스가 수행하는 모든 시스템 콜과 수신하는 시그널을 실시간으로 추적하여 표시하는 디버깅 도구이다"
tags: ['Strace', 'Truss', 'Debugging', 'System Call', 'Tracing']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/linux/strace
sidebar:
  order: 6
---

## 핵심 개념

ps, 로그 파일, 파일시스템 같은 간접적 데이터로 프로세스 동작을 파악하기 어려울 때, strace/truss로 저수준 추적이 가능하다. 실행 중인 프로세스에 붙었다가(attach) 분리(detach)할 수 있으며, 대부분의 경우 프로세스를 방해하지 않는다.

시스템 콜 출력에서 직접적으로 파악 가능한 정보:
- 파일시스템 권한 오류
- 소켓 충돌
- 설정 파일 위치 (어떤 파일을 열려고 시도하는지)
- 에러 코드와 원인

**유용한 옵션:**
- `-f` — fork된 자식 프로세스도 추적 (httpd 같은 데몬에 유용)
- `-e trace=file` — 파일 관련 작업만 표시
- `-p PID` — 실행 중인 프로세스에 붙기

strace는 전통적 디버깅(로그 확인, verbose 출력)이 부족할 때 사용하는 강력한 도구이다.

## 예시

```bash
# 실행 중인 프로세스 추적
strace -p 5810

# 자식 프로세스도 함께 추적
strace -f -p 1234

# 파일 관련 작업만 추적
strace -e trace=file /usr/bin/myapp

# FreeBSD에서 파일 복사 추적
truss cp /etc/passwd /tmp/pw

# 출력을 파일로 저장
strace -o /tmp/trace.log -p 5810
```

## 관련 개념

- [Process](/knowledge/linux/process/)
- [Proc Filesystem](/knowledge/linux/proc-filesystem/)
- [Signal](/knowledge/linux/signal/)
