---
title: "코드형 인프라 (Infrastructure as Code)"
description: "인프라스트럭처 애즈 코드(IaC)는 시스템 및 네트워크 인프라의 전체 수명 주기를 선언적 코드로 작성하여 자동화하는 개념으로, 수동 서버 프로비저닝과 대조된다"
tags: ['Iac', 'Automation', 'Terraform', 'Cloudformation', 'DevOps', 'Cloud Computing']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/linux/infrastructure-as-code
sidebar:
  order: 8
---

## 핵심 개념

**AWS CloudFormation**: JSON/YAML 템플릿으로 리소스와 구성을 설명. 리소스 간 종속성을 자동 정리하지만, 엄격한 구문으로 장황하고 읽기 어려울 수 있다.

**HashiCorp Terraform**: 클라우드에 구애받지 않는 인프라 도구. AWS, GCP, Azure 등 여러 제공업체를 하나의 도구로 관리 가능. 구성 파일을 버전 관리 시스템에 체크인하여 인프라를 추적한다.

핵심 이점은 **반복 가능성과 일관성**이다. 동일한 환경을 정확히 재현할 수 있으며, 개발/스테이징/프로덕션 환경 간 불일치를 줄인다. 코드 리뷰를 통해 인프라 변경을 검토하고 승인할 수 있다.

## 예시

```hcl
# Terraform 예시 (main.tf)
provider "aws" {
  region = "us-east-1"
}

resource "aws_instance" "web" {
  ami           = "ami-d440a6e7"
  instance_type = "t2.nano"
  tags = { Name = "WebServer" }
}
```

```bash
# Terraform 워크플로우
terraform init
terraform plan
terraform apply
terraform destroy

# CloudFormation 스택 생성
aws cloudformation create-stack \
  --stack-name mystack --template-body file://template.yaml
```

Packer는 명세 파일로부터 가상 머신 이미지를 빌드하는 도구로, IaC 방식의 서버 관리를 지원한다. 이미지를 추상적으로 기술하는 템플릿을 작성하고 코드 저장소에 체크인하여 투명성, 반복 가능성, 가역성, 감사 추적을 확보한다.

CI/CD 파이프라인에서 IaC는 특히 **이뮤터블 배포(Immutable Deployment)** 패턴과 결합된다. 새 릴리스 배포 시 서버를 수정하는 대신, 업데이트된 아티팩트가 포함된 완전히 새로운 서버를 Terraform으로 생성한다. 서버는 일회용이며 임시적으로 취급된다.

**문서화 형태로서의 IaC (Ch.31):**
IaC는 가장 중요한 형태의 문서화이기도 하다. Puppet 모듈이나 Ansible 플레이북 형태의 구성 정의를 Git 등 버전 관리 시스템에 저장하면, 시스템과 그 변경 사항이 구성 파일에 자동으로 문서화된다. 환경을 정기적으로 표준과 비교하여 빌드할 수 있어, 문서화와 환경이 항상 일치하고 최신 상태를 유지한다. 이는 전통적 수동 문서화의 가장 큰 문제(문서와 실제 환경의 불일치)를 해결한다.

## 관련 개념

- [서비스형 인프라 (Infrastructure as a Service)](/knowledge/linux/infrastructure-as-a-service/)
- [DevOps (데브옵스)](/knowledge/linux/devops/)
- [사이트 신뢰성 공학 (Site Reliability Engineering)](/knowledge/linux/site-reliability-engineering/)
- [Terraform (테라폼)](/knowledge/linux/terraform/)
- [Packer (패커)](/knowledge/linux/packer/)
- [구성 관리 (Configuration Management)](/knowledge/linux/configuration-management/)
- [지속적 전달 (Continuous Delivery)](/knowledge/linux/continuous-delivery/)
- [변경 관리 (Change Management)](/knowledge/linux/change-management/) - IaC를 통한 변경 추적과 관리
