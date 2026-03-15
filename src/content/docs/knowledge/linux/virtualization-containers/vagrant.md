---
title: "Vagrant (베이그런트)"
description: "Vagrant는 HashiCorp에서 개발한 가상 환경 프로비저닝 및 구성 래퍼(wrapper)로, VMware, VirtualBox, Docker 등의 가상화 플랫폼 위에서 일회용 개발 환경을 빠르고 쉽게 생성한다"
tags: ['Vagrant', 'Hashicorp', 'Development Environment', 'Virtualization', 'Provisioning']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/linux/vagrant
sidebar:
  order: 7
---

## 핵심 개념

Vagrant는 가상화 플랫폼 자체가 아니라, 기존 가상화 플랫폼 위에 놓이는 **추상화 계층**이다. 주요 목적은 프로덕션 환경을 밀접하게 반영하는 사전 구성된 개발 환경을 신속하게 생성하여, 개발자가 시스템 관리자나 운영 팀의 최소한의 개입으로 코드를 작성하고 테스트할 수 있게 하는 것이다.

**Packer와의 결합 사용:**
- Packer로 프로덕션 플랫폼의 기본 이미지를 표준화
- 해당 이미지의 Vagrant 빌드를 개발자에게 배포
- 개발자가 자신의 랩톱이나 클라우드에서 커스터마이징된 인스턴스 실행
- 중앙 집중식 프로덕션 이미지 관리와 개발자의 자율성 균형 유지

## 예시

```bash
# Vagrant 기본 사용법
vagrant init ubuntu/xenial64    # Vagrantfile 초기화
vagrant up                      # VM 시작
vagrant ssh                     # VM에 SSH 접속
vagrant halt                    # VM 중지
vagrant destroy                 # VM 삭제

# Vagrant 상태 확인
vagrant status
vagrant global-status
```

```ruby
# Vagrantfile 예시
Vagrant.configure("2") do |config|
  config.vm.box = "ubuntu/xenial64"
  config.vm.network "forwarded_port", guest: 80, host: 8080
  config.vm.provider "virtualbox" do |vb|
    vb.memory = "1024"
  end
  config.vm.provision "shell", inline: <<-SHELL
    apt-get update
    apt-get install -y nginx
  SHELL
end
```

## 관련 개념

- [가상 머신 (Virtual Machine)](/knowledge/linux/virtual-machine/)
- [Packer (패커)](/knowledge/linux/packer/)
- [코드형 인프라 (Infrastructure as Code)](/knowledge/linux/infrastructure-as-code/)
- [DevOps (데브옵스)](/knowledge/linux/devops/)
