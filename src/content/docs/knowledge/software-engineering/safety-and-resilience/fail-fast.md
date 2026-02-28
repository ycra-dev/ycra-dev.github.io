---
title: "Fail Fast"
description: "문제 발생 시 즉시 그리고 눈에 띄게 실패하도록 소프트웨어를 설계하여, 버그의 근본 원인을 빠르게 찾아 수정할 수 있게 하는 기법"
tags: ["SoftwareEngineering", "Reliability", "ErrorHandling", "EffectiveEngineer"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/safety-and-resilience/fail-fast
sidebar:
  order: 13
---

## 핵심 개념

빠른 실패(Fail Fast)는 문제 발생 시 즉시 그리고 눈에 띄게 실패하도록 소프트웨어를 설계하여, 버그의 근본 원인을 빠르게 찾아 수정할 수 있게 하는 기법이다. 직관에 반하지만, 빠르게 실패하는 시스템이 더 취약한 것이 아니라 오히려 더 견고하다.

## 동작 원리

**느린 실패(Fail Slowly)의 문제:**
- 잘못된 설정값을 기본값으로 대체 → 프로덕션에서 DB 쿼리가 느려진 이유를 찾지 못함
- 사용자 상태 저장 실패를 무시 → 훨씬 나중에 데이터 불일치 발견
- 손상된 로그 데이터를 건너뜀 → 분석 보고서의 숫자가 불일치

**실제 실패 사례:**
1. **MySQL 연결 풀 버그**: 요청 타임아웃 시 연결을 리셋하지 않음 → 다음 요청이 이전 응답 수신 → 데이터 손상이 캐시층으로 전파 → 1주일 이상 디버깅. 연결 리셋 시 빠른 실패만 있었어도 즉시 발견.
2. **Memcached 만료 시간**: 30일(2,592,000초) 이상은 UNIX 타임스탬프로 해석. 40일 설정 → 1970년으로 해석 → 즉시 만료 → DB 부하 급증.

**빠른 실패의 실천:**
- 시작 시 설정 오류에서 크래시
- 소프트웨어 입력 조기 검증
- 처리할 수 없는 외부 서비스 오류를 삼키지 않고 전파
- 데이터 구조 손상 시 전파 대신 즉시 예외
- 핵심 불변 조건에 대한 assertion + 설명적 메시지

**하이브리드 접근:** 컴포넌트는 빠르게 실패하되, 글로벌 예외 핸들러가 에러를 로깅하고 사용자에게는 우아하게 처리.

## 예시

```python
# 느린 실패 vs 빠른 실패

# 느린 실패 (나쁨): 문제를 숨김
def get_config(key):
    value = config.get(key)
    if value is None:
        return DEFAULT_VALUE  # 문제를 숨김!
    return value

# 빠른 실패 (좋음): 즉시 실패하여 문제를 드러냄
def get_config(key):
    value = config.get(key)
    if value is None:
        raise ConfigError(f"Required config '{key}' is missing")
    return value

# 하이브리드 접근 (프로덕션): 컴포넌트는 빠르게 실패, 전체는 우아하게
def render_page(components):
    results = []
    for component in components:
        try:
            results.append(component.render())  # 각 컴포넌트는 빠르게 실패
        except ComponentError as e:
            log_error(e)           # 엔지니어에게 즉시 알림
            results.append(placeholder())  # 사용자에게는 우아하게
    return results

# Assertion으로 불변 조건 보호
def transfer_money(from_account, to_account, amount):
    assert amount > 0, f"Transfer amount must be positive, got {amount}"
    assert from_account.balance >= amount, "Insufficient funds"
    # ...
```

## 관련 개념

- [Operational Simplicity](/knowledge/software-engineering/safety-and-resilience/operational-simplicity/)
- [Chaos Engineering](/knowledge/software-engineering/safety-and-resilience/chaos-engineering/)
- [Automation](/knowledge/software-engineering/foundations/automation/)
