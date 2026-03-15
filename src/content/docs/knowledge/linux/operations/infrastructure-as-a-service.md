---
title: "서비스형 인프라 (Infrastructure as a Service)"
description: "IaaS는 가상화된 컴퓨팅, 메모리, 네트워크, 스토리지 리소스를 요청하고 관리하는 클라우드 서비스 모델로, 클라우드 제공업체는 물리적 인프라만 담당하고 사용자는 OS 이상의 모든 계층을 직접 관리한다"
tags: ['Iaas', 'Cloud Computing', 'Virtualization', 'Vps', 'AWS', 'GCP']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/linux/infrastructure-as-a-service
sidebar:
  order: 1
---

## 핵심 개념

AWS EC2, Google Compute Engine, DigitalOcean Droplets가 대표적이다. **리전**(지리적 위치)과 **가용 영역**(리전 내 독립적 데이터센터 집합)은 고가용성의 핵심 개념으로, 서비스를 여러 가용 영역에 배포하여 장애 영향을 최소화한다.

**스토리지 유형**: 블록 스토리지(EBS — 가상 하드디스크, 볼륨 이동 가능), 임시 스토리지(호스트 로컬, VPS 삭제 시 데이터 손실), 객체 스토리지(S3 — HTTPS 접근, 높은 내구성).

**탄력성**: 프로그래밍 방식으로 리소스를 요청/해제하여 피크 시간에 확장하고 불필요 시 축소. 자동 확장(autoscaling) 기능으로 이 프로세스를 간소화한다.

## 예시

```bash
# AWS EC2 인스턴스 생성
aws ec2 run-instances --image-id ami-d440a6e7 \
  --instance-type t2.nano --key-name mykey

# GCP 인스턴스 생성
gcloud compute instances create myinstance \
  --image-family ubuntu-2004-lts --zone us-central1-a

# DigitalOcean 드롭릿 생성
tugboat create mydroplet -s 512mb -i ubuntu-20-04-x64

# 인스턴스 목록 확인
aws ec2 describe-instances

# 인스턴스 종료
aws ec2 terminate-instances --instance-ids i-123456
```

## 관련 개념

- [코드형 인프라 (Infrastructure as Code)](/knowledge/linux/infrastructure-as-code/)
- [오브젝트 스토리지 (Object Storage)](/knowledge/linux/object-storage/)
- [DevOps (데브옵스)](/knowledge/linux/devops/)
- [사이트 신뢰성 공학 (Site Reliability Engineering)](/knowledge/linux/site-reliability-engineering/)
- [리눅스 네임스페이스 (Linux Namespaces)](/knowledge/linux/linux-namespaces/)
