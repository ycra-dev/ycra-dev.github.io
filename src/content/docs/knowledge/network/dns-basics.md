---
title: "DNS (Domain Name System) - 기초 개념"
description: "사람이 읽을 수 있는 도메인 이름을 컴퓨터가 사용하는 IP 주소로 변환하는 계층적 분산 데이터베이스 시스템"
tags: ["Network", "DNS", "Domain", "Naming"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/network/dns-basics
sidebar:
  order: 15
---

## 핵심 개념

DNS(Domain Name System)는 사람이 읽을 수 있는 도메인 이름(예: google.com)을 컴퓨터가 사용하는 IP 주소로 변환하는 **계층적 분산 데이터베이스** 시스템으로, 인터넷의 전화번호부 역할을 한다.

## 동작 원리

인간은 `142.250.80.46` 같은 숫자보다 `google.com` 같은 이름을 기억하기 쉽다. DNS는 이 이름을 IP 주소로 변환해주는 시스템이다.

**계층 구조**: 도메인 이름은 오른쪽에서 왼쪽으로 계층적이다.

```
www.cs.princeton.edu
 │    │      │      └─ TLD (최상위 도메인): edu
 │    │      └─ 2차 도메인: princeton
 │    └─ 3차 도메인: cs
 └─ 호스트 이름: www
```

**DNS 조회 과정**:
1. 사용자가 `www.example.com`을 브라우저에 입력
2. 로컬 DNS 캐시 확인 → 없으면
3. 재귀적 DNS 리졸버(보통 ISP 제공)에 질의
4. 루트 서버에 질의 → `.com` TLD 서버 주소 응답
5. `.com` TLD 서버에 질의 → `example.com`의 권한 있는 네임 서버 주소 응답
6. 권한 있는 네임 서버에 질의 → `www.example.com`의 IP 주소 응답
7. 결과를 캐시에 저장하고 브라우저에 전달

**TTL (Time To Live)**: DNS 응답에는 캐시 유효 시간이 포함된다. TTL이 지나면 캐시가 만료되고 다시 조회해야 한다.

**최상위 도메인 (TLD)**:
- 일반 TLD: `.com`, `.org`, `.net`, `.edu`, `.gov`
- 국가 코드 TLD: `.kr` (한국), `.jp` (일본), `.uk` (영국)
- 신규 TLD: `.app`, `.dev`, `.io` 등

## 예시

DNS 조회 확인:

```bash
# nslookup으로 DNS 조회
$ nslookup google.com
Server:  8.8.8.8
Address: 8.8.8.8#53

Non-authoritative answer:
Name:    google.com
Address: 142.250.80.46

# dig로 상세 정보 확인
$ dig google.com
;; ANSWER SECTION:
google.com.    299    IN    A    142.250.80.46
```

DNS 레코드 타입:
- **A**: 도메인 → IPv4 주소
- **AAAA**: 도메인 → IPv6 주소
- **CNAME**: 도메인 → 다른 도메인 (별칭)
- **MX**: 이메일 서버 주소
- **TXT**: 임의의 텍스트 정보

## 관련 개념

- [IP 주소 (IP Address)](/knowledge/network/ip-address/) - DNS가 변환하는 목적지
- [TCP/IP](/knowledge/network/tcp-ip/) - DNS 조회에 사용하는 프로토콜
- [HTTP](/knowledge/network/http-basics/) - DNS로 IP를 찾은 뒤 사용하는 웹 프로토콜

## 출처

- Understanding the Digital World, Chapter 9
