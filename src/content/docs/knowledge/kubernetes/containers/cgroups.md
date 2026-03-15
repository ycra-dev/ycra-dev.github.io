---
title: "Cgroups (컨트롤 그룹)"
description: "Linux Control Groups(cgroups)는 프로세스 또는 프로세스 그룹의 CPU, 메모리, 디스크, 네트워크 대역폭과 같은 시스템 리소스 사용량을 제한, 계측, 격리하는 Linux 커널 기능이다"
tags: ['Linux', 'Cgroups', 'Resource Management', 'Container', 'Kernel']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/kubernetes/cgroups
sidebar:
  order: 7
---

## 핵심 개념

Linux Namespaces가 프로세스가 "어떤 리소스를 볼 수 있는지"를 제한한다면, Cgroups는 프로세스가 "각 리소스를 얼마만큼 사용할 수 있는지"를 제한한다.

예를 들어, Namespaces로 특정 네트워크 인터페이스만 접근하도록 할 수 있지만, 해당 프로세스가 소비하는 네트워크 대역폭을 제한하려면 Cgroups가 필요하다. 마찬가지로 CPU 시간이나 메모리 사용량도 Namespaces만으로는 제한할 수 없다.

Cgroups의 역할:
- **CPU 제한**: 특정 CPU 코어만 사용하도록 제한하거나, CPU 시간을 할당
- **메모리 제한**: 최대 사용 가능 메모리를 설정
- **네트워크 대역폭 제한**: 네트워크 리소스 사용량 제어
- **리소스 계측**: 프로세스(그룹)의 리소스 사용량을 추적

Cgroups가 없다면 하나의 프로세스가 모든 CPU 시간을 점유하여 중요한 시스템 프로세스의 실행을 방해할 수 있다. Kubernetes에서는 이 메커니즘을 통해 각 컨테이너의 리소스 요청과 제한을 관리한다.

## 예시

```bash
# Docker에서 CPU 제한 설정
# 특정 CPU 코어만 사용하도록 제한 (코어 1, 2만 사용)
$ docker run --cpuset-cpus="1,2" ...

# CPU 시간 제한 (0.5 코어만 사용)
$ docker run --cpus="0.5" ...

# 메모리 제한 (최대 100MB)
$ docker run --memory="100m" ...

# 실전 예시: kiada 컨테이너를 리소스 제한과 함께 실행
$ docker run --name kiada-container \
  --cpus="1.0" \
  --memory="256m" \
  -p 1234:8080 -d kiada
```

Docker의 리소스 제한 옵션들:
- CPU 관련: `--cpus`, `--cpu-period`, `--cpu-quota`, `--cpu-shares`, `--cpuset-cpus`
- 메모리 관련: `--memory`, `--memory-reservation`, `--kernel-memory`, `--memory-swap`, `--memory-swappiness`

이 모든 Docker 옵션은 내부적으로 프로세스의 cgroups를 설정하며, 실제 리소스 제한은 커널이 수행한다.

## 관련 개념

- [리눅스 네임스페이스 (Linux Namespaces)](/knowledge/kubernetes/linux-namespaces/) - Cgroups와 함께 컨테이너 격리를 구성하는 커널 기능
- [컨테이너 (Container)](/knowledge/kubernetes/container/) - Cgroups에 의해 리소스가 제한되는 프로세스
- [수평 확장 (Horizontal Scaling)](/knowledge/kubernetes/horizontal-scaling/) - 리소스 제한이 스케일링 결정에 영향
- [쿠버네티스 (Kubernetes)](/knowledge/kubernetes/kubernetes/) - Cgroups를 통해 Pod의 리소스 요청과 제한을 관리
