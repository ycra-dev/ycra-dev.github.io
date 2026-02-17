---
title: "Linux Namespaces"
description: "Linux Namespaces는 각 프로세스가 시스템의 독립적인 뷰(view)를 갖도록 보장하는 Linux 커널 기능이다"
tags: ['Linux', 'Namespaces', 'Container', 'Isolation', 'Kernel']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/kubernetes/linux-namespaces
sidebar:
  order: 6
---

## 핵심 개념

처음에 Linux OS의 모든 시스템 리소스(파일시스템, 프로세스 ID, 네트워크 인터페이스 등)는 모든 프로세스가 볼 수 있는 하나의 "버킷"에 존재한다. 커널은 추가적인 "버킷"인 네임스페이스를 생성하고 리소스를 이동시켜, 각 네임스페이스를 특정 프로세스(그룹)에만 보이게 할 수 있다.

사용 가능한 네임스페이스 유형:

| 유형 | 약칭 | 격리 대상 |
|------|------|----------|
| Mount | mnt | 마운트 포인트 (파일시스템) |
| Process ID | pid | 프로세스 ID |
| Network | net | 네트워크 디바이스, 스택, 포트 |
| IPC | ipc | 프로세스 간 통신 (메시지 큐, 공유 메모리) |
| UTS | uts | 호스트명, NIS 도메인명 |
| User ID | user | 사용자 및 그룹 ID |
| Time | - | 시스템 클럭 오프셋 |
| Cgroup | - | Control Groups 루트 디렉토리 |

핵심 원리:
- 각 프로세스는 각 네임스페이스 유형마다 하나의 네임스페이스 인스턴스에 연결됨
- 프로세스는 자신의 네임스페이스에 있는 리소스만 보고 사용할 수 있음
- 관련 컨테이너는 일부 네임스페이스를 공유할 수 있음 (예: 같은 Pod의 컨테이너가 네트워크 네임스페이스를 공유)
- 네임스페이스 공유를 통해 "컨테이너"의 경계가 반드시 동일한 선상에 있지 않을 수 있음

컨테이너란 결국 여러 네임스페이스(각 유형별 하나)가 할당된 프로세스이다. 실제로 실체가 있는 "캡슐" 같은 것이 아니라, 네임스페이스를 통한 격리된 환경에서 실행되는 일반 프로세스이다.

## 예시

```
네트워크 네임스페이스 사용 예:

기본 네임스페이스:               컨테이너 네임스페이스:
+------------------+           +------------------+
| eth0 (물리 NIC)  |           | eth0 (가상 NIC)  |
| wlan0            |           | lo               |
| docker0          |           +------------------+
+------------------+
  호스트가 보는 인터페이스         컨테이너가 보는 인터페이스

# 두 프로세스가 네임스페이스를 공유/분리하는 예:
프로세스 A와 B:
- 같은 Network namespace 사용 --> 같은 네트워크 인터페이스 공유
- 같은 UTS namespace 사용    --> 같은 호스트명 공유
- 다른 Mount namespace 사용  --> 서로 다른 파일시스템
```

```bash
# 컨테이너 내부에서 프로세스 목록 (격리된 PID namespace)
root@44d76963e8e1:/# ps aux
PID   COMMAND
  1   node app.js    # 컨테이너에서는 PID 1

# 호스트에서 동일 프로세스 (호스트의 PID namespace)
$ ps aux | grep app.js
PID   COMMAND
 382  node app.js    # 호스트에서는 다른 PID
```

## 관련 개념

- [Container](/knowledge/kubernetes/container/) - Namespaces를 통해 격리되는 프로세스
- [Cgroups](/knowledge/kubernetes/cgroups/) - Namespaces와 함께 컨테이너를 구성하는 커널 기능
- [Pod](/knowledge/kubernetes/pod/) - 같은 Pod의 컨테이너가 일부 Namespaces를 공유
- [Seccomp](/knowledge/kubernetes/seccomp/) - 시스템 콜 수준의 추가 격리
