---
title: "Software Abstraction"
description: "복잡한 시스템의 핵심 개념을 단순한 인터페이스로 캡슐화하는 설계 기법으로, 올바른 추상화는 엔지니어 생산성을 한 자릿수 이상 증가시킨다"
tags: ["SoftwareEngineering", "Architecture", "Design", "EffectiveEngineer"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/foundations/software-abstraction
sidebar:
  order: 120
---

## 핵심 개념

소프트웨어 추상화는 복잡한 시스템의 핵심 개념을 단순한 인터페이스로 캡슐화하여, 엔지니어가 내부 구현을 알 필요 없이 기능을 사용할 수 있게 하는 설계 기법이다. 올바른 추상화는 엔지니어 생산성을 한 자릿수(order of magnitude) 이상 증가시킨다.

## 동작 원리

**Google MapReduce 사례:**
- Before: 저자의 MIT 분산 DB 프로토타입 — 수천 줄의 인프라 코드로 겨우 4대의 머신 운용
- After: MapReduce의 20줄 커스텀 코드로 수천 대 머신 활용
- 결과: 4년 내 10,000+ 개의 고유 MapReduce 앱 작성됨

**좋은 추상화의 특성 (Joshua Bloch):**
- 배우기 쉬움
- 문서 없이도 사용 가능
- 오용하기 어려움
- 요구사항을 충족할 만큼 강력
- 확장하기 쉬움
- 대상 청중에 적합

**과잉 추상화의 위험 — Asana의 실패 사례:**
Asana는 1년 이상을 자체 웹 앱 프레임워크(Luna/Lunascript)와 자체 언어 개발에 투자했다. 결국 해결되지 않은 연구 수준의 문제, 불충분한 도구 지원 → JavaScript로 복귀. 제품 공개 데모까지 2년 소요.

**핵심 원칙:**
- 문제를 완전히 이해하기 전에 추상화를 구축하면 오버피팅됨
- 나쁜 추상화는 미래 개발을 느리게 하는 부채가 된다
- 핵심 추상화(로깅, 인증 라이브러리)에 높은 투자 가치
- 한 번 쓰는 스크립트에는 추상화 불필요

## 예시

```python
# 좋은 추상화 vs 나쁜 추상화

# 좋은 추상화: MapReduce
def word_count_mapreduce():
    """20줄로 수천 대 머신에서 단어 빈도 계산"""
    def mapper(key, value):
        for word in value.split():
            emit(word, 1)

    def reducer(key, values):
        emit(key, sum(values))

# 나쁜 추상화 1: 너무 이른 일반화
# 하나의 유스케이스만 있는데 범용 프레임워크를 구축
# → 복잡하고, 사용하기 어렵고, 유지보수 부담

# 나쁜 추상화 2: 잘못된 레이어
class DatabaseConnection:
    def execute_query_with_retry_and_logging_and_cache(
        self, sql, retry_count=3, use_cache=True, log_level="INFO"
    ):
        # 너무 많은 책임 → 인터페이스가 복잡해짐
        pass

# 좋은 추상화: 명확한 단일 책임
class QueryExecutor:
    def execute(self, sql: str) -> Result: ...

class RetryDecorator:
    def with_retry(self, executor, max_retries=3): ...
```

## 관련 개념

- [Operational Simplicity](/knowledge/software-engineering/safety-and-resilience/operational-simplicity/)
- [Technical Debt](/knowledge/software-engineering/design-and-evolution/technical-debt/)
