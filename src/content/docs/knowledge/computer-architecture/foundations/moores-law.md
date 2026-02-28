---
title: "무어의 법칙 (Moore's Law)"
description: "집적회로의 트랜지스터 수가 약 18~24개월마다 2배로 증가한다는 경험적 관찰"
tags: ["Computer-Architecture", "Moore", "Semiconductor", "Exponential-Growth"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/computer-architecture/moores-law
sidebar:
  order: 29
---

## 핵심 개념

무어의 법칙은 집적회로(IC)의 트랜지스터 수가 약 18~24개월마다 2배로 증가한다는 경험적 관찰이다. 자연법칙이 아닌 반도체 업계의 가이드라인으로, 50년 이상 유지되어 왔으나 물리적 한계에 근접하고 있다.

## 동작 원리

1965년 인텔 공동 창업자 **고든 무어(Gordon Moore)**가 관찰한 이 추세는 반도체 산업의 로드맵 역할을 해왔다.

- **지수적 성장**: 트랜지스터 밀도가 매 2년마다 약 2배로 증가한다. 10년이면 약 1,000배, 20년이면 약 1,000,000배가 된다.
- **자연법칙이 아니다**: 물리학 법칙이 아닌 경제적·기술적 예측이다. 업계가 이 속도를 유지하기 위해 막대한 R&D 투자를 지속해왔기에 유지된 것이다.
- **적용 범위**: 트랜지스터 수뿐 아니라 메모리 용량, 저장장치 크기, 네트워크 대역폭 등 디지털 기술 전반에 유사한 지수적 성장이 관찰된다.
- **물리적 한계**: 트랜지스터 크기가 원자 수준(수 나노미터)에 근접하면서 양자역학적 효과(터널링 등)가 문제가 되고 있다. 단순한 축소만으로는 성능 향상이 어려워지고, 다중 코어, 특수 목적 프로세서(GPU, TPU) 등 대안적 방법이 부상하고 있다.

## 예시

트랜지스터 수의 역사적 변화:

```
1971년  Intel 4004      :     2,300개 트랜지스터
1985년  Intel 386       :   275,000개
1999년  Pentium III     : 9,500,000개
2012년  Intel Core i7   : 1,400,000,000개 (14억)
2020년  Apple M1        : 16,000,000,000개 (160억)
```

지수적 성장의 체감 비유: 만약 자동차 산업에 무어의 법칙이 적용되었다면, 오늘날 자동차는 시속 수십만 km로 달리고, 연비는 리터당 수백만 km이며, 가격은 수 원에 불과했을 것이다.

## 관련 개념

- [집적회로 (Integrated Circuit)](/knowledge/computer-architecture/integrated-circuit-basics/) - 무어의 법칙이 적용되는 대상
- [트랜지스터 (Transistor)](/knowledge/computer-architecture/transistor-basics/) - 무어의 법칙으로 개수가 증가하는 기본 소자
- [CPU](/knowledge/computer-architecture/cpu-basics/) - 무어의 법칙의 혜택을 직접 받는 핵심 부품
- [GPU](/knowledge/computer-architecture/gpu-basics/) - 무어의 법칙 둔화에 대한 대안적 컴퓨팅 방식

## 출처

- Understanding the Digital World, Chapter 1
