---
title: "Dynamic DNS"
description: "동적 DNS(Dynamic DNS, RFC2136)는 DNS 프로토콜의 확장으로, DHCP 데몬 같은 엔티티가 네임 서버에 주소 할당을 통지하여 리소스 레코드를 자동으로 추가, 삭제, 수정할 수 있게 하는 기능이다"
tags: ['Dynamic DNS', 'Ddns', 'Nsupdate', 'Dhcp', 'Rfc2136', 'Update Policy']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/linux/dynamic-dns
sidebar:
  order: 16
---

## 핵심 개념

DNS는 원래 이름-주소 매핑이 비교적 안정적이라는 가정 하에 설계되었으나, DHCP 환경에서는 IP 주소가 빈번하게 변경된다.

**동적 업데이트 메커니즘:**
- BIND는 동적 변경의 저널(zonename.jnl)을 유지하여 서버 충돌 시 복구
- 동적으로 업데이트되는 존은 수동 편집 전에 반드시 `rndc freeze`로 중지해야 함
- `rndc thaw`로 동적 업데이트를 재개

**nsupdate 도구**: BIND 9와 함께 제공되는 동적 업데이트 CLI. 배치 모드로 동작하며 빈 줄이나 send 명령으로 업데이트 전송. "이름이 존재하지 않으면 추가"와 같은 조건부 업데이트 지원.

**접근 제어:**
- **allow-update**: IP 또는 키 기반 인증으로 모든 레코드 업데이트 허용
- **update-policy**: BIND 9 확장. 호스트명이나 레코드 유형별 세밀한 제어. 키 기반 인증 필수. 둘은 동일 존에서 상호 배타적

**update-policy의 self 옵션**: 호스트가 자신의 레코드만 업데이트할 수 있게 허용. DHCP 환경에서 A/PTR 레코드만 업데이트하되 SOA, NS, KEY 레코드는 변경 불가로 설정하는 것이 좋은 기본값.

**보안 주의**: IP 주소 기반 접근 제어는 위조가 쉬우므로, TSIG 공유 비밀 키 인증을 반드시 사용해야 한다.

## 예시

```bash
# nsupdate로 호스트 추가
nsupdate -k /etc/bind/dhcp-key.private << EOF
server ns1.atrust.com
zone atrust.com
update add newhost.atrust.com. 86400 A 192.168.1.100
send
EOF

# nsupdate에서 TSIG 키 사용
nsupdate -k Kmaster-slave1.+163+15496.private

# named.conf에서 동적 업데이트 설정
# zone "dhcp.cs.colorado.edu" {
#     type master;
#     file "dhcp.cs.colorado.edu.zone";
#     update-policy {
#         grant dhcp-key subdomain dhcp.cs.colorado.edu. A;
#     };
# };

# 존 동결/해제 (수동 편집 시)
sudo rndc freeze atrust.com
# ... 존 파일 편집 ...
sudo rndc thaw atrust.com
```

## 관련 개념

- [dns](/knowledge/linux/dns/) - 동적 DNS가 확장하는 시스템
- [dhcp](/knowledge/linux/dhcp/) - 동적 DNS의 주요 트리거
- [bind](/knowledge/linux/bind/) - 동적 DNS를 구현하는 서버
- [tsig](/knowledge/linux/tsig/) - 동적 업데이트 인증 메커니즘
- [dns-zone-transfer](/knowledge/linux/dns-zone-transfer/) - IXFR과 트랜잭션 로그 공유
- [dns-resource-record](/knowledge/linux/dns-resource-record/) - 동적으로 관리되는 레코드
