---
title: "REST API"
description: "REST(Representational State Transfer) API는 HTTP 동사를 사용하여 의도를 명시적으로 전달하고, 디렉터리와 유사한 경로 구조로 리소스를 위치시키는 웹 API 설계 아키텍처 스타일이다"
tags: ['REST', 'API', 'HTTP', 'JSON', 'Web Service']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/linux/rest-api
sidebar:
  order: 12
---

## 핵심 개념

웹 API는 사람이 아닌 소프트웨어 에이전트가 사용하도록 의도된 인터페이스이다. HTTP 요청으로 이루어지며, 클라이언트와 서버가 특정 URL과 동사에 합의된 의미를 부여한다.

REST는 Roy Fielding이 박사 논문에서 소개한 아키텍처 스타일이다(Fielding은 HTTP 사양의 주요 저자이기도 하다). REST API의 특징: (1) HTTP 동사를 명시적으로 사용(GET, POST, PUT, DELETE), (2) 디렉터리 구조의 경로로 리소스 위치, (3) 대부분 JSON을 데이터 표현 형식으로 사용.

PUT은 **멱등(idempotent)**해야 한다(반복 실행해도 동일 결과). 예: 이메일 전송은 PUT이 아닌 POST를 사용해야 한다.

데이터 직렬화 형식: **JSON**(JavaScript Object Notation, 가장 일반적) 또는 **XML**(Extensible Markup Language). curl과 **jq** 같은 도구로 API와 상호작용할 수 있다.

REST는 SOAP(Simple Object Access Protocol)와 대비된다. SOAP는 엄격한 XML 기반 형식으로 큰 페이로드, 낮은 성능, 개발/디버깅의 어려움이 있다. SOAP는 플랫폼/언어/데이터/전송 중립성을 추구했지만, 결과 시스템이 복잡하고 실제 요구에 맞지 않았다.

## 예시

```bash
# curl로 REST API 호출 (Spotify 예시)
curl https://api.spotify.com/v1/artists/3WrFJ7ztbogyGnTHbHJFl2 | jq

# API 검색
curl "https://api.spotify.com/v1/search?type=artist&q=beatles" | jq

# RESTful CRUD 작업 예시
# 조회 (Read)
curl -X GET https://api.example.com/users/123

# 생성 (Create)
curl -X POST https://api.example.com/users \
    -H "Content-Type: application/json" \
    -d '{"name": "John", "email": "john@example.com"}'

# 갱신 (Update - 멱등)
curl -X PUT https://api.example.com/users/123 \
    -H "Content-Type: application/json" \
    -d '{"name": "John Updated"}'

# 삭제 (Delete)
curl -X DELETE https://api.example.com/users/123

# jq로 JSON 필터링
curl -s https://api.example.com/data | jq '.items[] | .name'
```

## 관련 개념

- [HTTP](/knowledge/linux/http/)
- [Web Server](/knowledge/linux/web-server/)
- [NGINX](/knowledge/linux/nginx/)
- [CDN](/knowledge/linux/cdn/)
