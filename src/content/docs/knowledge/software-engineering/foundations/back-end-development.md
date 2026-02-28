---
title: "백엔드 개발 (Back-End Development)"
description: "백엔드 개발은 사용자에게 직접 보이지 않는 서버 측의 로직, 데이터 처리, 시스템 아키텍처를 구축하는 소프트웨어 개발 영역이다."
tags: ["Software Engineering", "Back-End", "Server", "Business Logic"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/foundations/back-end-development
sidebar:
  order: 40
---

## 핵심 개념

소프트웨어 애플리케이션은 빙산과 같다. 사용자가 보는 부분(프론트엔드)은 일부에 불과하고, 대부분의 코드는 눈에 보이지 않는 **백엔드**에 존재한다.

백엔드 개발자의 주요 역할:
- **비즈니스 로직 구현**: 앱의 핵심 규칙과 프로세스
- **데이터 저장/검색**: 데이터베이스 설계와 쿼리
- **알고리즘 구현**: 복잡한 계산과 데이터 처리
- **시스템 아키텍처 설계**: 컴포넌트 간의 구조와 통신

필수 기술: SQL과 데이터베이스 관리, 서버 사이드 프레임워크(Python/Flask/Django, Java/Spring, C#/ASP.NET, Ruby on Rails 등), 애플리케이션 아키텍처에 대한 깊은 이해

## 동작 원리

프론트엔드가 주목을 받지만, 실제로 세상에 존재하는 대부분의 코드는 백엔드 코드다. 백엔드 개발자는 프론트엔드 개발자보다 **알고리즘과 문제 해결**에 더 많은 시간을 쏟는 경향이 있다.

## 예시

```python
# 백엔드 예시: Flask API 엔드포인트
@app.route('/api/customers/<int:id>')
def get_customer(id):
    customer = db.query(Customer).get(id)
    return jsonify(customer.to_dict())
```

- 프론트엔드 개발자가 "고객 데이터 가져오기" 버튼 UI 구현
- 백엔드 개발자가 해당 버튼의 실제 동작 구현: 데이터베이스에서 적절한 고객 데이터를 찾아 프론트엔드에 전달

## 관련 개념

- [Full-Stack Developer](/knowledge/software-engineering/foundations/full-stack-developer/)
- [Web API](/knowledge/software-engineering/systems-and-services/web-api/)
- [Technology Stack](/knowledge/software-engineering/foundations/technology-stack/)
