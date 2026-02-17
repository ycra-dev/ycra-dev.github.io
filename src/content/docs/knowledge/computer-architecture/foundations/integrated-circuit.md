---
title: "Integrated Circuit"
description: "집적회로(IC, Integrated Circuit)는 수십에서 수십억 개의 트랜지스터를 하나의 작은 칩에 결합한 전자 장치이다"
tags: ['Vlsi', 'Chip', 'Semiconductor', 'Fabrication', 'Die']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/integrated-circuit
sidebar:
  order: 5
---

## 핵심 개념

집적회로의 제조 공정은 실리콘 결정 잉곳(ingot)에서 시작된다. 잉곳을 얇은 웨이퍼(wafer)로 슬라이스한 후, 화학적 패터닝 과정을 통해 트랜지스터, 도체, 절연체를 생성한다. 웨이퍼를 다이(die)로 절단하고, 양품 다이를 패키지에 결합하여 최종 제품을 만든다. 제조 과정에서 미세한 결함(defect)이 발생할 수 있으며, 수율(yield)은 전체 다이 중 양품 다이의 비율이다. 다이 크기가 커지면 수율이 떨어지고 비용이 증가한다. 2020년 기준 최첨단 공정은 7나노미터(nm)이다.

## 예시

```
IC 제조 공정:
1. 실리콘 잉곳 → 웨이퍼 슬라이싱
2. 패터닝 (20~40단계의 화학적 처리)
3. 웨이퍼 테스트 → 양품 다이 식별
4. 다이싱 (웨이퍼를 개별 다이로 절단)
5. 패키징 (다이를 핀에 연결)
6. 최종 테스트 → 출하

비용 공식:
다이 당 비용 = 웨이퍼 비용 / (웨이퍼 당 다이 수 × 수율)
```

## 관련 개념

- [Transistor](/knowledge/computer-architecture/transistor/)
- [Semiconductor](/knowledge/computer-architecture/semiconductor/)
- [CMOS](/knowledge/computer-architecture/cmos/)
- [Central Processing Unit](/knowledge/computer-architecture/central-processing-unit/)
