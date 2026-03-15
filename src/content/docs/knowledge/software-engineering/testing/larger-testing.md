---
title: "대형 테스팅 (Larger Testing)"
description: "단위 테스트의 제약을 벗어나 여러 프로세스, 머신, 서비스에 걸쳐 실행될 수 있는 테스트로, 시스템 전체의 동작을 높은 충실도로 검증한다"
tags: ["Software Engineering", "Testing"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/testing/larger-testing
sidebar:
  order: 69
---

## 핵심 개념

대형 테스트(Larger Tests)는 단위 테스트가 할 수 없는 것들을 수행한다. 단위 테스트는 개별 함수나 객체에 대한 신뢰를 주지만, 전체 시스템이 의도대로 작동하는지에 대한 신뢰는 대형 테스트가 제공한다. 실제 자동화된 테스트는 수동 테스트가 확장할 수 없는 방식으로 확장된다.

## 동작 원리

**특징**:
- 느릴 수 있다 (기본 타임아웃 15분~1시간, 일부는 수일 소요)
- 비격리(non-hermetic)일 수 있다 (다른 테스트와 리소스를 공유)
- 비결정적(nondeterministic)일 수 있다

**단위 테스트의 한계 (대형 테스트가 해결)**:
1. **충실도 부족**: 테스트 더블이 실제 구현과 다르게 동작할 수 있다
2. **부정확한 계약**: 서비스 간의 실제 통신을 테스트하지 못한다
3. **예상치 못한 동작**: 전체 시스템에서만 나타나는 문제를 발견한다
4. **비기능적 요구사항**: 성능, 보안 등 시스템 레벨의 속성을 검증한다
5. **미래 호환성**: 의존하는 외부 API 변경 시 조기 감지

**대형 테스트의 어려움**:
- 소유권이 불명확하다 (여러 팀의 코드가 관여)
- 비결정적이라 결과를 신뢰하기 어렵다
- 인프라 요구사항이 크다
- 실패 원인을 찾기 어렵다

## 예시

단위 테스트가 통과하지만 실제로는 문제가 있는 경우:
- 인메모리 DB Fake를 사용한 테스트는 통과하지만, 실제 DB의 트랜잭션 격리 수준 차이로 프로덕션에서 데이터 불일치가 발생
- 모킹된 외부 API로 테스트는 통과하지만, 실제 API의 응답 형식이 변경되어 통합 시 실패

## 관련 개념

- [테스트 크기 (Test Size)](/knowledge/software-engineering/testing/test-size/)
- [테스트 충실도 (Test Fidelity)](/knowledge/software-engineering/testing/test-fidelity/)
- [밀폐 테스팅 (Hermetic Testing)](/knowledge/software-engineering/testing/hermetic-testing/)
- [대형 테스트의 유형 (Types of Larger Tests)](/knowledge/software-engineering/testing/types-of-larger-tests/)
- [대형 테스트의 과제 (Larger Test Challenges)](/knowledge/software-engineering/testing/larger-test-challenges/)
