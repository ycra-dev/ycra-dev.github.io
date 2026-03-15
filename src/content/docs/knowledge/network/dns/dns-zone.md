---
title: "DNS 존 (DNS Zone)"
description: "DNS 존(Zone)은 DNS 계층 구조에서 하나의 관리 단위로, 도메인에서 하위 도메인을 뺀 영역이며, 마스터 네임 서버에서 시스템 관리자가 유지하는 존 파일(텍스트 파일)에 리소스 레코드를 저장한다"
tags: ['DNS Zone', 'Master Server', 'Slave Server', 'Zone File', 'DNS']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/network/dns-zone
sidebar:
  order: 4
---

## 핵심 개념

**네임 서버 유형:**
- **마스터(Master) 서버**: 존 데이터의 공식 사본을 디스크에 보관. 관리자가 데이터 파일을 편집하여 변경
- **슬레이브(Slave) 서버**: 존 전송(zone transfer)을 통해 마스터로부터 데이터를 복제. 최소 1개 이상의 슬레이브 필요
- **캐싱 전용(Caching-only) 서버**: 자체 데이터 없이 루트 서버 정보만 로드하고 쿼리 응답을 캐싱
- **스텁(Stub) 서버**: 마스터로부터 NS 레코드만 로드하는 특수 슬레이브

**권한(Authoritative) vs 비권한(Non-authoritative):**
- 마스터와 슬레이브 서버는 자신의 존에 대해 권한적
- 캐시된 다른 도메인 정보에 대해서는 비권한적
- 권한적 응답은 "정확함이 보장"되지만, 비권한적 응답의 대다수도 정확

**존 파일 구성:**
- $TTL 지시어 (반드시 첫 줄)
- SOA 레코드 (존의 시작)
- NS 레코드 (네임 서버 지정)
- 각 호스트의 리소스 레코드

슬레이브 서버는 마스터와 다른 네트워크, 다른 전원 회로에 배치하는 것이 이상적이며, 하나 이상은 마스터와 공통 인프라를 공유하지 않는 위치에 있어야 한다.

## 예시

```bash
# 존 파일 기본 구조 예시
# $TTL 1d
# @  IN  SOA  ns1.atrust.com. hostmaster.atrust.com. (
#              2017110200  ; serial
#              6h          ; refresh
#              1h          ; retry
#              4w          ; expire
#              1h )        ; minimum (negative cache TTL)
#
#    IN  NS   ns1.atrust.com.
#    IN  NS   ns2.atrust.com.
#
# ns1    IN  A    63.173.189.1
# ns2    IN  A    63.173.189.2
# www    IN  A    63.173.189.10

# BIND named.conf의 존 설정 예시
# zone "atrust.com" {
#     type master;
#     file "atrust.com.zone";
# };
#
# zone "atrust.com" {
#     type slave;
#     file "slave/atrust.com.zone";
#     masters { 63.173.189.1; };
# };
```

## 관련 개념

- [DNS (도메인 네임 시스템)](/knowledge/network/dns/) - 존이 속하는 도메인 이름 시스템
- [DNS 리소스 레코드 (DNS Resource Record)](/knowledge/network/dns-resource-record/) - 존 파일을 구성하는 레코드
- [SOA 레코드 (SOA Record)](/knowledge/network/soa-record/) - 존의 시작을 나타내는 레코드
- [DNS 존 전송 (DNS Zone Transfer)](/knowledge/network/dns-zone-transfer/) - 마스터-슬레이브 간 존 동기화
- [BIND (버클리 인터넷 네임 도메인)](/knowledge/network/bind/) - 존을 서비스하는 DNS 서버 소프트웨어
- [DNS 위임 (DNS Delegation)](/knowledge/network/dns-delegation/) - 존의 하위 도메인 위임
