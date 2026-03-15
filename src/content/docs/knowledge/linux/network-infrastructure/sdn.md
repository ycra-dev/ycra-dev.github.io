---
title: "소프트웨어 정의 네트워킹 (SDN)"
description: "소프트웨어 정의 네트워킹(SDN)은 네트워크를 관리하는 제어 평면(control plane)을 패킷을 전달하는 데이터 평면(data plane)으로부터 물리적으로 분리하여, API를 통해 네트워크 구성을 프로그래밍 가능하게 만드는 네트워킹 패러다임이다"
tags: ['Sdn', 'Networking', 'Control Plane', 'Data Plane', 'Virtualization', 'DevOps']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/linux/sdn
sidebar:
  order: 8
---

## 핵심 개념

SDN의 핵심 아이디어는 네트워크 하드웨어의 물리적 구성과 기능적 아키텍처를 분리하는 것이다. 이는 서버 가상화가 물리적 하드웨어와 운영 환경을 분리한 것과 같은 맥락이다.

**SDN의 구조:**
- **데이터 평면(Data Plane)**: 실제 패킷을 전달하는 구성 요소. 제어 평면에 의해 프로그래밍됨
- **제어 평면(Control Plane)**: 네트워크를 관리하고 데이터 경로를 설정하는 구성 요소

**SDN의 이점:**
- 성능, 보안, 접근성 목표에 맞게 데이터 경로를 동적으로 세밀하게 구성 가능
- API 기반 구성 시스템으로 DevOps 도구와 CI/CD 파이프라인에 통합 가능
- 물리적 리소스의 위치를 추상화하여 유연성 증가
- 이상적으로는 "다음 프로덕션 환경"을 미리 준비하여 원클릭 배포 가능

**엔터프라이즈 SDN 주의사항**: 많은 벤더가 독점적 SDN 제품을 제공하며, 이는 SDN의 원래 목적인 벤더 독립적 표준화와 상충한다. 오픈 표준을 준수하고 다른 벤더 제품과 상호운용 가능한 제품을 선택해야 한다.

**클라우드 SDN**: 대규모 클라우드 제공자의 SDN은 가상 인프라 구성을 용이하게 하며, 독점적이지만 플랫폼에 긴밀하게 통합되어 있다.

## 예시

```bash
# SDN 개념적 구조
# +------------------+
# |  SDN Controller  |  <-- 제어 평면 (OpenFlow, ONOS 등)
# |  (Control Plane)  |
# +--------+---------+
#          | API (OpenFlow, REST)
# +--------v---------+
# |   Network Devices |  <-- 데이터 평면 (스위치, 라우터)
# |   (Data Plane)    |
# +------------------+

# OpenFlow 기반 SDN 컨트롤러 예시
# - OpenDaylight (opendaylight.org)
# - ONOS (onosproject.org)
# - Floodlight

# 클라우드 SDN 예시 (AWS VPC)
aws ec2 create-vpc --cidr-block 10.0.0.0/16
aws ec2 create-subnet --vpc-id vpc-xxx --cidr-block 10.0.1.0/24
```

## 관련 개념

- [네트워크 스위치 (Network Switch)](/knowledge/linux/network-switch/) - SDN이 프로그래밍하는 데이터 평면 장비
- [네트워크 라우터 (Network Router)](/knowledge/linux/network-router/) - SDN으로 제어되는 라우팅 장비
- [VLAN (가상 랜)](/knowledge/linux/vlan/) - SDN 이전의 네트워크 분할 방식
- [DevOps (데브옵스)](/knowledge/linux/devops/) - SDN과 통합 가능한 운영 방법론
- [코드형 인프라 (Infrastructure as Code)](/knowledge/linux/infrastructure-as-code/) - SDN의 API 기반 구성과 유사한 접근
