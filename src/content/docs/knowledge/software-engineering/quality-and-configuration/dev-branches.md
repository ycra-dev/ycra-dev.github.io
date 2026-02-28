---
title: "Dev Branches"
description: "제품 안정성 수단으로 사용되는 장기 개발 브랜치로, Google은 이 방식이 근본적으로 잘못된 접근이라고 보며 trunk-based development를 권장한다"
tags: ["Software Engineering", "Quality and Configuration"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/quality-and-configuration/dev-branches
sidebar:
  order: 203
---

## 핵심 개념

Dev branch(개발 브랜치)는 "완료되었지만 커밋되지 않음"과 "새 작업의 기반"의 중간 지점에 해당하는 브랜치다. Google은 제품 안정성 수단으로서의 장기 개발 브랜치가 근본적으로 잘못된 접근이라고 본다. 제품 안정성은 광범위한 테스팅, CI, 철저한 코드 리뷰를 통해 훨씬 더 효과적으로 해결된다.

## 동작 원리

장기 dev 브랜치가 잘못된 이유:

1. **작은 머지가 큰 머지보다 쉽다**: 동일한 커밋들이 결국 trunk에 머지되어야 하므로, 일찍 자주 머지하는 것이 낫다.
2. **변경 작성자가 머지하는 것이 쉽다**: 관련 없는 변경들을 묶어 나중에 머지하면 더 복잡해진다.
3. **회귀 원인 파악이 어려워진다**: 대규모 dev 브랜치 머지는 더 많은 변경이 테스트에 포함되어 실패 격리가 어렵다.

조직이 이 함정에 빠지는 과정:
"장기 브랜치 머지가 안정성을 떨어뜨렸다" → "브랜치 머지는 위험하다"고 결론 → "더 나은 테스팅"이 아닌 "머지를 늦추고 조율하자"에 집중 → 새 브랜치가 다른 진행 중인 브랜치를 기반으로 생기고, 점점 더 많은 노력이 브랜치 머지 조율에 투입되는 악순환이 발생한다.

## 예시

비공식 트위터 설문에 따르면 약 25%의 소프트웨어 엔지니어가 "정기적인" 머지 전략 회의를 경험한 적이 있다. 이러한 회의는 순수한 오버헤드이며, trunk-based development로 전환하면 완전히 불필요해진다.

## 관련 개념

- [Source of Truth](/knowledge/software-engineering/quality-and-configuration/source-of-truth/)
- [Release Branches](/knowledge/software-engineering/quality-and-configuration/release-branches/)
