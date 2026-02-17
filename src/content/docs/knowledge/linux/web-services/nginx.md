---
title: "NGINX"
description: "NGINX는 이벤트 기반 아키텍처를 사용하는 고성능 웹 서버로, 정적 콘텐츠 서비스, 리버스 프록시, 로드 밸런싱, 캐싱 기능을 단일 소프트웨어에서 제공한다"
tags: ['Nginx', 'Web Server', 'Reverse Proxy', 'Load Balancer', 'Event Driven']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/linux/nginx
sidebar:
  order: 5
---

## 핵심 개념

NGINX의 핵심은 **이벤트 기반 비동기 처리** 모델이다. 소수의 워커 프로세스가 수천 개의 동시 요청을 처리한다. 요청이나 응답(이벤트)이 서비스 준비가 되면 워커가 빠르게 처리하고 다음 이벤트로 넘어간다. 네트워크/디스크 I/O 블로킹을 피하는 것이 핵심 목표이다.

프로세스 구조: **마스터**(소켓 열기, 설정 읽기, 워커 관리)와 **워커**(요청 처리). 마스터는 root로 실행(포트 <1024 바인딩), 워커는 비특권 사용자. 워커 수는 CPU 코어 수와 동일하게 설정하는 것이 좋다.

설정 구조: C 스타일 중괄호와 세미콜론. **main**(암시적 최외곽), **events**(연결 처리), **http**(웹/프록시 서비스), **server**(가상 호스트, http 내 중첩), **location**(요청 라우팅). include 지시어로 사이트별 가상 호스트 설정을 분리.

로드 밸런싱: **upstream** 모듈로 서버 그룹 정의 후 proxy_pass로 참조. 라운드 로빈 기본. **health_check**로 백엔드 서버 상태 모니터링(interval, fails, passes 설정). match 키워드로 건강 검사 성공 조건 정의.

시그널을 통한 관리: HUP(설정 리로드), QUIT(안전한 종료), USR1(로그 재오픈), USR2(바이너리 업그레이드).

## 예시

```nginx
# 최소 NGINX 설정
events {}
http {
    server {
        listen 80;
        server_name www.admin.com;
        root /var/www/admin.com;
    }
}

# 프록시 설정
server {
    listen 80;
    server_name www.admin.com;
    location /api {
        proxy_pass http://backend-servers;
    }
}

# 로드 밸런서 설정
upstream admin-servers {
    server web1.admin.com:8080;
    server web2.admin.com:8080;
}
server {
    listen 443 ssl;
    server_name www.admin.com;
    location / {
        proxy_pass http://admin-servers;
        health_check interval=30 fails=3 passes=1
            uri=/health_check;
    }
}

# 정규 표현식으로 여러 도메인 처리
server {
    server_name ~^(www\.)?(?<domain>example\.com|admin\.com)$;
    root /var/www/$domain;
}
```

## 관련 개념

- [Web Server](/knowledge/linux/web-server/)
- [Load Balancer](/knowledge/linux/load-balancer/)
- [Reverse Proxy](/knowledge/linux/reverse-proxy/)
- [HTTP](/knowledge/linux/http/)
- [TLS](/knowledge/linux/tls/)
- [Virtual Host](/knowledge/linux/virtual-host/)
- [Web Cache](/knowledge/linux/web-cache/)
