---
title: "Systemd"
description: "systemd는 Linux의 시스템 관리 데몬(PID 1)으로, 서비스 관리, 의존성 처리, 병렬 시작, 로깅을 포함한 통합 시스템 초기화 프레임워크이다"
tags: ['Systemd', 'Init', 'Daemon', 'Service Management', 'Linux', 'Systemctl']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/linux/systemd
sidebar:
  order: 8
---

## 핵심 개념

systemd는 전통적인 SysV init을 대체하며, 단일 데몬이 아닌 프로그램, 데몬, 라이브러리, 커널 컴포넌트의 집합이다. 관리 대상을 **유닛(unit)**이라 하며, 서비스, 소켓, 디바이스, 마운트포인트, 타이머 등 다양한 유형이 있다.

**유닛 파일 위치 (우선순위 순):**
1. `/etc/systemd/system` — 로컬 커스텀 (최우선)
2. `/run/systemd/system` — 임시 유닛
3. `/usr/lib/systemd/system` — 패키지 기본값

**타겟(Target):** init의 런레벨에 대응하며, `multi-user.target`(서버), `graphical.target`(GUI), `rescue.target`(복구)이 주요 타겟이다.

**의존성 관리:** `Wants`, `Requires`, `Before`, `After` 지시자로 유닛 간 관계를 정의한다. 의존성과 실행 순서는 별개로, 명시적 `Before`/`After` 없이는 병렬 실행된다.

**커스터마이징:** 기존 유닛 파일을 직접 수정하지 않고, `/etc/systemd/system/unit.d/override.conf`에 오버라이드 파일을 생성한다.

## 예시

```bash
# 서비스 상태 확인
systemctl status nginx

# 서비스 시작/중지/재시작
sudo systemctl start nginx
sudo systemctl stop nginx
sudo systemctl restart nginx

# 부팅 시 자동 시작 설정
sudo systemctl enable nginx

# 기본 타겟 변경 (GUI → 서버)
sudo systemctl set-default multi-user.target

# 유닛 파일 수정 후 반영
sudo systemctl daemon-reload
```

## 관련 개념

- [Boot Process](/knowledge/linux/boot-process/)
- [GRUB](/knowledge/linux/grub/)
- [Journald](/knowledge/linux/journald/)
