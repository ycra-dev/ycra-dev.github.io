---
title: "Cloud IAM"
description: "클라우드 IAM(Identity and Access Management)은 관리자, 개발자 및 시스템이 클라우드 서비스를 관리할 수 있도록 하는 인증 및 권한 부여 시스템으로, 최소 권한 원칙에 따라 세밀한 액세스 제어를 구현한다"
tags: ['Iam', 'Cloud Security', 'Authentication', 'Authorization', 'Least Privilege', 'AWS']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/linux/cloud-iam
sidebar:
  order: 12
---

## 핵심 개념

AWS IAM이 가장 강력한 기능을 제공한다. **사용자**, **그룹**, **역할(roles)**을 정의하고, JSON 형식의 **정책(policies)**으로 특정 리소스에 대한 작업을 허용/거부한다.

**IAM 역할**: 사용자 대신 EC2 인스턴스 같은 서비스에 할당하여 자격 증명을 하드코딩하지 않고 AWS API를 호출 가능. 임시 자격 증명을 제공하고 자동 로테이션된다.

**모범 사례**: 루트 사용자에 MFA 활성화 → 일상용 IAM 사용자 생성 → 그룹에 정책 적용 → 서비스에는 역할 사용. Azure는 Active Directory 기반, Google IAM은 AWS 대비 상대적으로 제한적이다.

## 예시

```bash
# IAM 사용자 생성 및 그룹 할당
aws iam create-user --user-name john
aws iam create-group --group-name developers
aws iam add-user-to-group --user-name john --group-name developers

# 최소 권한 정책 생성
aws iam create-policy --policy-name S3ReadOnly \
  --policy-document file://s3-read-policy.json

# EC2에 IAM 역할 할당
aws ec2 run-instances --image-id ami-123 \
  --iam-instance-profile Name=EC2-S3-Profile

# 사용자에 MFA 활성화
aws iam enable-mfa-device --user-name john \
  --serial-number arn:aws:iam::123:mfa/john \
  --authentication-code1 123456 --authentication-code2 789012
```

## 관련 개념

- [Identity Management](/knowledge/linux/identity-management/)
- [Sudo](/knowledge/linux/sudo/)
- [Access Control List](/knowledge/linux/access-control-list/)
- [Infrastructure as a Service](/knowledge/linux/infrastructure-as-a-service/)
