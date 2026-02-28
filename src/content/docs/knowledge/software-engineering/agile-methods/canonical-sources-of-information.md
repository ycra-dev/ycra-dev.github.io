---
title: "Canonical Sources of Information"
description: "전문가 지식을 표준화하고 전파하는 중앙화된 조직 전체 정보 코퍼스 — 정보 섬을 방지하고 일관된 기준을 제공한다"
tags: ["Software Engineering", "Agile", "Knowledge Management", "Documentation"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/agile-methods/canonical-sources-of-information
sidebar:
  order: 19
---

## 핵심 개념

정식 정보 소스(Canonical Sources of Information)란 전문가 지식을 표준화하고 전파하는 중앙화된, 조직 전체 범위의 정보 코퍼스이다. 정보 섬에 취약한 정보를 대상으로 하며, 팀별 문서보다 투자 비용이 높지만 더 넓은 이점을 제공한다.

## 동작 원리

핵심 유형:

- **개발자 가이드**: 스타일 가이드, 코드 리뷰 가이드, 테스팅 가이드, Tips of the Week(TotW) 등
- **go/ links**: Google 내부 URL 단축 서비스. go/spanner, go/python 등으로 예측 가능하고 기억하기 쉬운 접근을 제공. 기저 URL이 변경되어도 go/ 링크 자체는 유지됨
- **Codelabs**: 설명, 모범 사례 코드, 코드 연습을 결합한 가이드형 실습 튜토리얼
- **정적 분석 도구**: 프로그래밍적으로 확인할 수 있는 모범 사례를 공유하는 강력한 방법

정식 콘텐츠는 높은 가시성과 공유된 이해를 제공하므로, **주제 전문가가 적극적으로 유지보수하고 검증하는 것이 중요**하다. 복잡한 주제일수록 명시적 소유자가 필수적이다.

## 예시

go/ links의 선순환: Googler가 Frobber에 대한 정보를 찾을 때 먼저 go/frobber를 확인한다. 해당 링크가 기대하는 문서를 가리키지 않으면, Googler 스스로 링크를 설정한다. 이로 인해 대부분의 Googler가 첫 시도에서 올바른 go/ 링크를 추측할 수 있는 선순환이 형성된다.

## 관련 개념

- [Knowledge Sharing Culture](/knowledge/software-engineering/agile-methods/knowledge-sharing-culture/)
- [Information Islands](/knowledge/software-engineering/agile-methods/information-islands/)
- [Readability Process (Knowledge Sharing)](/knowledge/software-engineering/agile-methods/readability-process-knowledge-sharing/)
- [Static Analysis as Knowledge Sharing](/knowledge/software-engineering/agile-methods/static-analysis-as-knowledge-sharing/)
