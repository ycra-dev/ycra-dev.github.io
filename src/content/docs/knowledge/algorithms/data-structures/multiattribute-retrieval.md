---
title: "Multiattribute Retrieval"
description: "다중 속성 검색(Multiattribute Retrieval)은 레코드가 여러 개의 보조 키 속성을 가질 때, 다수의 속성 조합으로 레코드를 검색하는 기법으로, 데이터베이스의 다중 조건 쿼리 기반이다"
tags: ["Multiattribute Retrieval", "Secondary Key", "Inverted Index", "Database", "Information Retrieval", "TAOCP"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/algorithms/data-structures/multiattribute-retrieval
sidebar:
  order: 39
---

## 핵심 개념

다중 속성 검색(Multiattribute Retrieval)은 레코드가 여러 개의 보조 키(secondary key) 속성을 가질 때, 다수의 속성 조합으로 레코드를 검색하는 기법이다. TAOCP Section 6.5에서 다루며, 데이터베이스의 다중 조건 쿼리의 기반이 된다.

**문제 정의:**
N개의 레코드가 각각 여러 속성(attribute)을 가질 때, 예를 들어 "수학 전공이고 오하이오 거주인 학생"처럼 여러 조건을 동시에 만족하는 레코드를 효율적으로 찾는다.

## 동작 원리

**1. 반전 리스트 (Inverted List/File):**
- 각 속성값마다 해당 레코드의 목록을 저장
- 예: "MAJOR=MATH" → [record 2, 5, 8, ...]
- AND 쿼리: 두 리스트의 교집합 → 정렬된 리스트 순차 통과
- OR 쿼리: 두 리스트의 합집합
- 장점: AND/OR 쿼리 효율적
- 단점: 외부 파일에서 다수 접근 필요

**2. 멀티리스트 (Multilist):**
- 각 레코드가 속하는 속성 목록에 체인으로 연결
- 장점: 삽입/삭제 용이
- 단점: AND 쿼리에 비효율적 (불필요한 접근 많음)

**3. 비트 벡터 인덱스:**
- 각 속성값에 대해 N비트 벡터 저장 (레코드i가 속성을 가지면 비트i=1)
- AND/OR 연산 = 비트 AND/OR 연산 → 매우 빠름
- 단점: 속성 값이 많으면 비트 벡터가 커짐

**4. Superimposed Coding:**
여러 속성의 비트를 OR로 합쳐 짧은 코드 생성. 허위 일치(false positive) 발생 가능하나 실제 비교로 필터링.

**Steiner 삼중 시스템:**
v개 속성에 대한 반전 리스트 수를 최소화하기 위해 조합론적 설계 사용. 쌍마다 정확히 한 번 나타나도록 구성하면 레코드당 리스트 출현 횟수를 제한.

**쿼리 유형:**
- 포함 쿼리(Inclusive): 지정 속성을 모두 가진 레코드 (AND)
- 배타 쿼리: 특정 속성을 가지지 않는 레코드 (NOT)
- 기본 쿼리(Basic Query): 일부 속성은 1, 일부는 0, 나머지는 와일드카드(*)

## 예시

```
쿠키 레시피 파일 예시 (Section 6.5)
속성: 버터, 설탕, 초콜릿, 코코넛, 건포도, 특수재료 등 31가지

레코드 예시:
Chocolate Chip Cookies: [버터=1, 설탕=1, 초콜릿=1, 코코넛=0, ...]
Oatmeal Raisin Cookies: [버터=1, 설탕=1, 초콜릿=0, 코코넛=0, 건포도=1, ...]

반전 리스트:
버터 → {Chocolate Chip, Oatmeal Raisin, ...}
건포도 → {Oatmeal Raisin, Pfeffernuesse, ...}

AND 쿼리: "코코넛 AND 건포도가 들어간 레시피"
코코넛_리스트 ∩ 건포도_리스트 → 공통 레코드

비트 벡터:
버터:    1 1 0 1 1 ...  (N비트)
건포도:  0 1 0 0 1 ...
AND 결과: 0 1 0 0 1 ...  → 레코드 2, 5, ...
```

## 관련 개념

- [Hash Table](/knowledge/algorithms/hash-table/)
- [Trie](/knowledge/algorithms/data-structures/trie/)
- [B-Tree](/knowledge/algorithms/data-structures/b-tree/)
- [Digital Search Tree](/knowledge/algorithms/data-structures/digital-search-tree/)
- [k-d Tree](/knowledge/algorithms/data-structures/kd-tree/)
