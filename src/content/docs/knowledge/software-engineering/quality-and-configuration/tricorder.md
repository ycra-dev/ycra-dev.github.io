---
title: "Tricorder"
description: "Google의 정적 분석 플랫폼으로, 코드 리뷰 도구에 통합되어 개발자에게 분석 결과를 직접 제공하는 마이크로서비스 아키텍처 기반 시스템"
tags: ["Software Engineering", "Static Analysis", "Developer Tools"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/quality-and-configuration/tricorder
sidebar:
  order: 313
---

## 핵심 개념

Tricorder는 Google의 정적 분석 플랫폼으로, 코드 리뷰 도구 Critique에 통합되어 개발자에게 분석 결과를 직접 제공한다. 마이크로서비스 아키텍처 기반으로, 하루 50,000건 이상의 코드 리뷰 변경을 분석하며 30개 이상의 언어에 대해 100개 이상의 분석기(analyzer)를 지원한다.

## 동작 원리

Tricorder는 Google에서 정적 분석을 개발자 워크플로에 통합하려는 여러 차례 실패한 시도 끝에 탄생했다. 핵심 차별점은 **가치 있는 결과만 전달**하겠다는 집요한 초점이었다. 전체 유효 오탐률은 5% 미만이다.

새로운 Tricorder 체크의 4가지 기준:
1. 이해하기 쉬울 것
2. 조치 가능하고 수정이 쉬울 것
3. 유효 오탐률 10% 미만
4. 코드 품질에 유의미한 영향을 미칠 잠재력이 있을 것

Tricorder는 Critique의 diff 뷰어에 회색 코멘트 박스로 경고를 표시한다. "Not useful" 버튼과 "Please fix" 버튼을 통한 피드백 루프가 있어 분석기 품질을 지속적으로 개선한다.

## 예시

- 리뷰어가 하루 수천 번 "Please Fix" 클릭
- 개발자가 하루 약 3,000번 자동 수정 적용
- "Not useful" 클릭은 하루 약 250번

Error Prone의 `printf` 경고 메시지를 `%s`만 지원한다는 문구로 변경한 것만으로 버그 리포트가 중단된 사례가 있다. 이는 메시지의 명확성이 얼마나 중요한지를 보여준다.

## 관련 개념

- [Effective False Positive](/knowledge/software-engineering/quality-and-configuration/effective-false-positive/)
- [Error Prone](/knowledge/software-engineering/quality-and-configuration/error-prone/)
- [Presubmit Check](/knowledge/software-engineering/quality-and-configuration/presubmit-check/)
- [Suggested Fixes in Static Analysis](/knowledge/software-engineering/quality-and-configuration/suggested-fixes-in-static-analysis/)
- [Critique Static Analysis Integration](/knowledge/software-engineering/quality-and-configuration/critique-static-analysis-integration/)
