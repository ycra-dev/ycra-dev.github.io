---
title: "Containerization"
description: "cgroups, chroot jail, bind mount, overlay filesystem 등을 활용한 경량 격리 메커니즘으로, VM보다 리소스 오버헤드와 시작 시간이 적으면서 멀티테넌시와 추상화를 제공"
tags: ["Software Engineering", "Infrastructure", "Containers"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/systems-and-services/containerization
sidebar:
  order: 302
---

## 핵심 개념

컨테이너화(Containerization)는 cgroups, chroot jail, bind mount, overlay filesystem 등을 활용한 경량 격리 메커니즘이다. VM보다 리소스 오버헤드와 시작 시간이 적으면서 멀티테넌시와 추상화를 제공한다. 원래 멀티테넌시를 위한 격리 메커니즘으로 시작했지만, 컴퓨트 환경을 추상화하는 핵심 역할도 수행한다.

## 동작 원리

컨테이너는 배포된 소프트웨어와 실행 머신 사이에 추상화 경계를 제공한다.

컨테이너의 추상화 가치:
1. **파일시스템 추상화**: 회사 외부에서 작성된 소프트웨어를 커스텀 머신 구성 없이 통합. 의존성 관리에 도움 (특정 라이브러리 버전을 사전 선언/패키징)
2. **이름 기반 리소스 관리**: 네트워크 포트, GPU 등 전문 리소스. Google은 초기에 포트를 컨테이너 추상화에 포함하지 않아 `PickUnusedPortOrDie` 함수가 C++ 코드베이스에 20,000건 이상 사용됨
3. **시간에 따른 변경 관리**: 머신이 변경되더라도 컨테이너 소프트웨어(단일 팀 관리)만 적응하면 됨

VM vs 컨테이너: VM은 전체 OS를 실행해야 하므로 리소스 오버헤드와 시작 시간이 크다. 배치 작업처럼 작은 리소스와 짧은 실행 시간이 필요한 워크로드에는 컨테이너가 더 적합하다.

## 예시

- **Docker**: Linux 네임스페이스를 사용하여 컨테이너에 가상 사설 NIC 제공, 앱이 원하는 포트에서 리스닝 가능
- **Kubernetes**: 컨테이너("pod")를 호스트 네트워크에서 사용 가능한 "실제" IP 주소로 취급

Hyrum's Law와 컨테이너: 거대한 사용자 수와 "API를 사용하고 있다"는 인식 부재로 인해 암묵적 의존성이 특히 강하게 적용된다. Borg의 PID 공간 고갈 사례가 대표적이다.

Lock-in 문제: 컴퓨트 인프라의 높은 lock-in 계수 — VM 기반이면 팀이 VM 이미지를 조정하고, 컨테이너 기반이면 클러스터 매니저 API를 호출하게 됨.

## 관련 개념

- [Borg](/knowledge/software-engineering/systems-and-services/borg/)
- [Compute as a Service](/knowledge/software-engineering/systems-and-services/compute-as-a-service/)
- [Architecting for Failure](/knowledge/software-engineering/systems-and-services/architecting-for-failure/)
- [Cattle vs Pets](/knowledge/software-engineering/design-and-evolution/cattle-vs-pets/)
