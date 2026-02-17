---
title: "Emergent Properties"
description: "창발적 속성은 시스템의 개별 부분이 아닌 시스템 전체의 특성으로, 컴포넌트가 통합된 후에야 나타나는 속성이다"
tags: ['Emergent Properties', 'System Properties', 'Reliability', 'Safety', 'Security', 'Failure Propagation']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/software-engineering/emergent-properties
sidebar:
  order: 2
---

## 핵심 개념

창발적 속성에는 기능적 창발적 속성(시스템의 목적이 컴포넌트 통합 후 나타남)과 비기능적 창발적 속성(신뢰성, 성능, 안전성, 보안 등 운영 환경에서의 시스템 동작)이 있다. 신뢰성, 수리 가능성, 보안, 사용성, 부피 등이 대표적인 창발적 속성이다. 시스템 신뢰성은 하드웨어 신뢰성, 소프트웨어 신뢰성, 운영자 신뢰성의 세 가지 요소에 의존하며, 이들은 서로 독립적이지 않고 예측 불가능한 방식으로 영향을 미친다. 장애 전파(failure propagation)에서 하드웨어 장애가 소프트웨어의 예측 불가능한 동작을 유발하고, 이것이 운영자에게 스트레스를 주어 추가 오류를 유발하는 연쇄 효과가 발생할 수 있다. 안전성과 보안처럼 직접 측정이 불가능한 속성은 시스템이 운영된 후에야 평가할 수 있다.

## 예시

시스템 근처에 설치된 에어컨이 고장나서 뜨거운 가스를 전자 장치에 배출하면, 정상 작동 온도(0~40도) 범위를 벗어나 시스템 컴포넌트가 예측 불가능하게 동작하여 전체 시스템이 장애를 일으킬 수 있다. 이는 에어컨과 시스템 간의 예상하지 못한 관계에서 비롯된 창발적 장애이다.

## 관련 개념

- [Sociotechnical Systems](/knowledge/software-engineering/sociotechnical-systems/)
- [Systems Engineering](/knowledge/software-engineering/systems-engineering/)
- [Systems of Systems](/knowledge/software-engineering/systems-of-systems/)
- [Reductionism](/knowledge/software-engineering/reductionism/)
