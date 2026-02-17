---
title: "TSIG (Transaction Signatures)"
description: "TSIG(Transaction Signatures, RFC2845)는 대칭 암호화의 공유 비밀(shared secret)을 사용하여 DNS 서버 간 통신을 인증하고 데이터 무결성을 검증하는 메커니즘으로, 존 전송과 동적 업데이트 보안에 사용된다"
tags: ['Tsig', 'DNS Security', 'Shared Secret', 'Symmetric Encryption', 'Hmac']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/linux/tsig
sidebar:
  order: 18
---

## 핵심 개념

TSIG는 DNSSEC가 개발되는 동안 IETF가 서버 간 보안 통신을 위해 만든 더 간단한 메커니즘이다.

**TSIG의 특성:**
- 대칭 암호화 사용 (암호화 키 = 복호화 키 = 공유 비밀)
- 패킷 수신 시 서명을 검증하고 즉시 폐기 (캐시되지 않음, DNS 데이터의 일부가 되지 않음)
- 공개키 암호화보다 계산 비용이 훨씬 낮음
- 수동 구성이 필요하므로 통신 서버 쌍의 수가 적은 로컬 네트워크에만 적합
- 각 서버 쌍에 별도의 키를 사용해야 함

**TSIG 설정 과정:**
1. dnssec-keygen으로 공유 비밀 키 생성
2. scp로 양쪽 서버에 키 배포 (telnet/ftp 사용 금지)
3. 키를 별도 파일(모드 600)에 보관하고 named.conf에 include
4. 마스터의 allow-transfer에 키 요구
5. 슬레이브의 server 구문에 keys 절 추가

**중요**: TSIG 사용 시 양쪽 서버의 시계를 NTP로 동기화해야 한다. 시계 차이가 약 5분을 초과하면 서명 검증이 실패하며, 이 문제는 매우 식별하기 어렵다.

**TKEY**: Diffie-Hellman 키 교환을 통해 공유 비밀을 자동 생성하는 메커니즘. Microsoft는 GSS-TSIG라는 비표준 방식으로 TSIG를 사용한다.

## 예시

```bash
# TSIG 키 생성
dnssec-keygen -a HMAC-SHA256 -b 128 -n HOST master-slave1

# 생성된 파일
# Kmaster-slave1.+163+15496.private  (비밀 키)
# Kmaster-slave1.+163+15496.key      (공개 키 - 삭제 가능)

# 키를 별도 파일로 구성 (master-slave1.tsig)
# key "master-slave1." {
#     algorithm hmac-sha256;
#     secret "kQ+JmHlBs1Lk6UkBPoOl1w==";
# };

# named.conf에 포함
# include "/etc/bind/master-slave1.tsig";

# 마스터 존 설정
# zone "atrust.com" {
#     type master;
#     allow-transfer { key master-slave1.; };
# };

# 슬레이브 서버 설정
# server 10.0.0.1 {
#     keys { master-slave1.; };
# };

# nsupdate에서 TSIG 키 사용
nsupdate -k Kmaster-slave1.+163+15496.private
```

## 관련 개념

- [bind](/knowledge/linux/bind/) - TSIG를 구현하는 DNS 서버
- [dns-zone-transfer](/knowledge/linux/dns-zone-transfer/) - TSIG로 보안을 강화하는 전송
- [dynamic-dns](/knowledge/linux/dynamic-dns/) - TSIG로 인증하는 동적 업데이트
- [dnssec](/knowledge/linux/dnssec/) - TSIG보다 확장성 있는 DNS 보안 시스템
- [symmetric-key-cryptography](/knowledge/linux/symmetric-key-cryptography/) - TSIG가 사용하는 암호화 방식
