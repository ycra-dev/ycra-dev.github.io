---
title: "Man Pages"
description: "Man pages(매뉴얼 페이지)는 UNIX/Linux 시스템에서 명령어, 드라이버, 파일 형식, 라이브러리 루틴 등을 설명하는 전통적인 온라인 문서 시스템이다"
tags: ['Documentation', 'Unix', 'Linux', 'Manual', 'Cli']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/linux/man-pages
sidebar:
  order: 1
---

## 핵심 개념

Man pages는 `man` 명령어로 접근하며, 8개의 섹션으로 구분된다: (1) 사용자 명령어, (2) 시스템 콜, (3) 라이브러리 함수, (4) 장치 파일, (5) 파일 형식, (6) 게임, (7) 기타, (8) 시스템 관리 명령어. 동일한 이름이 여러 섹션에 존재할 수 있으며(예: `passwd`는 섹션 1과 5 모두에 존재), `man section title` 형태로 특정 섹션을 지정할 수 있다.

소스는 nroff 형식으로 `/usr/share/man` 아래에 gzip 압축되어 저장된다. `man -k keyword` 또는 `apropos keyword`로 키워드 검색이 가능하며, `manpath` 명령어로 검색 경로를 확인할 수 있다. `MANPATH` 환경변수로 커스텀 경로를 설정할 수도 있다.

## 예시

```bash
# sync 명령어의 man page 보기
man sync

# sync 시스템 콜(섹션 2)의 man page 보기
man 2 sync

# 키워드로 관련 man page 검색
man -k backup

# man page 검색 경로 확인
manpath
```

## 관련 개념

- [Linux Distribution](/knowledge/linux/linux-distribution/)
- [Package Management](/knowledge/linux/package-management/)
