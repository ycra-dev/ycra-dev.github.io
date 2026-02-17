---
title: "N-Version Programming"
description: "동일한 명세를 기반으로 N개의 다양한 소프트웨어 버전을 별도의 팀이 개발하여 병렬로 실행하고, 투표 시스템을 통해 일관되지 않은 출력을 거부하는 결함 허용 기법이다"
tags: ['N Version Programming', 'Fault Tolerance', 'Software Diversity', 'Voting System', 'Redundancy']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/software-engineering/n-version-programming
sidebar:
  order: 8
---

## 핵심 개념

N-버전 프로그래밍은 하드웨어의 삼중 모듈 이중화(TMR) 개념을 소프트웨어에 적용한 것이다. 공통 명세로부터 여러 팀이 독립적으로 동일한 시스템을 구현하며, 이 버전들은 별도의 컴퓨터에서 실행된다. 출력은 투표 시스템을 통해 비교되며, 일관되지 않거나 적시에 생산되지 않은 출력은 거부된다. 단일 장애 시 두 버전이 일관된 결과를 제공할 수 있도록 최소 세 개의 버전이 필요하다. 이 접근법은 철도 신호 시스템, 항공기 시스템, 원자로 보호 시스템에 사용되었다. 그러나 독립적인 팀이 같은 실수를 하거나 명세의 같은 부분을 잘못 이해할 수 있어 완전한 채널 독립성은 불가능하며, Hatton의 분석에 따르면 3채널 시스템은 단일 채널 시스템보다 약 5~9배 더 신뢰할 수 있다.

## 예시

3개의 서로 다른 팀이 각각 Ada, C++, Java를 사용하여 동일한 항공기 비행 제어 소프트웨어를 구현한다. 3개 버전이 병렬로 실행되고, 투표 시스템이 출력을 비교하여 2개 이상이 동일한 결과를 출력하면 그 값을 채택한다.

## 관련 개념

- [Fault Tolerance](/knowledge/software-engineering/fault-tolerance/)
- [Redundancy and Diversity](/knowledge/software-engineering/redundancy-and-diversity/)
- [Self-Monitoring Architecture](/knowledge/software-engineering/self-monitoring-architecture/)
- [Reliability](/knowledge/software-engineering/reliability/)
