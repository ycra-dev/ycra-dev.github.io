---
title: "Critique Static Analysis Integration"
description: "코드 변경 스냅샷 업로드 시 자동으로 코드 분석기를 실행하고 결과를 리뷰 페이지에 표시하는 Critique 기능"
tags: ["Software Engineering", "Code Review", "Static Analysis", "Developer Tools"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/quality-and-configuration/critique-static-analysis-integration
sidebar:
  order: 310
---

## 핵심 개념

Critique의 정적 분석 통합은 코드 변경의 스냅샷 업로드 시 자동으로 코드 분석기를 실행하고, 결과를 리뷰 페이지에 표시하여 인간 리뷰어가 검토하기 전에 잠재적 문제를 발견하는 기능이다.

## 동작 원리

스냅샷이 업로드되면 코드 분석기(주로 Tricorder)가 트리거된다. 결과는 변경 페이지에 두 가지 형태로 표시된다:
- **분석기 상태 칩**: 변경 설명 아래에 요약 표시. 빨간색은 강조 사항, 노란색은 진행 중, 회색은 기타
- **분석 탭**: 상세한 분석 결과

Actionability(실행 가능성)는 이진 옵션이다: 강조 표시할 발견 사항과 그렇지 않은 것만 구분하여 단순성을 유지한다.

분석기 발견 사항은 코멘트와 비슷하게 diff 내에 표시되지만, 시각적으로 구분되도록 스타일이 다르다. 수정 제안(fix suggestion)이 포함될 수 있어 작성자가 미리보기 후 한 번의 클릭으로 적용할 수 있다.

리뷰어가 관련 분석기 발견 사항을 보면 "Please fix" 버튼을 클릭하여 작성자에게 수정을 요청하는 미해결 코멘트를 생성할 수 있다.

테스트 실행은 리소스가 많이 들어 모든 스냅샷이 아닌 리뷰 요청 및 커밋 시점(presubmit)에만 실행된다.

## 예시

린터가 줄 끝의 불필요한 공백을 발견하면, 변경 페이지에 해당 린터의 칩이 표시된다. 작성자는 칩에서 두 번의 클릭으로 문제가 있는 코드의 diff로 이동하고, 대부분의 린터 위반에는 수정 제안이 포함되어 있어 한 번의 클릭으로 수정을 미리보고 또 한 번의 클릭으로 적용할 수 있다.

## 관련 개념

- [Critique](/knowledge/software-engineering/quality-and-configuration/critique/)
- [Tricorder](/knowledge/software-engineering/quality-and-configuration/tricorder/)
- [Presubmit Checks](/knowledge/software-engineering/quality-and-configuration/presubmit-checks/)
- [Suggested Fixes in Static Analysis](/knowledge/software-engineering/quality-and-configuration/suggested-fixes-in-static-analysis/)
