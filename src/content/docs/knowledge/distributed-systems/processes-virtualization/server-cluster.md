---
title: "서버 클러스터 (Server Cluster)"
description: "서버 클러스터(Server Cluster)는 네트워크로 연결된 여러 머신의 집합으로, 각 머신이 하나 이상의 서버를 실행하며 외부에는 단일 시스템의 환상을 제공하는 분산 시스템 구조이다"
tags: ['Server Cluster', 'Load Balancing', 'Request Dispatching', 'Cdn', 'TCP Handoff', 'Wide Area']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/distributed-systems/server-cluster
sidebar:
  order: 4
---

## 핵심 개념

**로컬 영역 클러스터의 3계층 구조**:
1. **1계층 (스위치/프론트엔드)**: 클라이언트 요청을 라우팅하는 논리적 스위치. 단일 접근점(single access point)을 제공하여 접근 투명성 보장.
2. **2계층 (애플리케이션/컴퓨트 서버)**: 애플리케이션 처리를 담당. 고성능 하드웨어 또는 범용 서버 사용.
3. **3계층 (데이터 처리 서버)**: 파일 서버, 데이터베이스 서버. 고속 디스크 접근과 대용량 캐시에 특화.

**요청 디스패칭 방식**:
- **전송 계층 스위치**: TCP 연결 요청을 수락하고 서버에 전달. NAT(Network Address Translation)를 사용하여 소스/목적지 주소 변환.
- **애플리케이션 계층 스위치**: 요청 내용(예: URL)을 검사하여 적절한 서버로 전달. 더 정교하지만 느릴 수 있음. nginx가 대표적(리버스 프록시).
- **TCP 핸드오프**: 스위치가 TCP 연결을 서버에 직접 넘겨 응답이 스위치를 거치지 않음. 응답이 요청보다 큰 경우(웹 서버) 매우 효과적.

**부하 분산**: 라운드 로빈이 가장 단순한 정책. 스위치가 서버 선택 권한을 가짐.

**광역 클러스터 (CDN)**:
- Akamai가 대표적. 135개국 1350+ ISP에 400,000+ 서버 배치.
- 원본 서버(origin server)의 도메인을 에지 서버로 리디렉션.
- DNS 리디렉션, HTTP 리디렉션, TCP 핸드오프의 3가지 리디렉션 기법 사용.
- DNS 리디렉션은 투명하지만, 클라이언트의 로컬 DNS 서버 위치에 의존하여 정확도가 떨어질 수 있음.

## 예시

```
# 3계층 서버 클러스터 구조

[클라이언트 요청들]
        │
        ▼
┌───────────────────┐
│  논리적 스위치     │  ← 1계층: 요청 디스패칭, 단일 IP
│  (NAT / 리버스     │     라운드 로빈 부하 분산
│   프록시)          │
├───────────────────┤
│  App Server 1  │  │
│  App Server 2  │  │  ← 2계층: 애플리케이션 처리
│  App Server 3  │  │
├───────────────────┤
│  DB Server / File │  ← 3계층: 데이터 처리
│  Server           │
└───────────────────┘

# CDN(Akamai) 동작 흐름
# 1. 클라이언트가 www.example.com 조회
# 2. DNS가 www.example.com.akamai.net으로 리디렉션
# 3. Akamai DNS가 최적 에지 서버 IP 반환
# 4. 클라이언트가 에지 서버에 접속
# 5. 에지 서버가 캐시에 없으면 원본 서버(org-www.example.com)에서 가져옴
```

## 관련 개념

- [클러스터 컴퓨팅 (Cluster Computing)](/knowledge/distributed-systems/cluster-computing/)
- [클라우드 컴퓨팅 (Cloud Computing)](/knowledge/distributed-systems/cloud-computing/)
- [CDN (콘텐츠 전송 네트워크)](/knowledge/distributed-systems/content-delivery-network/)
- [확장성 (Scalability)](/knowledge/distributed-systems/scalability/)
- [분산 시스템 (Distributed System)](/knowledge/distributed-systems/distributed-system/)
