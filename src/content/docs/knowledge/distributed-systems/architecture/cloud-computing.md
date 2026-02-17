---
title: "Cloud Computing"
description: "클라우드 컴퓨팅(Cloud Computing)은 가상화된 리소스의 쉽게 사용 가능하고 접근 가능한 풀을 기반으로, 동적으로 구성 가능한 컴퓨팅 자원을 종량제(pay-per-use) 모델로 제공하는 하이브리드 분산 시스템 아키텍처이다"
tags: ['Cloud', 'Iaas', 'Paas', 'Saas', 'Faas', 'Utility Computing', 'Virtualization']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/distributed-systems/cloud-computing
sidebar:
  order: 7
---

## 핵심 개념

클라우드 컴퓨팅은 유틸리티 컴퓨팅(utility computing)에서 발전하였으며, 고객이 데이터 센터에 작업을 업로드하고 자원 사용량 기반으로 과금되는 모델이다. SLA(Service-Level Agreement)를 통해 서비스 품질을 보장한다.

**클라우드의 4계층 구조**:

1. **하드웨어(Hardware)**: 프로세서, 라우터, 전력 및 냉각 시스템을 관리하는 최하위 계층. 데이터 센터에 위치하며 고객이 직접 접근하지 않음.
2. **인프라(Infrastructure)**: 가상화 기술을 활용하여 가상 스토리지와 가상 컴퓨팅 자원을 제공. 클라우드 컴퓨팅의 백본을 형성.
3. **플랫폼(Platform)**: 애플리케이션 개발자에게 운영체제와 유사한 환경을 제공. 벤더별 API를 통해 프로그램 업로드 및 실행 지원. Amazon S3가 대표적 예.
4. **애플리케이션(Application)**: 실제 애플리케이션이 실행되는 계층. 오피스 스위트 등 사용자 맞춤화 가능한 소프트웨어 제공.

**3가지 서비스 유형**:
- **IaaS (Infrastructure-as-a-Service)**: 하드웨어 및 인프라 계층 제공. Amazon EC2가 대표적. 가상 머신을 임대하여 완전한 분산 시스템 구성 가능.
- **PaaS (Platform-as-a-Service)**: 플랫폼 계층 제공. Google App Engine 등.
- **SaaS (Software-as-a-Service)**: 애플리케이션 계층 제공. Gmail, Google Docs 등.

추가적으로 **FaaS (Function-as-a-Service)**는 서버 시작 없이 코드를 실행할 수 있는 서버리스 컴퓨팅 모델이다.

클라우드 컴퓨팅은 논리적으로 고도로 발전된 클라이언트-서버 아키텍처이나, 서버의 실제 구현은 완전히 숨겨져 있으며 대부분 완전한 분산 방식으로 구현된다.

## 예시

```
# 클라우드 4계층 구조와 서비스 매핑

[Application Layer]  ─── SaaS ──── Google Docs, Gmail, YouTube
[Platform Layer]     ─── PaaS ──── Google App Engine, Amazon S3
[Infrastructure]     ─── IaaS ──── Amazon EC2 (가상 서버, 가상 스토리지)
[Hardware Layer]     ──────────── 데이터 센터 (CPU, 메모리, 디스크, 네트워크)

# Amazon EC2 사용 예
# 1. AMI(Amazon Machine Image) 선택 - 예: LAMP (Linux + Apache + MySQL + PHP)
# 2. 인스턴스 시작 (가상 머신 생성)
# 3. 리전 선택 (US, Europe, Asia 등)
# 4. 리소스 수준 설정:
#    - CPU: 코어 수, GPU 포함 여부
#    - Memory: 메인 메모리 할당량
#    - Storage: 로컬 스토리지 (임시) + S3/EBS (영구)
#    - Networking: 대역폭 설정
# 5. 공인 IP + 사설 IP 할당 → NAT로 매핑
```

## 관련 개념

- [Distributed System](/knowledge/distributed-systems/distributed-system/)
- [Scalability](/knowledge/distributed-systems/scalability/)
- [Layered Architecture](/knowledge/distributed-systems/layered-architecture/)
- [Edge Computing](/knowledge/distributed-systems/edge-computing/)
- [Content Delivery Network](/knowledge/distributed-systems/content-delivery-network/)
