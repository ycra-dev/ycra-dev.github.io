---
title: "인그레스 TLS (Ingress TLS)"
description: "Ingress TLS는 Kubernetes Secret에 저장된 TLS 인증서와 키를 Ingress 오브젝트에 연결하여, 클라이언트와 프록시 간의 HTTPS 통신을 지원하는 설정이다"
tags: ['Kubernetes', 'Ingress', 'Tls', 'Ssl', 'Security', 'HTTPS']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/kubernetes/ingress-tls
sidebar:
  order: 17
---

## 핵심 개념

Ingress에서 HTTPS를 지원하는 두 가지 방식이 있다:

1. **TLS 종료(Termination)**: 프록시가 TLS를 종료하고 백엔드 파드로는 암호화되지 않은 HTTP로 전달. 대부분의 Ingress Controller가 표준으로 지원하며, Ingress 오브젝트의 `spec.tls` 필드로 설정한다.

2. **TLS 패스스루(Passthrough)**: 프록시가 TLS를 종료하지 않고 백엔드 파드가 직접 TLS를 처리. 표준 방식이 아니며, 컨트롤러별 어노테이션(예: `nginx.ingress.kubernetes.io/ssl-passthrough: "true"`)으로 설정한다.

TLS 종료 방식이 더 일반적이며, 설정 절차는 다음과 같다:
1. TLS 인증서와 키를 `kubernetes.io/tls` 타입의 Secret에 저장
2. Ingress의 `spec.tls` 배열에 Secret 이름과 적용할 호스트 목록을 지정
3. `tls.hosts`에 지정된 호스트 이름이 인증서의 CN/SAN과 일치해야 함

하나의 TLS 설정이 와일드카드 인증서를 사용하면 여러 서비스를 동시에 보호할 수 있다.

## 예시

TLS Secret 생성:

```bash
openssl req -x509 -newkey rsa:4096 -keyout example.key -out example.crt \
  -sha256 -days 7300 -nodes \
  -subj '/CN=*.example.com' \
  -addext 'subjectAltName = DNS:*.example.com'

kubectl create secret tls tls-example-com --cert=example.crt --key=example.key
```

Ingress에 TLS 설정 추가:

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: kiada
spec:
  tls:
  - secretName: tls-example-com
    hosts:
    - "*.example.com"
  rules:
  - host: kiada.example.com
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: kiada
            port:
              name: http
```

HTTPS로 접근:

```bash
curl https://kiada.example.com --resolve kiada.example.com:443:11.22.33.44 -k -v
```

TLS 패스스루 설정 (Nginx):

```yaml
metadata:
  annotations:
    nginx.ingress.kubernetes.io/ssl-passthrough: "true"
```

## 관련 개념

- [인그레스 (Ingress)](/knowledge/kubernetes/ingress/) - TLS가 설정되는 오브젝트
- [시크릿 (Secret)](/knowledge/kubernetes/secret/) - TLS 인증서와 키를 저장하는 오브젝트
- [인그레스 컨트롤러 (Ingress Controller)](/knowledge/kubernetes/ingress-controller/) - TLS 종료를 수행하는 프록시를 관리
- [서비스 (Service)](/knowledge/kubernetes/service/) - TLS 종료 후 HTTP로 연결되는 백엔드
