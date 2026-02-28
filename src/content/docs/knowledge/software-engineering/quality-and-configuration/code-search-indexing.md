---
title: "Code Search Indexing"
description: "대규모 코드베이스를 효율적으로 검색하기 위한 역인덱스(reverse index) 구축 기술로, Google은 trigram에서 suffix array를 거쳐 현재 sparse n-gram 방식으로 진화했다"
tags: ["Software Engineering", "Quality and Configuration"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/quality-and-configuration/code-search-indexing
sidebar:
  order: 208
---

## 핵심 개념

Code Search 인덱싱은 대규모 코드베이스(1.5TB)를 효율적으로 검색하기 위한 역인덱스 구축 기술이다. Google 코드베이스 규모에서 brute-force grep은 비현실적이다. 현재의 sparse n-gram 솔루션은 brute-force보다 500배 이상 효율적이면서 정규식 검색도 빠르게 처리한다.

## 동작 원리

인덱싱 전략의 진화:
1. **Trigram 기반**: 초기 접근. Russ Cox가 단순화 버전을 오픈소스화
2. **커스텀 suffix array 기반**: 더 높은 정밀도
3. **Sparse n-gram (현재)**: Google의 핵심 검색 스택을 활용하여 역인덱스 구축, 인코딩, 서빙의 발전을 공유

**검색 인덱스의 특성**:
- 증분 업데이트가 가능하여, 코드 변경이 제출될 때 변경된 파일만 재인덱싱하면 된다
- 인덱싱 지연 중앙값은 10초 미만이다
- 초기에는 모든 데이터를 메모리에서 제공했으나, 인덱스 크기 증가로 역인덱스를 플래시 스토리지로 이전했다

**코드 검색의 특수성**: 소스 코드에서 `function()` vs `function(x)`, `(x ^ y)`, CamelCase, snake_case 같은 식별자 규칙, 대소문자 구분 등은 토큰 기반 인덱스로는 처리하기 어렵다.

## 예시

RE2 라이브러리의 정규식 매칭 속도(RAM 기준 약 100MB/s)로 50ms 내에 1.5TB를 검색하려면 약 300,000개의 코어가 필요하다. 파일 이력 인덱싱을 위해 커스텀 압축 방식을 개발하여, 전체 이력 인덱싱의 리소스 소비 증가를 단 2.5배로 제한했다.

## 관련 개념

- [Code Search](/knowledge/software-engineering/quality-and-configuration/code-search/)
- [Code Search Ranking](/knowledge/software-engineering/quality-and-configuration/code-search-ranking/)
- [Kythe](/knowledge/software-engineering/quality-and-configuration/kythe/)
