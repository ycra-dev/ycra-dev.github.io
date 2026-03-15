---
title: "코드 리뷰 디핑 (Code Review Diffing)"
description: "코드 변경 사항의 차이를 최적화하여 표시하는 코드 리뷰 도구의 핵심 기능"
tags: ["Software Engineering", "Code Review", "Developer Tools"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/quality-and-configuration/code-review-diffing
sidebar:
  order: 309
---

## 핵심 개념

Code review diffing은 코드 변경 사항의 차이를 최적화하여 표시하는 코드 리뷰 도구의 핵심 기능이다. 큰 변경은 작은 변경보다 이해하기 어려우므로, diff 최적화는 좋은 코드 리뷰 도구의 핵심 요구사항이다.

## 동작 원리

Critique는 최적화된 최장 공통 부분수열(longest common subsequence) 알고리즘을 기반으로 다음 기능을 제공한다:

- **구문 강조(Syntax highlighting)**: 언어에 맞는 색상 표시
- **교차 참조(Cross-references)**: Kythe로 구동되어 심볼 클릭으로 정의/사용처 탐색
- **인라인 디핑(Intraline diffing)**: 줄 내에서 문자 수준의 차이를 단어 경계를 고려하여 표시
- **공백 무시 옵션**: 다양한 수준의 공백 차이 무시
- **이동 감지(Move detection)**: 코드가 한 곳에서 다른 곳으로 이동된 경우 "제거+추가"가 아닌 "이동"으로 표시

사이드 바이 사이드 diff가 리뷰를 쉽게 만든다고 판단하여, 공간 효율을 극대화했다. 테두리 없음, 패딩 없음, Java의 100자 줄 제한도 수용할 수 있는 최적의 폰트와 크기를 찾았다.

## 예시

파일 수준에서 Critique는 스냅샷 버전 체인을 컴팩트하게 표시하는 위젯을 제공한다. 사용자는 드래그 앤 드롭으로 비교할 버전을 선택할 수 있다. 유사한 스냅샷은 자동으로 축소되어 테스트 커버리지가 있는 스냅샷, 이미 리뷰된 스냅샷, 코멘트가 있는 스냅샷 등 중요한 스냅샷에 초점을 맞춘다. 모든 것이 프리페치되어 다른 스냅샷 로딩이 매우 빠르다.

## 관련 개념

- [크리틱 (Critique)](/knowledge/software-engineering/quality-and-configuration/critique/)
