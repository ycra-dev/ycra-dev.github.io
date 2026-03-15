---
title: "실효적 오탐 (Effective False Positive)"
description: "개발자가 분석 결과를 본 후 어떠한 긍정적 조치도 취하지 않은 이슈를 의미하는 사용자 인식 기반의 오탐률 측정 방식"
tags: ["Software Engineering", "Static Analysis"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/quality-and-configuration/effective-false-positive
sidebar:
  order: 314
---

## 핵심 개념

유효 오탐(Effective False Positive)은 개발자가 분석 결과를 본 후 어떠한 긍정적 조치도 취하지 않은 이슈를 의미한다. 기술적 정확성이 아닌 사용자 인식(perception)에 기반한 오탐률 측정 방식이다.

## 동작 원리

전통적인 정적 분석 연구는 미탐(false negative, 버그를 놓치는 것) 줄이기에 집중했다. 그러나 실제로는 낮은 오탐률이 개발자가 도구를 사용하려는 의지에 결정적이다.

Google은 "유효 오탐"이라는 개념을 도입하여 인식의 중요성을 강조했다:
- 기술적으로 정확하지만 혼란스러운 메시지로 인해 오탐으로 오해받는 경고 → 유효 오탐
- 기술적으로 맞지만 중요하지 않은 경고 → 유효 오탐
- 분석이 잘못 보고했더라도 개발자가 기꺼이 수정하면(예: 코드 가독성 개선) → 유효 오탐이 아님

이 기준이 중요한 이유는, 정적 분석 도구의 궁극적인 목적은 개발자가 실제로 코드를 개선하도록 돕는 것이기 때문이다. 기술적으로 맞더라도 개발자가 무시하는 경고는 목적을 달성하지 못한다.

Tricorder의 유효 오탐률 목표는 **10% 미만**이며, 전체 플랫폼 수준에서는 약 5% 미만을 유지한다.

## 예시

Java의 `contains` 메서드(사실상 `containsValue`와 동일) 대신 `containsKey`를 의도한 경우를 잡는 분석이 있다. 개발자가 실제로 value를 확인하려 했더라도, `containsValue`로 변경하면 코드가 더 명확해지므로 개발자가 기꺼이 수정한다면 이는 유효 오탐이 아니다.

Error Prone의 `printf` 경고 메시지를 개선하는 것만으로 버그 리포트가 줄어든 사례도 있다. 메시지가 명확하면 개발자가 오탐이 아님을 이해하고 수정하기 때문이다.

## 관련 개념

- [트리코더 (Tricorder)](/knowledge/software-engineering/quality-and-configuration/tricorder/)
- [에러 프론 (Error Prone)](/knowledge/software-engineering/quality-and-configuration/error-prone/)
- [정적 분석의 수정 제안 (Suggested Fixes in Static Analysis)](/knowledge/software-engineering/quality-and-configuration/suggested-fixes-in-static-analysis/)
