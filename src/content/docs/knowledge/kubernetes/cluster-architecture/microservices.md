---
title: "Microservices Architecture"
description: "마이크로서비스 아키텍처는 하나의 대규모 모놀리식 애플리케이션을 수십에서 수백 개의 독립적인 소규모 서비스로 분리하여 개발, 배포, 운영하는 소프트웨어 아키텍처 패턴이다"
tags: ['Microservices', 'Architecture', 'Distributed Systems', 'DevOps']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/kubernetes/microservices
sidebar:
  order: 2
---

## 핵심 개념

과거에는 대부분의 애플리케이션이 하나의 큰 모놀리스(monolith)였다. 모든 컴포넌트가 밀접하게 결합되어 단일 프로세스에서 실행되었으며, 대규모 팀이 하나의 단위로 개발했다.

마이크로서비스 패러다임의 등장으로 이러한 모놀리스가 수십에서 수백 개의 독립적인 프로세스로 분리되었다. 이를 통해 조직은 개발 부서를 더 작은 팀으로 나눌 수 있게 되었다.

마이크로서비스의 주요 특징과 과제:
- **독립적 개발/배포 주기**: 각 마이크로서비스는 자체 개발 및 릴리스 사이클을 가짐
- **의존성 분기**: 시간이 지남에 따라 서로 다른 마이크로서비스가 호환되지 않는 라이브러리 버전을 요구할 수 있음
- **통신 복잡성**: 개별 파트가 더 이상 동일한 컴퓨터에서 실행될 필요가 없어 통신 설정이 복잡해짐
- **관리의 어려움**: 수백 개의 서비스를 개별적으로 관리해야 하므로 자동화된 관리가 필수적

Kubernetes와의 관계:
- 컨테이너가 환경 충돌 문제를 해결 (서로 다른 라이브러리 버전 요구)
- Kubernetes가 수백 개의 마이크로서비스 자동 관리를 거의 사소한 작업으로 만듦
- 5개 미만의 마이크로서비스에는 Kubernetes가 과할 수 있음
- 20개 이상의 마이크로서비스가 있다면 Kubernetes 통합이 유익할 가능성이 높음

## 예시

모놀리식 vs 마이크로서비스 비교:

```
모놀리식:
+-----------------------------+
|    하나의 큰 애플리케이션      |
|  (모든 기능이 단일 프로세스)   |
+-----------------------------+
     하나의 큰 팀이 개발

마이크로서비스 (Kiada Suite 예시):
+----------+  +----------+  +----------+
| Node.js  |  |  Quote   |  |   Quiz   |
| Web App  |  | Service  |  | Service  |
+----------+  +----------+  +----------+
  팀 A가 개발    팀 B가 개발    팀 C가 개발
  독립 배포       독립 배포       독립 배포
```

## 관련 개념

- [Kubernetes](/knowledge/kubernetes/kubernetes/) - 마이크로서비스 관리를 자동화하는 플랫폼
- [Container](/knowledge/kubernetes/container/) - 마이크로서비스 간 환경 격리를 제공
- [Service](/knowledge/kubernetes/service/) - 마이크로서비스 간 통신 진입점
- [Deployment](/knowledge/kubernetes/deployment/) - 마이크로서비스 배포를 관리하는 객체
- [Horizontal Scaling](/knowledge/kubernetes/horizontal-scaling/) - 마이크로서비스의 독립적 확장
