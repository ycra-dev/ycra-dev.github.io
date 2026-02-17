---
title: "Web Server"
description: "웹 서버는 HTTP 요청을 수신하여 정적 콘텐츠를 직접 제공하거나 애플리케이션 서버로 요청을 프록시하는 소프트웨어로, 가상 호스트, TLS 처리, 로깅, 인증, URL 라우팅 등의 기능을 제공한다"
tags: ['Web Server', 'Apache', 'Nginx', 'Httpd', 'HTTP Proxy']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/linux/web-server
sidebar:
  order: 3
---

## 핵심 개념

UNIX/Linux는 상위 100만 웹 사이트의 67%를 서비스하며, 오픈소스 웹 서버 소프트웨어가 시장의 80% 이상을 차지한다.

주요 오픈소스 웹 서버:

**Apache httpd**: 1995년부터 활발히 개발. 모듈러 아키텍처(동적 모듈로 기능 확장). MPM(Multi-Processing Module) 시스템으로 연결 처리: event(현대적, 권장), worker(스레드 기반), prefork(프로세스 기반, mod_php용). 활성 웹 사이트의 ~46% 점유율.

**NGINX**: 속도와 효율성을 위해 설계. 이벤트 기반 아키텍처로 소수의 워커 프로세스가 수천 개 동시 요청 처리. 웹 서버, 캐시, 로드 밸런서 기능 겸비. ~20% 점유율이며 꾸준히 상승 중.

**H2O**: HTTP/2 기능을 완전 활용하는 최신 웹 서버. NGINX보다 더 나은 성능을 달성하지만 역사가 짧다.

Node.js와 Go 같은 시스템은 내부적으로 웹 서버를 구현하여 별도 웹 서버 없이 HTTP 워크플로우를 처리할 수 있다.

주류 프로덕션 사용에는 NGINX를 권장한다: 뛰어난 성능과 비교적 단순하고 현대적인 설정 시스템을 제공한다.

## 예시

```bash
# Apache httpd 시작/관리
apachectl start        # 시작
apachectl graceful     # 열린 연결 완료 후 재시작
apachectl -t           # 설정 문법 검사
httpd -f /path/to/custom.conf  # 커스텀 설정으로 시작

# NGINX 시작/관리
nginx                  # 시작
nginx -t               # 설정 문법 검사
nginx -s reload        # 설정 리로드
nginx -s quit          # 안전한 종료

# 웹 서버 성능 확인
curl http://www.admin.com/server-status  # Apache
# NGINX stub_status 모듈

# 설치
sudo apt install apache2    # Debian/Ubuntu
sudo apt install nginx      # NGINX
sudo yum install httpd      # RHEL/CentOS
```

## 관련 개념

- [HTTP](/knowledge/linux/http/)
- [NGINX](/knowledge/linux/nginx/)
- [Apache httpd](/knowledge/linux/apache-httpd/)
- [Virtual Host](/knowledge/linux/virtual-host/)
- [TLS](/knowledge/linux/tls/)
- [Load Balancer](/knowledge/linux/load-balancer/)
- [Reverse Proxy](/knowledge/linux/reverse-proxy/)
