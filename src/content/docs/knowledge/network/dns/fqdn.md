---
title: "FQDN (정규화된 도메인 이름)"
description: "FQDN(Fully Qualified Domain Name)은 DNS 네임스페이스에서 호스트의 위치를 루트까지 완전하게 명시하는 도메인 이름으로, 반드시 마침표(dot)로 끝나며 (예: nubark"
tags: ['Fqdn', 'DNS', 'Domain Name', 'Hostname', 'Namespace']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/network/fqdn
sidebar:
  order: 2
---

## 핵심 개념

DNS 네임스페이스는 정방향 매핑과 역방향 매핑을 모두 포함하는 트리 구조로 조직된다. 정방향 매핑에서는 호스트 이름의 가장 중요한 부분이 오른쪽에 있고(예: host.domain.com), 역방향 매핑에서는 IP 주소의 옥텟을 역순으로 나열하고 in-addr.arpa 접미사를 붙인다(예: 1.189.173.63.in-addr.arpa).

**마침표(trailing dot)의 중요성:**
- FQDN은 반드시 마침표로 끝남 (예: nubark.atrust.com.)
- DNS 존 파일에서 마침표가 없는 이름은 상대적 이름으로 취급되어 현재 오리진(origin)이 자동 추가됨
- 흔한 실수: "anchor.cs.colorado.edu"를 마침표 없이 입력하면 "anchor.cs.colorado.edu.cs.colorado.edu."로 해석됨

**최상위 도메인(TLD):**
- ccTLD(국가 코드 도메인): .kr, .jp, .uk 등
- gTLD(일반 도메인): .com, .net, .org, .edu 등
- ICANN이 등록 기관을 인가하고 IANA가 ccTLD 등록을 관리

**서브도메인 생성 절차:**
1. 로컬 컨텍스트에서 고유한 이름 선택
2. 두 개 이상의 네임 서버 지정
3. 상위 도메인 관리자와 조율

## 예시

```bash
# FQDN 예시
# nubark.atrust.com.        <- 정방향 FQDN (마침표로 끝남)
# 1.189.173.63.in-addr.arpa. <- 역방향 FQDN

# DNS 존 파일에서의 상대 이름 vs 절대 이름
# $ORIGIN atrust.com.
# ns1     IN  A  63.173.189.1    # -> ns1.atrust.com.
# ns1.atrust.com.  IN  A  63.173.189.1  # 이미 절대 이름

# 흔한 실수 (마침표 누락)
# $ORIGIN cs.colorado.edu.
# anchor.cs.colorado.edu  IN A 128.138.243.151
# 결과: anchor.cs.colorado.edu.cs.colorado.edu. (잘못됨!)
# 올바른 형태: anchor  IN A 128.138.243.151
# 또는: anchor.cs.colorado.edu.  IN A 128.138.243.151

# dig로 FQDN 확인
dig +short nubark.atrust.com.
```

## 관련 개념

- [DNS (도메인 네임 시스템)](/knowledge/network/dns/) - FQDN이 속하는 도메인 이름 시스템
- [DNS 존 (DNS Zone)](/knowledge/network/dns-zone/) - FQDN의 관리 단위
- [DNS 리소스 레코드 (DNS Resource Record)](/knowledge/network/dns-resource-record/) - FQDN을 사용하는 레코드
- [DNS 리졸버 (DNS Resolver)](/knowledge/network/dns-resolver/) - FQDN을 해석하는 클라이언트
