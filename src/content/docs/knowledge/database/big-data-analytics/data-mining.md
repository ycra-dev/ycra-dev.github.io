---
title: "Data Mining"
description: "데이터 마이닝(Data Mining)은 머신 러닝 연구자가 개발한 지식 발견 기법과 대규모 데이터베이스에서 이를 효율적으로 실행할 수 있는 구현 기법을 결합한 분야이다"
tags: ['Data Mining', 'Machine Learning', 'Classification', 'Prediction', 'Knowledge Discovery']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/database/data-mining
sidebar:
  order: 14
---

## 핵심 개념

데이터 마이닝은 데이터 분석의 핵심 구성요소로, 과거 데이터에서 패턴을 찾고 이를 기반으로 미래를 예측하는 데 사용된다. 조직은 올바른 의사결정의 재무적 이점이 매우 크고, 잘못된 의사결정의 비용도 상당하기 때문에 데이터 수집과 분석 시스템 구축에 많은 투자를 한다.

데이터 마이닝의 주요 활용 사례:
1. **대출 심사**: 과거 고객의 대출 부도 이력을 분석하여 급여, 교육 수준, 직업 이력 등의 주요 특징을 찾고, 의사결정 트리(decision tree) 같은 예측 모델을 구축한다. 새 고객이 대출을 신청하면 모델이 부도 가능성을 예측한다.

2. **온라인 광고**: 과거 사용자의 행동과 프로필을 분석하여 어떤 광고에 사용자가 가장 잘 반응할지 예측한다.

3. **수요 예측**: 과거 판매 이력을 분석하여 미래 판매를 예측하고, 제조 및 주문 의사결정에 활용한다. 예를 들어, 자동차 회사가 소형 스포츠카를 주로 연수입 5만 달러 이상의 젊은 여성이 구매한다는 것을 발견하면, 이 타겟 그룹에 마케팅을 집중할 수 있다.

머신 러닝 기법은 데이터에서 패턴을 찾고 예측을 만드는 핵심이다. R 언어는 통계 분석과 데이터 마이닝에 널리 사용되며, Apache Spark와 통합하여 대규모 데이터셋에서 R 프로그램을 병렬로 실행할 수 있다.

## 예시

의사결정 트리를 이용한 대출 심사 과정:

1. 훈련 데이터 준비: 과거 대출 고객의 특징(급여, 나이, 직업 등)과 결과(부도 여부)
2. 모델 학습: 의사결정 트리 알고리즘으로 분류 규칙 생성
3. 예측: 새 고객의 특징을 모델에 입력하여 부도 확률 예측
4. 의사결정: 예측된 부도 확률을 기반으로 대출 승인/거부 결정

```
예시 의사결정 규칙:
IF salary > 50000 AND employment_years > 3 THEN low_risk
IF salary < 30000 AND debt_ratio > 0.5 THEN high_risk
```

## 관련 개념

- [Data Warehouse](/knowledge/database/data-warehouse/)
- [OLAP](/knowledge/database/olap/)
- [Decision Support System](/knowledge/database/decision-support-system/)
- [Data Cube](/knowledge/database/data-cube/)
