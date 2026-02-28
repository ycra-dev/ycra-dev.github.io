---
title: "Test Maintainability"
description: "테스트가 작성된 후 최소한의 유지보수 노력으로 계속 가치를 제공하는 특성으로, 실패 시 실제 버그를 나타내며 원인이 명확하다"
tags: ["Software Engineering", "Testing"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/testing/test-maintainability
sidebar:
  order: 56
---

## 핵심 개념

Test Maintainability(테스트 유지보수성)는 테스트가 작성된 후 최소한의 노력으로 계속 가치를 제공하는 특성이다. 유지보수 가능한 테스트란 "그냥 동작하는" 테스트를 의미한다: 작성 후 실패할 때까지 신경 쓸 필요가 없고, 실패하면 명확한 원인이 있는 실제 버그를 나타낸다.

## 동작 원리

유지보수성이 부족한 테스트의 두 가지 주요 문제:

1. **취약한 테스트(Brittle Tests)**: 실제 버그를 도입하지 않는 무해한 변경에도 실패하는 테스트. 엔지니어는 이러한 실패를 진단하고 수정하는 데 시간을 낭비하게 된다.

2. **불분명한 테스트(Unclear Tests)**: 실패 후 무엇이 잘못되었는지, 어떻게 수정해야 하는지, 테스트의 원래 의도가 무엇이었는지 파악하기 어려운 테스트.

**테스트 유지보수성의 핵심 원칙**: 테스트 작성 후, 리팩토링이나 새 기능 추가 시 기존 테스트를 수정할 필요가 없어야 한다. 동작 변경(behavior change)만이 테스트 수정의 정당한 이유이다.

네 가지 코드 변경 유형별 기대 반응:
- **순수 리팩토링**: 테스트가 변경되지 않아야 한다
- **새 기능 추가**: 새 테스트만 추가, 기존 테스트 변경 없음
- **버그 수정**: 누락된 테스트 케이스만 추가
- **동작 변경**: 기존 테스트 수정이 정당함 (유일한 경우)

## 예시

Mary가 간단한 기능을 구현했는데(수십 줄의 코드), 테스트 시스템이 대량의 오류를 반환하는 상황을 상상해 보자. 실제 버그는 없지만, 테스트가 코드의 내부 구조에 대해 가정했기 때문에 깨진 것이다. 이런 상황이 반복되면 생산성이 크게 저하되고 사기가 떨어진다.

## 관련 개념

- [Test via Public APIs](/knowledge/software-engineering/testing/test-via-public-apis/)
- [Unchanging Tests](/knowledge/software-engineering/testing/unchanging-tests/)
- [Test Clarity](/knowledge/software-engineering/testing/test-clarity/)
