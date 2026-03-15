---
title: "리눅스 네임스페이스 (Linux Namespaces)"
description: "Linux namespaces는 프로세스를 계층적 파티션으로 격리하여 시스템의 파일, 네트워크 포트, 프로세스의 부분 집합만 볼 수 있게 하는 커널 메커니즘이다"
tags: ['Namespaces', 'Linux', 'Isolation', 'Container', 'Docker', 'Security']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/linux/linux-namespaces
sidebar:
  order: 4
---

## 핵심 개념

Namespaces는 선제적 접근 제어의 한 형태이다. 복잡한 기준으로 접근 제어 결정을 내리는 대신, 커널이 파티션 내에서 보이지 않는 객체의 존재 자체를 부정한다.

**핵심 특성:**
- 파티션 내부에서는 일반적인 접근 제어 규칙이 적용됨
- 격리된 프로세스는 자신이 제한되었다는 것을 인식하지 못함
- 격리는 비가역적이므로, 파티션 내에서 root로 실행해도 다른 부분에 위험을 주지 않음
- Copy-on-write 파일시스템 접근 같은 확장 기능 포함

이 기술은 소프트웨어 컨테이너화의 기반이며, Docker가 가장 잘 알려진 구현이다. 현재는 주로 부가 서비스에 적용되며, 운영체제의 내장 컴포넌트보다는 애드온 서비스의 격리에 사용된다.

컨테이너 엔진은 네임스페이스를 사용하여 파일시스템 마운트, 프로세스 관리, 네트워킹 관점에서 컨테이너 프로세스를 격리한다. Docker의 기본 네트워킹은 네트워크 네임스페이스를 사용하여 각 컨테이너에 프라이빗 IP 주소를 할당하고, docker0 브리지를 통해 호스트와 연결한다. 가상 인터페이스 쌍(veth pair)이 호스트 네임스페이스와 컨테이너 네임스페이스를 연결한다.

## 예시

```bash
# 현재 프로세스의 namespaces 확인
ls -la /proc/self/ns/

# 새로운 namespace에서 프로세스 실행 (unshare)
sudo unshare --pid --fork --mount-proc /bin/bash

# 주요 namespace 유형
# PID  - 프로세스 ID 격리
# NET  - 네트워크 스택 격리
# MNT  - 마운트 포인트 격리
# UTS  - 호스트명/도메인명 격리
# IPC  - IPC 리소스 격리
# USER - 사용자/그룹 ID 격리
```

## 관련 개념

- [리눅스 캐퍼빌리티 (Linux Capabilities)](/knowledge/linux/linux-capabilities/)
- [DevOps (데브옵스)](/knowledge/linux/devops/)
- [컨테이너 (Container)](/knowledge/linux/container/)
- [도커 (Docker)](/knowledge/linux/docker/)
- [Cgroups (컨트롤 그룹)](/knowledge/linux/cgroups/)
