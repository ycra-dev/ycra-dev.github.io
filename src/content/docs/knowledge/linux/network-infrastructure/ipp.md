---
title: "IPP (인터넷 인쇄 프로토콜)"
description: "IPP(Internet Printing Protocol)는 HTTP를 확장한 네트워크 인쇄 프로토콜로, CUPS에서 서버와 클라이언트 간의 모든 상호작용에 사용되는 기반 통신 규약이다"
tags: ['Ipp', 'Printing', 'Protocol', 'HTTP', 'Cups']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/linux/ipp
sidebar:
  order: 20
---

## 핵심 개념

IPP는 HTTP의 확장(souped-up version)으로 설계되어, 클라이언트가 HTTP POST 연산으로 인쇄 작업을 제출하고 HTTP GET 연산으로 상태를 조회한다. 이 설계 덕분에 CUPS 서버는 본질적으로 웹 서버이며, CUPS 클라이언트는 웹 클라이언트로 동작한다. 포트 631에서 통신하며, 보안 통신이 필요한 경우 HTTPS를 통해 포트 443을 사용할 수도 있다.

IPP의 장점은 기존 웹 인프라를 활용할 수 있다는 점이다. 브라우저를 통한 관리, 방화벽 통과, 암호화 통신 등을 HTTP 생태계의 기능을 그대로 활용할 수 있다. 또한 CUPS 서버끼리도 IPP를 통해 서로 클라이언트-서버 관계로 통신할 수 있어, 분산 인쇄 환경을 쉽게 구축할 수 있다.

프린터 URI는 다양한 형식을 지원한다: `ipp://`, `lpd://`, `serial://`, `socket://`, `usb://` 등이 있으며, 각 프로토콜에 맞는 백엔드가 데이터 전송을 담당한다.

## 예시

```bash
# IPP URI로 네트워크 프린터 추가
sudo lpadmin -p myprinter -E -v ipp://zoe.admin.com/ipp

# LPD 프로토콜을 통한 프린터 추가
sudo lpadmin -p myprinter -E -v lpd://riley.admin.com/ps

# 소켓 연결을 통한 프린터 추가
sudo lpadmin -p myprinter -E -v socket://gillian.admin.com:9100

# 사용 가능한 백엔드 확인
lpinfo -v

# CUPS 웹 인터페이스 접속
# http://localhost:631
```

## 관련 개념

- [CUPS (공용 유닉스 인쇄 시스템)](/knowledge/linux/cups/) - IPP를 기반 프로토콜로 사용하는 인쇄 시스템
- [TCP/UDP 포트 (TCP/UDP Port)](/knowledge/linux/tcp-port/) - IPP의 포트 번호 체계
- [인쇄 스풀러 (Print Spooler)](/knowledge/linux/print-spooler/) - IPP를 통해 관리되는 스풀링 시스템
