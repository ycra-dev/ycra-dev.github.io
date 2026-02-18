---
title: "Email Encryption"
description: "이메일 암호화는 메시지의 기밀성, 인증, 무결성 보장, 발신 부인 방지를 제공하는 기술로, TLS를 통한 전송 암호화와 PGP/S/MIME을 통한 종단 간 암호화를 포함한다"
tags: ['Email Encryption', 'Pgp', 'Smime', 'Tls', 'Starttls', 'Privacy']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/network/email-encryption
sidebar:
  order: 5
---

## 핵심 개념

기본적으로 모든 이메일은 암호화 없이 전송된다. 암호화 접근 방식은 두 가지로 나뉜다:

**전송 암호화(TLS/STARTTLS)**: MTA 간 연결을 암호화한다. sendmail에서 STARTTLS로 구현되며, RFC3207에 정의되어 있다. 단, 다음 홉 MTA까지만 보호하며, 이후 경로에서 비암호화 전송이 가능하다는 한계가 있다.

**종단 간 암호화**: PGP/GPG와 S/MIME이 대표적이다. 사용자 에이전트 수준에서 메시지를 암호화하므로 전체 경로에서 보호된다. 하지만 암호화 키 관리가 복잡하여 비기술 사용자에게는 실용적이지 않다. 공개 키/인증서는 자주 교체하여 보안을 유지해야 한다.

**중앙화 암호화 서비스**: 민감한 데이터를 처리하는 조직(의료기관 등)은 Cisco IronPort, Zix 같은 중앙화 솔루션을 사용한다. 콘텐츠 규칙에 따라 자동으로 발신 메시지를 암호화한다.

**DLP(Data Loss Prevention)**: 발신 이메일을 스캔하여 기밀 정보 유출을 감지/차단한다. 중앙화 암호화 플랫폼에 DLP 기능을 통합하는 것이 권장된다.

사용자-접근 에이전트 간 통신도 반드시 암호화해야 하며, IMAPS/POP3S만 허용해야 한다.

## 예시

```bash
# sendmail TLS 설정 (access_db)
# TLS_Srv:secure.example.com ENCR:112
# TLS_Clt:laptop.example.com VERIFY:112

# Postfix TLS 설정 (main.cf)
smtpd_tls_cert_file = /etc/certs/smtp.pem
smtpd_tls_key_file = /etc/certs/smtp.key
smtpd_tls_security_level = may
smtp_tls_security_level = may

# GPG를 사용한 이메일 암호화
gpg --encrypt --recipient user@example.com message.txt

# GPG 키 생성
gpg --full-generate-key

# S/MIME 인증서로 메시지 서명
openssl smime -sign -in message.txt \
  -signer cert.pem -inkey key.pem -out signed.msg
```

## 관련 개념

- [TLS](/knowledge/linux/tls/)
- [SMTP](/knowledge/network/smtp/)
- [Mail Transfer Agent](/knowledge/network/mail-transfer-agent/)
- [Email Architecture](/knowledge/network/email-architecture/)
