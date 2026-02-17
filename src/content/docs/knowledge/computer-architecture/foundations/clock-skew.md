---
title: "Clock Skew"
description: "클럭 스큐(Clock Skew)는 두 상태 요소가 클럭 에지를 감지하는 절대 시간의 차이로, 클럭 신호가 서로 다른 경로를 통해 전달되면서 발생하는 지연 차이이다"
tags: ['Clocking', 'Timing', 'Synchronous System', 'Race Condition']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/clock-skew
sidebar:
  order: 10
---

## 핵심 개념

클럭 스큐가 충분히 크면 한 상태 요소의 출력 변경이 같은 클럭 에지에 다른 상태 요소의 입력에 영향을 줄 수 있어 경쟁 조건(race condition)이 발생한다. 이를 방지하려면 클럭 주기를 t_prop + t_combinational + t_setup + t_skew 이상으로 설정해야 한다. 설계자는 클럭 신호의 경로를 신중하게 배치하여 도착 시간 차이를 최소화하고, 변동 요인을 감안한 여유를 두어 클럭을 최소값보다 약간 길게 설정한다. 클럭 스큐는 유지 시간(hold time) 요구사항에도 영향을 미치므로 최소화가 중요하다. 2상 클러킹(two-phase clocking)은 겹치지 않는 두 클럭 신호를 사용하여 래치 기반 설계에서도 경쟁 조건을 방지한다. 비동기 입력 처리를 위해서는 동기화기(synchronizer)를 사용하며, 이는 준안정 상태(metastability) 문제를 고려해야 한다.

## 예시

```
클럭 스큐로 인한 경쟁 조건:

정상 동작 (스큐 없음):
  클럭 에지 → FF1 출력 변경 → 조합논리 → FF2 입력 안정 → 다음 클럭 에지

경쟁 조건 (큰 스큐):
  클럭이 FF1에 먼저 도착 → FF1 출력 변경 → 조합논리 통과 →
  FF2가 아직 이전 클럭 에지를 보지 못했으므로 새 값을 잘못 저장

클럭 주기 제약:
  T_clock ≥ t_prop + t_combinational + t_setup + t_skew

동기화기 (2개 D 플립플롭):
  [비동기입력] → [D FF₁] → [D FF₂] → [동기출력]
  한 클럭 주기 동안 준안정 상태가 해소될 시간을 확보
```

## 관련 개념

- [Edge-Triggered Clocking](/knowledge/computer-architecture/edge-triggered-clocking/)
- [Flip-Flop](/knowledge/computer-architecture/flip-flop/)
- [Synchronous System](/knowledge/computer-architecture/synchronous-system/)
- [Metastability](/knowledge/computer-architecture/metastability/)
