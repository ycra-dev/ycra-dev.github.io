---
title: "Multivalued Dependency"
description: "다중값 종속성(Multivalued Dependency) alpha ->> beta는 관계 R에서 alpha와 beta의 관계가 alpha와 R - beta의 관계와 독립적임을 나타내는 제약으로, alpha 값이 같은 두 튜플이 있을 때 beta와 R - beta..."
tags: ['Multivalued Dependency', '4nf', 'Normalization', 'Functional Dependency']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/database/multivalued-dependency
sidebar:
  order: 10
---

## 핵심 개념

다중값 종속성은 함수적 종속성과 근본적으로 다른 성격을 가진다. 함수적 종속성은 특정 튜플의 존재를 금지하는 등치 생성 종속성(equality-generating dependency)인 반면, 다중값 종속성은 특정 튜플의 존재를 요구하는 튜플 생성 종속성(tuple-generating dependency)이다.

형식적으로, alpha ->> beta가 성립한다는 것은 r(R)의 모든 합법적 인스턴스에서 t1[alpha] = t2[alpha]인 임의의 두 튜플 t1, t2에 대해 t3[alpha] = t1[alpha], t3[beta] = t1[beta], t3[R - beta] = t2[R - beta]인 튜플 t3이 존재해야 함을 의미한다 (t4도 대칭적으로 존재해야 한다). 직관적으로, alpha와 beta 사이의 관계가 alpha와 R - alpha - beta 사이의 관계와 독립적이라는 것이다.

alpha ->> beta가 자명(trivial)한 경우는 beta가 alpha의 부분집합이거나 beta 합집합 alpha가 R 전체인 경우이다. 또한 alpha -> beta이면 alpha ->> beta도 성립한다. 즉, 모든 함수적 종속성은 다중값 종속성이기도 하다.

BCNF를 만족하는 관계도 다중값 종속성에 의한 중복이 존재할 수 있다. 이 문제를 해결하기 위해 제4정규형(4NF)이 정의된다. 4NF는 D+의 모든 비자명 다중값 종속성 alpha ->> beta에서 alpha가 R의 슈퍼키여야 하는 정규형이다. 4NF는 BCNF보다 강한 조건이므로, 모든 4NF 관계는 BCNF도 만족한다.

4NF 분해 알고리즘은 BCNF 분해 알고리즘과 유사하게, 위반하는 다중값 종속성 alpha ->> beta를 사용하여 스키마를 (alpha, beta)와 (R - (beta - alpha))로 분해한다. 이 알고리즘은 무손실 분해를 보장한다.

## 예시

```
-- r2(ID, dept_name, street, city)
-- BCNF를 만족하지만 중복 발생

-- ID ->> dept_name 성립 (교수의 학과와 주소가 독립)
-- ID ->> street, city 성립

-- 데이터 예시:
-- (22222, Physics, North, Rye)
-- (22222, Physics, Main, Manchester)
-- 두 주소 × 한 학과 -> 중복!
-- Math 학과 추가 시 두 주소 각각에 대해 튜플 필요

-- 4NF 분해:
-- r21(dept_name, ID)
-- r22(ID, street, city)
-- 이제 중복 없이 독립적으로 저장 가능
```

## 관련 개념

- [Functional Dependency](/knowledge/database/functional-dependency/)
- [Boyce-Codd Normal Form](/knowledge/database/boyce-codd-normal-form/)
- [Decomposition](/knowledge/database/decomposition/)
- [Lossless-Join Decomposition](/knowledge/database/lossless-join-decomposition/)
- [Third Normal Form](/knowledge/database/third-normal-form/)
