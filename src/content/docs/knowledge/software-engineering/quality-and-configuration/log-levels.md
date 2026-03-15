---
title: "로그 레벨 (Log Levels)"
description: "로그 메시지의 중요도를 분류하여 운영자가 출력량을 제어할 수 있게 하는 체계"
tags: ["Software Engineering", "Observability", "Operations"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/quality-and-configuration/log-levels
sidebar:
  order: 19
---

## 핵심 개념

로그 레벨(Log Levels)은 로그 메시지의 중요도를 분류하여 운영자가 출력량을 제어할 수 있게 하는 체계이다. TRACE, DEBUG, INFO, WARN, ERROR, FATAL 순으로 중요도가 높아진다.

## 동작 원리

각 레벨의 용도:
- **TRACE**: 개발 중 줄 단위 디버깅. 매우 상세하여 프로덕션에서는 사용 안 함
- **DEBUG**: 프로덕션 이슈 조사 시 유용한 세부 정보
- **INFO**: 기본 레벨. 정상 운영 상태 ("서비스 시작", "포트 8080 리스닝")
- **WARN**: 조치가 필요한 잠재적 문제 (deprecated API 사용, 느린 쿼리)
- **ERROR**: 즉각 주의가 필요한 오류. 알림 트리거 대상
- **FATAL**: 프로그램 즉시 종료 직전 마지막 메시지

로그 작성 3원칙:
1. **원자적**: 한 줄에 모든 필요한 정보를 포함 (멀티스레드 환경에서 다른 스레드 로그와 섞이지 않음)
2. **빠르게**: 파라미터화된 문자열 사용 (레벨이 비활성화 시 문자열 연산 자체를 건너뜀)
3. **보안적**: 비밀번호, API 키, PII(개인 식별 정보) 제외

## 예시

```java
// Bad: 문자열 연결 - TRACE가 비활성화여도 항상 실행
log.trace("Processing " + request.toString());

// Good: 파라미터화 - TRACE 비활성화 시 문자열 연결 자체가 안 일어남
log.trace("Processing {}", request);
```

```java
// Bad: 여러 줄로 나누면 다른 스레드 로그와 섞임
log.info("User: " + userId);
log.info("Action: " + action);

// Good: 한 줄에 모든 컨텍스트 포함
log.info("User {} performed action {} on resource {}", userId, action, resourceId);
```

```java
// Bad: 민감 정보 포함
log.info("Login attempt for user {} with password {}", user, password);

// Good: 민감 정보 제외
log.info("Login attempt for user {}", user);
```

로그 레벨 설정 전략:
```yaml
# 프로덕션 기본: INFO
# 이슈 조사 시: DEBUG (특정 서비스만)
# 개발 환경: DEBUG 또는 TRACE

logging:
  root: INFO
  com.example.payment: DEBUG  # 결제 서비스만 상세 로그
```

## 관련 개념

- [관측 가능성 (Observability)](/knowledge/software-engineering/quality-and-configuration/observability/)
- [분산 추적 (Distributed Tracing)](/knowledge/software-engineering/quality-and-configuration/distributed-tracing/)
- [방어적 프로그래밍 (Defensive Programming)](/knowledge/software-engineering/foundations/defensive-programming/)
- [디버깅 (Debugging)](/knowledge/software-engineering/foundations/debugging/)
