---
title: "Triage for Measurement"
description: "엔지니어링 생산성을 측정하기 전에 측정 자체가 가치 있는지 판단하는 사전 평가 프로세스 — 결과에 따른 구체적 행동 계획이 없으면 측정할 가치가 없다"
tags: ["Software Engineering", "Project Management", "Metrics", "Decision Making"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/project-management/triage-for-measurement
sidebar:
  order: 21
---

## 핵심 개념

측정 트리아지(Triage for Measurement)는 엔지니어링 생산성을 측정하기 전에 측정 자체가 가치 있는지 판단하는 사전 평가 프로세스이다. 측정은 비용이 들기 때문에, 결과에 따른 구체적 행동 계획이 없으면 측정할 가치가 없다.

## 동작 원리

Google은 측정 프로젝트를 시작하기 전에 핵심 질문을 통해 가치를 평가한다:

1. **어떤 결과를 기대하고, 왜 그런가?** — 선입견을 인정하고 편향을 사전에 다룬다.

2. **데이터가 기대를 뒷받침하면 어떤 행동을 취할 것인가?** — 아무 행동도 취하지 않을 거라면 측정할 필요가 없다.

3. **부정적 결과가 나오면 적절한 행동을 취할 것인가?** — 이 질문이 가장 많은 프로젝트를 중단시킨다. 의사결정자가 부정적 결과에도 방향을 바꾸지 않을 거라면 측정이 무의미하다.

4. **누가 결과에 기반한 행동을 결정하고, 언제 할 것인가?** — 측정을 요청한 사람이 행동 권한을 가지고 있는지 확인한다.

측정이 부적절한 상황:
- 프로세스/도구를 바꿀 여유가 없을 때
- 결과가 곧 다른 요인에 의해 무효화될 때
- 사용 가능한 메트릭이 충분히 정밀하지 않을 때

## 예시

Google의 Readability 팀은 트리아지를 통과했다. 팀은 명확한 행동 계획을 제시했다: 분석 결과 비용이 효과를 초과하거나 효과가 미미하면 프로세스를 폐지하겠다고 약속했다.

반면, 릴리스 도구 팀의 요청은 거절되었다. 계획된 변경이 어차피 실행될 것이었고, 생산성 향상은 부수적 효과에 불과했기 때문이다.

## 관련 개념

- [Measuring Engineering Productivity](/knowledge/software-engineering/project-management/measuring-engineering-productivity/)
- [Goals-Signals-Metrics Framework](/knowledge/software-engineering/project-management/goals-signals-metrics-framework/)
- [QUANTS Framework](/knowledge/software-engineering/project-management/quants-framework/)
