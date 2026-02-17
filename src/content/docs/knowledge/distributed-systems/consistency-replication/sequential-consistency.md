---
title: "Sequential Consistency"
description: "순차 일관성(Sequential Consistency)은 모든 프로세스의 읽기/쓰기 연산 결과가 어떤 순차적 순서(sequential order)로 실행된 것과 동일하며, 각 프로세스 내의 연산 순서가 프로그램 순서와 일치하는 데이터 일관성 모델이다(Lamport..."
tags: ['Sequential Consistency', 'Consistency Model', 'Linearizability', 'Data Centric']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/distributed-systems/sequential-consistency
sidebar:
  order: 1
---

## 핵심 개념

순차 일관성의 핵심: 모든 프로세스가 동일한 연산 인터리빙을 관찰해야 한다. 그러나 "가장 최근" 쓰기에 대한 참조는 없음 (시간 개념 부재).

**예시 분석**: P1이 W1(x)a를 수행하고 P2가 W2(x)b를 수행했을 때, P3과 P4가 모두 b를 먼저, a를 나중에 읽으면 유효(W2가 W1보다 먼저 발생한 것으로 보임). 그러나 P3이 (b,a) 순서로, P4가 (a,b) 순서로 읽으면 위반.

**비합성성(Non-compositionality)**: x와 y 각각이 순차 일관적이라도, 함께 순차 일관적이지 않을 수 있다. 두 프로세스가 두 변수에 동시 쓰기 후 읽기하면, 개별 변수는 일관적이지만 조합은 불일치.

**선형화 가능성(Linearizability)**: 순차 일관성의 비합성성을 해결. 각 연산이 시작과 완료 사이의 어떤 순간에 즉각 효력을 발휘해야 한다. 순차 일관성보다 강한 모델이지만 다중 코어 아키텍처에서 성능 문제 발생 가능.

**실용적 의미**: 순차 일관성은 병렬/분산 프로그래밍에서 가장 이해하기 쉬운 모델이지만 구현이 어렵고 성능 비용이 높다. 따라서 더 약한 일관성 모델이 실무에서 자주 사용된다.

## 예시

```
# 순차 일관성 예시
# W_i(x)a: 프로세스 i가 x에 값 a를 쓰기
# R_i(x)b: 프로세스 i가 x를 읽어 값 b를 얻음

# (a) 순차 일관적:
P1: W1(x)a
P2:          W2(x)b
P3:          R3(x)b   R3(x)a    # b 먼저, a 나중
P4:          R4(x)b   R4(x)a    # 동일 순서로 관찰 → 유효

# (b) 순차 일관성 위반:
P3:          R3(x)b   R3(x)a
P4:          R4(x)a   R4(x)b    # P3과 P4가 다른 순서 → 위반!

# 세 프로세스 동시 실행 (x,y,z 초기값 0):
# P1: x←1; print(y,z)
# P2: y←1; print(x,z)
# P3: z←1; print(x,y)
# 가능한 90가지 유효 실행 순서 중 하나의 서명(signature)만 유효
```

## 관련 개념

- [Causal Consistency](/knowledge/distributed-systems/causal-consistency/)
- [Eventual Consistency](/knowledge/distributed-systems/eventual-consistency/)
- [Totally Ordered Multicast](/knowledge/distributed-systems/totally-ordered-multicast/)
- [Lamport Logical Clock](/knowledge/distributed-systems/lamport-logical-clock/)
