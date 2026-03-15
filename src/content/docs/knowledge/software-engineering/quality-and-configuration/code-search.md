---
title: "코드 검색 (Code Search)"
description: "Google에서 코드를 검색하고 브라우징하기 위한 웹 기반 도구로, 코드를 대규모로 읽고, 이해하고, 탐색하는 데 최적화되어 있다"
tags: ["Software Engineering", "Quality and Configuration"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/quality-and-configuration/code-search
sidebar:
  order: 206
---

## 핵심 개념

Code Search는 Google에서 코드를 검색하고 브라우징하기 위한 웹 기반 도구로, 프론트엔드 UI와 다양한 백엔드로 구성되며 코드를 대규모로 읽고, 이해하고, 탐색하는 데 최적화되어 있다. "코드에 대한 다음 질문에 한 번의 클릭으로 답한다"는 원칙으로 개발이 진행되었다.

## 동작 원리

Code Search는 원래 내부 코드를 위한 grep 유형 도구와 외부 Code Search의 랭킹/UI를 결합한 것에서 시작되었다. Kythe/Grok 통합으로 교차 참조와 심볼 정의 점프 기능이 추가되면서 검색에서 브라우징으로 초점이 이동했다.

한 번의 클릭으로 답할 수 있는 질문들:
- "이 심볼은 어디에 정의되어 있는가?"
- "어디서 사용되는가?"
- "어떻게 포함하는가?"
- "언제 코드베이스에 추가되었는가?"
- "시스템 전체에서 얼마나 많은 CPU를 소비하는가?"

IDE와 달리 Code Search는 편집이 아닌 코드 읽기/이해/탐색에 최적화되어 있다. 에디터의 텍스트 커서가 없으므로 심볼에 대한 모든 마우스 클릭이 의미 있는 동작(모든 사용처 표시, 정의로 점프)으로 사용된다.

## 예시

Code Search는 하루에 100만 건 이상의 검색 쿼리를 처리한다. 검색 요청당 1초의 증가만으로도 매일 약 35명의 풀타임 엔지니어에 해당하는 유휴 시간이 발생한다. 현재 약 1.5TB의 콘텐츠를 인덱싱하며, 서버 측 검색 지연 시간 중앙값은 50ms 미만, 인덱싱 지연 중앙값은 10초 미만이다.

## 관련 개념

- [카이드 (Kythe)](/knowledge/software-engineering/quality-and-configuration/kythe/)
- [코드 검색 인덱싱 (Code Search Indexing)](/knowledge/software-engineering/quality-and-configuration/code-search-indexing/)
- [코드 검색 랭킹 (Code Search Ranking)](/knowledge/software-engineering/quality-and-configuration/code-search-ranking/)
- [코드 검색 개발자 도구 통합 (Code Search Developer Tool Integration)](/knowledge/software-engineering/quality-and-configuration/code-search-developer-tool-integration/)
- [파이퍼 (Piper)](/knowledge/software-engineering/quality-and-configuration/piper/)
