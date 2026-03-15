---
title: "동적 전력 소비 (Dynamic Power Consumption)"
description: "동적 전력 소비(Dynamic Power Consumption)는 CMOS 트랜지스터가 0에서 1, 1에서 0으로 상태를 전환할 때 소비되는 에너지로, CMOS 집적회로의 주요 에너지 소비 원인이다"
tags: ['Power', 'Energy', 'Cmos', 'Voltage', 'Frequency', 'Power Wall']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/dynamic-power-consumption
sidebar:
  order: 11
---

## 핵심 개념

동적 에너지는 각 트랜지스터의 용량성 부하(capacitive load)와 인가 전압의 제곱에 비례한다: Energy ~ Capacitive load x Voltage^2. 트랜지스터당 전력은 이 에너지에 스위칭 주파수를 곱한 것이다: Power ~ 1/2 x Capacitive load x Voltage^2 x Frequency. 이로 인해 클럭 속도와 전력이 상관관계를 가진다. 20년간 전압이 5V에서 1V로 낮아져 클럭이 1000배 증가하는 동안 전력은 30배만 증가했다. 그러나 전압을 더 낮추면 트랜지스터 누설 전류(leakage)가 증가하는 문제가 생겼고, 이것이 "전력 장벽(power wall)"이다. 서버 칩에서 누설로 인한 정적 전력 소비가 전체의 약 40%를 차지한다.

## 예시

```
전력 공식:
Power ∝ 1/2 × C × V² × f

여기서:
C = 용량성 부하
V = 전압
f = 스위칭 주파수 (클럭 속도에 비례)

예시: 새 프로세서의 전력 절감
- 용량성 부하: 85% (기존 대비)
- 전압: 85% (기존 대비)
- 주파수: 85% (기존 대비)

전력비 = 0.85 × 0.85² × 0.85 = 0.85⁴ ≈ 0.52
→ 약 48% 전력 절감
```

## 관련 개념

- [CMOS (상보형 금속 산화물 반도체)](/knowledge/computer-architecture/cmos/)
- [트랜지스터 (Transistor)](/knowledge/computer-architecture/transistor/)
- [클록 주기 (Clock Cycle)](/knowledge/computer-architecture/clock-cycle/)
- [멀티코어 프로세서 (Multicore Processor)](/knowledge/computer-architecture/multicore-processor/)
