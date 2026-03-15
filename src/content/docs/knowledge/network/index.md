---
title: "네트워크 (Network)"
description: 네트워크 관련 개념 정리 (MOC)
tags: ["Network", "MOC"]
created: 2026-01-24
updated: 2026-01-27
draft: false
slug: knowledge/network
sidebar:
  order: 0
---

## 네트워크 기초

- [LAN과 WAN](/knowledge/network/lan-wan/) - LAN은 좁은 지역의 호스트 네트워크, WAN은 넓은 지역의 시스템 네트워크

## 프로토콜 모델

- [OSI 모델 (Open Systems Interconnection)](/knowledge/network/osi-model/) - 네트워크 통신을 7개 계층으로 분리한 참조 모델
- [TCP/IP 프로토콜 스택](/knowledge/network/tcp-ip/) - 인터넷에서 사용되는 4계층 프로토콜 스택
- [UDP vs TCP (전송 프로토콜 비교)](/knowledge/network/udp-vs-tcp/) - UDP는 비연결형/비신뢰성, TCP는 연결형/신뢰성 전송 프로토콜

## DNS

- [DNS (도메인 네임 시스템)](/knowledge/network/dns/) - DNS는 분산 데이터베이스 모델을 사용하여 호스트 이름을 IP 주소로 변환하는 시스템
- [FQDN (정규화된 도메인 이름)](/knowledge/network/fqdn/) - DNS 네임스페이스에서 호스트의 위치를 루트까지 완전하게 명시하는 도메인 이름
- [DNS 리졸버 (DNS Resolver)](/knowledge/network/dns-resolver/) - 호스트의 DNS 클라이언트 구성으로 resolv.conf와 nsswitch.conf를 통해 이름 해석 방법을 설정
- [DNS 존 (DNS Zone)](/knowledge/network/dns-zone/) - DNS 계층 구조에서 하나의 관리 단위로, 마스터/슬레이브 서버가 존 파일을 관리
- [DNS 리소스 레코드 (DNS Resource Record)](/knowledge/network/dns-resource-record/) - DNS 데이터베이스의 기본 단위로, 이름, 레코드 유형, 데이터 값으로 구성된 텍스트 레코드
- [SOA 레코드 (SOA Record)](/knowledge/network/soa-record/) - DNS 존의 시작을 표시하는 레코드로, 시리얼 번호와 존 동기화 타임아웃 값을 포함
- [DNS 위임 (DNS Delegation)](/knowledge/network/dns-delegation/) - 상위 도메인이 하위 도메인의 권한을 해당 도메인의 네임 서버에 이전하는 메커니즘
- [DNS 캐싱 (DNS Caching)](/knowledge/network/dns-caching/) - 네임 서버가 이전 쿼리의 응답을 TTL 기간 동안 저장하여 효율성을 높이는 메커니즘
- [DNS A 및 AAAA 레코드 (DNS A and AAAA Records)](/knowledge/network/dns-a-record/) - 호스트 이름을 IPv4/IPv6 주소로 매핑하는 DNS 레코드
- [DNS PTR 레코드 (DNS PTR Record)](/knowledge/network/dns-ptr-record/) - IP 주소를 호스트 이름으로 역방향 매핑하는 DNS 레코드
- [DNS CNAME 레코드 (DNS CNAME Record)](/knowledge/network/dns-cname-record/) - 호스트에 추가적인 이름(별칭)을 부여하는 DNS 레코드
- [DNS SRV 레코드 (DNS SRV Record)](/knowledge/network/dns-srv-record/) - 도메인 내에서 특정 서비스의 위치를 지정하는 DNS 레코드
- [DNS TXT 레코드 (DNS TXT Record)](/knowledge/network/dns-txt-record/) - 호스트의 DNS 레코드에 임의의 텍스트를 추가하는 레코드 유형
- [DNS MX 레코드 (DNS MX Record)](/knowledge/network/dns-mx-record/) - DNS MX(Mail Exchanger) 레코드는 특정 도메인에 대한 이메일을 수신할 책임이 있는 메일 서버를 지정하는 DNS 리소스 레코드
- [BIND (버클리 인터넷 네임 도메인)](/knowledge/network/bind/) - ISC에서 개발한 오픈소스 DNS 서버 소프트웨어로, 인터넷 DNS 서버의 75% 이상이 사용
- [DNS 존 전송 (DNS Zone Transfer)](/knowledge/network/dns-zone-transfer/) - DNS 서버 간에 존 데이터를 동기화하는 메커니즘 (AXFR/IXFR)
- [동적 DNS (Dynamic DNS)](/knowledge/network/dynamic-dns/) - DHCP 데몬 같은 엔티티가 네임 서버에 주소 할당을 통지하여 리소스 레코드를 자동 관리하는 기능
- [분할 DNS (Split DNS)](/knowledge/network/split-dns/) - BIND의 view 구문을 사용하여 내부/외부 사용자에게 서로 다른 DNS 데이터를 제공하는 구성
- [TSIG (트랜잭션 서명)](/knowledge/network/tsig/) - 공유 비밀을 사용하여 DNS 서버 간 통신을 인증하고 데이터 무결성을 검증하는 메커니즘
- [DNSSEC (DNS 보안 확장)](/knowledge/network/dnssec/) - 공개키 암호화를 사용하여 DNS 존 데이터의 출처를 인증하고 무결성을 검증하는 DNS 확장

## Email (이메일)

- [SMTP (간이 우편 전송 프로토콜)](/knowledge/network/smtp/) - SMTP(Simple Mail Transfer Protocol)는 인터넷에서 이메일 메시지를 전송하기 위한 표준 프로토콜
- [메일 전송 에이전트 (Mail Transfer Agent)](/knowledge/network/mail-transfer-agent/) - MTA(Mail Transfer Agent)는 이메일 메시지를 수신하고, 수신자 주소를 이해하며, 적절한 목적지로 메시지를 라우팅하는 소프트웨어
- [Postfix (메일 전송 에이전트)](/knowledge/network/postfix/) - Postfix는 Wietse Venema가 개발한 오픈소스 MTA로, 보안, 성능, 견고성을 핵심 설계 목표로 하는 모듈러 아키텍처
- [이메일 아키텍처 (Email Architecture)](/knowledge/network/email-architecture/) - 이메일 시스템 아키텍처는 메시지의 작성부터 전달까지의 흐름을 담당하는 여러 구성 요소로 이루어진 분산 시스템
- [이메일 암호화 (Email Encryption)](/knowledge/network/email-encryption/) - 이메일 암호화는 메시지의 기밀성, 인증, 무결성 보장, 발신 부인 방지를 제공하는 기술
- [메일 별칭 (Mail Aliases)](/knowledge/network/mail-aliases/) - 메일 별칭(Mail Aliases)은 이메일을 다른 수신자, 파일, 프로그램으로 재라우팅하는 메커니즘
- [메일 큐 (Mail Queue)](/knowledge/network/mail-queue/) - 메일 큐(Mail Queue)는 MTA가 메시지를 전달하기 전에 임시로 저장하는 영역
- [오픈 릴레이 (Open Relay)](/knowledge/network/open-relay/) - 오픈 릴레이(Open Relay)는 외부 사용자가 인증 없이 메일을 제3자에게 전달하도록 허용하는 잘못 설정된 메일 서버
- [DKIM (도메인키 인증 메일)](/knowledge/network/dkim/) - DKIM(DomainKeys Identified Mail)은 이메일 메시지에 대한 암호화 서명 시스템
- [SPF (발신자 정책 프레임워크)](/knowledge/network/spf/) - SPF(Sender Policy Framework)는 조직이 DNS 레코드를 통해 공식 발신 메일 서버를 식별하는 이메일 인증 메커니즘
