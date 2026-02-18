---
title: "DNS Zone Transfer"
description: "DNS 존 전송(Zone Transfer)은 DNS 서버 간에 존 데이터를 동기화하는 메커니즘으로, 전체 존을 전송하는 AXFR과 변경 사항만 전송하는 IXFR 두 가지 방식이 있으며, 기본적으로 TCP 프로토콜의 53번 포트를 사용한다"
tags: ['Zone Transfer', 'Axfr', 'Ixfr', 'Master Slave', 'DNS Replication']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/network/dns-zone-transfer
sidebar:
  order: 15
---

## 핵심 개념

**AXFR(전체 존 전송)**: 존의 전체 데이터를 마스터에서 슬레이브로 전송한다.

**IXFR(증분 존 전송)**: 변경 사항만 전송하여 대규모 존(.com 같은)이나 동적으로 업데이트되는 존에서 효율적이다. 변경 사항이 전체 존보다 큰 경우 자동으로 AXFR로 전환된다. IXFR 지원하지 않는 서버에 요청하면 자동으로 AXFR로 폴백한다.

**존 전송 과정:**
1. 슬레이브가 마스터의 시리얼 번호를 확인
2. 마스터의 시리얼 번호가 더 크면 전송 요청
3. 동일하면 전송 불필요 (백업 파일의 수정 시간만 업데이트)
4. 전송 중에도 양쪽 서버 모두 쿼리에 응답 가능
5. 전송 완료 후에야 슬레이브가 새 데이터 사용 시작

**BIND의 notify 기능**: 마스터가 존 변경 시 자동으로 슬레이브에 통지. SOA의 refresh 타임아웃을 기다리지 않고 즉시 동기화 가능. notify를 master-only로 설정하면 불필요한 통지를 줄임. also-notify로 NS 레코드에 없는 추가 서버도 통지 가능.

BIND는 동적 업데이트가 구성된 존에 대해 IXFR을 기본으로 사용하며, zonename.jnl 트랜잭션 로그를 유지한다.

## 예시

```bash
# named.conf에서 존 전송 제한
# zone "atrust.com" {
#     type master;
#     file "atrust.com.zone";
#     allow-transfer { my-slaves; };
#     notify yes;
#     also-notify { 10.0.0.5; };
# };

# 서버별 IXFR 설정
# server 10.0.0.2 {
#     provide-ixfr yes;     # 마스터: IXFR 제공
#     request-ixfr yes;     # 슬레이브: IXFR 요청
# };

# 수동으로 존 전송 확인
dig @ns1.atrust.com atrust.com AXFR

# 존 전송 로그 확인 (BIND)
# 카테고리: xfer-in (수신), xfer-out (송신)

# 슬레이브 강제 업데이트
sudo rndc reload atrust.com
```

## 관련 개념

- [dns-zone](/knowledge/network/dns-zone/) - 전송되는 데이터 단위
- [bind](/knowledge/network/bind/) - 존 전송을 구현하는 DNS 서버
- [soa-record](/knowledge/network/soa-record/) - 시리얼 번호 기반 전송 판단
- [tsig](/knowledge/network/tsig/) - 존 전송 보안 인증
- [dynamic-dns](/knowledge/network/dynamic-dns/) - IXFR과 트랜잭션 로그를 사용하는 동적 업데이트
