---
title: "Authorization"
description: "권한 부여(authorization)는 데이터베이스에서 사용자가 데이터에 접근하거나 수정할 수 있는 권한을 제어하는 보안 메커니즘으로, GRANT와 REVOKE 문을 통해 세밀한 접근 제어를 구현한다"
tags: ['Authorization', 'Privilege', 'Grant', 'Revoke', 'Security']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/database/authorization
sidebar:
  order: 18
---

## 핵심 개념

데이터베이스 시스템에서 권한 부여는 데이터 보안의 핵심이다. 데이터베이스의 여러 부분에 대해 사용자마다 다른 수준의 접근을 허용하여, 불필요한 데이터 노출이나 무단 수정을 방지한다.

SQL에서 제공하는 주요 권한(privilege) 유형은 다음과 같다:

**SELECT:** 릴레이션의 데이터를 읽을 수 있는 권한이다.
**INSERT:** 릴레이션에 새로운 튜플을 삽입할 수 있는 권한이다.
**UPDATE:** SQL UPDATE 문을 사용하여 튜플을 수정할 수 있는 권한이다.
**DELETE:** 릴레이션에서 튜플을 삭제할 수 있는 권한이다.

이 외에도 REFERENCES(외래키 생성 권한), INDEX(인덱스 생성/삭제 권한) 등이 있다. ALL PRIVILEGES는 모든 권한을 포괄한다.

**GRANT 문:** 다른 사용자에게 권한을 부여한다. WITH GRANT OPTION을 추가하면, 권한을 받은 사용자가 다시 다른 사용자에게 해당 권한을 부여할 수 있다.

**REVOKE 문:** 사용자에게 부여된 권한을 회수한다. 권한 회수는 연쇄적(cascading)으로 적용될 수 있다. 즉, A가 B에게, B가 C에게 권한을 부여한 경우, A가 B의 권한을 회수하면 C의 권한도 함께 회수된다.

**역할(Role):** 권한의 집합을 하나의 역할로 정의하고, 이 역할을 사용자에게 부여할 수 있다. 이를 통해 권한 관리를 단순화할 수 있다. 예를 들어, dean 역할에 특정 권한을 부여하고, 학장이 교체되면 새 사용자에게 dean 역할만 부여하면 된다.

**뷰와 권한:** 뷰를 통해 데이터의 특정 부분만 노출하고, 나머지는 숨기는 방식으로도 접근을 제어할 수 있다.

## 예시

```sql
-- 권한 부여
GRANT SELECT ON department TO user_Amit, user_Satoshi;

-- INSERT 권한 부여
GRANT INSERT ON instructor TO user_Amit;

-- UPDATE 권한을 특정 속성에만 부여
GRANT UPDATE (budget) ON department TO user_Amit, user_Satoshi;

-- 재부여 권한 포함
GRANT SELECT ON department TO user_Amit WITH GRANT OPTION;

-- 모든 권한 부여
GRANT ALL PRIVILEGES ON instructor TO user_Amit;

-- 권한 회수
REVOKE SELECT ON department FROM user_Amit, user_Satoshi;

-- 재부여 권한만 회수
REVOKE GRANT OPTION FOR SELECT ON department FROM user_Amit;

-- 역할 생성 및 사용
CREATE ROLE instructor_role;
GRANT SELECT ON takes TO instructor_role;
GRANT SELECT ON student TO instructor_role;
GRANT instructor_role TO user_Amit;

-- 뷰를 통한 보안
CREATE VIEW instructor_info AS
SELECT ID, name, dept_name FROM instructor;
GRANT SELECT ON instructor_info TO public;
-- salary 정보는 뷰에 포함되지 않으므로 노출되지 않음
```

## 관련 개념

- [View](/knowledge/database/view/)
- [SQL](/knowledge/database/sql/)
