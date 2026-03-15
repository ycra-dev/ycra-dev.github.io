---
title: "리버스 프록시 (Reverse Proxy)"
description: "리버스 프록시(Reverse Proxy)는 클라이언트로부터 HTTP 요청을 수신하여 처리하거나 백엔드 서버로 전달하는 중간 서버로, 로드 밸런싱, 캐싱, TLS 종료, 보안 강화의 역할을 수행한다"
tags: ['Reverse Proxy', 'Proxy', 'Web Server', 'Load Balancing', 'Security']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/linux/reverse-proxy
sidebar:
  order: 7
---

## 핵심 개념

웹 프록시는 클라이언트의 HTTP 요청을 받아 선택적으로 처리하고 최종 목적지로 전달하는 중간자이다. 프록시는 일반적으로 클라이언트에게 투명하다. 로드 밸런서, 웹 애플리케이션 방화벽, 캐시 서버 모두 프록시의 특수한 유형이다.

**리버스 프록시 캐시**: 웹 사이트 운영자가 구성하여 오리진 서버의 트래픽을 줄인다. 들어오는 요청이 먼저 리버스 프록시 캐시로 라우팅되고, 캐시된 리소스가 있으면 즉시 반환, 없으면 적절한 웹 서버로 전달한다.

웹 애플리케이션 스택에서 리버스 프록시의 위치: 클라이언트 -> [CDN] -> 로드 밸런서 -> 리버스 프록시/웹 서버 -> 애플리케이션 서버 -> 데이터베이스. 각 레이어는 가용성을 위해 2개 이상의 노드에서 동시 실행되어야 한다.

NGINX는 웹 서버이면서 동시에 뛰어난 리버스 프록시/캐시/로드 밸런서 기능을 제공하여, 별도의 서버들을 개별 VM에서 실행하는 것보다 효율적이다. proxy_pass 지시어로 업스트림 서버에 요청을 전달한다.

## 예시

```nginx
# NGINX 리버스 프록시 설정
server {
    listen 80;
    server_name www.admin.com;

    # 정적 콘텐츠는 직접 서비스
    location /static/ {
        root /var/www/admin.com;
    }

    # 동적 요청은 애플리케이션 서버로 프록시
    location / {
        proxy_pass http://app-server:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}

# 리버스 프록시 캐시 설정
proxy_cache_path /var/cache/nginx keys_zone=cache:10m;
server {
    location / {
        proxy_cache cache;
        proxy_pass http://backend;
    }
}
```

## 관련 개념

- [NGINX (엔진엑스)](/knowledge/linux/nginx/)
- [로드 밸런서 (Load Balancer)](/knowledge/linux/load-balancer/)
- [웹 캐시 (Web Cache)](/knowledge/linux/web-cache/)
- [웹 서버 (Web Server)](/knowledge/linux/web-server/)
- [HTTP (하이퍼텍스트 전송 프로토콜)](/knowledge/linux/http/)
- [CDN (콘텐츠 전송 네트워크)](/knowledge/linux/cdn/)
