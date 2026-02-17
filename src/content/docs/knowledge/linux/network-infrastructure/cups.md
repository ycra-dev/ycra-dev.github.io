---
title: "CUPS (Common UNIX Printing System)"
description: "CUPS(Common UNIX Printing System)는 Linux, FreeBSD, macOS에서 표준으로 사용되는 네트워크 인식 인쇄 시스템으로, 브라우저 기반 GUI와 셸 레벨 명령어를 모두 제공하는 통합 인쇄 관리 플랫폼이다"
tags: ['Cups', 'Printing', 'Unix', 'Linux', 'Network Printing']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/linux/cups
sidebar:
  order: 19
---

## 핵심 개념

CUPS는 모든 통신에 HTTP/IPP(Internet Printing Protocol)를 기반 프로토콜로 사용한다. 클라이언트는 HTTP POST로 작업을 제출하고, HTTP GET으로 상태를 조회한다. CUPS 서버는 포트 631에서 웹 인터페이스를 제공하며, 설정 파일(cupsd.conf)은 Apache 웹 서버 설정 파일과 유사한 형식을 따른다.

인쇄 파이프라인은 크게 네 가지 구성 요소로 이루어진다: (1) 작업을 수집하고 스케줄링하는 스풀러(spooler), (2) 스풀러와 통신하는 사용자 레벨 유틸리티, (3) 프린터 장치와 통신하는 백엔드, (4) 스풀러 간 통신을 위한 네트워크 프로토콜. CUPS는 문서의 MIME 타입을 파악하고, 프린터의 PPD(PostScript Printer Description) 파일을 참조하여 적절한 필터 체인을 통해 문서를 변환한다. 필터 체인의 비용을 계산하여 최저 비용 경로를 선택하는 방식은 라우팅 알고리즘과 유사하다.

네트워크 프린터 검색(browsing) 기능을 통해 서버가 30초마다 자신이 관리하는 프린터 정보를 브로드캐스트하며, 같은 네트워크의 클라이언트가 자동으로 사용 가능한 프린터를 학습한다.

## 예시

```bash
# 기본 프린터로 파일 인쇄
lpr foo.pdf /tmp/testprint.ps

# 인쇄 큐 상태 확인
lpq

# 시스템 전체 인쇄 상태 요약
lpstat -t

# 프린터 추가 (네트워크 프린터)
sudo lpadmin -p fezmo -E -v ipp://192.168.0.12/ipp -m everywhere

# 프린터 제거
sudo lpadmin -x groucho

# 프린터 큐 비활성화 (프린터 측)
cupsdisable printername

# 프린터 큐 활성화
cupsenable printername

# 작업 제출 거부
reject printername

# 작업 제출 허용
accept printername

# CUPS 데몬 재시작
sudo systemctl restart org.cups.cupsd.service
```

## 관련 개념

- [IPP](/knowledge/linux/ipp/) - CUPS의 기반 프로토콜
- [print-spooler](/knowledge/linux/print-spooler/) - 인쇄 작업 관리 메커니즘
- [systemd](/knowledge/linux/systemd/) - CUPS 데몬 관리
- [syslog](/knowledge/linux/syslog/) - CUPS 로그 관리
