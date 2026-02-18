---
title: "Resilience"
description: "장비 고장이나 사이버 공격 등의 파괴적 이벤트 존재 하에서 시스템이 핵심 서비스의 연속성을 얼마나 잘 유지할 수 있는지에 대한 판단이다"
tags: ['Resilience', 'Service Continuity', 'Recovery', 'Adaptability', 'Dependability', 'Disruption']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/software-engineering/resilience
sidebar:
  order: 7
---

## 핵심 개념

회복탄력성은 세 가지 핵심 아이디어를 내포한다: (1) 심각한 인적, 사회적, 경제적 영향을 미칠 수 있는 핵심 서비스가 존재한다는 것, (2) 핵심 서비스 제공 능력에 영향을 미칠 수 있는 파괴적 이벤트가 존재한다는 것, (3) 회복탄력성은 판단이며 메트릭으로 측정할 수 없다는 것이다. 회복탄력성 공학은 장애 발생이 불가피하다는 현실을 수용하고, 장애 비용을 제한하고 장애로부터 복구하는 데 초점을 맞춘다. 회복탄력성의 네 가지 활동은 인식(Recognition), 저항(Resistance), 복구(Recovery), 복원(Reinstatement)이며, 이를 4Rs 모델이라 한다. 회복탄력성 공학은 기술적 문제가 아닌 사회기술적 문제이며, 시스템 운영자와 관리자의 역할이 중요하다. 소프트웨어에 모든 문제를 예측하고 대처하는 것이 불가능하므로, 유연성과 적응성이 핵심이다.

## 예시

1970년 아폴로 13호 사고: 우주에서 산소 탱크가 폭발하여 생명을 위협하는 상황이 발생했지만, 장비를 의도하지 않은 방식으로 사용하고 표준 절차를 적응시켜 우주선을 안전하게 지구로 귀환시켰다. 이는 사람, 장비, 프로세스로 구성된 전체 시스템이 회복탄력적이었음을 보여준다.

## 관련 개념

- [Dependability](/knowledge/software-engineering/dependability/)
- [Cybersecurity](/knowledge/software-engineering/cybersecurity/)
- [Sociotechnical Resilience](/knowledge/software-engineering/sociotechnical-resilience/)
- [Resilient Systems Design](/knowledge/software-engineering/resilient-systems-design/)
- [Redundancy and Diversity](/knowledge/software-engineering/redundancy-and-diversity/)
- [Availability](/knowledge/software-engineering/availability/)
