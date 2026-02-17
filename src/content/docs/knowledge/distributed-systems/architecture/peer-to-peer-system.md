---
title: "Peer-to-Peer System"
description: "피어투피어 시스템(Peer-to-Peer System)은 모든 프로세스가 동등한 역할을 수행하며, 각 프로세스가 동시에 클라이언트와 서버(servant)로 작동하는 대칭적 분산 시스템 아키텍처이다"
tags: ['P2p', 'Overlay Network', 'Structured P2p', 'Unstructured P2p', 'Decentralized']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/distributed-systems/peer-to-peer-system
sidebar:
  order: 4
---

## 핵심 개념

P2P 시스템의 핵심은 오버레이 네트워크(overlay network)의 조직 방식이다. 오버레이 네트워크에서 노드는 프로세스이고, 링크는 가능한 통신 채널(주로 TCP 연결)을 나타낸다.

**구조적 P2P(Structured P2P)**: 노드가 링, 바이너리 트리, 그리드 등 결정론적 토폴로지로 조직된다. 의미 독립적 인덱스(semantic-free index)를 사용하여 데이터 항목을 해시 키와 연결한다. 분산 해시 테이블(DHT)로 구현된다. 대표적 예: Chord 시스템 - 노드가 링으로 조직되어 m비트 키 k를 가진 데이터가 succ(k) 노드에 매핑됨. O(log N)의 검색 경로 길이 보장.

**비구조적 P2P(Unstructured P2P)**: 노드가 임의의 이웃 목록을 유지하며, 결과적으로 랜덤 그래프를 형성한다. 데이터 검색에 두 가지 극단적 방법이 있다:
- **플러딩(Flooding)**: 모든 이웃에게 요청 전파. TTL로 범위 제한. 통신 비용이 높음.
- **랜덤 워크(Random Walk)**: 임의의 이웃 하나에게만 전파. 네트워크 부하 적지만 시간이 오래 걸림. n개의 동시 랜덤 워크로 탐색 시간을 n배 감소 가능.

**계층적 P2P**: 슈퍼 피어(super peer)가 인덱스를 유지하고 약한 피어(weak peer)가 클라이언트로 동작하는 구조. 비구조적 P2P의 확장성 문제를 해결.

BitTorrent가 대표적 비구조적 P2P 파일 공유 시스템으로, 트래커를 통해 파일 청크를 공유하며, 무임승차(free riding)를 방지하기 위해 업로드를 강제한다.

## 예시

```
# Chord 시스템의 키 검색 예 (m=5비트, 노드: {1,4,9,11,14,18,20,21,28})

# key 3 검색 (노드 9에서 시작)
노드 9 → 숏컷 중 key 3에 가장 가까운 노드 28로 전달
노드 28 → 숏컷 중 노드 1로 전달
노드 1 → 후속자가 노드 4임을 알고 → 노드 4로 전달 (succ(3) = 4)

# 플러딩 vs 랜덤 워크 비교
# N=10000 노드, 복제율 r/N = 0.1% 일 때:
# 랜덤 워크: 평균 ~1000 노드 탐색
# 플러딩 (d=10 이웃): 4단계 후 ~7290 노드 도달 (비효율적)
# 결론: 복제된 데이터에서 랜덤 워크가 더 효율적
```

## 관련 개념

- [Distributed Hash Table](/knowledge/distributed-systems/distributed-hash-table/)
- [Distributed System](/knowledge/distributed-systems/distributed-system/)
- [Scalability](/knowledge/distributed-systems/scalability/)
- [Content Delivery Network](/knowledge/distributed-systems/content-delivery-network/)
- [Cloud Computing](/knowledge/distributed-systems/cloud-computing/)
