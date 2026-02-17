---
title: "Project Scheduling"
description: "프로젝트 일정 관리는 프로젝트의 작업을 별도의 태스크로 조직하고, 각 태스크의 실행 시기와 방법을 결정하며, 소요 시간과 노력을 추정하는 프로세스이다"
tags: ['Project Scheduling', 'Gantt Chart', 'Task Management', 'Milestones', 'Deliverables']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/software-engineering/project-scheduling
sidebar:
  order: 8
---

## 핵심 개념

계획 기반과 에자일 프로세스 모두 초기 프로젝트 일정이 필요하다. 태스크는 최소 1주에서 최대 2개월(6~8주)의 기간으로 설정해야 한다. 일정 표현에는 달력 기반 바 차트(Gantt 차트)와 활동 네트워크(activity network)가 사용된다. 프로젝트 마일스톤은 진행 상황을 평가할 수 있는 지점이며, 프로젝트 인도물(deliverables)은 고객에게 전달되는 작업 산출물이다. 태스크 간 의존성이 있어 병렬 수행과 순차 수행을 조정해야 하며, 예상치 못한 문제에 대비하여 30~50%의 비상 여유(contingency)를 추가해야 한다.

## 예시

```
Task | Effort(person-days) | Duration(days) | Dependencies
T1   |       15            |      10        |    -
T3   |       20            |      15        |   T1 (M1)
T6   |       10            |       5        |  T1, T2 (M4)
```
위와 같은 태스크 테이블을 기반으로 Gantt 차트를 생성하여 태스크 시작/종료 시점과 마일스톤을 시각적으로 표현할 수 있다.

## 관련 개념

- [Project Planning](/knowledge/software-engineering/project-planning/)
- [Agile Planning](/knowledge/software-engineering/agile-planning/)
- [Software Project Management](/knowledge/software-engineering/software-project-management/)
