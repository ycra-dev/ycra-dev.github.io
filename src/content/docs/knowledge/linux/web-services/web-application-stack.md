---
title: "Web Application Stack"
description: "웹 애플리케이션 스택은 HTTP 요청을 처리하기 위해 분산된 여러 소프트웨어 구성 요소(로드 밸런서, 웹 서버, 애플리케이션 서버, 데이터베이스 등)가 협력하는 계층적 시스템 아키텍처이다"
tags: ['Web Stack', 'Application Server', 'Frontend', 'Backend', 'Architecture']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/linux/web-application-stack
sidebar:
  order: 13
---

## 핵심 개념

대규모 웹 애플리케이션은 단일 시스템에서 실행되지 않는다. 여러 소프트웨어 구성 요소가 메시워크 형태로 분산되어 가능한 빠르고 유연하게 요청에 응답한다. 각 구성 요소는 서버 장애, 로드 스파이크, 네트워크 파티션, 표적 공격에 대한 복원력이 있어야 한다.

HTTP 요청 흐름: CDN -> 로드 밸런서 -> 웹 서버/리버스 프록시 -> 애플리케이션 서버 -> 데이터베이스. 요청은 스택의 상위에서 충족될 수 있으며, 문제가 있으면 4xx/5xx 코드로 거부된다.

가용성 극대화를 위해 각 레이어가 2개 이상의 노드에서 동시 실행되어야 하며, 이상적으로는 지리적 리전에 걸쳐 분산되어 단일 데이터 센터에 의존하지 않아야 한다.

웹 프로그래밍 언어: **Ruby**(Rails 프레임워크, 빠른 프로토타이핑), **Python**(Django, 범용 + 과학 분야), **Java**(엔터프라이즈, 높은 성능), **Node.js**(JavaScript 서버 실행, 높은 동시성), **PHP**(WordPress, Drupal), **Go**(Google, 독립 바이너리 컴파일, 강력한 동시성).

실제 아키텍처에서 대부분의 웹 소프트웨어는 여러 영역의 기능을 수행한다. NGINX는 웹 서버이면서 캐시이자 로드 밸런서이다.

## 예시

```
# 전형적 웹 애플리케이션 스택
[사용자 브라우저]
     |
[CDN (CloudFlare/CloudFront)]
     |
[로드 밸런서 (HAProxy/NGINX/ELB)]
     |
[웹 서버 (NGINX/Apache)]
     |
[애플리케이션 서버 (Django/Rails/Node.js)]
     |
[데이터베이스 (PostgreSQL/MySQL/Redis)]

# Apache + mod_wsgi로 Python 앱 실행
<VirtualHost *:443>
    WSGIScriptAlias / /var/www/app/wsgi.py
    WSGIDaemonProcess myapp processes=2 threads=4
</VirtualHost>

# NGINX + 업스트림 앱 서버
upstream app {
    server 127.0.0.1:8000;
    server 127.0.0.1:8001;
}
server {
    location / { proxy_pass http://app; }
}
```

## 관련 개념

- [Web Server](/knowledge/linux/web-server/)
- [Load Balancer](/knowledge/linux/load-balancer/)
- [Reverse Proxy](/knowledge/linux/reverse-proxy/)
- [Web Cache](/knowledge/linux/web-cache/)
- [CDN](/knowledge/linux/cdn/)
- [HTTP](/knowledge/linux/http/)
- [REST API](/knowledge/linux/rest-api/)
