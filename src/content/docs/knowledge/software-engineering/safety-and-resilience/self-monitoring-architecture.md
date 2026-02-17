---
title: "Self-Monitoring Architecture"
description: "시스템이 자체 운영을 모니터링하도록 설계된 아키텍처로, 별도의 채널에서 계산을 수행하고 출력을 비교하여 문제를 감지하는 방식이다"
tags: ['Self Monitoring', 'Fault Detection', 'Architecture', 'Diversity', 'Comparison', 'Fault Tolerance']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/software-engineering/self-monitoring-architecture
sidebar:
  order: 6
---

## 핵심 개념

자기 모니터링 아키텍처에서는 계산이 별도의 채널에서 수행되고 출력이 비교된다. 출력이 동일하고 동시에 제공되면 정상 작동으로 판단하고, 출력이 다르면 장애로 간주하여 상태 출력 라인에 장애 예외를 발생시킨다. 효과적인 결함 감지를 위해 각 채널은 다양한 하드웨어와 소프트웨어를 사용해야 한다. 높은 가용성이 필요한 경우 여러 자기 점검 시스템을 병렬로 사용하고, 결함을 감지하여 일관된 응답을 제공하는 시스템의 결과를 선택하는 스위칭 유닛이 필요하다. 이 방식은 의료 치료 및 진단 시스템에서 정확성이 가용성보다 중요한 경우에 적합하다.

## 예시

Airbus 340 비행 제어 시스템은 5대의 자기 점검 컴퓨터를 사용한다. 주 비행 제어 컴퓨터와 보조 비행 제어 시스템은 서로 다른 프로세서를 사용하고, 각 채널의 칩셋은 다른 제조업체가 공급하며, 각 채널의 소프트웨어는 서로 다른 프로그래밍 언어와 팀에 의해 개발된다.

## 관련 개념

- [Fault Tolerance](/knowledge/software-engineering/fault-tolerance/)
- [N-Version Programming](/knowledge/software-engineering/n-version-programming/)
- [Redundancy and Diversity](/knowledge/software-engineering/redundancy-and-diversity/)
- [Protection System](/knowledge/software-engineering/protection-system/)
- [Reliability](/knowledge/software-engineering/reliability/)
