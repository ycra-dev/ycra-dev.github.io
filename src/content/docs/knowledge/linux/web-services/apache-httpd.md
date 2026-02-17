---
title: "Apache httpd"
description: "Apache httpd는 Apache Software Foundation의 오리지널 프로젝트로, 1995년부터 개발되어 온 HTTP 서버 참조 구현이며, 모듈러 아키텍처와 풍부한 기능으로 가장 널리 사용되는 웹 서버이다"
tags: ['Apache', 'Httpd', 'Web Server', 'Modules', 'Mpm']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/linux/apache-httpd
sidebar:
  order: 4
---

## 핵심 개념

Apache의 강점은 **모듈러 아키텍처**이다. 동적 모듈을 설정으로 활성화하여 인증, 보안, 다양한 언어 지원, URL 재작성 등의 기능을 추가한다.

**MPM(Multi-Processing Module)**: 연결 처리 방식을 결정하는 플러그형 시스템. **event**(현대적, 권장), **worker**(스레드 기반), **prefork**(프로세스 기반, thread-safe하지 않은 mod_php용). 특권 포트(80, 443)에 바인딩하려면 초기 프로세스가 root로 실행되어야 하며, 이후 저특권 계정으로 포크한다.

설정 구조: **httpd.conf**(주요 설정 파일), Include 지시어로 분할. 3가지 범주: (1) 전역 설정(경로, 사용자/그룹, 모듈, 포트), (2) VirtualHost 섹션, (3) VirtualHost에 매치하지 않는 요청 처리. Debian/Ubuntu는 독자적인 *-available/*-enabled 심볼릭 링크 구조를 사용한다.

애플리케이션 서버 모듈: mod_wsgi(Python), mod_passenger(Ruby), mod_php(PHP), mod_perl(Perl). 모듈 시스템 내에서 프로그램을 실행하여 HTTP 요청/응답 라이프사이클에 직접 접근한다.

**HTTP 기본 인증**: Location/Directory 블록에서 설정. htpasswd로 계정 생성. HTTPS와 함께만 사용해야 안전하다.

## 예시

```bash
# apachectl로 Apache 관리
apachectl start          # 시작
apachectl graceful       # 안전한 재시작
apachectl -t             # 설정 문법 검사
apachectl -f /path/httpd.conf  # 커스텀 설정

# 모듈 활성화 (Debian/Ubuntu)
a2enmod ssl
a2enmod rewrite
a2ensite admin.com.conf

# htpasswd로 인증 파일 생성
htpasswd -c /etc/apache2/.htpasswd admin
chmod 400 /etc/apache2/.htpasswd
```

```apache
# VirtualHost 설정 예시
<VirtualHost *:443>
    ServerName www.admin.com
    DocumentRoot /var/www/admin.com

    SSLEngine on
    SSLCertificateFile /etc/ssl/certs/admin.pem
    SSLCertificateKeyFile /etc/ssl/private/admin.key

    # mod_wsgi로 Django 앱 실행
    WSGIScriptAlias / /var/www/admin_api.wsgi

    # 서버 상태 모니터링
    <Location /server-status>
        SetHandler server-status
        Require ip 10.0.10.10
    </Location>
</VirtualHost>
```

## 관련 개념

- [Web Server](/knowledge/linux/web-server/)
- [Virtual Host](/knowledge/linux/virtual-host/)
- [TLS](/knowledge/linux/tls/)
- [HTTP](/knowledge/linux/http/)
- [NGINX](/knowledge/linux/nginx/)
