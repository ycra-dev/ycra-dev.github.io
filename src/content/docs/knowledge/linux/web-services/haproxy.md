---
title: "HAProxy"
description: "HAProxy는 가장 널리 사용되는 오픈소스 로드 밸런싱 소프트웨어로, HTTP와 TCP 프록시, 스티키 세션, 고급 건강 검사, TLS 종료를 지원한다"
tags: ['Haproxy', 'Load Balancer', 'Proxy', 'TCP', 'HTTP', 'High Availability']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/linux/haproxy
sidebar:
  order: 9
---

## 핵심 개념

HAProxy의 설정은 **frontend**(클라이언트로부터 요청 수신 방법: 주소, 포트, 트래픽 유형)과 **backend**(실제 요청을 처리하는 서버 집합)로 구분된다. 단일 설정에 여러 frontend/backend 쌍이 존재할 수 있어 하나의 HAProxy가 여러 사이트를 서비스한다.

**건강 검사**: 정기적 HTTP 요청으로 서버 상태 확인. HTTP 200 응답이면 정상. 실패 시 풀에서 제거하되 계속 검사하여 복구 시 자동 복귀. 요청 메서드, 검사 간격, 경로 등을 세부 조정 가능.

**스티키 세션**: HTTP는 상태 비저장 프로토콜이지만, 웹 애플리케이션은 세션 데이터로 상태를 추적한다. 일부 애플리케이션이 세션을 로컬에 저장할 경우, HAProxy의 cookie 지시어를 사용하여 동일 클라이언트의 요청을 동일 서버로 라우팅한다.

**TLS 종료**: HAProxy 1.5 이후 TLS 지원. 클라이언트-HAProxy 간 TLS, HAProxy-백엔드 간 HTTP. Apache/NGINX와 달리 인증서와 개인 키를 단일 PEM 파일로 결합하여 사용.

timeout 설정(connect, client, server)은 바쁜 서버에서 중요하다. 로컬 네트워크에서 connect는 500ms 이하가 적절하다.

## 예시

```
# haproxy.cfg 기본 설정
defaults
    timeout connect 5000ms
    timeout client  50000ms
    timeout server  50000ms

frontend http-in
    bind *:80
    default_backend webservers

backend webservers
    balance roundrobin
    option httpchk GET / HTTP/1.1\r\nHost:\ www
    http-check expect status 200
    server web1 10.0.0.1:8080 check inter 30s
    server web2 10.0.0.2:8080 check inter 30s

# 스티키 세션 설정
backend webservers
    cookie SERVERNAME insert indirect nocache secure httponly
    server web1 10.0.0.1:8080 cookie web1 check
    server web2 10.0.0.2:8080 cookie web2 check

# TLS 종료
frontend https-in
    bind *:443 ssl crt /etc/ssl/combined.pem
    default_backend webservers

# 서버 통계 웹 인터페이스
listen stats
    bind *:9000
    stats enable
    stats uri /stats
    stats auth admin:password
```

## 관련 개념

- [Load Balancer](/knowledge/linux/load-balancer/)
- [NGINX](/knowledge/linux/nginx/)
- [TLS](/knowledge/linux/tls/)
- [HTTP](/knowledge/linux/http/)
- [Web Server](/knowledge/linux/web-server/)
- [High Availability](/knowledge/linux/high-availability/)
