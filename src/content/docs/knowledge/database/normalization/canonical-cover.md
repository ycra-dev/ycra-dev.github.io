---
title: "Canonical Cover"
description: "정준 커버(Canonical Cover) Fc는 함수적 종속성 집합 F와 동치(같은 폐포)이면서, 불필요한(extraneous) 속성이 없고 각 좌변이 유일한 최소한의 함수적 종속성 집합으로, 데이터베이스 갱신 시 제약 조건 검증 비용을 줄이기 위해 사용된다"
tags: ['Canonical Cover', 'Functional Dependency', 'Normalization', 'Extraneous Attribute']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/database/canonical-cover
sidebar:
  order: 9
---

## 핵심 개념

정준 커버는 함수적 종속성 집합을 단순화하여 검증 효율을 높이는 핵심 도구이다. F와 Fc는 동일한 폐포를 가지므로(Fc+ = F+), Fc를 만족하는지 검사하는 것은 F를 만족하는지 검사하는 것과 동치이다. 하지만 Fc는 F보다 적은 종속성과 속성을 가지므로 검증 비용이 낮다.

정준 커버의 조건은 두 가지이다. 첫째, Fc의 어떤 함수적 종속성에도 불필요한(extraneous) 속성이 없어야 한다. 둘째, Fc에서 각 함수적 종속성의 좌변은 유일해야 한다. 즉, alpha -> beta1과 alpha -> beta2가 동시에 존재할 수 없으며, 합집합 규칙을 적용하여 alpha -> beta1 beta2로 합쳐야 한다.

불필요한 속성(extraneous attribute)의 정의는 좌변과 우변에서 다르다. 좌변에서 속성 A가 불필요하다는 것은 alpha에서 A를 제거해도 F의 폐포가 변하지 않는 것이다. 우변에서 속성 A가 불필요하다는 것은 beta에서 A를 제거해도 (수정된 F의) 폐포가 변하지 않는 것이다. 불필요한 속성 검사는 속성 폐포를 사용하여 효율적으로 수행할 수 있다.

정준 커버 계산 알고리즘은 반복적이다: (1) 합집합 규칙으로 동일 좌변의 종속성을 합친다, (2) 불필요한 속성을 찾아 제거한다, (3) 변화가 없을 때까지 반복한다. 불필요한 속성이 여러 개 존재할 때 어떤 것을 먼저 제거하느냐에 따라 서로 다른 정준 커버가 나올 수 있으나, 모두 동등하게 유효하다.

정준 커버는 3NF 분해 알고리즘의 입력으로 사용된다. 3NF 알고리즘은 Fc의 각 함수적 종속성 alpha -> beta에 대해 스키마 (alpha, beta)를 생성하므로, Fc가 간결할수록 분해 결과도 간결해진다.

## 예시

```
-- F = {A -> BC, B -> C, A -> B, AB -> C} (스키마 (A, B, C))

-- 정준 커버 계산:
-- 1단계: 합집합 규칙 적용
--   A -> BC와 A -> B를 합쳐서 A -> BC
--   현재: {A -> BC, B -> C, AB -> C}

-- 2단계: 불필요한 속성 검사
--   AB -> C에서 A가 불필요? B -> C가 이미 존재하므로 AB -> C에서 A 제거 가능
--   결과: {A -> BC, B -> C}

-- 3단계: A -> BC에서 C가 불필요?
--   A -> B이고 B -> C이므로 A -> C 유도 가능 -> C는 불필요
--   결과: {A -> B, B -> C}

-- 최종 정준 커버 Fc = {A -> B, B -> C}
```

## 관련 개념

- [Functional Dependency](/knowledge/database/functional-dependency/)
- [Third Normal Form](/knowledge/database/third-normal-form/)
- [Boyce-Codd Normal Form](/knowledge/database/boyce-codd-normal-form/)
- [Decomposition](/knowledge/database/decomposition/)
- [Dependency Preservation](/knowledge/database/dependency-preservation/)
