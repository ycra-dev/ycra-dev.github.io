---
title: "Load Balancer"
description: "로드 밸런서는 수신 요청을 여러 다운스트림 웹 서버에 분산하는 프록시 서버 유형으로, 서버 상태 모니터링, TLS 종료, 트래픽 분산을 통해 고가용성과 확장성을 제공한다"
tags: ['Load Balancer', 'High Availability', 'Proxy', 'Haproxy', 'Scaling']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/linux/load-balancer
sidebar:
  order: 8
---

## 핵심 개념

단일 서버로는 고가용성 웹 사이트를 운영할 수 없다. 서버 장애, 로드 스파이크, 소프트웨어 업데이트 시 다운타임이 불가피하다. 로드 밸런서는 이러한 문제를 해결한다:

(1) 요청을 직접 처리하지 않고 라우팅만 하므로 일반 웹 서버보다 훨씬 많은 동시 요청을 처리한다. (2) 서버 업그레이드/유지보수 시 로테이션에서 쉽게 제거. (3) 건강 검사 메커니즘으로 장애 서버를 자동 제거/복구.

분산 알고리즘: **라운드 로빈**(고정 순서), **부하 균등화**(최소 연결 서버로), **파티셔닝**(클라이언트 IP 해시 기반, 동일 클라이언트가 동일 서버에).

**레이어 4**(IP/포트 기반 라우팅) vs **레이어 7**(URL, 쿠키, HTTP 헤더 기반 라우팅). 로드 밸런서는 보통 DMZ에 위치하여 보안도 향상시키며, **TLS 종료**를 수행하여 백엔드 서버의 암호화 오버헤드를 줄인다.

오픈소스: NGINX, **HAProxy**(TCP/HTTP 프록시 전문, 뛰어난 안정성과 유연한 설정). 클라우드: AWS **ELB**(Elastic Load Balancer, 완전 관리형 서비스).

로드 밸런서 자체의 SPOF를 방지하려면 쌍으로 운영한다(active-passive 또는 active-active).

## 예시

```nginx
# NGINX 로드 밸런서 설정
upstream backend {
    server web1.example.com:8080;
    server web2.example.com:8080;
}
server {
    listen 443 ssl;
    location / {
        proxy_pass http://backend;
    }
}
```

```
# HAProxy 기본 설정
frontend http-in
    bind *:80
    default_backend webservers

backend webservers
    balance roundrobin
    option httpchk GET / HTTP/1.1\r\nHost:\ www
    server web1 10.0.0.1:8080 check inter 30s
    server web2 10.0.0.2:8080 check inter 30s
```

```bash
# AWS ELB 생성 (CLI)
aws elb create-load-balancer \
    --load-balancer-name my-lb \
    --listeners "Protocol=HTTP,LoadBalancerPort=80,\
    InstanceProtocol=HTTP,InstancePort=8080"
```

## 관련 개념

- [NGINX](/knowledge/linux/nginx/)
- [HAProxy](/knowledge/linux/haproxy/)
- [Web Server](/knowledge/linux/web-server/)
- [HTTP](/knowledge/linux/http/)
- [TLS](/knowledge/linux/tls/)
- [High Availability](/knowledge/linux/high-availability/)
- [Reverse Proxy](/knowledge/linux/reverse-proxy/)
