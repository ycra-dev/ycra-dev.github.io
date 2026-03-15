---
title: "코드 검색 랭킹 (Code Search Ranking)"
description: "코드 검색 결과의 관련성을 점수화하여 가장 유용한 결과를 상위에 표시하는 시스템으로, 쿼리 독립 신호와 쿼리 의존 신호를 결합한다"
tags: ["Software Engineering", "Quality and Configuration"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/quality-and-configuration/code-search-ranking
sidebar:
  order: 209
---

## 핵심 개념

Code Search 랭킹은 코드베이스가 커질수록 짧은 문자열이 수천~수백만 번 나타나므로 필수적이다. 쿼리 독립 신호와 쿼리 의존 신호를 결합하여 가장 유용한 결과를 상위에 표시한다.

## 동작 원리

**쿼리 독립 신호(Query Independent Signals)**:
- 파일 조회수: 개발자가 중요하다고 여기는 파일을 반영. 피드백 루프 문제(exploitation vs exploration)가 있지만 실무에서 크게 해롭지 않음
- 파일 참조 수: 원래 PageRank 알고리즘과 유사하게 include/import 문을 웹 링크처럼 활용. 빌드 의존성, 함수/클래스 수준까지 확장 가능

**쿼리 의존 신호(Query Dependent Signals)**:
- 깨끗한 토큰 매치(공백 등으로 구분된 매치)에 추가 가중치
- 대소문자 구분 고려
- 심볼 및 파일명 매치에 일반 콘텐츠 매치보다 높은 가중치
- 쿼리의 상당 부분이 결과의 전체 경로에 나타나면 추가 가중치

**Supplemental Retrieval**: 원래 쿼리를 더 특수화된 쿼리로 재작성하여 (예: 정의와 파일명만으로 제한) 관련성 높은 소수의 파일을 대량의 덜 흥미로운 결과 속에서 찾아낸다.

## 예시

클래스 이름을 검색하면 인기에 따라 수천 개의 사용처가 있을 수 있지만 정의는 하나뿐이다. 고정된 수의 결과만 검색하면 정의 파일에 도달하기 전에 멈출 수 있다. Supplemental retrieval이 이를 해결한다.

결과 다양성(diversity)도 중요하다. 간단한 함수 이름에 대해 Java와 Python 매치를 모두 제공하는 것이 한 언어의 결과로만 채우는 것보다 낫다.

## 관련 개념

- [코드 검색 (Code Search)](/knowledge/software-engineering/quality-and-configuration/code-search/)
- [코드 검색 인덱싱 (Code Search Indexing)](/knowledge/software-engineering/quality-and-configuration/code-search-indexing/)
- [카이드 (Kythe)](/knowledge/software-engineering/quality-and-configuration/kythe/)
