---
title: "Terraform (테라폼)"
description: "Terraform은 HashiCorp에서 개발한 인프라스트럭처 애즈 코드(IaC) 도구로, 선언적 구성 파일(\"plan\")로 클라우드 인프라를 정의하고 API 호출을 통해 자동으로 생성/관리한다"
tags: ['Terraform', 'Hashicorp', 'Infrastructure As Code', 'Provisioning', 'Cloud']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/linux/terraform
sidebar:
  order: 16
---

## 핵심 개념

Terraform은 수십 개의 클라우드 프로바이더와 다양한 서비스를 지원하는 범용 인프라 프로비저닝 도구이다. ".tf" 확장자의 구성 파일에서 바람직한 인프라 상태를 기술하면, Terraform이 적절한 API 호출 시리즈를 만들어 클라우드 리소스를 생성한다.

**핵심 개념:**
- **Provider**: 클라우드 플랫폼 정의 (AWS, GCP, DigitalOcean 등)
- **Resource**: 생성할 인프라 요소 (인스턴스, 로드 밸런서, DNS 등)
- **Variable**: 구성의 파라미터화
- **State file** (`terraform.tfstate`): Terraform이 관리하는 리소스의 현재 상태 스냅샷

**CI/CD 파이프라인에서의 역할:**
Terraform은 CI/CD 파이프라인의 배포 단계에서 인프라를 프로비저닝하는 데 사용된다. Jenkins 파이프라인에서 `terraform apply`를 실행하여 새 이미지로 서버를 생성하고, 테스트 후 `terraform destroy`로 테스트 인프라를 삭제하는 패턴이 일반적이다.

**보안 모범 사례:**
API 토큰 같은 시크릿을 소스 코드 저장소에 직접 저장하지 말 것. Jenkins의 credential store 등 암호화된 저장소에서 환경 변수로 전달해야 한다.

## 예시

```hcl
# ulsahgo.tf - DigitalOcean 인프라 정의
variable "do_token" {}
variable "ssh_fingerprint" {}
variable "image_id" {}

provider "digitalocean" {
  token = "${var.do_token}"
}

resource "digitalocean_droplet" "ulsahgo-1" {
  image    = "${var.image_id}"
  name     = "ulsahgo-1"
  region   = "sfo2"
  size     = "512mb"
  ssh_keys = ["${var.ssh_fingerprint}"]
}

resource "digitalocean_loadbalancer" "web" {
  name   = "ulsahgo-lb"
  region = "sfo2"
  forwarding_rule {
    entry_port     = 80
    target_port    = 8000
    entry_protocol = "http"
    target_protocol = "http"
  }
  healthcheck {
    port     = 8000
    protocol = "http"
    path     = "/healthy"
  }
  droplet_ids = [
    "${digitalocean_droplet.ulsahgo-1.id}",
    "${digitalocean_droplet.ulsahgo-2.id}"
  ]
}
```

```bash
# Terraform 워크플로우
terraform init
terraform plan -var "image_id=$IMAGE_ID"
terraform apply -auto-approve
terraform destroy -auto-approve
```

## 관련 개념

- [코드형 인프라 (Infrastructure as Code)](/knowledge/linux/infrastructure-as-code/)
- [지속적 전달 (Continuous Delivery)](/knowledge/linux/continuous-delivery/)
- [CI/CD 파이프라인 (CI/CD Pipeline)](/knowledge/linux/cicd-pipeline/)
- [Packer (패커)](/knowledge/linux/packer/)
- [Jenkins (젠킨스)](/knowledge/linux/jenkins/)
