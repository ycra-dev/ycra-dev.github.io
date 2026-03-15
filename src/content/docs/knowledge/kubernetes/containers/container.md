---
title: "컨테이너 (Container)"
description: "컨테이너는 호스트 운영체제 내에서 실행되는 격리된 프로세스이다"
tags: ['Container', 'Linux', 'Process Isolation', 'Virtualization']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/kubernetes/container
sidebar:
  order: 1
---

## 핵심 개념

컨테이너는 가상 머신(VM)의 대안으로, 마이크로서비스 아키텍처에서 각 서비스의 환경을 격리하는 데 사용된다.

**컨테이너 vs 가상 머신 비교:**

| 특성 | 컨테이너 | 가상 머신 |
|------|---------|----------|
| 오버헤드 | 거의 없음 | 게스트 OS로 인해 상당함 |
| 시작 시간 | 프로세스만 시작하면 되므로 빠름 | OS 부팅이 필요하여 느림 |
| 격리 수준 | 커널 공유로 인해 상대적으로 낮음 | 별도 커널로 완전한 격리 |
| 보안 | 커널 취약점이 다른 컨테이너에 영향 가능 | 하드웨어만 공유하므로 더 안전 |

컨테이너의 핵심 원리:
- 컨테이너 내의 프로세스는 호스트 OS에서 실행되는 일반 프로세스임
- Linux Namespaces로 파일시스템, 프로세스 ID, 네트워크 등을 격리
- Cgroups로 CPU, 메모리 등 리소스 사용량을 제한
- Capabilities, seccomp, AppArmor/SELinux로 보안을 강화

중요한 원칙: 하나의 컨테이너에는 하나의 애플리케이션만 실행해야 한다. Kubernetes를 포함한 모든 컨테이너 관련 소프트웨어는 컨테이너 당 하나의 애플리케이션이라는 전제로 설계되어 있다.

## 예시

```bash
# Docker를 사용한 컨테이너 실행
$ docker run busybox echo "Hello World"
Hello World

# 컨테이너 실행 (백그라운드)
$ docker run --name kiada-container -p 1234:8080 -d kiada

# 실행 중인 컨테이너 목록 확인
$ docker ps
CONTAINER ID    IMAGE           COMMAND          CREATED        ...
44d76963e8e1    kiada:latest    "node app.js"    6 minutes ago  ...

# 컨테이너 내부의 프로세스 목록 (격리됨)
root@44d76963e8e1:/# ps aux
USER  PID  COMMAND
root    1  node app.js    # 컨테이너에서는 PID 1
root   10  bash
root   19  ps aux

# 호스트에서 동일 프로세스 확인 (다른 PID)
$ ps aux | grep app.js
root  382  node app.js    # 호스트에서는 PID 382
```

## 관련 개념

- [컨테이너 이미지 (Container Image)](/knowledge/kubernetes/container-image/) - 컨테이너를 생성하는 이미지
- [리눅스 네임스페이스 (Linux Namespaces)](/knowledge/kubernetes/linux-namespaces/) - 컨테이너 격리를 위한 커널 기능
- [Cgroups (컨트롤 그룹)](/knowledge/kubernetes/cgroups/) - 컨테이너 리소스 제한을 위한 커널 기능
- [컨테이너 런타임 인터페이스 (Container Runtime Interface)](/knowledge/kubernetes/container-runtime-interface/) - Kubernetes와 컨테이너 런타임 간의 인터페이스
- [파드 (Pod)](/knowledge/kubernetes/pod/) - Kubernetes에서 컨테이너를 묶어 관리하는 단위
