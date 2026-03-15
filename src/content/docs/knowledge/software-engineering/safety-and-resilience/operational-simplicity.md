---
title: "운영 단순성 (Operational Simplicity)"
description: "시스템을 이해하고 유지보수하고 확장하기 쉽게 만들어 운영 부담을 최소화하는 설계 원칙 — Instagram이 13명으로 4,000만 사용자를 지원한 비결"
tags: ["SoftwareEngineering", "Architecture", "Operations", "EffectiveEngineer"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/safety-and-resilience/operational-simplicity
sidebar:
  order: 12
---

## 핵심 개념

운영 단순성(Operational Simplicity)은 시스템을 이해하고, 유지보수하고, 확장하기 쉽게 만들어 운영 부담을 최소화하는 설계 원칙이다. "단순한 것을 먼저 하라(Do the simple thing first)"로 요약된다.

## 동작 원리

**Instagram 사례:** 13명의 직원으로 4,000만 사용자 지원 (사용자 대 직원 비율 300만:1). Mike Krieger(공동창업자/CTO): "추가하는 모든 기술은 시간이 지남에 따라 수학적으로 반드시 문제를 일으키며, 어느 시점에서 팀 전체가 운영에 소모된다."

**Instagram의 전략:**
- 유행하는 NoSQL 대신 검증된 PostgreSQL, Memcache, Redis 사용
- 불필요한 커스텀 소프트웨어 작성 회피
- 모든 설계 리뷰에서 "이것이 가장 단순한 방법인가?" 질문

**Pinterest의 실패와 회복:**
- 초기 2년: 7가지 기술(MySQL, Cassandra, Membase, Memcache, Redis, Elastic Search, MongoDB) 혼재 → 엔지니어 3명이 감당 불가
- 해결: MySQL, Memcache, Redis, Solr로 단순화 → 이후 4배 성장은 단순히 같은 종류의 머신 추가로 달성

**복잡한 아키텍처의 비용:**
1. 엔지니어링 전문성이 여러 시스템에 분산
2. 단일 장애점 증가 (2명 이상이 커버 가능한 영역 감소)
3. 신입 엔지니어의 학습 곡선 증가
4. 추상화/라이브러리/도구 개선 노력 분산

## 예시

```python
# 기술 선택의 단순성 체크리스트
before_adopting_new_tech = [
    "팀원들이 이 기술에 경험이 있는가?",
    "배우기 쉬운가?",
    "이 기술 숙련 엔지니어를 채용할 수 있는가?",
    "유사 규모의 다른 팀이 성공적으로 사용하고 있는가?",
    "기존 도구를 재활용할 수 있는가?",
    "분산 클러스터가 정말 필요한가, 아니면 강력한 단일 머신으로 충분한가?"
]

# Instagram vs 복잡성 함정
instagram = {
    "db": "PostgreSQL",
    "cache": "Memcache + Redis",
    "result": "40M 사용자, 13명"
}

complexity_trap = {
    "db": "MongoDB + Cassandra + MySQL",
    "cache": "Redis + Memcache + Varnish",
    "result": "운영 부담으로 기능 개발 정체"
}
```

## 관련 개념

- [빠른 실패 (Fail Fast)](/knowledge/software-engineering/safety-and-resilience/fail-fast/)
- [자동화 (Automation)](/knowledge/software-engineering/foundations/automation/)
- [소프트웨어 추상화 (Software Abstraction)](/knowledge/software-engineering/foundations/software-abstraction/)
