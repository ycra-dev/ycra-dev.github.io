---
title: "Cgroups (컨트롤 그룹)"
description: "컨트롤 그룹(Control Groups, cgroups)은 Linux 커널 기능으로, 프로세스 그룹의 시스템 자원(CPU, 메모리, 디스크 I/O, 네트워크) 사용을 제한하고 우선순위를 지정하여 폭주 프로세스가 모든 가용 자원을 소비하는 것을 방지한다"
tags: ['Cgroups', 'Control Groups', 'Linux', 'Resource Management', 'Container']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/linux/cgroups
sidebar:
  order: 12
---

## 핵심 개념

cgroups는 컨테이너 기술의 핵심 기반 기능 중 하나로, Google에서 2006년 시작된 Linux Containers 프로젝트(LXC)의 일부로 개발이 촉진되었다. LXC는 Google의 내부 가상화 플랫폼 Borg의 기반이기도 했다.

**cgroups의 주요 역할:**
- **자원 제한**: 프로세스 그룹이 사용할 수 있는 CPU, 메모리, I/O 대역폭의 상한 설정
- **우선순위 지정**: 특정 프로세스에 다른 프로세스보다 높은 자원 할당 우선순위 부여
- **자원 사용 모니터링**: 프로세스 그룹의 자원 사용량 추적 및 보고
- **격리**: 네임스페이스와 함께 프로세스 그룹을 서로 격리

컨테이너 엔진(Docker, containerd)은 각 컨테이너에 대해 cgroup을 생성하여 자원 사용을 제한한다. 이를 통해 하나의 컨테이너가 폭주하더라도 다른 컨테이너나 호스트 시스템에 영향을 주지 않는다.

## 예시

```bash
# Docker에서 cgroups를 통한 자원 제한
docker run -d --name webapp \
  --memory="512m" \           # 메모리 제한 512MB
  --cpus="1.5" \              # CPU 사용 제한 1.5코어
  nginx

# cgroup 정보 확인
cat /sys/fs/cgroup/memory/docker/<container-id>/memory.limit_in_bytes
cat /sys/fs/cgroup/cpu/docker/<container-id>/cpu.shares

# cgroup v2 확인
mount | grep cgroup
cat /proc/cgroups
```

## 관련 개념

- [컨테이너 (Container)](/knowledge/linux/container/)
- [도커 (Docker)](/knowledge/linux/docker/)
- [리눅스 네임스페이스 (Linux Namespaces)](/knowledge/linux/linux-namespaces/)
- [리눅스 캐퍼빌리티 (Linux Capabilities)](/knowledge/linux/linux-capabilities/)
- [프로세스 (Process)](/knowledge/linux/process/)
