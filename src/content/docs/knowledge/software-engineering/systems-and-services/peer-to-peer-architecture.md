---
title: "피어투피어 아키텍처 (Peer-to-Peer Architecture)"
description: "P2P 아키텍처는 클라이언트와 서버의 구분 없이 네트워크의 모든 노드가 계산을 수행하고 서비스를 제공할 수 있는 분산화된 시스템 아키텍처이다"
tags: ['P2p', 'Peer To Peer', 'Decentralized', 'Distributed Computing', 'File Sharing', 'Super Peer']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/software-engineering/peer-to-peer-architecture
sidebar:
  order: 9
---

## 핵심 개념

P2P 시스템은 잠재적으로 방대한 컴퓨터 네트워크에 걸쳐 가용한 계산 능력과 저장소를 활용하도록 설계된다. 분산화된(decentralized) 아키텍처와 반중앙화된(semicentralized) 아키텍처가 있다. 분산화된 아키텍처에서는 모든 노드가 통신 스위치 역할도 하며, 반중앙화된 아키텍처에서는 슈퍼 피어(super-peer) 노드가 피어 간 연결 설정이나 계산 결과 수집을 돕는다. 파일 공유(BitTorrent), VoIP(Viber), 분산 컴퓨팅(SETI@home), 암호화폐(Bitcoin) 등에 활용된다. 주요 장점은 효율적인 자원 활용이지만, 보안 문제(악성 노드, 스팸, 멀웨어)로 인해 비즈니스에서의 활용이 제한된다.

## 예시

BitTorrent 프로토콜 기반 파일 공유 시스템에서 사용자들은 중앙 서버 없이 PC 간에 직접 파일을 교환한다. Intel과 Boeing은 야간에 유휴 데스크톱 컴퓨터의 처리 능력을 활용하여 계산 집약적 엔지니어링 작업을 수행하는 P2P 시스템을 구현했다.

## 관련 개념

- [분산 시스템 (Distributed System)](/knowledge/software-engineering/distributed-system/)
- [클라이언트-서버 컴퓨팅 (Client-Server Computing)](/knowledge/software-engineering/client-server-computing/)
- [서비스형 소프트웨어 (Software as a Service)](/knowledge/software-engineering/software-as-a-service/)
- [미들웨어 (Middleware)](/knowledge/software-engineering/middleware/)
