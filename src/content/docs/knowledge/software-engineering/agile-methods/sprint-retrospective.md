---
title: "Sprint Retrospective"
description: "각 스프린트가 끝난 후 팀이 프로세스를 되돌아보고 개선점을 논의하는 미팅"
tags: ["Software Engineering", "Agile", "Scrum", "Continuous Improvement"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/agile-methods/sprint-retrospective
sidebar:
  order: 42
---

## 핵심 개념

스프린트 회고(Sprint Retrospective)는 각 스프린트가 끝난 후 팀이 모여 프로세스를 되돌아보고, 무엇이 잘 되었는지/무엇을 개선할지를 논의하여 다음 스프린트에 반영하는 미팅이다. 애자일의 "지속적 개선(continuous improvement)" 원칙을 실현하는 핵심 세레모니이다.

## 동작 원리

3단계 프로세스:
1. **공유(Share)**: 잘한 것 / 개선할 것 / 시도할 것을 공유
2. **우선순위 결정(Prioritize)**: 투표로 1~3개 핵심 항목 선정. 모든 문제를 한 번에 해결하려 하면 아무것도 개선되지 않는다
3. **문제 해결(Problem-solve)**: 담당자와 기한이 명확한 액션 아이템 도출

스프린트 리뷰 vs 회고:
- **스프린트 리뷰**: "무엇을 만들었는가" — 작업 결과물, 이해관계자 참석
- **스프린트 회고**: "어떻게 일했는가" — 팀 프로세스, 팀 내부만 참석

회고가 효과적이려면 **심리적 안전감(Psychological Safety)**이 필요하다. "누가 잘못했나"가 아니라 "어떤 프로세스가 이 실수를 방지할 수 있었을까"를 질문한다.

## 예시

회고 세션 진행:
```
[공유 단계]
잘한 것 (+):
  "페어 프로그래밍으로 온보딩이 빨라졌다" - 김개발
  "스프린트 목표 100% 달성!" - 전원

개선할 것 (-):
  "스프린트 중간에 긴급 요청이 3번 들어와서 집중이 깨졌다"
  "일일 스탠드업이 30분씩 걸린다"

시도할 것 (?):
  "긴급 요청 전담 로테이션 도입"

[우선순위 투표]
  1위: 긴급 요청 문제 (4표)
  2위: 스탠드업 시간 (3표)

[액션 아이템]
  담당: 이개발, 기한: 다음 스프린트부터
  → 주간 긴급 요청 담당자(shield) 지정

  담당: 스크럼 마스터, 기한: 2주 시험 운영
  → 비동기 스탠드업 시도
```

다음 회고에서 확인:
```
[이전 액션 확인]
✓ 긴급 요청 담당 로테이션: 도입 완료, 집중도 향상
✗ 비동기 스탠드업: 글을 안 읽음
  → 수정: 짧은 동기 스탠드업(10분) + Slack으로 상세 내용
```

## 관련 개념

- [Scrum](/knowledge/software-engineering/agile-methods/scrum/)
- [Agile Software Development](/knowledge/software-engineering/agile-methods/agile-software-development/)
- [Postmortem](/knowledge/software-engineering/quality-and-configuration/postmortem/)
- [Psychological Safety](/knowledge/software-engineering/agile-methods/psychological-safety/)
