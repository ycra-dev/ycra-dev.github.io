---
title: "High Availability"
description: "고가용성(High Availability)은 서버 장애, 로드 스파이크, 네트워크 파티션, 표적 공격에도 서비스를 지속적으로 제공할 수 있는 시스템 설계 원칙으로, 이중화, 자동 장애 조치, 건강 검사를 핵심으로 한다"
tags: ['High Availability', 'Redundancy', 'Failover', 'Health Check', 'Web Hosting']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/linux/high-availability
sidebar:
  order: 15
---

## 핵심 개념

단일 서버는 다음과 같은 문제에 취약하다: (1) 모든 잠재적 장애에 사용자가 노출, (2) 소프트웨어/OS 업데이트 시 다운타임 불가피, (3) 로드 스파이크나 공격에 취약 - 특정 임계치를 넘으면 성능이 점진적이 아닌 급격히 저하.

고가용성 설계 원칙:
- **이중화**: 각 레이어가 2개 이상의 노드에서 실행. 로드 밸런서도 쌍으로 운영(active-passive 또는 active-active).
- **건강 검사**: 로드 밸런서가 정기적으로 백엔드 서버에 HTTP 요청을 보내 상태 확인. HTTP 200이 아니면 풀에서 제거, 복구되면 자동 복귀. 정교한 애플리케이션은 DB/캐시 연결 확인, 성능 모니터링 등을 포함하는 건강 검사 엔드포인트를 노출.
- **지리적 분산**: 이상적으로 여러 지리적 리전에 걸쳐 분산하여 단일 데이터 센터 의존성 제거. 클라우드 플랫폼의 가용 영역(Availability Zone) 활용.
- **무중단 업데이트**: 서버를 로테이션에서 제거, 업데이트, 복귀하는 롤링 업데이트 방식.

클라우드에서는 ELB 같은 관리형 로드 밸런서, Auto Scaling, 다중 가용 영역 배포를 통해 고가용성을 비교적 쉽게 구현할 수 있다.

## 예시

```
# HAProxy 건강 검사 설정
backend webservers
    option httpchk GET /health_check HTTP/1.1\r\nHost:\ www
    http-check expect status 200
    server web1 10.0.0.1:8080 check inter 30s
    server web2 10.0.0.2:8080 check inter 30s

# NGINX 건강 검사
upstream backend {
    server web1:8080;
    server web2:8080;
}
server {
    location / {
        proxy_pass http://backend;
        health_check interval=30 fails=3 passes=1;
    }
}

# AWS 다중 AZ 배포 개념
# ELB -> AZ-A: [web1, web2] + AZ-B: [web3, web4]
# RDS 다중 AZ: 자동 장애 조치

# 무중단 배포 예시
# 1. web2를 로테이션에서 제거
# 2. web2 업데이트
# 3. web2 복귀
# 4. web1에 대해 반복
```

## 관련 개념

- [Load Balancer](/knowledge/linux/load-balancer/)
- [HAProxy](/knowledge/linux/haproxy/)
- [NGINX](/knowledge/linux/nginx/)
- [CDN](/knowledge/linux/cdn/)
- [Web Application Stack](/knowledge/linux/web-application-stack/)
- [Infrastructure as a Service](/knowledge/linux/infrastructure-as-a-service/)
