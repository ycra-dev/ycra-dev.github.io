---
title: "Suggested Fixes in Static Analysis"
description: "정적 분석 도구가 발견한 문제에 대해 즉시 적용 가능한 코드 수정을 함께 제공하는 기능"
tags: ["Software Engineering", "Static Analysis", "Automation"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/quality-and-configuration/suggested-fixes-in-static-analysis
sidebar:
  order: 317
---

## 핵심 개념

정적 분석의 자동 수정 제안(Suggested Fixes)은 분석 도구가 발견한 문제에 대해 즉시 적용 가능한 코드 수정을 함께 제공하는 기능이다. 메시지가 불명확할 때 추가 문서 역할도 하며, 개발자가 문제를 해결하는 데 필요한 노력을 최소화한다.

## 동작 원리

자동 수정 제안은 정적 분석의 비용-편익 트레이드오프에서 비용을 크게 줄여주는 핵심 기능이다. Google에서는 특히 **스타일 이슈는 자동으로 수정되어야 한다**는 접근을 취한다.

자동 포매터가 소스 코드를 자동으로 재포맷하며, 포맷팅 오류를 지적하는 것은 인간 리뷰어의 시간을 낭비하는 것으로 간주한다.

Critique에서 직접 또는 커맨드라인 도구를 통해 전체 코드 변경에 걸쳐 수정을 적용할 수 있다. 프로젝트 수준의 커스터마이징(사용자 수준이 아닌)을 통해 팀 전체가 일관된 분석 결과를 보도록 보장한다.

사용자 커스터마이징을 제거하고 팀 수준 커스터마이징으로 전환한 결과, 숨겨진 버그와 피드백 억제 문제를 발견하여 수정할 수 있었다. 예: C++ 린터가 Objective-C 파일에서도 실행되어 무용한 결과를 생성하는 버그를 발견.

## 예시

Tricorder 사용 통계:
- 리뷰어가 하루 수천 번 "Please Fix" 클릭
- 개발자가 하루 약 3,000번 자동 수정 적용
- "Not useful" 클릭은 하루 약 250번

이 수치는 자동 수정 제안이 실제로 개발자의 워크플로에 깊숙이 통합되어 있음을 보여준다. 수정이 쉬울수록 더 많은 버그가 수정된다.

## 관련 개념

- [Tricorder](/knowledge/software-engineering/quality-and-configuration/tricorder/)
- [Effective False Positive](/knowledge/software-engineering/quality-and-configuration/effective-false-positive/)
- [Critique Static Analysis Integration](/knowledge/software-engineering/quality-and-configuration/critique-static-analysis-integration/)
- [Large-Scale Changes](/knowledge/software-engineering/design-and-evolution/large-scale-changes/)
