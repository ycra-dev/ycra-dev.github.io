---
title: "DNS"
description: "DNS(Domain Name System)는 인터넷에서 호스트 이름과 메일 서버의 IP 주소를 조회하기 위한 대규모 분산 계층적 명명 시스템이다"
tags: ['DNS', 'Domain Name System', 'Name Service', 'Dnssec', 'Internet']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/distributed-systems/dns
sidebar:
  order: 3
---

## 핵심 개념

**이름 공간**: 루트 트리 구조. 라벨은 대소문자 무관 문자열(최대 63자), 전체 경로는 최대 255자. 예: "flits.cs.vu.nl."은 root:[nl, vu, cs, flits]. 하위 트리가 도메인, 경로 이름이 도메인 이름.

**주요 리소스 레코드(RR)**:
- **A**: 호스트의 IPv4 주소
- **SOA**: 존(zone) 정보
- **NS**: 존을 구현하는 네임 서버
- **MX**: 메일 서버 (우선순위 포함)
- **SRV**: 특정 서비스를 처리하는 서버
- **CNAME**: 별칭(심볼릭 링크)
- **PTR**: IP → 호스트 이름 역매핑 (in-addr.arpa)

**구현**: 이름 공간을 비중첩 존(zone)으로 분할, 각 존을 별도 네임 서버가 담당. 주(primary) 서버가 업데이트 처리, 보조(secondary) 서버가 존 전송으로 동기화.

**현대 DNS**:
- 외부 DNS 리졸버 사용 증가 (CDN의 클라이언트 근접 서버 선택에 영향)
- 브라우저가 로컬 설정을 우회하여 직접 외부 리졸버에 질의
- DNS 서버 운영의 아웃소싱 증가로 DNS의 탈중앙화 감소 우려

**DNSSEC**: 리소스 레코드를 유형별로 그룹화하여 서명. 존 서명 키(ZSK)로 RR 세트 서명, 키 서명 키(KSK)로 ZSK 서명, 부모 도메인이 KSK 해시를 서명 → 루트까지 신뢰 체인 형성.

**DNS 프라이버시**: DNS over TLS(포트 853)와 DNS over HTTPS로 질의 기밀성 보호. 경로의 관련 부분만 질의하여 정보 노출 최소화.

## 예시

```
# DNS 존 파일 예시 (cs.vu.nl)
cs.vu.nl.       SOA   star.cs.vu.nl. hostmaster.cs.vu.nl.
cs.vu.nl.       NS    star.cs.vu.nl.
cs.vu.nl.       MX    1 mail.few.vu.nl.
star.cs.vu.nl.  A     130.37.24.6
www.cs.vu.nl.   CNAME soling.cs.vu.nl.
soling.cs.vu.nl. A    130.37.20.20

# 이름 해석 과정:
# "www.cs.vu.nl" 질의
# 1. 루트 서버 → .nl 네임 서버 주소 반환
# 2. .nl 서버 → vu.nl 네임 서버 주소 반환
# 3. vu.nl 서버 → cs.vu.nl 네임 서버 주소 반환
# 4. cs.vu.nl 서버 → CNAME soling → A 130.37.20.20 반환
```

## 관련 개념

- [Name Resolution](/knowledge/distributed-systems/name-resolution/)
- [Flat Naming](/knowledge/distributed-systems/flat-naming/)
- [NFS](/knowledge/distributed-systems/nfs/)
- [Distribution Transparency](/knowledge/distributed-systems/distribution-transparency/)
