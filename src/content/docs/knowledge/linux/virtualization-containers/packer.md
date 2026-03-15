---
title: "Packer (패커)"
description: "Packer는 HashiCorp에서 개발한 오픈소스 도구로, 명세 파일(specification file)로부터 다양한 가상화 및 클라우드 플랫폼용 가상 머신 이미지를 자동으로 빌드하는 도구이다"
tags: ['Packer', 'Hashicorp', 'Image Building', 'Virtualization', 'Infrastructure As Code']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/linux/packer
sidebar:
  order: 6
---

## 핵심 개념

Packer는 **인프라스트럭처 애즈 코드(Infrastructure as Code)** 방식의 서버 관리를 지원한다. 이미지에 수동으로 변경을 적용하는 대신, 이미지를 추상적으로 기술하는 템플릿을 작성하고 코드 저장소에 체크인한다. 이를 통해 투명성, 반복 가능성, 가역성을 확보한다.

**이미지 생성 프로세스:**
1. 선택한 소스 이미지에서 인스턴스 시작
2. 지정된 스크립트나 프로비저닝 단계로 인스턴스 커스터마이징
3. 가상 머신 상태의 복사본을 새 이미지로 저장

**Packer 구성의 두 핵심 요소:**
- **빌더(Builders)**: 이미지 생성 방법 정의 (AWS, GCP, VMware, VirtualBox, Vagrant 등)
- **프로비저너(Provisioners)**: 이미지 내 소프트웨어 구성 및 설치 (셸 스크립트, Ansible, Chef, Salt 등)

Packer는 가상화 플랫폼에 구애받지 않기 때문에, 동일한 명세로 여러 플랫폼용 이미지를 쉽게 빌드할 수 있다.

## 예시

```json
{
  "builders": [{
    "type": "amazon-ebs",
    "access_key": "{{user `aws_access_key`}}",
    "secret_key": "{{user `aws_secret_key`}}",
    "region": "us-east-1",
    "source_ami": "ami-d440a6e7",
    "instance_type": "t2.micro",
    "ssh_username": "ubuntu",
    "ami_name": "custom-ami-{{timestamp}}"
  }],
  "provisioners": [{
    "type": "shell",
    "script": "customize_ami.sh"
  }]
}
```

```bash
# 이미지 빌드
packer build custom_ami.json

# 디버그 모드 (각 단계에서 일시 중지)
packer build -debug custom_ami.json
```

## 관련 개념

- [가상 머신 (Virtual Machine)](/knowledge/linux/virtual-machine/)
- [코드형 인프라 (Infrastructure as Code)](/knowledge/linux/infrastructure-as-code/)
- [Vagrant (베이그런트)](/knowledge/linux/vagrant/)
