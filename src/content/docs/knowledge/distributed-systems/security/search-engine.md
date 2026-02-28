---
title: "검색 엔진 (Search Engine)"
description: "웹 페이지를 자동으로 수집하고 색인화하여 사용자가 입력한 키워드에 적합한 결과를 관련도 순으로 반환하는 시스템이다"
tags: ["Security", "Web", "Search-Engine", "PageRank", "Indexing"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/distributed-systems/search-engine
sidebar:
  order: 23
---

## 핵심 개념

검색 엔진(Search Engine)은 웹 페이지를 자동으로 수집(크롤링)하고 색인(인덱싱)하여, 사용자가 입력한 키워드에 적합한 결과를 관련도 순으로 반환하는 시스템이다. Google이 압도적인 시장점유율을 차지하고 있다.

## 동작 원리

검색 엔진의 동작은 세 단계로 이루어진다.

**1단계: 크롤링(Crawling)**:
- 웹 크롤러(spider/bot)가 웹 페이지의 링크를 따라가며 자동으로 웹을 탐색
- 새로운 페이지와 업데이트된 페이지를 지속적으로 발견
- 수십억 개의 웹 페이지를 방문

**2단계: 인덱싱(Indexing)**:
- 크롤링한 페이지의 내용을 분석하고 데이터베이스에 색인으로 저장
- 각 단어가 어떤 페이지에 나타나는지 역색인(inverted index) 구축
- 책의 뒷부분에 있는 색인(Index)과 유사한 원리

**3단계: 랭킹(Ranking)**:
- 사용자 질의에 대해 가장 관련성 높은 결과를 상위에 표시
- **PageRank 알고리즘**: Google의 핵심 혁신. 다른 페이지로부터 많은 링크를 받는 페이지를 더 중요하게 평가. 학술 논문의 인용 횟수와 유사한 개념
- 수백 가지 신호(키워드 빈도, 페이지 품질, 사용자 위치 등)를 종합 고려

**비즈니스 모델**: 검색 결과 옆이나 위에 **키워드 광고**를 표시하여 수익을 창출한다. 광고주가 특정 키워드에 대해 입찰하고, 클릭당 비용을 지불한다.

## 예시

Google 검색 "python tutorial" 동작 과정:
```
1. 사용자: "python tutorial" 입력
2. Google 서버: 색인에서 "python"과 "tutorial"을 포함하는 페이지 검색
3. PageRank + 기타 알고리즘: 수십억 결과 중 관련도 순 정렬
4. 결과 표시:
   [광고] Python 온라인 강좌 - udemy.com (유료 광고)
   [1] Python Tutorial - W3Schools (자연 검색 결과)
   [2] The Python Tutorial — python.org
   ...
```

PageRank 원리 (단순화):
```
페이지 A → 페이지 C 링크
페이지 B → 페이지 C 링크
페이지 D → 페이지 C 링크

→ 페이지 C는 3개의 인바운드 링크를 받으므로 높은 PageRank
→ 만약 페이지 A 자체가 높은 PageRank라면, C에 더 큰 가치 부여
```

## 관련 개념

- [웹 추적 (Web Tracking)](/knowledge/distributed-systems/web-tracking/) - 검색 기록은 주요 추적 대상
- [데이터 마이닝 (Data Mining)](/knowledge/distributed-systems/data-mining/) - 검색 데이터는 강력한 데이터 마이닝 소스
- [URL](/knowledge/network/url/) - 크롤러가 URL을 따라가며 웹을 탐색

## 출처

- Understanding the Digital World, Chapter 11
