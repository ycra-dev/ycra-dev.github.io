---
title: "Schema Migration"
description: "데이터베이스 스키마 변경을 자동화 도구로 추적하고 안전하게 적용하는 관행"
tags: ["Software Engineering", "Database", "DevOps", "Data Management"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/quality-and-configuration/schema-migration
sidebar:
  order: 40
---

## 핵심 개념

스키마 마이그레이션(Schema Migration)은 데이터베이스 스키마 변경을 자동화 도구로 추적하고 안전하게 적용하는 관행이다. Liquibase, Flyway(Java), Alembic(Python) 등의 도구가 스키마 전체 이력을 버전 관리 파일로 추적한다.

## 동작 원리

수동 DDL 실행의 문제:
- 환경 간 스키마 불일치 (개발/스테이징/프로덕션)
- 변경 이력 부재
- 성능 영향 불확실성 (대규모 테이블에 컬럼 추가 시 테이블 락)

핵심 원칙:
- **DB 마이그레이션과 애플리케이션 배포를 분리**: 스키마 변경은 섬세하고 성능 영향이 크다
- **롤백 주의**: 컬럼 삭제 롤백은 컬럼을 재생성하지만 데이터는 복구 안 됨
- **무중단 대규모 변경**: `gh-ost`, `pt-online-schema-change` 등 사용
- **격리된 DB**: 단일 앱만 접근하는 DB가 공유 DB보다 진화가 쉬움

## 예시

Flyway 워크플로우:
```sql
-- V1__create_users_table.sql
CREATE TABLE users (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL
);

-- V2__add_email_column.sql
ALTER TABLE users ADD COLUMN email VARCHAR(255);

-- V3__add_email_index.sql
CREATE INDEX idx_users_email ON users(email);
```

Alembic (Python) 예시:
```python
# migrations/versions/001_add_email.py
def upgrade():
    op.add_column('users',
        sa.Column('email', sa.String(255), nullable=True)
    )

def downgrade():
    op.drop_column('users', 'email')
    # ⚠️ 데이터 손실 주의!
```

무중단 컬럼 삭제 패턴 (3단계):
```
Step 1: 새 코드 배포 (컬럼 읽기/쓰기 중단, 컬럼은 유지)
Step 2: DB 마이그레이션 (컬럼 삭제)
Step 3: 코드에서 컬럼 참조 제거

→ 이 순서를 지키면 다운타임 없이 안전하게 컬럼 삭제 가능
```

## 관련 개념

- [Backward Compatibility](/knowledge/software-engineering/design-and-evolution/backward-compatibility/)
- [Domain-Driven Design](/knowledge/software-engineering/architectural-design/domain-driven-design/)
- [Change Data Capture](/knowledge/software-engineering/quality-and-configuration/change-data-capture/)
