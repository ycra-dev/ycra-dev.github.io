---
title: "Session Management"
description: "세션 관리(Session Management)는 비연결(connectionless) HTTP 프로토콜 위에서 사용자의 상태 정보(인증 상태, 사용자 설정 등)를 유지하기 위해 쿠키와 서버 측 세션 저장소를 사용하여 연속적인 사용자 상호작용을 추적하는 메커니즘이다"
tags: ['Session', 'Cookie', 'Authentication', 'Http', 'Web Application']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/database/session-management
sidebar:
  order: 10
---

## 핵심 개념

HTTP는 기본적으로 비연결 프로토콜이다. 웹 서버가 요청을 받으면 임시 연결을 통해 응답을 보내고 연결이 닫힐 수 있으며, 다음 요청은 새 연결을 통해 올 수 있다. 이는 서버가 동시에 많은 사용자를 처리할 수 있게 하지만, 사용자의 로그인 상태 같은 세션 정보를 유지하기 어렵게 한다.

세션은 쿠키(cookie)를 사용하여 구현된다. 쿠키는 웹 사이트가 브라우저에 저장하는 작은 텍스트 데이터로, 이름-값 쌍의 형태를 가진다. 애플리케이션 서버는 사용자 인증 후 난수로 세션 식별자를 생성하여 sessionid라는 이름의 쿠키로 클라이언트에 전송하고, 서버 측에도 세션 식별자를 저장한다. 이후 각 요청에서 클라이언트가 이 쿠키를 함께 전송하면 서버가 세션을 식별한다.

세션 보안에서 중요한 점들이 있다. 세션 식별자는 반드시 충분히 큰 공간에서 무작위로 생성해야 한다. 순차적 식별자를 사용하면 공격자가 다른 사용자로 위장할 수 있다. 높은 보안이 필요한 애플리케이션에서는 타임아웃 후 또는 로그아웃 시 세션을 무효화(서버의 활성 세션 목록에서 제거)해야 한다. 도메인은 자신이 설정한 쿠키만 검색할 수 있어, 다른 도메인의 쿠키에 접근할 수 없다.

인증(Authentication)은 사용자의 신원을 확인하는 과정이다. 가장 간단한 형태는 비밀번호이지만, 보다 안전한 방식으로 이중 인증(two-factor authentication)이 사용된다. 이중 인증은 비밀번호(지식 기반)와 스마트 카드, OTP 장치, SMS 인증번호(소유 기반) 등 두 가지 독립적인 요소를 사용한다.

중앙 인증 서비스(LDAP, Active Directory)를 사용하면 여러 애플리케이션에서 동일한 자격 증명으로 인증할 수 있다. 싱글 사인온(SSO) 시스템은 한 번 인증하면 여러 사이트에 재인증 없이 접근할 수 있게 한다. SAML과 OpenID는 조직 간 SSO를 위한 프로토콜이며, OAuth는 리소스 접근 권한 공유를 위한 프로토콜이다.

## 예시

```java
// Java 서블릿에서의 세션 관리
// 세션 생성/획득
HttpSession session = request.getSession();

// 세션에 데이터 저장 (인증 후)
session.setAttribute("userId", authenticatedUserId);
session.setAttribute("userRole", "student");

// 세션에서 데이터 검색
String userId = (String) session.getAttribute("userId");
if (userId == null) {
    // 세션이 없거나 만료됨 -> 로그인 페이지로 리다이렉트
    response.sendRedirect("/login");
    return;
}

// 로그아웃 시 세션 무효화
session.invalidate();
```

```
-- 세션 기반 인증 흐름
-- 1. 사용자가 로그인 폼에 username, password 입력
-- 2. 서버가 자격 증명 검증
-- 3. 검증 성공 시 난수 세션 ID 생성 (예: "a3f8b2c1d4e5")
-- 4. 서버 측에 세션 ID와 사용자 정보 저장
-- 5. Set-Cookie: sessionid=a3f8b2c1d4e5 헤더로 응답
-- 6. 이후 요청마다 브라우저가 Cookie: sessionid=a3f8b2c1d4e5 전송
-- 7. 서버가 세션 ID로 사용자 식별

-- 이중 인증 (Two-Factor Authentication)
-- Factor 1: 비밀번호 (지식 기반)
-- Factor 2: OTP 장치의 일회용 코드 (소유 기반)
--           또는 SMS로 전송된 인증번호
```

## 관련 개념

- [Web Application Architecture](/knowledge/database/web-application-architecture/)
- [Servlet](/knowledge/database/servlet/)
- [SQL Injection](/knowledge/database/sql-injection/)
- [Cross-Site Scripting](/knowledge/database/cross-site-scripting/)
- [Encryption](/knowledge/database/encryption/)
