---
title: "Gossip Protocol"
description: "가십 프로토콜(Gossip Protocol)은 분산 시스템에서 각 노드가 무작위로 선택한 다른 노드와 정보를 교환하여, 전체 시스템에 정보를 지수적 속도로 전파하는 전염병(epidemic) 기반 통신 방식이다"
tags: ['Gossip Protocol', 'Epidemic Protocol', 'Peer Sampling', 'Aggregation']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/distributed-systems/gossip-protocol
sidebar:
  order: 7
---

## 핵심 개념

**전염병 모델 기반 정보 전파(Anti-entropy)**: 각 라운드에서 노드 P가 랜덤 노드 Q를 선택하여 업데이트를 교환한다. 노드 상태는 감염(infected, 전파할 데이터 보유), 감수성(susceptible, 미수신), 제거(removed, 전파 불가)로 구분한다.
- **Pull**: 감수성 노드가 감염 노드에서 업데이트를 가져옴. 감염 노드가 많을 때 효과적.
- **Push**: 감염 노드가 다른 노드에 업데이트를 밀어넣음. 감수성 노드가 선택될 확률이 낮아 비효율적.
- **Push-Pull**: 양방향 교환. 항상 최선의 전략.
- 수렴 속도: O(log N) 라운드. 매우 빠르고 확장 가능.

**집계(Aggregation)**: 가십을 통해 분산 데이터를 집계할 수 있다. 두 노드 Pi, Pj가 만나면 vi, vj ← (vi + vj)/2로 값을 교환한다. 결국 모든 노드가 전체 초기값의 평균으로 수렴한다. 이를 활용하여:
- **시스템 크기 추정**: P1만 v1=1, 나머지 vi=0으로 설정하면, 평균 수렴값의 역수(1/v)가 전체 노드 수 N의 추정치
- **무작위 리더 선출**: 각 노드가 (0,1] 구간의 랜덤 값을 교환하며 max를 계산, 최종 승자가 리더

**피어 샘플링 서비스(PSS)**: 각 노드가 c개의 이웃 목록(부분 뷰, partial view)을 유지. 주기적으로 무작위 이웃과 부분 뷰의 항목을 교환. 각 항목에는 노드 참조의 나이(age)가 포함되어 오래된 항목을 제거할 수 있다. 이를 통해 중앙 서비스 없이도 대규모 네트워크에서 무작위 노드를 선택할 수 있다.

**오버레이 구성**: 가십 프로토콜을 사용하여 특정 토폴로지의 오버레이 네트워크를 자율적으로 구축할 수 있다. 각 노드가 이웃과 자신의 프로필을 교환하고, 더 "가까운" 노드로 이웃 목록을 갱신하면 원하는 구조가 자연스럽게 형성된다.

## 예시

```python
# 가십 기반 집계 (평균 계산)
class GossipNode:
    def __init__(self, node_id, initial_value):
        self.id = node_id
        self.value = initial_value

    def gossip_exchange(self, other):
        avg = (self.value + other.value) / 2
        self.value = avg
        other.value = avg

# 시스템 크기 추정 예시:
# 초기: P1.value = 1, P2~P100.value = 0
# 여러 라운드 후: 모든 노드의 value ≈ 0.01
# 추정 크기 = 1 / 0.01 = 100 (실제 노드 수)

# 피어 샘플링 서비스:
# 능동 스레드: 주기적으로 이웃 선택 → 부분 뷰 항목 교환
# 수동 스레드: 교환 요청 수신 → 자신의 항목 반환 및 뷰 갱신
```

## 관련 개념

- [Distributed System](/knowledge/distributed-systems/distributed-system/)
- [Publish Subscribe](/knowledge/distributed-systems/publish-subscribe/)
- [Election Algorithm](/knowledge/distributed-systems/election-algorithm/)
