---
title: "DNSSEC"
description: "DNSSEC(DNS Security Extensions)는 공개키 암호화를 사용하여 DNS 존 데이터의 출처를 인증하고 무결성을 검증하는 DNS 확장으로, 연쇄적 신뢰 체인(chain of trust)을 통해 루트 서버에서 최종 도메인까지의 데이터 진위를 보장한다"
tags: ['Dnssec', 'DNS Security', 'Digital Signature', 'Chain Of Trust', 'Public Key', 'Zsk', 'Ksk']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/network/dnssec
sidebar:
  order: 19
---

## 핵심 개념

**DNSSEC의 핵심 질문:**
- "이 DNS 데이터가 정말로 해당 존의 소유자로부터 왔는가?"
- "이것이 정말로 해당 소유자가 보낸 데이터인가?"

**키 구조 (각 존에 두 세트의 키 쌍):**
- **ZSK(Zone-Signing Key)**: 존의 각 리소스 레코드 세트(RRset)에 서명. 비교적 짧은 키(1024비트), 3개월~1년 주기로 교체
- **KSK(Key-Signing Key)**: ZSK에 서명하여 존의 보안 진입점 제공. 더 긴 키(2048비트), 1~2년 주기로 교체

**DNSSEC 리소스 레코드:**
- **DNSKEY**: 존의 공개키를 저장 (flags 256=ZSK, 257=KSK)
- **RRSIG**: 리소스 레코드 세트의 디지털 서명
- **DS(Designated Signer)**: 부모 존에 저장. 자식 존의 KSK DNSKEY 해시
- **NSEC/NSEC3**: "존재하지 않음"에 대한 서명된 응답. NSEC3는 해시를 사용하여 존 워킹 방지

**신뢰 체인**: 루트 존의 공개키 -> .com DS 레코드 -> .com DNSKEY -> example.com DS 레코드 -> example.com DNSKEY로 이어지는 계층적 검증. 루트 존의 공개키는 널리 공개되어 있으며 루트 힌트 파일에 포함.

**키 롤오버**: ZSK 롤오버는 사전 발행(prepublishing) 방식으로 부모 존 관여 없이 가능. KSK 롤오버는 이중 서명(double signing) 방식으로 부모 존과 새 DS 레코드 조율이 필요.

## 예시

```bash
# ZSK 키 쌍 생성
dnssec-keygen -a RSASHA256 -b 1024 example.com

# KSK 키 쌍 생성
dnssec-keygen -a RSASHA256 -b 2048 -f KSK example.com

# 공개키를 존 파일에 추가
cat Kexample.com.+008+29718.key >> example.com.zone

# 존 서명
dnssec-signzone -N increment example.com.zone

# 서명된 존 파일 사용 (named.conf)
# zone "example.com" {
#     type master;
#     file "example.com.zone.signed";
# };

# DNSSEC 활성화 (named.conf)
# options {
#     dnssec-enable yes;       # 권한 서버
#     dnssec-validation yes;   # 재귀 서버
# };

# DNSSEC 검증 확인 (dig 출력의 ad 플래그)
dig +dnssec example.com
# ;; flags: qr rd ra ad;  <- ad = Authenticated Data

# 신뢰 체인 추적
drill -S example.com
drill -T example.com
delv example.com        # BIND 9.10+ DNSSEC 디버깅
```

## 관련 개념

- [dns](/knowledge/network/dns/) - DNSSEC가 보안을 강화하는 시스템
- [bind](/knowledge/network/bind/) - DNSSEC를 구현하는 서버 소프트웨어
- [public-key-cryptography](/knowledge/linux/public-key-cryptography/) - DNSSEC가 사용하는 암호화 방식
- [tsig](/knowledge/network/tsig/) - DNSSEC보다 단순한 서버 간 보안
- [dns-resource-record](/knowledge/network/dns-resource-record/) - DNSSEC가 추가하는 레코드 유형
- [dns-zone](/knowledge/network/dns-zone/) - DNSSEC가 보호하는 데이터 단위
- [cryptographic-hash](/knowledge/linux/cryptographic-hash/) - DNSSEC에서 사용하는 해시 함수
