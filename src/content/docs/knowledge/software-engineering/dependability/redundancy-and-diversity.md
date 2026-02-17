---
title: "Redundancy and Diversity"
description: "이중화(redundancy)는 시스템 일부가 실패할 때 사용할 수 있는 여분의 용량을 포함하는 것이고, 다양성(diversity)은 이중화된 구성요소가 서로 다른 유형으로 구성되어 동일한 방식으로 실패하지 않도록 하는 것이다"
tags: ['Redundancy', 'Diversity', 'Fault Tolerance', 'Dependability', 'Backup', 'Replication']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/software-engineering/redundancy-and-diversity
sidebar:
  order: 6
---

## 핵심 개념

이중화와 다양성은 의존 가능한 시스템을 구축하기 위한 근본적인 메커니즘이다. 이중화는 주 구성요소가 실패할 때 대체할 수 있는 여분의 구성요소를 시스템에 포함하는 것이며, 다양성은 이러한 여분의 구성요소가 주 구성요소와 다른 유형이어서 같은 원인으로 동시에 실패하지 않도록 하는 것이다. 소프트웨어 시스템에서는 동일한 기능을 제공하는 다양한 구성요소를 포함하거나, 데이터 손상을 감지하는 검사 코드를 추가하는 형태로 구현된다. 그러나 이중화와 다양성은 시스템을 더 복잡하게 만들어 이해하기 어렵게 하고, 추가 코드로 인한 새로운 오류 발생 가능성을 높일 수 있다. Airbus 340은 비행 제어 시스템에 이중화와 다양성을 모두 적용한 반면, Boeing 777은 이중화 하드웨어에 단일 소프트웨어를 사용하고 광범위한 검증에 집중하는 단순성 접근법을 채택했다.

## 예시

일상생활에서 집 보안을 위해 두 개 이상의 자물쇠를 사용하는 것은 이중화이고, 각 자물쇠가 서로 다른 유형인 것은 다양성이다. 소프트웨어에서는 서로 다른 운영체제를 실행하는 이중화 서버를 두어, 하나의 운영체제 취약점이 전체 시스템에 영향을 미치지 않도록 할 수 있다.

## 관련 개념

- [Dependability](/knowledge/software-engineering/dependability/)
- [Fault Tolerance](/knowledge/software-engineering/fault-tolerance/)
- [N-Version Programming](/knowledge/software-engineering/n-version-programming/)
- [Self-Monitoring Architecture](/knowledge/software-engineering/self-monitoring-architecture/)
- [Defense in Depth](/knowledge/software-engineering/defense-in-depth/)
- [Resilient Systems Design](/knowledge/software-engineering/resilient-systems-design/)
