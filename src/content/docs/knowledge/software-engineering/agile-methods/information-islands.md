---
title: "Information Islands"
description: "조직의 다른 부분과 소통하지 않는 그룹들 사이에서 발생하는 지식 단편화 현상 — 정보 섬은 중복·왜곡·병목을 야기한다"
tags: ["Software Engineering", "Agile", "Knowledge Sharing", "Organization"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/agile-methods/information-islands
sidebar:
  order: 17
---

## 핵심 개념

정보 섬(Information Islands)이란 조직의 다른 부분과 소통하지 않거나 공유 자원을 사용하지 않는 그룹들 사이에서 발생하는 지식 단편화 현상이다. 글로벌 최적점(global maximum) 대신 여러 개의 지역 최적점(local maxima)이 발생한다.

## 동작 원리

정보 섬은 세 가지 파생 문제를 야기한다:

1. **정보 단편화(Information Fragmentation)**: 각 섬이 전체 그림의 불완전한 부분만 가지고 있다
2. **정보 중복(Information Duplication)**: 각 섬이 같은 일을 하는 자체적인 방법을 재발명한다
3. **정보 왜곡(Information Skew)**: 각 섬이 같은 일을 하는 자체적인 방법을 가지며, 이들이 서로 충돌할 수도 있다

관련된 도전 과제:
- **SPOF**: 중요 정보가 한 사람에게만 있어 병목이 발생한다
- **All-or-Nothing 전문성**: 초보자와 전문가 사이에 중간 지대가 없다
- **앵무새 반복(Parroting)**: 이해 없이 패턴을 모방한다
- **유령의 묘지(Haunted Graveyards)**: 아무도 건드리기 두려워하는 코드 영역이 존재한다

## 예시

Google 내에서도 각 팀이 자체적인 빌드 스크립트나 개발 워크플로를 독립적으로 만들어, 사실상 같은 문제를 다른 방식으로 해결하는 경우가 있었다. 이를 해결하기 위해 canonical sources of information(정식 정보 소스)을 확립하고, go/ links를 통해 조직 전체에서 동일한 정보에 접근할 수 있게 했다.

## 관련 개념

- [Psychological Safety](/knowledge/software-engineering/agile-methods/psychological-safety/)
- [Knowledge Sharing Culture](/knowledge/software-engineering/agile-methods/knowledge-sharing-culture/)
- [Canonical Sources of Information](/knowledge/software-engineering/agile-methods/canonical-sources-of-information/)
- [Bus Factor](/knowledge/software-engineering/agile-methods/bus-factor/)
