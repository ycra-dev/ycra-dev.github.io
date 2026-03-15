---
title: "환원주의 (Reductionism)"
description: "환원주의는 시스템이 부분으로 구성되어 있으며, 개별 부분과 부분 간의 관계를 이해하면 전체 시스템의 행동과 속성을 이해하고 예측할 수 있다는 철학적 입장이다"
tags: ['Reductionism', 'Philosophy', 'Complexity', 'Decomposition', 'Systems Thinking', 'Limitations']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/software-engineering/reductionism
sidebar:
  order: 3
---

## 핵심 개념

환원주의는 거의 50년간 소프트웨어 엔지니어링의 근본적 기반이었으며, 하향식 설계, 객체 지향 설계, 심지어 애자일 방법론도 환원주의에 기반한다. 그러나 환원주의의 세 가지 핵심 가정(시스템 소유권/제어의 단일 권한, 합리적 의사결정, 정의된 시스템 경계)이 복잡한 SoS에서는 적용되지 않는다. 소프트웨어 시스템의 관계는 물리 법칙에 지배되지 않으므로 수학적 모델로 동작을 예측할 수 없고, 물리적 제한이 없어 시스템 경계 설정이 주관적이며, 서로 다른 소유자의 시스템 연결이 상대적으로 쉬워 단일 거버넌스가 없는 SoS가 생성되기 쉽다. 대규모 정부 프로젝트의 실패는 기술적/관리적 실패가 아닌 복잡성 자체의 결과라고 볼 수 있다. 새로운 추상화, 방법론, 도구가 필요하며, 이는 확률적/통계적이고 시뮬레이션에 의존할 것으로 예측된다.

## 예시

영국과 미국의 정부 의료 자동화 프로젝트 실패 사례는 환원주의적 접근이 대규모 복잡 시스템에 적용될 때의 한계를 보여준다. 시스템 소유권이 분산되고, 의사결정이 정치적이며, 시스템 경계가 불명확한 상황에서 기존 소프트웨어 엔지니어링 방법론으로는 문제를 해결할 수 없었다.

## 관련 개념

- [시스템 오브 시스템즈 (Systems of Systems)](/knowledge/software-engineering/systems-of-systems/)
- [시스템 공학 (Systems Engineering)](/knowledge/software-engineering/systems-engineering/)
- [창발적 속성 (Emergent Properties)](/knowledge/software-engineering/emergent-properties/)
- [SoS 아키텍처 (SoS Architecture)](/knowledge/software-engineering/sos-architecture/)
