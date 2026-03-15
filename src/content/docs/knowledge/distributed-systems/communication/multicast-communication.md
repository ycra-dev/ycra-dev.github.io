---
title: "멀티캐스트 통신 (Multicast Communication)"
description: "멀티캐스트 통신(Multicast Communication)은 데이터를 여러 수신자에게 동시에 전송하는 통신 방식이다"
tags: ['Multicast', 'Flooding', 'Gossip', 'Epidemic', 'Application Level Multicast', 'Tree Based']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/distributed-systems/multicast-communication
sidebar:
  order: 6
---

## 핵심 개념

**애플리케이션 수준 트리 기반 멀티캐스트**:
- 노드를 트리 또는 메시 네트워크로 조직.
- **트리**: 노드 쌍 사이에 유일한 경로. 단순하나 노드 장애에 취약.
- **메시**: 여러 경로 존재하여 견고성 높음.
- Chord 기반 Scribe 시스템에서 멀티캐스트 트리 구축: 멀티캐스트 식별자 mid의 succ(mid)를 루트로, 참가자가 lookup(mid)을 통해 경로상 노드를 포워더로 등록.

**멀티캐스트 트리의 품질 지표**:
- **링크 스트레스(Link Stress)**: 패킷이 동일 물리 링크를 횡단하는 횟수. 1 초과 시 비효율.
- **스트레치(Stretch/RDP)**: 오버레이 경로 지연 / 실제 네트워크 경로 지연의 비율.
- **트리 비용(Tree Cost)**: 전체 링크 비용의 합계. 최소 스패닝 트리가 이상적.
- Switch-trees: 노드가 부모를 동적으로 교체하여 트리를 최적화. 루프 방지를 위해 동시 스위칭 제한.

**플러딩 기반 멀티캐스트**:
- 각 노드가 수신 메시지를 모든 이웃(송신자 제외)에 전달. 중복은 무시.
- 총 메시지 수: 2|E| - |V| + 1. 트리에서만 최적 (|E| = |V| - 1).
- **확률적 플러딩**: 확률 pflood로 이웃에 전달. 메시지 수가 선형적으로 감소하나 도달 실패 위험.
  - 10,000 노드, pedge=0.1에서 pflood=0.01로 설정하면 전체 플러딩 대비 50배 이상 감소.
- **구조화된 오버레이에서 효율적 플러딩**: 하이퍼큐브에서 차원 번호를 활용하여 N-1 메시지로 최적 브로드캐스트. Chord에서도 식별자 공간 분할로 N-1 메시지 달성.

**가십 기반 데이터 전파(Epidemic Protocol)**:
- 전염병 확산 모델을 정보 전파에 적용.
- **노드 상태**: 감염(infected, 데이터를 전파할 의사 있음), 감수성(susceptible, 아직 미수신), 제거(removed, 전파 불가).
- **안티엔트로피(Anti-entropy)**: 각 라운드에서 노드가 랜덤 노드를 선택하여 업데이트 교환.
  - Pull: 감염 노드가 많을 때 효과적 (감수성 노드가 감염 노드를 쉽게 찾음).
  - Push: 감염 노드가 적을 때는 비효율 (감수성 노드 선택 확률 낮음).
  - Push-pull: 항상 최선의 전략.
- **수렴 속도**: O(log N) 라운드로 전체 노드에 전파. 빠르고 확장 가능.

## 예시

```
# Chord에서 플러딩 예 (노드 9가 브로드캐스트)

노드 9의 이웃: {11, 14, 18, 28}
식별자 공간 분할:
  노드 28 → 담당 구간 [28, 9)
  노드 18 → 담당 구간 [18, 28)
  노드 14 → 담당 구간 [14, 18)
  노드 11 → 담당 구간 [11, 14)

노드 28 → 노드 1과 4에 위임
노드 18 → 노드 20에 위임 (구간 [20, 28))
노드 20 → 노드 21에 위임 → 더 이상 위임 없음
→ 총 메시지: N-1 = 8개 (최적)

# 안티엔트로피 확산 속도 (Push-Pull)
# N=1000 노드: ~10 라운드 (2^10 = 1024)
# N=1,000,000 노드: ~20 라운드 (2^20 ≈ 1,048,576)
# 매우 빠르고 확장 가능!
```

## 관련 개념

- [가십 프로토콜 (Gossip Protocol)](/knowledge/distributed-systems/gossip-protocol/)
- [P2P 시스템 (Peer-to-Peer System)](/knowledge/distributed-systems/peer-to-peer-system/)
- [발행/구독 (Publish Subscribe)](/knowledge/distributed-systems/publish-subscribe/)
- [전순서 멀티캐스트 (Totally Ordered Multicast)](/knowledge/distributed-systems/totally-ordered-multicast/)
- [분산 시스템 (Distributed System)](/knowledge/distributed-systems/distributed-system/)
