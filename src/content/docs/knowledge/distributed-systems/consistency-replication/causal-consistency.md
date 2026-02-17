---
title: "Causal Consistency"
description: "인과 일관성(Causal Consistency)은 잠재적으로 인과 관계가 있는 쓰기 연산이 모든 프로세스에서 동일한 순서로 관찰되어야 하지만, 동시적(concurrent) 쓰기 연산은 서로 다른 순서로 관찰되어도 되는 일관성 모델이다"
tags: ['Causal Consistency', 'Consistency Model', 'Causality', 'Happens Before']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/distributed-systems/causal-consistency
sidebar:
  order: 2
---

## 핵심 개념

인과 일관성은 순차 일관성의 약화(weakening)이다. 핵심 구분: 인과적으로 관련된 이벤트 vs 독립적(동시적) 이벤트.

**인과 관계 판단**: P1이 x에 쓰고 P2가 x를 읽은 후 y에 쓰면, x 쓰기와 y 쓰기는 잠재적 인과 관계. 두 프로세스가 독립적으로 서로 다른 데이터를 쓰면 동시적(concurrent).

**규칙**: 인과적으로 관련된 쓰기는 모든 프로세스에서 동일 순서로 관찰. 동시적 쓰기는 프로세스마다 다른 순서로 관찰 가능.

**구현의 미묘함**: P1이 W(x)a 수행, P2가 R(x)a 후 W(y)b 수행 시, W(x)a → R(x)a → W(y)b 인과 체인이 형성. P3이 y에서 b를 읽으면, x에서 반드시 a를 읽어야 함 (인과 관계 보존). 그러나 P4가 x에서 a를 읽었다고 해서 y에서 b를 읽어야 하는 것은 아님 (y의 초기화와 W(x)a는 독립적).

**의존성 그래프**: 인과 일관성 구현을 위해 어떤 연산이 어떤 다른 연산에 의존하는지 추적하는 의존성 그래프가 필요. 미들웨어가 값 전파 시 메타데이터도 함께 전파해야 한다.

**네트워크 분할에서의 최적 모델**: 인과 일관성은 네트워크 분할 상황에서 달성 가능한 가장 강한 일관성 모델로 공식적으로 증명됨(Mahajan et al., 2011).

## 예시

```
# 인과 일관성 유효 예시:
P1: W1(x)a
P2:          W2(x)b
P3: R3(x)b  R3(x)a    # W1(x)a와 W2(x)b는 동시적 → 다른 순서 가능
P4: R4(x)a  R4(x)b    # P3과 P4가 다른 순서로 관찰 → 유효!

# 인과 일관성 위반 예시:
P1: W1(x)a
P2: R2(x)a  W2(x)b    # R2(x)a → W2(x)b: 인과 관계 존재
P3: R3(x)b  R3(x)a    # b 후 a 관찰 → 유효
P4: R4(x)a  R4(x)b    # a 후 b 관찰 → 위반! (인과 관련 쓰기 순서 불일치)

# 벡터 클럭으로 인과 일관성 구현:
# 메시지 전달 조건:
# 1. ts(m)[i] = VCj[i] + 1  (m은 Pi의 다음 메시지)
# 2. ts(m)[k] ≤ VCj[k], k ≠ i  (Pj가 Pi가 본 것을 모두 봤음)
```

## 관련 개념

- [Sequential Consistency](/knowledge/distributed-systems/sequential-consistency/)
- [Vector Clock](/knowledge/distributed-systems/vector-clock/)
- [Eventual Consistency](/knowledge/distributed-systems/eventual-consistency/)
- [CRDT](/knowledge/distributed-systems/crdt/)
