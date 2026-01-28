---
title: "DNS (Domain Name System)"
description: "호스트 이름을 IP 주소로 변환하는 분산 이름 해석 시스템"
tags: ["Network", "DNS", "NameResolution"]
created: 2026-01-23
updated: 2026-01-27
draft: true
slug: knowledge/network/dns
sidebar:
  order: 2
---

## 핵심 개념

DNS(Domain Name System)는 사람이 읽기 쉬운 호스트 이름(예: www.google.com)을 컴퓨터가 이해하는 숫자 IP 주소(예: 142.250.196.4)로 변환하는 분산 이름 해석 시스템입니다. 초기 ARPANET에서는 hosts 파일로 관리했으나, 네트워크 확장으로 분산 방식이 필요해졌습니다.

## 동작 원리

### 계층적 이름 구조

가장 구체적인 것부터 일반적인 순서로 구성됩니다.

`eric.cs.yale.edu` 의 경우:
- `edu`: 최상위 도메인(TLD)
- `yale`: 기관
- `cs`: 부서
- `eric`: 호스트

### 분산 해석 과정

```
클라이언트                     DNS 계층
    |
    |---(1) eric.cs.yale.edu?--> [edu 네임서버]
    |<--(2) yale.edu 서버 주소---    |
    |                               |
    |---(3) cs.yale.edu?---------> [yale.edu 네임서버]
    |<--(4) cs.yale.edu 서버 주소--  |
    |                               |
    |---(5) eric.cs.yale.edu?----> [cs.yale.edu 네임서버]
    |<--(6) 128.148.31.100---------
```

1. 각 도메인은 자신의 네임 서버를 보유
2. **캐싱**: 해석된 IP 주소를 캐시하여 효율성 향상. 일정 시간 후 갱신
3. **이중화**: 주 네임 서버 장애 대비 보조 네임 서버 운영

## 예시

전화번호부 시스템과 유사합니다. 이름으로 검색하면 전화번호(IP 주소)를 알려줍니다. 전국 전화번호부를 한 권으로 만들 수 없으니 지역별로 분산 관리합니다.

```
사용자가 브라우저에 "www.example.com" 입력
→ 로컬 DNS 캐시 확인 (없으면)
→ 로컬 DNS 서버에 질의
→ 루트 DNS → .com DNS → example.com DNS
→ IP 주소 93.184.216.34 반환
→ 브라우저가 해당 IP로 연결
```

## 관련 개념

- [[LAN과 WAN]]
- [[TCP/IP 프로토콜 스택]]
- [[OSI 모델 (Open Systems Interconnection)]]
