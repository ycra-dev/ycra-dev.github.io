---
title: "가상 머신 (Virtual Machine)"
description: "가상 머신(Virtual Machine, VM)은 하이퍼바이저가 물리 하드웨어를 분할하여 제공하는 독립적인 운영체제 실행 환경으로, 자체 커널, init 프로세스, 드라이버를 갖춘 완전한 OS 인스턴스이다"
tags: ['Virtual Machine', 'VM', 'Virtualization', 'Guest OS', 'Image']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/linux/virtual-machine
sidebar:
  order: 2
---

## 핵심 개념

서버 가상화는 동일한 물리 하드웨어에서 여러 운영체제 인스턴스를 동시에 실행할 수 있게 한다. 이는 하드웨어를 OS에서 분리(decoupling)하여 다음과 같은 이점을 제공한다:

- **유연성**: 물리 서버보다 유연하고 프로그래밍적으로 관리 가능
- **이동성**: 라이브 마이그레이션을 통해 물리 서버 간 이동 가능
- **효율성**: 하나의 물리 서버에서 여러 게스트를 동시 서비스
- **기반 기술**: 클라우드 컴퓨팅과 컨테이너의 기반

VM은 **이미지(image)**로부터 생성된다. 이미지는 구성된 운영체제의 템플릿으로, 하이퍼바이저가 로드하고 실행할 수 있는 파일이다. 하이퍼바이저가 제시하는 가상 하드웨어는 표준화되어 있어, 실제 하드웨어가 달라도 이미지는 이식 가능하다. 스냅샷을 통해 백업하거나 새 VM 생성의 기반으로 사용할 수 있다.

**VM vs 컨테이너의 핵심 차이:**
| 항목 | 가상 머신 | 컨테이너 |
|------|-----------|----------|
| 커널 | 자체 커널 보유 | 호스트 커널 공유 |
| 부팅 | 분 단위 | 초 단위 |
| 크기 | 수 GB | 수 MB~수백 MB |
| 격리 | 하드웨어 수준 | OS 수준 |

실무에서는 VM과 컨테이너를 결합하여 사용하는 것이 일반적이다. VM으로 물리 서버를 관리 가능한 단위로 분할하고, VM 위에서 컨테이너를 실행하여 최적의 시스템 밀도(bin packing)를 달성한다.

## 예시

```bash
# VM 이미지 생성 (Packer - DigitalOcean)
packer build custom_image.json

# Vagrant로 개발용 VM 관리
vagrant init ubuntu/xenial64
vagrant up
vagrant ssh
vagrant destroy

# virt-install로 Xen 게스트 설치
virt-install --name chef --paravirt \
  --ram 512 --nographics \
  --disk /vm/chef.img,size=10 \
  --location http://mirror.example.com/centos/
```

## 관련 개념

- [하이퍼바이저 (Hypervisor)](/knowledge/linux/hypervisor/)
- [KVM (커널 기반 가상 머신)](/knowledge/linux/kvm/)
- [컨테이너 (Container)](/knowledge/linux/container/)
- [라이브 마이그레이션 (Live Migration)](/knowledge/linux/live-migration/)
- [Packer (패커)](/knowledge/linux/packer/)
- [Vagrant (베이그런트)](/knowledge/linux/vagrant/)
