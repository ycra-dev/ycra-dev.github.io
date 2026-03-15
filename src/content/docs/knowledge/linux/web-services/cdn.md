---
title: "CDN (콘텐츠 전송 네트워크)"
description: "CDN(Content Delivery Network)은 전 세계에 분산된 에지 서버 네트워크를 통해 콘텐츠를 사용자에게 더 가까이 이동시켜 웹 성능을 향상시키는 시스템이다"
tags: ['Cdn', 'Content Delivery Network', 'Edge Server', 'Performance', 'DNS']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/linux/cdn
sidebar:
  order: 11
---

## 핵심 개념

CDN의 에지 서버는 프록시 캐시와 유사하다. 콘텐츠의 로컬 사본을 저장하고, 사본이 없거나 만료되면 오리진에서 가져와 클라이언트에 응답하고 캐시를 갱신한다.

CDN은 **DNS를 사용하여 클라이언트를 지리적으로 가장 가까운 호스트로 리다이렉션**한다. 클라이언트가 DNS 조회를 하면, CDN의 권한 DNS 서버가 가장 가까운 에지 서버의 IP 주소를 반환한다.

전통적으로 정적 콘텐츠(이미지, CSS, JavaScript, 다운로드)에 가장 적합하지만, 현재는 동적 콘텐츠도 호스팅할 수 있다. Netflix, YouTube 같은 스트리밍 서비스도 CDN으로 대용량 미디어 파일을 서비스한다.

CDN은 성능 향상 외에도 **DDoS 방어**, **웹 애플리케이션 방화벽** 등의 보안 서비스도 제공한다.

주요 CDN: **Akamai**(가장 오래되고 가장 큰 글로벌 네트워크, 비싼 가격), **CloudFlare**(우수한 보안 기능, HTTP/2 조기 배포), **CloudFront**(AWS CDN, S3/EC2/ELB와 통합, 사용량 기반 과금).

소규모 서비스는 CDN보다 먼저 로컬 캐싱 레이어를 최적화하는 것이 좋다.

## 예시

```bash
# CDN 동작 원리 (DNS 기반)
# 1. 사용자가 www.example.com 접속
# 2. DNS가 가장 가까운 에지 서버 IP 반환
# 3. 에지 서버가 캐시에서 콘텐츠 서비스
# 4. 캐시 미스 시 오리진에서 가져와서 캐시 갱신

# CloudFront 배포 생성 (AWS CLI)
aws cloudfront create-distribution \
    --origin-domain-name mybucket.s3.amazonaws.com

# S3 + CloudFront로 정적 사이트 호스팅
# 1. S3 버킷 생성 및 콘텐츠 업로드
# 2. CloudFront 배포 생성
# 3. CNAME 레코드로 도메인 연결

# CDN 캐시 무효화
aws cloudfront create-invalidation \
    --distribution-id DIST_ID \
    --paths "/*"
```

## 관련 개념

- [웹 캐시 (Web Cache)](/knowledge/linux/web-cache/)
- [HTTP (하이퍼텍스트 전송 프로토콜)](/knowledge/linux/http/)
- [로드 밸런서 (Load Balancer)](/knowledge/linux/load-balancer/)
- [웹 서버 (Web Server)](/knowledge/linux/web-server/)
- [DNS MX 레코드 (DNS MX Record)](/knowledge/network/dns-mx-record/)
