---
title: "Proc 파일 시스템 (Proc Filesystem)"
description: "/proc는 커널이 시스템 상태 정보를 노출하는 의사 파일시스템(pseudo-filesystem)으로, 프로세스 정보뿐 아니라 다양한 커널 통계와 설정 파라미터를 포함한다"
tags: ['Proc', 'Filesystem', 'Linux', 'Kernel', 'Pseudo Filesystem', 'Monitoring']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/linux/proc-filesystem
sidebar:
  order: 5
---

## 핵심 개념

ps, top 등의 명령어는 /proc에서 프로세스 정보를 읽는다. 커널이 내용을 실시간으로 생성하므로 `ls -l`로는 대부분 0바이트로 보이지만, `cat`으로 읽으면 실제 내용이 표시된다.

**프로세스별 디렉토리(`/proc/PID/`)의 주요 파일:**
- `cmdline` — 프로세스의 명령줄 인수 (null 문자 구분)
- `environ` — 환경변수
- `fd/` — 열린 파일 디스크립터 (심볼릭 링크)
- `maps` — 메모리 맵 (링크된 라이브러리 확인 가능)
- `stat`, `status` — 프로세스 상태 정보

일부 /proc 파일에 쓰기로 커널 파라미터를 실시간 변경할 수도 있다. `man proc`으로 전체 내용을 확인할 수 있다.

FreeBSD도 유사한 /proc를 제공하지만, 보안 문제와 코드 방치로 인해 기본적으로 마운트되지 않으며 사용이 권장되지 않는다.

## 예시

```bash
# PID 1(init)의 명령줄 확인
cat /proc/1/cmdline | tr '\000' '\n'

# 프로세스의 열린 파일 확인
ls -la /proc/12345/fd/

# 시스템 메모리 정보
cat /proc/meminfo

# CPU 정보
cat /proc/cpuinfo

# 커널 파라미터 확인/변경
cat /proc/sys/net/ipv4/ip_forward
echo 1 > /proc/sys/net/ipv4/ip_forward
```

## 관련 개념

- [프로세스 (Process)](/knowledge/linux/process/)
- [시그널 (Signal)](/knowledge/linux/signal/)
- [Systemd (시스템 관리 데몬)](/knowledge/linux/systemd/)
