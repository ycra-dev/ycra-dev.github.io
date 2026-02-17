---
title: "Virtual Host"
description: "가상 호스트(Virtual Host)는 하나의 물리적 서버에서 여러 웹 사이트를 호스팅하는 기술로, HTTP 1"
tags: ['Virtual Host', 'Web Server', 'HTTP', 'Hosting', 'Sni']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/linux/virtual-host
sidebar:
  order: 6
---

## 핵심 개념

웹 초기에는 하나의 서버가 하나의 사이트만 호스팅했다. 가상 호스트는 IP 주소를 절약하고 관리를 간소화하는 표준 방법이다.

두 가지 유형: (1) **이름 기반 가상 호스트** - HTTP Host 헤더로 구분(표준), (2) **IP 기반 가상 호스트** - 각 사이트에 별도 IP 주소 할당(레거시).

HTTP 1.1에서 Host 헤더가 필수이므로 이름 기반 가상 호스트가 표준 방식이다. TLS와 이름 기반 가상 호스트의 결합에는 **SNI(Server Name Indication)**가 필요하다. TLS 연결은 HTTP 요청 전에 수립되어야 하므로, SNI를 통해 클라이언트가 TLS 핸드셰이크 시 호스트명을 전송한다.

Apache httpd에서는 VirtualHost 지시어로 구성하며, 포트 80(HTTP)과 443(HTTPS)에 대해 별도 블록을 정의한다. NGINX에서는 server 컨텍스트를 http 컨텍스트 내에 중첩하여 정의하며, listen과 server_name 지시어로 요청을 라우팅한다.

## 예시

```apache
# Apache httpd 가상 호스트 설정
<VirtualHost *:80>
    ServerName admin.com
    ServerAlias www.admin.com
    Redirect permanent / https://www.admin.com/
</VirtualHost>

<VirtualHost *:443>
    ServerName www.admin.com
    DocumentRoot /var/www/admin.com
    SSLEngine on
    SSLCertificateFile /etc/ssl/certs/www.admin.com.pem
    SSLCertificateKeyFile /etc/ssl/private/www.admin.com.key
</VirtualHost>
```

```nginx
# NGINX 가상 호스트 설정
server {
    listen 80;
    server_name admin.com www.admin.com;
    return 301 https://www.admin.com$request_uri;
}

server {
    listen 443 ssl;
    server_name www.admin.com;
    root /var/www/admin.com;
    ssl_certificate /etc/ssl/certs/www.admin.com.pem;
    ssl_certificate_key /etc/ssl/private/www.admin.com.key;
}
```

## 관련 개념

- [HTTP](/knowledge/linux/http/)
- [TLS](/knowledge/linux/tls/)
- [Web Server](/knowledge/linux/web-server/)
- [NGINX](/knowledge/linux/nginx/)
- [Apache httpd](/knowledge/linux/apache-httpd/)
