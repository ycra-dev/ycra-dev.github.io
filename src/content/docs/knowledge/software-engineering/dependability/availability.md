---
title: "Availability"
description: "시스템이 특정 시점에 정상적으로 가동되어 사용자에게 유용한 서비스를 제공할 수 있는 확률이다"
tags: ['Availability', 'Dependability', 'Uptime', 'Service Continuity', 'System Property']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/software-engineering/availability
sidebar:
  order: 3
---

## 핵심 개념

가용성은 시스템이 필요한 시점에 작동하여 서비스를 제공할 수 있는 능력을 확률로 나타낸 의존성 속성이다. 가용성 0.999는 시스템이 전체 시간의 99.9% 동안 사용 가능함을 의미한다. 가용성은 시스템 장애 빈도뿐만 아니라 장애 후 복구에 걸리는 시간에도 의존한다. 높은 가용성이 요구되는 시스템에서는 이중화 서버를 배치하여 주 서버 장애 시 자동으로 대체 서버가 가동되도록 설계한다. 가용성과 신뢰성은 밀접하게 관련되어 있지만 서로 다른 개념이며, 일부 시스템에서는 하나가 다른 것보다 더 중요할 수 있다.

## 예시

ATM 네트워크에서 데이터베이스 서비스의 가용성은 약 0.9999로, 이는 주당 1분 미만의 다운타임을 의미한다. 개별 ATM 소프트웨어의 가용성은 0.999로 지정할 수 있으며, 이는 하루에 1~2분의 미가용 시간을 허용한다.

## 관련 개념

- [Dependability](/knowledge/software-engineering/dependability/)
- [Reliability](/knowledge/software-engineering/reliability/)
- [Resilience](/knowledge/software-engineering/resilience/)
- [Fault Tolerance](/knowledge/software-engineering/fault-tolerance/)
- [Reliability Metrics](/knowledge/software-engineering/reliability-metrics/)
