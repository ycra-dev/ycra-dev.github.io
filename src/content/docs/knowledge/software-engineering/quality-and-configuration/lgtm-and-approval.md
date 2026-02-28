---
title: "LGTM and Approval"
description: "리뷰어가 변경을 승인하는 Critique의 이중 승인 메커니즘으로, LGTM은 코드 품질 확인, Approval은 코드베이스 커밋 허용을 의미"
tags: ["Software Engineering", "Code Review", "Developer Tools"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/quality-and-configuration/lgtm-and-approval
sidebar:
  order: 308
---

## 핵심 개념

LGTM("Looks Good To Me")은 리뷰어가 변경을 검토했으며 표준을 충족한다고 판단함을 의미하고, Approval은 게이트키퍼로서 변경이 코드베이스에 커밋될 수 있도록 허용함을 의미한다. 두 가지를 구분하여 코드 리뷰의 역할을 명확히 한다.

## 동작 원리

Critique의 변경 점수는 세 부분으로 구성된다:
1. **LGTM**: "이 변경을 검토했고, 표준을 충족하며, 미해결 코멘트를 처리한 후 커밋해도 좋다"
2. **Approval**: "게이트키퍼로서 이 변경이 코드베이스에 커밋되는 것을 허용한다"
3. **미해결 코멘트 수**: 작성자가 처리해야 할 코멘트

변경이 커밋 가능하려면 최소 하나의 LGTM, 충분한 Approval, 미해결 코멘트 없음이 필요하다. 모든 변경에 LGTM이 필요하므로 최소 두 쌍의 눈이 변경을 검토하게 된다.

LGTM/Approval은 항상 긍정적으로만 사용하도록 설계했다. "Needs More Work"나 thumbs-down은 불가능하며, 모든 부정적 피드백은 특정 미해결 코멘트로 표현되어야 한다.

LGTM과 Approval은 경직 요구사항(hard requirements)이고, 미해결 코멘트는 유연 요구사항(soft requirements)이다. 작성자가 "resolved"로 표시하며 응답할 수 있다. 이 구분은 작성자와 리뷰어 간의 신뢰에 기반하며, 특히 시간대 차이가 큰 경우 효율적이다.

## 예시

리뷰어가 LGTM과 함께 미해결 코멘트를 남기고, 나중에 코멘트가 실제로 해결되었는지 확인하지 않을 수 있다. 이는 작성자에 대한 신뢰를 보여주는 것이며, 리뷰어와 작성자가 서로 다른 시간대에 있을 때 특히 효율적이다. 초기에는 "LGTM++"이 있었지만, 모델 단순화를 위해 제거되었다.

## 관련 개념

- [Critique](/knowledge/software-engineering/quality-and-configuration/critique/)
- [Attention Set](/knowledge/software-engineering/quality-and-configuration/attention-set/)
