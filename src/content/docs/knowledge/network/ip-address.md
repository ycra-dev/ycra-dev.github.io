---
title: "IP 주소 (IP Address)"
description: "인터넷에 연결된 각 장치를 식별하기 위한 논리적 주소로 IPv4는 32비트, IPv6는 128비트로 구성된다"
tags: ["Network", "IP", "IPv4", "IPv6", "Addressing"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/network/ip-address
sidebar:
  order: 14
---

## 핵심 개념

IP 주소(Internet Protocol Address)는 인터넷에 연결된 각 장치를 식별하기 위한 **논리적 주소**이다. IPv4는 32비트(약 43억 개), IPv6는 128비트로 사실상 무한한 주소 공간을 제공한다.

## 동작 원리

IP 주소는 인터넷에서 "집 주소"에 해당한다. 데이터를 보내려면 목적지의 IP 주소를 알아야 하고, 응답을 받으려면 자신의 IP 주소를 알려야 한다.

**IPv4**:
- 32비트, 4개의 8비트 옥텟으로 표현: `192.168.1.100`
- 총 약 43억(2^32) 개의 주소
- 특수 주소: `127.0.0.1` (자기 자신, localhost), `192.168.x.x` / `10.x.x.x` (사설 주소)
- 1990년대부터 주소 고갈 문제 대두

**IPv6**:
- 128비트, 8개의 16비트 그룹을 16진수로 표현: `2001:0db8:85a3::8a2e:0370:7334`
- 총 약 3.4 × 10^38 개의 주소

**NAT (Network Address Translation)**:
IPv4 주소 고갈의 현실적 해결책이다. 가정이나 회사 내부에서는 사설 IP 주소(192.168.x.x 등)를 사용하고, 외부 인터넷과 통신할 때 라우터가 하나의 공인 IP 주소로 변환한다. 수백 대의 기기가 하나의 공인 IP를 공유할 수 있다.

**IP 주소 할당**:
- **고정 IP**: 서버 등에 영구적으로 할당
- **동적 IP**: DHCP(Dynamic Host Configuration Protocol)를 통해 접속 시마다 자동 할당

## 예시

IPv4 주소의 구조:

```
192.168.1.100
  │    │  │  └── 장치 번호: 100
  │    │  └───── 서브넷: 1
  │    └──────── 서브넷: 168
  └───────────── 네트워크: 192

이진 표현:
11000000.10101000.00000001.01100100
```

사설 IP vs 공인 IP:

```
인터넷
    │
[라우터] 공인IP: 203.0.113.5
    │
  ┌─┴─────────────┐
  │   사설 네트워크  │
[PC1] 192.168.1.2  │
[PC2] 192.168.1.3  │
[PC3] 192.168.1.4  │
  └───────────────┘
```

## 관련 개념

- [TCP/IP](/knowledge/network/tcp-ip/) - IP 주소를 사용하는 핵심 인터넷 프로토콜
- [DNS](/knowledge/network/dns-basics/) - 도메인 이름을 IP 주소로 변환하는 시스템
- [라우팅 (Routing)](/knowledge/network/routing/) - IP 주소를 기반으로 경로를 결정

## 출처

- Understanding the Digital World, Chapter 9
