---
title: "Dependability"
description: "시스템의 가용성(availability), 신뢰성(reliability), 안전성(safety), 보안성(security), 회복탄력성(resilience)을 포괄하는 시스템 속성으로, 사용자가 시스템을 신뢰할 수 있는 정도를 나타낸다"
tags: ['Dependability', 'System Property', 'Reliability', 'Availability', 'Safety', 'Security', 'Resilience']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/software-engineering/dependability
sidebar:
  order: 1
---

## 핵심 개념

의존성(Dependability)은 Jean-Claude Laprie가 1995년에 제안한 개념으로, 시스템에 대한 사용자의 신뢰 정도를 반영하는 복합 속성이다. 이 속성은 가용성, 신뢰성, 안전성, 보안성, 회복탄력성이라는 다섯 가지 핵심 차원으로 구성된다. 의존성이 높은 시스템을 구축하려면 오류 방지, 검증 및 검증, 결함 허용, 보호 메커니즘, 사이버 공격 대응 등의 기법을 종합적으로 적용해야 한다. 의존성 향상은 비용과 트레이드오프 관계에 있으며, 시스템이 이미 높은 의존성을 갖고 있을수록 추가 개선에 드는 비용은 기하급수적으로 증가한다. 핵심 시스템(critical systems)의 경우 시스템 실패가 경제적 손실, 정보 유실, 인명 피해를 초래할 수 있으므로 의존성 확보가 특히 중요하다.

## 예시

인슐린 펌프 시스템에서는 신뢰성(정확한 인슐린 투여)과 안전성(위험한 용량 투여 방지)이 가장 중요한 의존성 속성이다. 반면 Mentcare 환자 정보 시스템에서는 민감한 개인 정보 보호를 위해 보안성과 회복탄력성이 특히 중요하다.

## 관련 개념

- [Availability](/knowledge/software-engineering/availability/)
- [Reliability](/knowledge/software-engineering/reliability/)
- [Sociotechnical Systems](/knowledge/software-engineering/sociotechnical-systems/)
- [Redundancy and Diversity](/knowledge/software-engineering/redundancy-and-diversity/)
- [Formal Methods](/knowledge/software-engineering/formal-methods/)
- [Dependable Processes](/knowledge/software-engineering/dependable-processes/)
- [Resilience](/knowledge/software-engineering/resilience/)
