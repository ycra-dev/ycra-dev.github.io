---
title: "칸반 (Kanban)"
description: "작업 항목을 시각적으로 관리하고 동시에 진행 중인 작업 수(WIP)를 제한하여 팀의 흐름을 최적화하는 애자일 방법론이다."
tags: ["Software Engineering", "Agile", "Kanban", "Workflow"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/agile-methods/kanban
sidebar:
  order: 8
---

## 핵심 개념

칸반(Kanban)은 일본 도요타의 린(Lean) 제조 시스템에서 유래했다. 소프트웨어 개발에서는 작업 항목을 보드의 카드로 표현하고, 각 열을 통과하며 완성 단계로 흘러가게 한다. 스크럼과 달리 스프린트 주기 없이 지속적으로 작업을 흘려보내는(flow) 방식이다.

## 동작 원리

칸반 보드의 기본 구조:

```
| 백로그 | 진행 예정 | 진행 중(WIP≤3) | 리뷰 | 완료 |
|--------|----------|----------------|------|------|
| 태스크A|  태스크C  |   태스크D      | 태D2 | 태스크B |
| 태스크E|           |   태스크F      |      |      |
```

핵심 원칙 4가지:
1. **시각화**: 모든 작업을 보드에 카드로 표현
2. **WIP 제한**: 동시에 진행 중인 작업 수를 제한 (병목 방지)
3. **흐름 관리**: 작업이 보드를 빨리 통과하도록 최적화
4. **명시적 정책**: 각 열의 완료 기준 명확히 정의

WIP 제한의 효과: 5개 작업을 동시에 진행하면 각각 50%만 완성되지만, WIP를 2로 제한하면 2개가 빨리 완성되어 실제 처리량(throughput)이 높아진다.

## 예시

- Jira 칸반 보드: "To Do → In Progress(max 3) → In Review → Done"
- WIP 초과 시: 새 작업을 시작하기 전에 이미 진행 중인 작업을 완료해야 함
- 팀원이 "In Progress" 카드가 가득 찰 때 새 작업 대신 리뷰 대기 중인 카드를 도와줌

## 관련 개념

- [스크럼](/knowledge/software-engineering/agile-methods/scrum/)
- [애자일 소프트웨어 개발](/knowledge/software-engineering/agile-methods/agile-software-development/)
- [지속적 통합](/knowledge/software-engineering/agile-methods/continuous-integration/)
