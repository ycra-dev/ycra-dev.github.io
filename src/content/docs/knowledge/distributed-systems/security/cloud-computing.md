---
title: "클라우드 컴퓨팅 (Cloud Computing)"
description: "인터넷을 통해 서버, 스토리지, 데이터베이스, 소프트웨어 등의 컴퓨팅 자원을 필요한 만큼 서비스로 제공하는 모델이다"
tags: ["Security", "Cloud", "Computing", "AWS", "Infrastructure"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/distributed-systems/cloud-computing
sidebar:
  order: 25
---

## 핵심 개념

클라우드 컴퓨팅(Cloud Computing)은 인터넷을 통해 서버, 스토리지, 데이터베이스, 소프트웨어 등의 컴퓨팅 자원을 필요한 만큼 서비스로 제공하는 모델이다. 핵심 아이디어는 컴퓨팅 자원을 **소유하지 않고 빌려 쓰는 것**으로, 전기를 직접 발전하지 않고 전력회사에서 사오는 것과 유사한 유틸리티 모델이다.

## 동작 원리

**서비스 모델**:
- **IaaS(Infrastructure as a Service)**: 가상 서버, 스토리지, 네트워크 제공. 예: Amazon EC2, Google Compute Engine
- **PaaS(Platform as a Service)**: 애플리케이션 개발·배포 플랫폼 제공. 예: Google App Engine, Heroku
- **SaaS(Software as a Service)**: 완성된 소프트웨어를 웹으로 제공. 예: Gmail, Google Docs, Dropbox

**주요 사업자**:
- **Amazon AWS**: 시장점유율 1위. EC2(서버), S3(스토리지) 등
- **Microsoft Azure**: 기업 시장에서 강세
- **Google Cloud Platform**: 데이터 분석·AI에 강점

**장점**:
- 초기 투자 비용 없음 (사용한 만큼만 지불)
- 필요에 따라 자원을 즉시 확장/축소 (탄력성)
- 전 세계 어디서든 접근 가능
- 인프라 관리 부담 감소

**문제점과 우려**:
- **데이터 소유권**: 데이터가 어디에 저장되고 누가 접근할 수 있는가?
- **프라이버시**: 클라우드 제공자가 사용자 데이터를 열람할 수 있는가?
- **종속성(Lock-in)**: 특정 클라우드 제공자에 의존하게 되는 문제
- **가용성**: 클라우드 서비스 장애 시 모든 사용자가 영향 받음
- **법적 관할**: 데이터가 저장된 국가의 법률 적용 문제

## 예시

개인 사용자의 클라우드:
```
- Google Drive: 문서 저장 및 공동 편집
- iCloud: iPhone 사진 자동 백업
- Netflix: 영상 콘텐츠 스트리밍 (SaaS)
- Gmail: 이메일 서비스 (SaaS)
```

기업의 클라우드 활용:
```
스타트업이 웹 서비스를 출시하는 경우:
- 과거: 서버 구매(수백만원), 데이터센터 임대, 네트워크 설정 → 수주~수개월
- 현재: AWS EC2 인스턴스 생성 → 수분 내 서버 가동, 시간당 과금

aws ec2 run-instances --image-id ami-12345 --instance-type t2.micro
→ 몇 초 만에 가상 서버 생성 완료
```

## 관련 개념

- [데이터 마이닝 (Data Mining)](/knowledge/distributed-systems/data-mining/) - 클라우드에 저장된 대규모 데이터는 데이터 마이닝의 대상
- [암호학 (Cryptography)](/knowledge/distributed-systems/cryptography/) - 클라우드 데이터 보호에 암호화 필수
- [대역폭 (Bandwidth)](/knowledge/network/bandwidth/) - 클라우드 서비스 품질은 네트워크 대역폭에 의존

## 출처

- Understanding the Digital World, Chapter 11
