---
title: "Equivalence Partitioning"
description: "동치 분할은 입력 데이터를 동일한 동작을 유발하는 그룹(파티션)으로 분류하고, 각 파티션에서 대표 테스트 케이스를 선택하는 체계적인 테스트 설계 기법이다"
tags: ['Equivalence Partitioning', 'Test Design', 'Boundary Value Analysis', 'Test Case', 'Black Box Testing']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/software-engineering/equivalence-partitioning
sidebar:
  order: 4
---

## 핵심 개념

동치 분할에서는 동일한 파티션 내의 모든 입력이 프로그램에서 같은 방식으로 처리된다고 가정한다. 따라서 각 파티션에서 하나의 테스트 케이스만 선택하면 해당 파티션 전체를 대표할 수 있다. 파티션은 유효 입력과 무효 입력 모두에 대해 식별되어야 한다. 경계값 분석(boundary value analysis)은 동치 분할의 보완 기법으로, 파티션의 경계에서 테스트 케이스를 선택한다. 경계에서 오류가 발생할 확률이 높기 때문이다.

## 예시

나이 입력 필드의 동치 분할: 파티션 1(무효) - 음수(-1, -100), 파티션 2(유효) - 0~120(0, 25, 60, 120), 파티션 3(무효) - 121 이상(121, 999). 경계값: -1, 0, 120, 121. 각 파티션과 경계에서 테스트 케이스를 선택한다.

## 관련 개념

- [Unit Testing](/knowledge/software-engineering/unit-testing/)
- [Test-driven Development](/knowledge/software-engineering/test-driven-development/)
