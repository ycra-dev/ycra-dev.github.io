---
title: "Container"
description: "컨테이너(Container)는 애플리케이션 실행에 필요한 바이너리, 라이브러리, 설정 파일의 집합으로 구성된 소프트웨어 환경 가상화 기술이다"
tags: ['Container', 'Docker', 'Namespace', 'Cgroup', 'Union Filesystem', 'Isolation']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/distributed-systems/container
sidebar:
  order: 3
---

## 핵심 개념

컨테이너는 가상 머신과 달리 별도의 게스트 OS 없이 호스트 OS를 공유한다. 이를 통해 더 가벼운 가상화를 구현한다.

**Linux 컨테이너의 3가지 핵심 메커니즘**:

1. **네임스페이스(Namespaces)**: 컨테이너 내 프로세스에 독립적인 식별자 뷰를 제공. PID 네임스페이스를 통해 각 컨테이너는 자체 init 프로세스(PID 1)를 가짐. `unshare --pid --fork --mount-proc bash` 명령으로 구현. 컨테이너 간 격리의 핵심.

2. **유니온 파일 시스템(Union File System)**: 여러 파일 시스템을 계층적으로 결합. 공통 기반(예: Ubuntu 20.4)을 읽기 전용 레이어로 공유하고, 최상위 레이어만 쓰기 가능. `mount` 시스템 콜로 구현. 환경 복사 없이 효율적 공유 가능.

3. **제어 그룹(cgroups)**: 프로세스 그룹의 리소스 사용 제한. 메인 메모리 할당량, CPU 우선순위 등을 제어하여 단일 컨테이너가 과도한 리소스를 사용하는 것을 방지.

**가상 머신 vs 컨테이너 성능 비교**:
- **CPU/메모리**: 컨테이너가 약간 우세하나 차이가 크지 않음.
- **I/O**: 가상 머신이 상당히 느림. 특권 명령어 실행이 많기 때문. 그러나 최근 연구에서는 OS 캐싱으로 차이가 줄어드는 경우도 있음.
- **격리**: 가상 머신이 독립 애플리케이션 간 격리와 스케줄링에서 더 우수.
- 전체적으로 가상 머신과 컨테이너의 성능 차이는 점점 줄어드는 추세.

**PlanetLab 사례**: 컨테이너 기술의 초기 적용 예. 여러 조직이 컴퓨터를 기부하여 구성한 광역 클러스터. Vserver(컨테이너의 전신)를 사용하여 슬라이스(slice, 가상 서버 클러스터) 제공. 2020년 종료 후 EdgeNet이 Docker와 Kubernetes로 계승.

## 예시

```bash
# 컨테이너 네임스페이스 격리 예시

# PID 네임스페이스 분리
$ unshare --pid --fork --mount-proc bash
$ ps -ef
UID   PID  PPID  C  STIME  TTY   TIME     CMD
root    1     0  0  06:27  pts/0 00:00:00 bash
root    2     1  0  06:27  pts/0 00:00:00 ps -ef
# → 외부 프로세스가 보이지 않음, 독립된 PID 공간

# 컨테이너 구조 요약
┌──────────────────────────┐
│    Application Process   │
├──────────────────────────┤
│  쓰기 가능 레이어 (최상위) │  ← 컨테이너 고유 데이터
├──────────────────────────┤
│  PHP 8.0 레이어 (읽기전용) │  ← 특정 버전 오버라이드
├──────────────────────────┤
│  Ubuntu 20.4 (읽기전용)   │  ← 공통 기반, 여러 컨테이너 공유
├──────────────────────────┤
│  Host OS Kernel           │  ← 모든 컨테이너가 공유
├──────────────────────────┤
│  Hardware                 │
└──────────────────────────┘
```

## 관련 개념

- [Virtualization](/knowledge/distributed-systems/virtualization/)
- [Cloud Computing](/knowledge/distributed-systems/cloud-computing/)
- [Cluster Computing](/knowledge/distributed-systems/cluster-computing/)
- [Distributed System](/knowledge/distributed-systems/distributed-system/)
- [Code Migration](/knowledge/distributed-systems/code-migration/)
