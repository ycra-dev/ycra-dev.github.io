---
title: "플랫 네이밍 (Flat Naming)"
description: "평면 네이밍(Flat Naming)은 엔티티를 구조화되지 않은 무작위 비트 문자열(식별자)로 참조하는 명명 방식이다"
tags: ['Flat Naming', 'Identifier', 'Broadcasting', 'Forwarding Pointers', 'Name Resolution']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/distributed-systems/flat-naming
sidebar:
  order: 1
---

## 핵심 개념

분산 시스템에서 이름(name), 식별자(identifier), 주소(address)는 구별된다:
- **이름**: 엔티티를 참조하는 비트/문자열
- **식별자**: (1) 최대 하나의 엔티티를 참조, (2) 각 엔티티에 최대 하나 할당, (3) 재사용 불가
- **주소**: 접근 지점의 이름. 엔티티의 위치 변경 시 주소도 변경될 수 있음

**평면 이름 해석 방법들**:

1. **브로드캐스팅/멀티캐스팅**: 식별자를 네트워크에 브로드캐스트하여 해당 엔티티를 가진 머신이 응답. ARP(Address Resolution Protocol)가 대표적 예시. LAN에서는 효율적이나 대규모에서는 비효율적.

2. **포워딩 포인터**: 엔티티가 A에서 B로 이동할 때 A에 B로의 참조를 남김. 체인을 따라가면 현재 위치를 찾을 수 있으나, 체인이 길어지면 비용 증가 및 링크 깨짐 위험.

3. **홈 기반 접근**: 각 모바일 엔티티에 고정된 홈 위치를 할당하여 현재 위치를 추적. Mobile IP가 대표적. 홈 에이전트가 패킷을 현재 위치(care-of address)로 터널링. 단점: 홈이 먼 곳에 있으면 지연 증가.

4. **자체 인증 이름(Self-certifying name)**: id(entity) = hash(entity data) 또는 id(entity) = public_key(entity)로 식별자와 엔티티의 바인딩을 보안적으로 검증.

## 예시

```
# ARP (브로드캐스팅 방식)
# IP 주소 → MAC 주소 해석
# 1. "IP 192.168.1.5 누구?" 로컬 네트워크에 브로드캐스트
# 2. 해당 IP를 가진 머신이 MAC 주소로 응답

# Mobile IP (홈 기반 접근)
# 1. 클라이언트 → 홈 에이전트로 패킷 전송
# 2. 홈 에이전트 → care-of address로 터널링
# 3. 클라이언트에 현재 위치 알려주어 직접 통신 가능

# 포워딩 포인터 체인:
# 원래위치A → B → C → D (현재 위치)
# 클라이언트가 A에 접근 → 체인을 따라 D까지 도달
```

## 관련 개념

- [분산 해시 테이블 (Distributed Hash Table)](/knowledge/distributed-systems/distributed-hash-table/)
- [DNS (도메인 네임 시스템)](/knowledge/distributed-systems/dns/)
- [이름 해석 (Name Resolution)](/knowledge/distributed-systems/name-resolution/)
