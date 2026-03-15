---
title: "CMOS (상보형 금속 산화물 반도체)"
description: "CMOS(Complementary Metal Oxide Semiconductor, 상보형 금속 산화물 반도체)는 현재 집적회로에서 지배적인 트랜지스터 기술로, 상보적인 n형과 p형 트랜지스터 쌍을 사용한다"
tags: ['Semiconductor', 'Transistor', 'Fabrication', 'Power', 'Integrated Circuit']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/cmos
sidebar:
  order: 6
---

## 핵심 개념

CMOS는 현대 프로세서와 메모리 칩 제조의 표준 기술이다. n형(NMOS)과 p형(PMOS) 트랜지스터를 상보적으로 결합하여 논리 게이트를 구성한다. CMOS의 주요 장점은 정적 상태에서 거의 전력을 소비하지 않는다는 것이다. 에너지 소비의 주요 원인은 트랜지스터가 상태를 전환할 때 발생하는 동적 에너지이다. 그러나 공정이 미세화됨에 따라 누설 전류(leakage current)로 인한 정적 전력 소비가 증가하고 있으며, 이는 전력 장벽(power wall) 문제의 주요 원인이 되었다. 전압을 더 낮추면 트랜지스터가 완전히 꺼지지 않는 현상이 발생한다.

## 예시

```
CMOS 인버터 (NOT 게이트):
           VDD
            |
          [PMOS]  ← 입력이 0이면 ON
            |
출력 ←------+
            |
          [NMOS]  ← 입력이 1이면 ON
            |
           GND

- 입력 = 0: PMOS ON, NMOS OFF → 출력 = 1
- 입력 = 1: PMOS OFF, NMOS ON → 출력 = 0
- 안정 상태에서 VDD에서 GND로 직접 전류 경로 없음
  → 정적 전력 소비 최소화
```

## 관련 개념

- [트랜지스터 (Transistor)](/knowledge/computer-architecture/transistor/)
- [동적 전력 소비 (Dynamic Power Consumption)](/knowledge/computer-architecture/dynamic-power-consumption/)
- [집적회로 (Integrated Circuit)](/knowledge/computer-architecture/integrated-circuit/)
- [반도체 (Semiconductor)](/knowledge/computer-architecture/semiconductor/)
