---
title: "Web Cache"
description: "웹 캐시는 클라이언트와 웹 서버 사이에 위치하여 자주 요청되는 콘텐츠를 저장하고, 동일한 요청에 대해 원본 서버를 거치지 않고 직접 응답하여 서버 부하를 줄이고 응답 시간을 개선하는 시스템이다"
tags: ['Cache', 'Web Performance', 'Proxy Cache', 'Reverse Proxy', 'Cdn']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/linux/web-cache
sidebar:
  order: 10
---

## 핵심 개념

캐시 용어에서 **오리진(Origin)**은 콘텐츠의 원본 제공자이며, 캐시는 오리진이나 다른 업스트림 캐시에서 콘텐츠를 가져온다.

캐싱 동작을 결정하는 요소: (1) HTTP 헤더(Cache-Control, ETag, Expires), (2) HTTPS 여부(캐시 서버가 TLS를 종료해야 함), (3) 응답 상태 코드, (4) HTML meta 태그.

캐시 레이어 유형:
- **브라우저 캐시**: 최근 사용 리소스를 로컬에 저장. HTTP 캐싱 규칙을 따름.
- **프록시 캐시**: 조직 네트워크 가장자리에 설치. 능동적(브라우저 설정 변경) 또는 수동적(인터셉팅 프록시, 라우터가 트래픽을 캐시 서버로 전송).
- **리버스 프록시 캐시**: 웹 사이트 운영자가 오리진 서버의 트래픽을 줄이기 위해 설정. 들어오는 요청을 먼저 캐시에서 처리.

정적 콘텐츠(이미지, CSS, JavaScript)는 캐싱에 적합하고, 동적 콘텐츠는 더 어렵지만 불가능하지는 않다. 캐시되면 안 되는 페이지에는 Cache-Control: no-cache, no-store 헤더를 설정한다.

캐시 문제 진단: curl로 각 홉에서 직접 요청하여 오래된 콘텐츠를 감지. curl -H "Cache-Control: no-cache"로 캐시 새로고침 요청.

주요 소프트웨어: NGINX(가장 자주 사용), Varnish, Squid, Apache Traffic Server.

## 예시

```bash
# 캐시 우회하여 원본 서버에 직접 요청
curl -H "Cache-Control: no-cache" http://www.example.com/

# 캐시 관련 헤더 확인
curl -I http://www.example.com/style.css
# Cache-Control: max-age=86400
# ETag: "abc123"
# Expires: Thu, 12 Feb 2026 18:00:00 GMT
```

```nginx
# NGINX 리버스 프록시 캐시 설정
proxy_cache_path /var/cache/nginx levels=1:2
    keys_zone=my_cache:10m max_size=1g;

server {
    location / {
        proxy_cache my_cache;
        proxy_pass http://backend;
        proxy_cache_valid 200 1h;
        proxy_cache_valid 404 1m;
    }
}
```

```
# 캐시되지 않아야 할 동적 콘텐츠 헤더
Cache-Control: no-cache, no-store
```

## 관련 개념

- [HTTP](/knowledge/linux/http/)
- [CDN](/knowledge/linux/cdn/)
- [NGINX](/knowledge/linux/nginx/)
- [Reverse Proxy](/knowledge/linux/reverse-proxy/)
- [Web Server](/knowledge/linux/web-server/)
- [Load Balancer](/knowledge/linux/load-balancer/)
