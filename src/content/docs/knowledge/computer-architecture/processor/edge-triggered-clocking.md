---
title: "에지 트리거 클로킹 (Edge-Triggered Clocking)"
description: "에지 트리거 클로킹(Edge-Triggered Clocking)은 모든 상태 변화가 클록 에지(상승 또는 하강)에서만 발생하는 클로킹 방식이다"
tags: ['Clocking Methodology', 'Digital Logic', 'Synchronous Design']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/edge-triggered-clocking
sidebar:
  order: 8
---

## 핵심 개념

에지 트리거 클로킹 방법론은 순차 논리 요소에 저장된 값이 클록 에지에서만 업데이트되도록 보장한다. 이로 인해 같은 클록 사이클 내에서 레지스터를 읽고 쓸 수 있으며, 피드백으로 인한 경쟁 조건(race condition)이 발생하지 않는다. 조합 논리의 입력은 이전 클록 사이클에서 기록된 상태 요소의 값이며, 출력은 다음 클록 사이클에서 사용될 상태 요소에 기록된다. 클록 사이클 시간은 신호가 상태 요소 1에서 조합 논리를 거쳐 상태 요소 2에 도달하는 데 필요한 시간으로 결정된다.

클럭 에지가 샘플링 신호 역할을 하여 데이터 입력 값을 즉시 캡처하므로, 신호가 약간 다른 시간에 샘플링되어 발생하는 문제를 방지한다. 동기식 시스템에서 클럭 주기는 상태 요소의 전파 지연(t_prop), 조합 논리 지연(t_combinational), 설정 시간(t_setup)의 합보다 길어야 한다. 클럭 스큐(clock skew)는 두 상태 요소가 클럭 에지를 보는 절대 시간의 차이로, 이를 고려하면 클럭 주기에 t_skew도 추가해야 한다.

## 예시

```
[State Element 1] --> [Combinational Logic] --> [State Element 2]
                           |
                     한 클록 사이클 내에
                     모든 신호가 전파되어야 함
                           |
Clock Edge: ___/‾‾‾  (상승 에지에서 상태 업데이트)
```

```
에지 트리거 설계의 타이밍:

    클럭 주기 ≥ t_prop + t_combinational + t_setup + t_skew

          ┌─┐     ┌─┐     ┌─┐
  Clock:──┘ └─────┘ └─────┘ └──
          ↑         ↑         ↑
        에지1     에지2     에지3

  [플립플롭1] → [조합논리] → [플립플롭2]
    t_prop    t_combinational  t_setup

  에지1에서 FF1 출력 변경 → 조합논리 통과 → 에지2 전에 FF2 입력에 안정
```

## 관련 개념

- [상태 소자 (State Element)](/knowledge/computer-architecture/state-element/)
- [조합 소자 (Combinational Element)](/knowledge/computer-architecture/combinational-element/)
- [데이터패스 (Datapath)](/knowledge/computer-architecture/datapath/)
- [파이프라인 레지스터 (Pipeline Register)](/knowledge/computer-architecture/pipeline-register/)
- [플립플롭 (Flip-Flop)](/knowledge/computer-architecture/flip-flop/)
- [클록 스큐 (Clock Skew)](/knowledge/computer-architecture/clock-skew/)
- [순차 논리 (Sequential Logic)](/knowledge/computer-architecture/sequential-logic/)
