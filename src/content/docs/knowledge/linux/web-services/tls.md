---
title: "TLS"
description: "TLS(Transport Layer Security)는 TCP와 HTTP 사이에서 동작하는 보안 계층으로, 서버 인증, 통신 암호화, 데이터 무결성 보호를 제공하며, 이전 명칭인 SSL의 후속 프로토콜이다"
tags: ['Tls', 'Ssl', 'Encryption', 'HTTPS', 'Certificate', 'Security']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/linux/tls
sidebar:
  order: 2
---

## 핵심 개념

HTTP 자체는 네트워크 수준 보안을 제공하지 않는다. URL, 헤더, 페이로드가 클라이언트와 서버 사이 어디에서든 검사/변조될 수 있다. TLS는 이 문제를 해결한다.

TLS 연결 과정에서 사용자 에이전트가 서버의 신원을 검증하여 위조 서버에 의한 스푸핑을 방지한다. 연결이 수립되면 내용이 엿보기와 변조로부터 보호된다. 공격자는 TCP 레이어의 호스트와 포트는 볼 수 있지만, URL이나 헤더 같은 HTTP 세부 정보에는 접근할 수 없다.

**SNI(Server Name Indication)**: 가상 호스트와 TLS를 함께 사용할 때의 문제 해결. TLS 연결 설정 시 클라이언트가 호스트명을 제출하여 서버가 올바른 인증서를 선택할 수 있게 한다.

모든 SSL 프로토콜 버전은 취약하므로 비활성화해야 한다. 취약한 암호 스위트도 비활성화하고, Mozilla Server Side TLS 가이드의 권장 설정을 따라야 한다. 인증서 파일은 444, 개인 키는 400 권한을 설정한다.

HTTP/2를 지원하는 주요 브라우저(Firefox, Chrome)는 TLS 위에서만 HTTP/2를 지원하여, 차세대 웹의 보편적 HTTPS 사용을 촉진한다.

## 예시

```bash
# Apache httpd TLS 설정
SSLEngine on
SSLCertificateFile /etc/ssl/certs/www.admin.com.pem
SSLCertificateKeyFile /etc/ssl/private/www.admin.com.key
SSLProtocol all -SSLv2 -SSLv3

# NGINX TLS 설정
ssl_certificate /etc/ssl/certs/www.admin.com.pem;
ssl_certificate_key /etc/ssl/private/www.admin.com.key;
ssl_protocols TLSv1.2 TLSv1.3;
ssl_prefer_server_ciphers on;

# HAProxy TLS 설정 (인증서+키 합침)
cat cert.pem key.pem > combined.pem
# frontend에서:
# bind *:443 ssl crt /etc/ssl/combined.pem

# 인증서 권한 설정
chmod 444 /etc/ssl/certs/www.admin.com.pem
chmod 400 /etc/ssl/private/www.admin.com.key

# Let's Encrypt 인증서 발급
certbot certonly --nginx -d www.admin.com
```

## 관련 개념

- [HTTP](/knowledge/linux/http/)
- [Web Server](/knowledge/linux/web-server/)
- [Virtual Host](/knowledge/linux/virtual-host/)
- [NGINX](/knowledge/linux/nginx/)
- [Email Encryption](/knowledge/linux/email-encryption/)
