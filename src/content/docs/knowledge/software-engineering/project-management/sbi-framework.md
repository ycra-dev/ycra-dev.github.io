---
title: "SBI Framework"
description: "상황, 행동, 영향 세 요소로 구조화하여 방어적 반응을 줄이는 피드백 전달 방법"
tags: ["Software Engineering", "Feedback", "Communication", "Management"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/project-management/sbi-framework
sidebar:
  order: 32
---

## 핵심 개념

SBI 프레임워크는 상황(Situation), 행동(Behavior), 영향(Impact)의 세 요소로 구조화하여 피드백을 전달하는 방법이다. 성격 판단이나 의도 추측을 배제하고, 관찰 가능한 사실과 그 영향에 초점을 맞춰 방어적 반응을 줄이고 건설적인 대화를 유도한다.

## 동작 원리

SBI의 세 요소:

1. **Situation (상황):** 피드백의 대상이 되는 구체적인 시간과 장소를 명시한다. "지난주 화요일 스프린트 계획 미팅에서"처럼 특정 상황을 지칭해야 한다. "항상 그러잖아" 같은 일반화를 피한다.

2. **Behavior (행동):** 그 상황에서 상대방이 실제로 한 관찰 가능한 행동을 서술한다. 내면의 의도나 성격이 아니라, 눈으로 보고 귀로 들은 구체적인 행위만 언급한다. "당신이 게으르다"(성격 판단)가 아니라 "마감 시한을 3일 초과했다"(관찰 가능한 행동)라고 말한다.

3. **Impact (영향):** 그 행동이 본인, 팀, 프로젝트에 미친 구체적인 영향을 설명한다.

피드백 전달 시 추가 원칙:
- 가능한 빨리 전달한다. 몇 주 후에 꺼내면 효과가 떨어진다
- 부정적 피드백은 반드시 1:1(private)에서 전달한다
- 긍정적 피드백은 공개적으로 전달해도 좋다. 팀 문화를 강화한다
- 피드백 후 상대방의 관점을 듣는 시간을 반드시 가진다

## 예시

부정적 피드백 - SBI 적용 전후:

```
[SBI 없이]
"코드 리뷰를 제대로 안 하는 것 같아요. 좀 더 신경 써주세요."
→ "제대로"의 기준이 불명확
→ "신경 안 쓴다"는 의도 추측
→ 상대방은 방어적으로 반응: "저 열심히 하고 있는데요?"

[SBI 적용]
Situation: "지난 금요일 PR #423 코드 리뷰에서,"
Behavior: "리뷰 코멘트 없이 바로 Approve를 하셨는데,"
Impact:   "해당 PR에 SQL 인젝션 취약점이 있었고,
           프로덕션에 배포된 후에야 발견되어
           핫픽스에 2시간이 소요되었습니다."
→ 구체적이고 객관적
→ 상대방이 문제를 이해하고 개선할 수 있음
```

긍정적 피드백 - SBI 적용:

```
Situation: "어제 장애 대응 중에,"
Behavior: "5분 만에 근본 원인을 파악하고, Slack에 실시간으로
           상황을 공유하면서 팀원들에게 역할을 배분하셨는데,"
Impact:   "덕분에 장애가 15분 만에 해결되었고,
           경영진과 고객에게 즉시 상황을 보고할 수 있었습니다."
→ "잘했어요"보다 100배 효과적
→ 어떤 행동이 좋았는지 명확하므로 반복 가능
```

## 관련 개념

- [One-on-One Meeting](/knowledge/software-engineering/project-management/one-on-one-meeting/)
- [OKR](/knowledge/software-engineering/project-management/okr/)
- [Psychological Safety](/knowledge/software-engineering/agile-methods/psychological-safety/)
