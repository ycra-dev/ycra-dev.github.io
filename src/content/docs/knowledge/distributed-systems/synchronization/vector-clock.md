---
title: "벡터 시계 (Vector Clock)"
description: "벡터 클럭(Vector Clock)은 분산 시스템에서 이벤트 간의 인과 관계(causality)를 정확하게 포착하기 위한 논리적 시간 메커니즘이다"
tags: ['Vector Clock', 'Causality', 'Causal Ordering', 'Logical Time']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/distributed-systems/vector-clock
sidebar:
  order: 3
---

## 핵심 개념

Lamport 클럭의 한계는 C(a) < C(b)일 때 a가 실제로 b보다 먼저 발생했는지 판단할 수 없다는 것이다. 벡터 클럭은 이 문제를 해결한다.

**벡터 클럭의 속성**:
- VCi[i]: Pi에서 지금까지 발생한 이벤트 수 (로컬 논리 시계)
- VCi[j] = k: Pi가 Pj에서 k개의 이벤트가 발생했음을 알고 있음

**알고리즘**:
1. 이벤트 실행 전: VCi[i] ← VCi[i] + 1
2. 메시지 전송 시: VCi를 타임스탬프 ts(m)으로 첨부
3. 메시지 수신 시: 각 k에 대해 VCj[k] ← max{VCj[k], ts(m)[k]}, 그 후 VCj[j] + 1

**인과관계 판단**: ts(a) < ts(b) ⟺ 모든 k에 대해 ts(a)[k] ≤ ts(b)[k]이고, 적어도 하나의 k'에서 ts(a)[k'] < ts(b)[k']. 이 조건이 성립하면 a가 b에 인과적으로 선행할 수 있다. 어느 방향도 성립하지 않으면 두 이벤트는 잠재적으로 충돌(conflict)할 수 있다.

벡터 클럭의 기원은 인과 이력(causal history) 추적에 있다. 각 이벤트 pk (프로세스 P의 k번째 이벤트)의 인과 이력 H(pk)를 관리하되, 마지막 이벤트만 기록하면 벡터로 축약할 수 있다.

**인과적 메시지 전달**: 벡터 클럭을 사용하여, 메시지 m이 전달되기 전에 인과적으로 선행하는 모든 메시지가 먼저 전달되도록 보장할 수 있다. 조건: ts(m)[i] = VCj[i] + 1이고 모든 k ≠ i에 대해 ts(m)[k] ≤ VCj[k].

## 예시

```python
class VectorClock:
    def __init__(self, n_processes, my_id):
        self.vc = [0] * n_processes
        self.id = my_id

    def local_event(self):
        self.vc[self.id] += 1

    def send(self):
        self.vc[self.id] += 1
        return list(self.vc)  # 벡터 복사본 전송

    def receive(self, ts):
        for k in range(len(self.vc)):
            self.vc[k] = max(self.vc[k], ts[k])
        self.vc[self.id] += 1

    @staticmethod
    def happens_before(ts_a, ts_b):
        """ts_a < ts_b 인지 확인"""
        leq = all(a <= b for a, b in zip(ts_a, ts_b))
        lt = any(a < b for a, b in zip(ts_a, ts_b))
        return leq and lt

# 예: ts(m2) = (2,1,0), ts(m4) = (4,3,0)
# (2,1,0) < (4,3,0)? 모두 ≤이고 하나 이상 <  → Yes: m2가 m4에 인과적 선행
```

## 관련 개념

- [램포트 논리 시계 (Lamport Logical Clock)](/knowledge/distributed-systems/lamport-logical-clock/)
- [인과적 일관성 (Causal Consistency)](/knowledge/distributed-systems/causal-consistency/)
- [전순서 멀티캐스트 (Totally Ordered Multicast)](/knowledge/distributed-systems/totally-ordered-multicast/)
