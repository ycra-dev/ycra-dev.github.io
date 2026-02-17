---
title: "CIA Triad"
description: "CIA 트라이어드는 정보 보안의 세 가지 핵심 원칙인 기밀성(Confidentiality), 무결성(Integrity), 가용성(Availability)을 나타내는 보안 모델이다"
tags: ['Security', 'Confidentiality', 'Integrity', 'Availability', 'Information Security']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/linux/cia-triad
sidebar:
  order: 1
---

## 핵심 개념

CIA 트라이어드는 정보 보안 분야에서 가장 널리 사용되는 프레임워크로, 보안 시스템 설계와 평가의 기반이 된다.

- **기밀성(Confidentiality)**: 데이터의 프라이버시에 관한 것으로, 인가된 사용자만 정보에 접근할 수 있어야 한다. 인증(Authentication), 접근 제어(Access Control), 암호화(Encryption)가 하위 구성 요소이다.
- **무결성(Integrity)**: 정보의 진정성에 관한 것으로, 데이터가 비인가 방식으로 변경되지 않았음을 보장한다. TLS 인증서 서명, PGP 등의 기술이 데이터 무결성을 보장한다.
- **가용성(Availability)**: 인가된 사용자가 필요할 때 정보에 접근할 수 있어야 한다는 개념이다. 가용성은 종종 무언가 잘못될 때까지 무시된다.

보안 시스템을 설계하고 유지할 때 이 세 가지 원칙을 항상 고려해야 하며, "보안은 프로세스"라는 격언처럼 지속적인 관리가 필요하다.

## 예시

```
# CIA 트라이어드 적용 예시

# Confidentiality - 파일 암호화로 기밀성 보장
openssl enc -aes-256-cbc -in secret.txt -out secret.enc

# Integrity - SHA-256 해시로 파일 무결성 검증
sha256sum important_file.tar.gz

# Availability - 시스템 가용성 모니터링
uptime
# 12:00:00 up 365 days, 0:00, 1 user, load average: 0.05, 0.03, 0.01
```

## 관련 개념

- [file-permissions](/knowledge/linux/file-permissions/) - 기밀성을 위한 접근 제어 메커니즘
- [access-control-list](/knowledge/linux/access-control-list/) - 세밀한 접근 권한 관리
- [tls-ssl](/knowledge/linux/tls-ssl/) - 네트워크 통신에서의 기밀성과 무결성 보장
- [cryptographic-hash](/knowledge/linux/cryptographic-hash/) - 데이터 무결성 검증 기술
