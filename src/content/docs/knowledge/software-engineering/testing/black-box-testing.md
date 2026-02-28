---
title: "Black Box Testing"
description: "내부 구현을 모르는 상태에서 입력과 출력만으로 소프트웨어의 기능을 검증하는 테스트 기법이다."
tags: ["Software Engineering", "Testing", "QA"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/testing/black-box-testing
sidebar:
  order: 8
---

## 핵심 개념

블랙박스 테스트는 테스터가 소스코드나 내부 로직을 보지 않고, 오직 입력과 출력의 관계만으로 소프트웨어를 검증하는 방법이다. 비행기 블랙박스처럼 "내부는 모르지만 결과는 검증"한다. 반대 개념인 화이트박스 테스트는 내부 코드 경로를 알고 테스트한다.

## 동작 원리

블랙박스 테스트의 주요 기법:

| 기법 | 설명 |
|------|------|
| 동치 분할(Equivalence Partitioning) | 유사한 입력을 하나의 대표값으로 테스트 |
| 경계값 분석(Boundary Value Analysis) | 최솟값, 최댓값, 경계 ±1 테스트 |
| 결정 테이블(Decision Table) | 조건 조합별 예상 결과 정의 |
| 상태 전이(State Transition) | 상태 변화에 따른 동작 검증 |

테스터의 관점: "이 기능에 X를 입력하면 Y가 나와야 한다"는 명세 기반으로 테스트 케이스를 설계한다.

## 예시

- 로그인 폼 테스트: 올바른 ID/PW → 로그인 성공, 틀린 PW → 오류 메시지, 빈 필드 → 유효성 오류
- 나이 입력 필드(0~120): 경계값 -1, 0, 1, 119, 120, 121을 각각 테스트
- API 엔드포인트 테스트: 올바른 JSON → 200 OK, 잘못된 형식 → 400 Bad Request
- QA 엔지니어가 기능 명세서만 보고 테스트 케이스 작성

## 관련 개념

- [단위 테스트](/knowledge/software-engineering/testing/unit-testing/)
- [회귀 테스트](/knowledge/software-engineering/testing/regression-testing/)
- [동치 분할](/knowledge/software-engineering/testing/equivalence-partitioning/)
