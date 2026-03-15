---
title: "이메일 아키텍처 (Email Architecture)"
description: "이메일 시스템 아키텍처는 메시지의 작성부터 전달까지의 흐름을 담당하는 여러 구성 요소(MUA, MSA, MTA, DA, AA)로 이루어진 분산 시스템이다"
tags: ['Email', 'Mua', 'Mta', 'Msa', 'Mda', 'Imap', 'Pop']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/network/email-architecture
sidebar:
  order: 4
---

## 핵심 개념

이메일 시스템의 5가지 핵심 구성 요소:

1. **MUA(Mail User Agent)**: 사용자가 메일을 읽고 작성하는 클라이언트. MIME 표준으로 텍스트 형식과 첨부파일을 인코딩한다.
2. **MSA(Mail Submission Agent)**: MUA에서 나가는 메일을 수신하여 정리 후 전송 시스템에 제출. 포트 587에서 수신하며, 암호화/인증된 통신을 구현한다.
3. **MTA(Mail Transport Agent)**: 머신 간 메시지 라우팅 담당. SMTP를 사용하며, sendmail, Exim, Postfix가 대표적이다.
4. **DA(Delivery Agent)**: 메시지를 로컬 메시지 저장소(사용자 메일박스)에 배달. procmail, Maildrop 등이 있다.
5. **AA(Access Agent)**: IMAP4 또는 POP3 프로토콜로 MUA를 메시지 저장소에 연결.

메시지 저장 형식: **mbox**(단일 파일에 모든 메일, /var/mail/username), **Maildir**(메시지당 개별 파일). 대규모 ISP는 데이터베이스 기반 저장소로 전환하는 추세이다.

IMAP은 POP보다 우수하며, 메시지를 하나씩 전달하고, 헤더만 먼저 브라우징할 수 있어 네트워크 효율적이다. 반드시 IMAPS/POP3S(SSL/TLS 암호화 버전)를 사용해야 한다.

## 예시

```
메일 흐름 다이어그램:
발신자 MUA → MSA(포트 587) → MTA(포트 25) → [인터넷]
  → 수신 MTA → DA → 메시지 저장소 → AA(IMAP/POP) → 수신자 MUA

# 메일 메시지의 3가지 구성 요소:
# 1. 봉투(Envelope) - MTA가 내부적으로 사용, 사용자에게 비공개
# 2. 헤더(Headers) - 메시지 메타데이터 (From, To, Date, Received 등)
# 3. 본문(Body) - 실제 메시지 내용

# Received 헤더를 아래에서 위로 읽으면 메시지 경로 추적 가능
# Return-Path 헤더는 봉투 발신자의 사본
```

## 관련 개념

- [SMTP (간이 우편 전송 프로토콜)](/knowledge/network/smtp/)
- [메일 전송 에이전트 (Mail Transfer Agent)](/knowledge/network/mail-transfer-agent/)
- [메일 별칭 (Mail Aliases)](/knowledge/network/mail-aliases/)
- [SPF (발신자 정책 프레임워크)](/knowledge/network/spf/)
- [TLS (전송 계층 보안)](/knowledge/linux/tls/)
