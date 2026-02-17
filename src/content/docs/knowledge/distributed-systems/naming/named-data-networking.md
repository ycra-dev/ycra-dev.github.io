---
title: "Named Data Networking"
description: "Named Data Networking(NDN)은 이름을 주소로 해석하는 대신, 이름을 직접 사용하여 엔티티로 라우팅하고 연관 데이터의 복사본을 반환하는 이름 기반 라우팅(name-based routing) 아키텍처이다"
tags: ['Ndn', 'Content Centric Networking', 'Information Centric', 'Name Based Routing']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/distributed-systems/named-data-networking
sidebar:
  order: 7
---

## 핵심 개념

NDN은 기존 인터넷의 "어디에 있는가(where)"가 아닌 "무엇을 원하는가(what)"에 초점을 맞춘다. 이름-주소 해석(name-to-address resolution)의 필요성 자체에 도전.

**NDN 라우터의 세 가지 데이터 구조**:
1. **콘텐츠 저장소(Content Store, CS)**: 이전에 전달된 데이터 패킷의 캐시. 동일 이름의 요청이 오면 캐시에서 즉시 응답.
2. **대기 관심 테이블(Pending Interest Table, PIT)**: 아직 응답되지 않은 관심(Interest) 패킷을 기록. 동일 콘텐츠에 대한 여러 요청을 집계(aggregation).
3. **전달 정보 기반(Forwarding Information Base, FIB)**: 이름 접두사에 기반한 라우팅 테이블. 관심 패킷을 어느 인터페이스로 전달할지 결정.

**동작 과정**:
1. 소비자가 이름이 포함된 Interest 패킷 전송
2. 라우터가 CS 확인 → 있으면 Data 패킷 반환
3. CS에 없으면 PIT 확인 → 이미 같은 관심이 있으면 인터페이스만 추가
4. PIT에도 없으면 FIB로 Interest를 적절한 인터페이스로 전달
5. Data 패킷이 돌아올 때 경로를 따라 CS에 캐시

**장점**: 내장된 캐싱으로 인기 콘텐츠의 효율적 분배, 다중 소스에서 데이터 수집 가능, 이동성 자연 지원.

## 예시

```
# NDN 관심/데이터 패킷 흐름
Consumer → Router A → Router B → Producer
[Interest: /edu/vu/cs/paper.pdf]

# Router A의 CS에 해당 콘텐츠가 있으면:
Consumer ← Router A (CS에서 즉시 반환)
[Data: /edu/vu/cs/paper.pdf + content]

# CS에 없으면 FIB를 참조하여 전달:
Router A → PIT에 기록 + FIB로 전달 → Router B
Router B → CS 확인 또는 Producer에 전달
Data가 역경로로 반환되며 각 라우터 CS에 캐시

# 요청 집계(aggregation):
Consumer1 → Router [Interest: /video/popular.mp4]  # PIT 등록
Consumer2 → Router [Interest: /video/popular.mp4]  # PIT에 인터페이스 추가만
# Data 한 번만 가져와서 두 소비자에게 전달
```

## 관련 개념

- [DNS](/knowledge/distributed-systems/dns/)
- [Name Resolution](/knowledge/distributed-systems/name-resolution/)
- [Flat Naming](/knowledge/distributed-systems/flat-naming/)
