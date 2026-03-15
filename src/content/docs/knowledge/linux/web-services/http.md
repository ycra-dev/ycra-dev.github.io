---
title: "HTTP (하이퍼텍스트 전송 프로토콜)"
description: "HTTP(Hypertext Transfer Protocol)는 웹에서 클라이언트와 서버 간 통신을 위한 핵심 네트워크 프로토콜로, 상태 비저장(stateless) 요청-응답 모델을 기반으로 한다"
tags: ['HTTP', 'Protocol', 'Web', 'HTTPS', 'Http2', 'Stateless']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/linux/http
sidebar:
  order: 1
---

## 핵심 개념

HTTP는 가장 단순한 형태에서 클라이언트/서버, 요청/응답 프로토콜이다. 클라이언트(사용자 에이전트)가 서버에 리소스를 요청하고, 서버가 파일 검색, 데이터베이스 조회 등을 수행하여 응답한다. 일반적인 페이지 로드에 수십~수백 개의 HTTP 교환이 발생한다.

**HTTP 요청 구조**: 초기 행(메서드/동사, 경로, 버전), 헤더, 빈 행, 본문(페이로드). 주요 메서드: GET(리소스 조회), POST(데이터 제출), PUT(리소스 갱신, 멱등), DELETE(리소스 삭제), HEAD(헤더만 조회).

**HTTP 응답 구조**: 상태 행(버전, 상태 코드, 설명), 헤더, 빈 행, 본문. 상태 코드 클래스: 1xx(정보), 2xx(성공), 3xx(리다이렉션), 4xx(클라이언트 오류), 5xx(서버 오류).

**HTTP/1.1**: 텍스트 기반, Keep-Alive 연결 기본 지원, Host 헤더 필수(가상 호스트 지원). **HTTP/2**: 바이너리 형식, 멀티플렉싱(단일 연결에 여러 트랜잭션), 성능 향상. 주요 브라우저는 TLS 위에서만 HTTP/2 지원.

URL 구조: scheme://[username:password@]hostname[:port][/path][?query][#anchor]. 민감한 데이터는 URL 쿼리 파라미터에 포함하지 말아야 한다(로그에 평문으로 기록됨).

## 예시

```bash
# curl로 HTTP 요청 및 응답 헤더 확인
curl -v -s -o /dev/null http://admin.com

# Host 헤더를 명시적으로 설정
curl -H "Host: www.admin.com" http://10.0.1.5/

# 파일 다운로드
curl -O https://example.com/file.tar.gz

# HTTP 응답 상태 코드만 확인
curl -o /dev/null -s -w "%{http_code}" http://example.com

# HTTP/2 대화형 도구
# h2i (Go 네트워킹 리포지토리의 도구)

# telnet으로 HTTP/1.x 직접 대화
telnet www.example.com 80
GET / HTTP/1.1
Host: www.example.com
```

## 관련 개념

- [TLS (전송 계층 보안)](/knowledge/linux/tls/)
- [가상 호스트 (Virtual Host)](/knowledge/linux/virtual-host/)
- [웹 서버 (Web Server)](/knowledge/linux/web-server/)
- [로드 밸런서 (Load Balancer)](/knowledge/linux/load-balancer/)
- [REST API (레스트 API)](/knowledge/linux/rest-api/)
- [웹 캐시 (Web Cache)](/knowledge/linux/web-cache/)
