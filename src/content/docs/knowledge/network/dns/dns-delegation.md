---
title: "DNS Delegation"
description: "DNS 위임(Delegation)은 상위 도메인이 하위 도메인의 권한을 해당 도메인의 네임 서버에 이전하는 메커니즘으로, NS 레코드를 통해 구현되며 DNS의 분산 계층 구조를 가능하게 하는 핵심 개념이다"
tags: ['DNS Delegation', 'Ns Record', 'Referral', 'Hierarchy', 'Lame Delegation']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/network/dns-delegation
sidebar:
  order: 7
---

## 핵심 개념

모든 네임 서버는 루트 서버의 정보를 알고 있다. 루트 서버는 .com, .net, .edu 등 최상위 도메인(TLD)의 네임 서버를 알고, TLD 서버는 그 아래 도메인의 서버를 알고 있다. 이렇게 각 도메인이 하위 도메인에 권한을 위임한다.

**위임 조회 과정 예시** (vangogh.cs.berkeley.edu 조회):
1. 로컬 네임 서버가 루트 서버에 쿼리
2. 루트 서버가 .edu 서버로 참조(referral)
3. .edu 서버가 berkeley.edu 서버로 참조
4. berkeley.edu 서버가 cs.berkeley.edu 서버로 참조
5. cs.berkeley.edu 서버가 최종 답변 반환

**레임 위임(Lame Delegation)**: 부모 존에 등록된 네임 서버가 해당 자식 존의 데이터를 제공하지 못하는 상태. 도메인을 등록하고 사용하지 않거나, 네임 서버를 변경하면서 부모 존과 조율하지 않으면 발생한다. 모든 네임 서버가 레임이면 도메인에 접근이 불가능하다.

**부모-자식 존 NS 레코드 동기화**: 부모 존의 NS 레코드 목록은 자식 존의 실제 NS 레코드와 일치해야 한다. dig 또는 drill로 주기적으로 위임을 확인해야 한다.

## 예시

```bash
# 위임 체인 수동 추적
dig +trace www.example.com

# 특정 레벨에서 위임 확인
dig @a.root-servers.net example.com SOA   # 루트에서
dig @a.gtld-servers.net example.com SOA   # gTLD에서
dig @ns1.example.com example.com SOA      # 권한 서버에서

# 존 파일에서 서브도메인 위임 (NS 레코드)
# booklab.atrust.com.  IN  NS  ubuntu.booklab.atrust.com.
# booklab.atrust.com.  IN  NS  ns1.atrust.com.

# 글루 레코드 (자식 존 네임서버의 A 레코드)
# ubuntu.booklab.atrust.com.  IN  A  192.168.1.10

# 레임 위임 감지
# dig @ns1.nameservices.net w3w3.com
# -> SERVFAIL 또는 응답 없음 = 레임 위임
```

## 관련 개념

- [dns](/knowledge/network/dns/) - 위임이 동작하는 도메인 이름 시스템
- [dns-zone](/knowledge/network/dns-zone/) - 위임의 단위
- [dns-resource-record](/knowledge/network/dns-resource-record/) - 위임에 사용되는 NS 레코드
- [dns-caching](/knowledge/network/dns-caching/) - 위임 과정에서의 캐싱
- [bind](/knowledge/network/bind/) - 위임을 처리하는 DNS 서버
