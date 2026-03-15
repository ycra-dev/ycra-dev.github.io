---
title: "코드 리뷰 모범 사례 (Code Review Best Practices)"
description: "코드 리뷰를 효율적이고 생산적으로 만들기 위한 작성자와 리뷰어 양쪽의 행동 지침 — 구글의 수십 년간 경험에서 도출된 실천 방법들"
tags: ["Software Engineering", "Quality", "Code Review", "Best Practices", "Collaboration"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/quality-and-configuration/code-review-best-practices
sidebar:
  order: 48
---

## 핵심 개념

코드 리뷰 모범 사례(Best Practices)는 코드 리뷰를 효율적이고 생산적으로 만들기 위한 작성자와 리뷰어 양쪽의 행동 지침이다. 구글의 수십 년간 경험에서 도출된 실천 방법들이다.

## 동작 원리

**작성자 모범 사례**:
- **변경을 작게 유지**: 300줄 이하의 변경이 이상적이다. 큰 변경은 여러 작은 변경으로 분리한다. 작은 변경은 빠르게 리뷰되고 문제를 정확히 지적할 수 있다.
- **변경 설명을 잘 작성**: 첫 줄에 변경의 종류를 요약하고(50자 이내), 본문에 "왜" 이 변경이 필요한지 설명한다. 리뷰어는 의도를 이해해야 좋은 리뷰를 할 수 있다.
- **리뷰어 수 최소화**: 필요한 승인을 모두 제공할 수 있는 최소한의 리뷰어를 선택한다.
- **리뷰 피드백에 열린 마음**: 자존심이 아닌 코드 품질에 집중한다.

**리뷰어 모범 사례**:
- **예의 바르고 전문적으로**: "이 코드는 틀렸다"가 아니라 "이 경우에는 X 패턴이 더 적합할 수 있습니다"
- **건설적 비판**: 문제만 지적하지 말고 대안을 제시한다
- **빠른 응답**: 24시간 이내, 이상적으로는 수 시간 이내에 리뷰를 완료한다
- **중요한 것에 집중**: 포매팅은 도구에 맡기고, 설계와 로직에 집중한다

**프로세스 수준**:
- **LGTM은 전적으로 신뢰**: LGTM을 받으면 작성자가 추가 변경을 적용할 수 있다 (재리뷰 불필요)
- **논쟁은 빠르게 에스컬레이션**: 2~3차 이상 주고받아도 합의가 안 되면 오프라인 대화나 상위 판단으로 해결한다

## 예시

구글에서 한 대규모 변경(1000줄+)이 리뷰에 며칠이 걸렸고, 리뷰어가 핵심 결함을 놓쳤다. 이 경험 이후 팀은 "큰 변경은 무조건 작은 CL로 분리" 정책을 세웠다. 각 CL이 200줄 이하로 유지되니, 리뷰 시간은 평균 2시간 이내로 줄었고 결함 검출률도 높아졌다.

## 관련 개념

- [코드 리뷰 (Code Review)](/knowledge/software-engineering/quality-and-configuration/code-review/)
- [코드 리뷰의 이점 (Code Review Benefits)](/knowledge/software-engineering/quality-and-configuration/code-review-benefits/)
- [LGTM과 승인 유형 (LGTM and Approval Types)](/knowledge/software-engineering/quality-and-configuration/lgtm-and-approval-types/)
- [심리적 안전감 (Psychological Safety)](/knowledge/software-engineering/agile-methods/psychological-safety/)
