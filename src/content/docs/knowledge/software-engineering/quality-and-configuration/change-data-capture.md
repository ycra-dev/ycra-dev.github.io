---
title: "변경 데이터 캡처 (Change Data Capture)"
description: "데이터베이스의 변경 연산을 이벤트 메시지로 변환하여 다운스트림 소비자에게 전달하는 아키텍처 패턴"
tags: ["Software Engineering", "Data Engineering", "Event-Driven", "Database"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/quality-and-configuration/change-data-capture
sidebar:
  order: 41
---

## 핵심 개념

변경 데이터 캡처(Change Data Capture, CDC)는 데이터베이스의 INSERT, UPDATE, DELETE 연산을 이벤트 메시지로 변환하여 다운스트림 소비자에게 전달하는 아키텍처 패턴이다. 데이터베이스 트랜잭션 로그(binlog, WAL)를 읽어 변경사항을 추출한다.

## 동작 원리

CDC의 활용:
- DB 변경 이벤트를 메시지 큐로 발행 → 다른 서비스가 구독
- 검색 인덱스 실시간 동기화
- 데이터 웨어하우스로 실시간 데이터 복제
- 이벤트 기반 마이크로서비스 통합

중요한 암묵적 API:
- CDC로 발행되는 메시지는 암묵적 API이다
- **후방 비호환 스키마 변경**이 구독 서비스를 깨뜨릴 수 있다
- 프로덕션 DB 컬럼 삭제가 데이터 웨어하우스 전체 파이프라인 중단 가능

보호 방법:
- 코드 커밋 시 DDL 호환성 검사
- 프리프로덕션 환경에서 통합 테스트
- 데이터 프로덕트(data product)로 내부/외부 스키마 분리

## 예시

CDC 아키텍처:
```
프로덕션 DB (users 테이블)
    │
    ▼
CDC 커넥터 (Debezium)
    │
    ▼
Kafka 토픽 (users.changes)
    │
    ├──▶ 검색 인덱스 업데이트 (Elasticsearch)
    ├──▶ 이메일 서비스 (환영 메일 발송)
    └──▶ 데이터 웨어하우스 (분석용 복제)

⚠️ users 테이블의 email 컬럼 삭제
   → Elasticsearch 싱크 실패
   → 이메일 서비스 역직렬화 오류
   → 데이터 웨어하우스 파이프라인 중단
```

Debezium으로 MySQL CDC:
```json
// CDC 이벤트 메시지 예시
{
  "op": "u",  // update
  "before": {"id": 1, "name": "Alice", "email": "alice@old.com"},
  "after": {"id": 1, "name": "Alice", "email": "alice@new.com"},
  "source": {"table": "users", "ts": 1709038800}
}
```

스키마 변경 안전한 절차:
```
1. 새 컬럼 추가 (기존 컬럼 유지)
   ALTER TABLE users ADD COLUMN email_v2 VARCHAR(255);

2. 두 컬럼 모두 발행하도록 CDC 업데이트
   → 다운스트림 소비자가 email_v2로 마이그레이션 완료

3. 기존 컬럼 삭제
   ALTER TABLE users DROP COLUMN email;
```

## 관련 개념

- [스키마 마이그레이션 (Schema Migration)](/knowledge/software-engineering/quality-and-configuration/schema-migration/)
- [하위 호환성 (Backward Compatibility)](/knowledge/software-engineering/design-and-evolution/backward-compatibility/)
- [분산 추적 (Distributed Tracing)](/knowledge/software-engineering/quality-and-configuration/distributed-tracing/)
