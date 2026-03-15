---
title: "VPC (가상 사설 클라우드)"
description: "VPC(Virtual Private Cloud)는 클라우드 플랫폼에서 소프트웨어로 정의되는 사설 네트워크로, 가상 서버가 존재하는 격리된 네트워크 환경을 제공하며 서브넷, 라우팅 테이블, 보안 그룹, NAT 게이트웨이 등 전통적 네트워크 구성 요소를 가상으로 구현한다"
tags: ['Vpc', 'Cloud Networking', 'AWS', 'GCP', 'Software Defined Networking']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/linux/vpc
sidebar:
  order: 20
---

## 핵심 개념

**AWS VPC**의 핵심 구성 요소:
- RFC1918 사설 주소 공간에서 CIDR 표기법으로 IP 범위 선택 (/28~~/16)
- 퍼블릭 서브넷(DMZ 역할)과 프라이빗 서브넷으로 분할
- 인터넷 게이트웨이(igw)가 VPC를 인터넷에 연결
- 프라이빗 서브넷은 NAT 게이트웨이를 통해 아웃바운드 접근
- 보안 그룹: 인스턴스 수준의 상태 기반 방화벽 (기본 모두 거부)
- NACL: 서브넷 수준의 무상태 접근 제어 목록 (기본 모두 허용)

VPC 라우팅은 물리 토폴로지를 시뮬레이션하지 않아 모든 접근 가능한 목적지가 논리적으로 1홉이다. 퍼블릭/프라이빗 서브넷은 라우팅 테이블의 기본 게이트웨이로 구분: igw-* = 퍼블릭, nat-* = 프라이빗.

**GCP 네트워킹**: 네트워크가 전역적이어서 리전 간 사설 통신 가능. 서브네트워크로 리전별 세분화. 퍼블릭/프라이빗 구분 대신 외부 IP 주소 유무로 결정.

**Terraform**: HashiCorp의 인프라 코드화 도구로, HCL(HashiCorp Configuration Language)을 사용하여 VPC 및 관련 리소스를 선언적으로 정의하고 관리한다. `terraform apply`로 생성, `terraform destroy`로 삭제. AWS, GCP, Azure 등 다양한 프로바이더 지원.

## 예시

```hcl
# Terraform으로 VPC 생성 예시
resource "aws_vpc" "main" {
  cidr_block = "10.110.0.0/16"
  enable_dns_hostnames = true
}

resource "aws_subnet" "public" {
  vpc_id     = aws_vpc.main.id
  cidr_block = "10.110.1.0/24"
  map_public_ip_on_launch = true
}

resource "aws_internet_gateway" "igw" {
  vpc_id = aws_vpc.main.id
}
```

```bash
# Terraform 실행
terraform apply

# AWS CLI로 VPC 확인
aws ec2 describe-vpcs

# 보안 그룹 규칙 예시
# 인바운드: SSH(22), HTTP(80), HTTPS(443)
# 아웃바운드: 모든 트래픽 허용

# GCP 방화벽 규칙 기본값
# ICMP: 0/0 허용
# SSH(22): 0/0 허용
# 내부 네트워크: 모든 포트/프로토콜 허용
```

## 관련 개념

- [NAT (네트워크 주소 변환)](/knowledge/linux/nat/) - VPC 프라이빗 서브넷의 아웃바운드 트래픽 처리
- [CIDR (클래스리스 라우팅)](/knowledge/linux/cidr/) - VPC 주소 범위 표기법
- [서브넷 마스크 (Subnet Mask)](/knowledge/linux/subnet-mask/) - VPC 서브넷 분할
- [iptables (방화벽 규칙)](/knowledge/linux/iptables/) - 보안 그룹과 유사한 패킷 필터링
- [코드형 인프라 (Infrastructure as Code)](/knowledge/linux/infrastructure-as-code/) - Terraform을 통한 VPC 관리
- [클라우드 IAM (Cloud IAM)](/knowledge/linux/cloud-iam/) - VPC 리소스의 접근 제어
