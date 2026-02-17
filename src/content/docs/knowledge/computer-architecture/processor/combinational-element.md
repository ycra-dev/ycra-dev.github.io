---
title: "Combinational Element"
description: "조합 논리 요소(Combinational Element)는 출력이 현재 입력에만 의존하는 논리 회로로, 내부 저장 공간이 없다"
tags: ['Digital Logic', 'Alu', 'Hardware Design']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/combinational-element
sidebar:
  order: 5
---

## 핵심 개념

조합 논리 요소는 동일한 입력이 주어지면 항상 동일한 출력을 생성한다. ALU가 대표적인 예로, 두 입력값과 제어 신호가 같으면 항상 같은 결과를 출력한다. 조합 요소는 상태 요소(state element)와 대비되는데, 상태 요소는 내부 저장 공간을 가지고 있어 이전 입력의 영향을 받는다. 프로세서 데이터패스에서 조합 논리는 상태 요소 사이에 위치하며, 한 클록 사이클 내에 모든 신호가 전파되어야 한다.

## 예시

조합 논리 요소의 예:
```
- ALU: 입력 A, B, 제어 신호 -> 결과 출력
- AND 게이트
- 멀티플렉서(Multiplexor)
- 부호 확장 유닛(Sign Extension Unit)
```

## 관련 개념

- [State Element](/knowledge/computer-architecture/state-element/)
- [Edge-Triggered Clocking](/knowledge/computer-architecture/edge-triggered-clocking/)
- [ALU Control](/knowledge/computer-architecture/alu-control/)
