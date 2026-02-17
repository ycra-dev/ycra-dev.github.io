---
title: "Kubernetes"
description: "Kubernetes는 컨테이너화된 애플리케이션의 배포와 관리를 자동화하는 오픈소스 소프트웨어 시스템이다"
tags: ['Kubernetes', 'Container Orchestration', 'Cloud Native', 'Infrastructure']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/kubernetes/kubernetes
sidebar:
  order: 1
---

## 핵심 개념

Kubernetes는 컴퓨터 클러스터를 위한 운영체제와 같은 역할을 수행한다. 개별 서버의 하드웨어 세부사항을 추상화하여 전체 클러스터를 하나의 거대한 배포 영역으로 제공한다. 이를 통해 개발자는 인프라 세부사항에 신경 쓰지 않고 애플리케이션 개발에 집중할 수 있다.

Kubernetes가 제공하는 핵심 기능은 다음과 같다:
- **서비스 디스커버리**: 애플리케이션이 다른 애플리케이션을 찾아 통신할 수 있게 해주는 메커니즘
- **수평적 확장(Horizontal Scaling)**: 부하 변동에 따라 애플리케이션 복제본을 조절
- **로드 밸런싱**: 모든 애플리케이션 복제본에 부하를 분산
- **자가 치유(Self-healing)**: 장애 발생 시 자동으로 애플리케이션을 재시작하고 건강한 노드로 이동
- **리더 선출(Leader Election)**: 활성 인스턴스를 결정하는 메커니즘

Kubernetes는 선언적(declarative) 모델을 사용하여 애플리케이션을 정의하고 배포한다. 사용자가 원하는 상태를 기술하면 Kubernetes가 이를 실현하고 유지한다.

## 예시

Kubernetes 클러스터는 마스터 노드(Control Plane)와 워커 노드(Workload Plane)로 구성된다:

```yaml
# 간단한 애플리케이션 배포 흐름:
# 1. 사용자가 YAML 매니페스트를 API 서버에 제출
# 2. 컨트롤러가 새 객체를 감지하고 Pod 인스턴스 생성
# 3. 스케줄러가 각 인스턴스를 노드에 할당
# 4. Kubelet이 컨테이너 런타임을 통해 애플리케이션 실행
# 5. Kube Proxy가 로드 밸런서 설정
```

주요 관리형 Kubernetes 서비스:
- Google Kubernetes Engine (GKE)
- Amazon Elastic Kubernetes Service (EKS)
- Azure Kubernetes Service (AKS)

## 관련 개념

- [Control Plane](/knowledge/kubernetes/control-plane/) - Kubernetes 클러스터의 두뇌 역할을 하는 컴포넌트
- [Workload Plane](/knowledge/kubernetes/workload-plane/) - 실제 워크로드가 실행되는 워커 노드
- [Declarative Model](/knowledge/kubernetes/declarative-model/) - Kubernetes의 선언적 배포 방식
- [Microservices Architecture](/knowledge/kubernetes/microservices-architecture/) - Kubernetes가 해결하는 마이크로서비스 관리 문제
- [Container](/knowledge/kubernetes/container/) - Kubernetes가 관리하는 기본 실행 단위
