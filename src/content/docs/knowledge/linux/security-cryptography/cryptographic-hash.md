---
title: "Cryptographic Hash Function"
description: "암호학적 해시 함수는 임의 길이의 입력 데이터를 고정 길이의 해시 값(다이제스트)으로 변환하는 단방향 함수로, 데이터 무결성 검증과 인증에 사용된다"
tags: ['Security', 'Cryptography', 'Sha', 'Md5', 'Integrity', 'Hash']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/linux/cryptographic-hash
sidebar:
  order: 13
---

## 핵심 개념

해시 함수는 결정적(deterministic)이므로, 동일한 입력에 대해 항상 동일한 해시 값을 생성한다. 암호학적 해시 함수는 다음과 같은 특성을 갖는다:

- **얽힘(Entanglement)**: 해시 값의 모든 비트가 입력 데이터의 모든 비트에 의존. 입력의 1비트 변경이 평균적으로 해시 비트의 50%를 변경
- **의사 난수성(Pseudo-randomness)**: 해시 값이 랜덤 데이터와 구분 불가능해야 함
- **비역전성(Nonreversibility)**: 해시 값으로부터 원래 입력을 계산하는 것이 실질적으로 불가능

**권장 알고리즘:**
- SHA-2 계열(SHA-256, SHA-512): 현재 표준
- SHA-3 계열: NIST가 선정한 차세대 표준
- SHA-1: 침해되었으므로 더 이상 사용하지 않아야 함
- MD5: 공학적 충돌에 취약하지만 비암호학적 용도로는 사용 가능

**활용 분야:**
- 파일 무결성 검증 (소프트웨어 배포, 설정 파일 비교)
- 메시지 인증 코드(MAC): 해시 값을 개인키로 서명
- 비밀번호 저장: 원본 비밀번호 대신 해시 값 저장
- 디지털 서명의 구성 요소

## 예시

```bash
# SHA-256 해시 계산
sha256sum /etc/sshd_config
# a1b2c3d4e5... /etc/sshd_config

# 두 시스템의 설정 파일 무결성 비교
# FreeBSD:
sha256 /etc/ssh/sshd_config
# Linux:
sha256sum /etc/ssh/sshd_config

# 다양한 해시 알고리즘으로 파일 검증
md5sum file.tar.gz         # MD5 (권장하지 않음)
sha256sum file.tar.gz      # SHA-256 (권장)
sha512sum file.tar.gz      # SHA-512 (더 강력)

# OpenSSL을 사용한 해시 계산
openssl dgst -sha256 file.tar.gz

# 소프트웨어 다운로드 무결성 검증
echo "expected_hash  downloaded_file.tar.gz" | sha256sum --check
```

## 관련 개념

- [tls-ssl](/knowledge/linux/tls-ssl/) - 해시 함수가 사용되는 보안 프로토콜
- [pki-certificate-authority](/knowledge/linux/pki-certificate-authority/) - 인증서 서명에 해시 함수 활용
- [rootkit](/knowledge/linux/rootkit/) - 파일 무결성 모니터링으로 루트킷 탐지
- [intrusion-detection-system](/knowledge/linux/intrusion-detection-system/) - FIM에서 해시 함수 사용
