---
title: "유령 묘지 (Haunted Graveyards)"
description: "너무 오래되고 복잡하여 아무도 감히 변경하지 못하는 시스템이나 코드로, 비즈니스에 중요하면서도 변경 시 예측 불가능한 방식으로 실패할 위험이 있는 동결된 시스템"
tags: ["Software Engineering", "Technical Debt", "Legacy Systems"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/design-and-evolution/haunted-graveyards
sidebar:
  order: 303
---

## 핵심 개념

유령의 묘지(Haunted Graveyards)는 너무 오래되고 복잡하여 아무도 감히 변경하지 못하는 시스템이나 코드를 의미한다. 비즈니스에 중요한 기능의 핵심 경로에 있으면서도 변경 시 예측 불가능한 방식으로 실패할 위험이 있는 동결된 시스템이다.

## 동작 원리

유령의 묘지는 프로덕션 시스템뿐 아니라 코드베이스에도 존재한다. 오래전에 떠난 팀원이 작성한 유지보수되지 않는 소프트웨어로, 중요한 수익 창출 기능의 핵심 경로에 있으면서 불안정을 방지하기 위한 관료주의 층이 쌓여 있다.

LSC 관점에서 유령의 묘지는 다음을 방해한다:
- 대규모 마이그레이션 완료
- 의존하는 시스템의 폐기
- 컴파일러/라이브러리 업그레이드

Google의 해결책은 **철저한 테스트**이다. 소프트웨어가 충분히 테스트되면 시스템의 나이나 복잡성에 관계없이 임의의 변경을 가하고 그 변경이 파괴적인지 확신할 수 있다.

해결 패턴: 좋은 테스트 → 변경에 대한 자신감 → LSC 가능 → 코드베이스 진화 → 기술 부채 해소

## 예시

Google SRE 팀의 격언: "No Haunted Graveyards." 프로덕션 서비스에서 유령의 묘지는 실제 존재적 위험(existential risk)이며 불균형적으로 많은 리소스를 소비한다. 코드베이스에서도 마찬가지로, 동결된 레거시 코드가 전체 인프라의 현대화를 가로막을 수 있다.

테스트 작성에는 많은 노력이 필요하지만, 코드베이스가 장기간에 걸쳐 진화할 수 있게 해주므로 투자 가치가 있다.

## 관련 개념

- [대규모 코드 변경 (Large-Scale Changes)](/knowledge/software-engineering/design-and-evolution/large-scale-changes/)
- [LSC 인프라 (LSC Infrastructure)](/knowledge/software-engineering/design-and-evolution/lsc-infrastructure/)
