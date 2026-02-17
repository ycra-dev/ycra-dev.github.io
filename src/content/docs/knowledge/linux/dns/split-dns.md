---
title: "Split DNS"
description: "분할 DNS(Split DNS)는 BIND의 view 구문을 사용하여 동일한 도메인에 대해 내부 사용자와 외부 사용자에게 서로 다른 DNS 데이터를 제공하는 구성으로, 보안 강화와 RFC1918 사설 주소 공간 관리에 유용하다"
tags: ['Split DNS', 'DNS View', 'Internal External', 'Bind', 'Rfc1918']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/linux/split-dns
sidebar:
  order: 17
---

## 핵심 개념

**분할 DNS의 필요성:**
- 내부 사용자에게는 모든 호스트를 노출하되, 외부에는 웹/메일 서버 등 소수만 공개
- 동일 호스트에 대해 내부에서는 사설 IP, 외부에서는 공인 IP를 반환
- 내부에서는 MX가 개별 워크스테이션을, 외부에서는 메일 허브를 가리킴
- RFC1918 사설 주소에 대한 쿼리가 인터넷으로 유출되는 것을 방지

**BIND view 구문:**
- match-clients: 쿼리 소스 IP 주소 기반 필터링
- match-destinations: 쿼리 목적지 주소 기반 필터링 (멀티홈 서버)
- match-recursive-only: 재귀적 쿼리만 허용
- 뷰는 순서대로 처리되므로 가장 제한적인 뷰를 먼저 배치

**주요 규칙:**
- 뷰 사용 시 모든 zone 구문은 반드시 뷰 컨텍스트 내에 있어야 함
- 다른 뷰에서 동일한 존 이름을 사용하되 다른 데이터 파일 참조 가능
- 내부 뷰는 재귀적, 외부 뷰는 비재귀적으로 설정하는 것이 일반적

루트 서버에 도달하는 쿼리의 4~5%가 RFC1918 사설 주소 범위에 관한 것으로, 분할 DNS 또는 Microsoft 도메인의 잘못된 설정이 원인이다.

## 예시

```bash
# BIND view 설정 예시 (named.conf)
# view "internal" {
#     match-clients { localnets; };
#     recursion yes;
#
#     zone "atrust.com" {
#         type master;
#         file "internal/atrust.com";
#     };
# };
#
# view "external" {
#     match-clients { any; };
#     recursion no;
#
#     zone "atrust.com" {
#         type master;
#         file "world/atrust.com";
#     };
# };

# 내부 존 파일 (사설 IP)
# ns1   IN  A  10.0.0.1
# www   IN  A  10.0.0.10

# 외부 존 파일 (공인 IP)
# ns1   IN  A  63.173.189.1
# www   IN  A  63.173.189.10

# 뷰 디버깅: 쿼리 로그에 매칭된 뷰가 표시됨
```

## 관련 개념

- [bind](/knowledge/linux/bind/) - 분할 DNS를 구현하는 서버 소프트웨어
- [dns-zone](/knowledge/linux/dns-zone/) - 뷰별로 다른 데이터를 가지는 존
- [dns](/knowledge/linux/dns/) - 분할 DNS가 동작하는 시스템
- [nat](/knowledge/linux/nat/) - 사설 주소와 공인 주소 변환
- [firewall](/knowledge/linux/firewall/) - 분할 DNS와 함께 사용하는 보안 도구
