---
title: "테스트 범위 (Test Scope)"
description: "테스트가 검증하려는 코드의 범위를 나타내는 개념으로, 단위 테스트(좁은 범위)부터 통합 테스트, E2E 테스트(넓은 범위)까지 다양한 수준이 있다"
tags: ["Software Engineering", "Testing"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/testing/test-scope
sidebar:
  order: 51
---

## 핵심 개념

Test Scope는 테스트가 검증하려는 코드의 범위를 나타내는 개념이다. 테스트 크기(size)와 별개의 개념으로, 크기는 실행에 필요한 리소스를 뜻하고 범위는 얼마나 많은 코드를 검증하는지를 뜻한다. 다양한 범위의 테스트를 통해 서로 다른 종류의 결함을 잡아낸다.

## 동작 원리

범위에 따른 분류:

1. **좁은 범위(Narrow-scoped / Unit)**: 단일 클래스나 메서드의 로직을 검증한다
2. **중간 범위(Medium-scoped / Integration)**: 여러 컴포넌트 간의 상호작용을 검증한다
3. **넓은 범위(Broad-scoped / End-to-end)**: 시스템 전체의 동작을 검증한다

크기와 범위는 서로 연관되지만 독립적이다. 좁은 범위의 테스트가 반드시 Small일 필요는 없고, 넓은 범위의 테스트가 반드시 Large일 필요도 없다. 하지만 실제로는 좁은 범위의 테스트가 주로 Small이고, 넓은 범위의 테스트가 주로 Large인 경우가 많다.

좁은 범위의 테스트는 로직 오류를, 넓은 범위의 테스트는 통합 문제를 발견하는 데 효과적이다.

## 예시

같은 결제 시스템에 대해:
- **단위 테스트**: `calculateTax()` 메서드가 올바른 세금을 계산하는지 확인
- **통합 테스트**: 결제 서비스가 세금 계산 모듈과 올바르게 연동되는지 확인
- **E2E 테스트**: 사용자가 장바구니에서 결제 완료까지의 전체 흐름이 동작하는지 확인

## 관련 개념

- [테스트 크기 (Test Size)](/knowledge/software-engineering/testing/test-size/)
- [테스트 피라미드 (Test Pyramid)](/knowledge/software-engineering/testing/test-pyramid/)
- [대형 테스팅 (Larger Testing)](/knowledge/software-engineering/testing/larger-testing/)
