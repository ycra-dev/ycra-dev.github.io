---
title: "Backward Compatibility"
description: "새 버전의 라이브러리/서비스가 이전 클라이언트 코드의 변경 없이 작동하는 특성"
tags: ["Software Engineering", "API Design", "Versioning"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/design-and-evolution/backward-compatibility
sidebar:
  order: 22
---

## 핵심 개념

하위 호환성(Backward Compatibility)은 새 버전의 라이브러리/서비스가 이전 클라이언트 코드의 변경 없이 작동하는 특성이다. Forward compatibility는 반대(이전 서비스가 새 클라이언트 수용). API 호환성 유지로 클라이언트와 서버가 독립적으로 진화할 수 있다.

## 동작 원리

Protocol Buffers 사례:
- `required` 필드 추가는 후방 비호환(기존 클라이언트에 필드 없음) — "Required is forever."
- PB v3에서 `required` 삭제됨
- 타입 변경(`int32` → `sint32`)은 양방향 비호환
- 해결: 새 필드 추가 후 기존 필드를 deprecated

메시지 필드뿐 아니라 의미론(semantics) 변경도 비호환 가능하다. API 버전 관리: 호환 불가능한 변경 시 새 버전 도입, 이전 버전 유지보수 필요.

하위 호환성 유지 원칙:
- 기존 필드/파라미터 제거 금지 (deprecated 후 일정 기간 유지)
- 새 선택적 필드 추가는 안전
- 기존 동작의 의미론적 변경 주의

## 예시

```protobuf
// v1: 기존
message HelloRequest {
  string name = 1;
  int32 favorite_number = 2;
}

// v2: 후방 호환 - 선택적 필드 추가
message HelloRequest {
  string name = 1;
  int32 favorite_number = 2;
  string email = 3; // optional, 기존 클라이언트에 없어도 OK
}
```

REST API 버전 관리:
```
# 하위 호환 변경 (OK)
GET /api/v1/users → 응답에 새 필드 추가

# 하위 비호환 변경 (새 버전 필요)
GET /api/v2/users → 기존 필드 제거 또는 타입 변경
```

## 관련 개념

- [Semantic Versioning](/knowledge/software-engineering/quality-and-configuration/semantic-versioning/)
- [Schema Migration](/knowledge/software-engineering/quality-and-configuration/schema-migration/)
- [Domain-Driven Design](/knowledge/software-engineering/architectural-design/domain-driven-design/)
