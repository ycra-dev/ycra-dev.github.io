---
title: "RESTful 아키텍처 (RESTful Architecture)"
description: "RESTful 아키텍처(Representational State Transfer)는 분산 시스템을 개별적으로 관리되는 리소스의 거대한 컬렉션으로 보고, 통일된 인터페이스(PUT, GET, POST, DELETE)를 통해 리소스를 조작하는 아키텍처 스타일이다"
tags: ['REST', 'Resource Based', 'Web Architecture', 'Stateless', 'HTTP']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/distributed-systems/restful-architecture
sidebar:
  order: 3
---

## 핵심 개념

RESTful 아키텍처의 4가지 핵심 특성:

1. **단일 명명 체계**: 모든 리소스는 URI(Uniform Resource Identifier)를 통해 식별된다.
2. **통일된 인터페이스**: 모든 서비스가 최대 4개의 동일한 연산(PUT, GET, POST, DELETE)을 제공한다.
3. **자기 기술적 메시지**: 서비스로 전송되거나 수신되는 메시지는 완전한 자기 기술을 포함한다.
4. **무상태 실행(Stateless Execution)**: 연산 실행 후 서비스는 호출자에 대한 정보를 모두 잊는다.

RESTful vs 서비스 특화 인터페이스:
- RESTful은 단순성이 강점이나, 복잡한 통신 스킴(예: 분산 트랜잭션)에는 부적합
- 서비스 특화 인터페이스는 파라미터 공간이 작아 컴파일 시점 오류 검출이 용이
- RESTful은 파라미터를 문자열로 인코딩하므로 오류 검출이 런타임으로 지연

Amazon S3가 RESTful 아키텍처의 대표적 예로, 객체(파일)와 버킷(디렉토리)이라는 두 가지 리소스를 HTTP 프로토콜을 통해 관리한다.

## 예시

```
# Amazon S3의 RESTful 인터페이스 예

# 버킷 생성
PUT https://s3.amazonaws.com/MyBucket/

# 객체 업로드
PUT https://s3.amazonaws.com/MyBucket/MyObject

# 버킷의 객체 목록 조회
GET https://s3.amazonaws.com/MyBucket/

# 객체 삭제
DELETE https://s3.amazonaws.com/MyBucket/MyObject

# RESTful vs 서비스 특화 인터페이스 비교
# 서비스 특화: bucket.create("mybucket")  → 컴파일 시 타입 검사 가능
# RESTful:    PUT "https://mybucket.s3.amazonaws.com/"  → 런타임 검사만 가능
```

## 관련 개념

- [서비스 지향 아키텍처 (Service-Oriented Architecture)](/knowledge/distributed-systems/service-oriented-architecture/)
- [계층화 아키텍처 (Layered Architecture)](/knowledge/distributed-systems/layered-architecture/)
- [분산 시스템 (Distributed System)](/knowledge/distributed-systems/distributed-system/)
- [확장성 (Scalability)](/knowledge/distributed-systems/scalability/)
