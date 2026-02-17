---
title: "Kubelet"
description: "Kubelet은 각 워커 노드에서 실행되는 Kubernetes 에이전트로, API Server와 통신하며 해당 노드에 할당된 애플리케이션의 실행과 상태 보고를 담당한다"
tags: ['Kubernetes', 'Kubelet', 'Worker Node', 'Agent', 'Node Management']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/kubernetes/kubelet
sidebar:
  order: 9
---

## 핵심 개념

Kubelet은 Workload Plane의 핵심 컴포넌트로, 각 워커 노드에서 직접 운영체제 위에 실행된다 (컨테이너 내부가 아닌 호스트 OS에서 실행).

주요 역할:
1. **Pod 실행 감지**: API Server를 통해 자신의 노드에 할당된 새 Pod를 감지
2. **컨테이너 실행 지시**: Container Runtime(Docker 등)에게 이미지를 풀(pull)하고 컨테이너를 생성, 실행하도록 지시
3. **애플리케이션 건강 유지**: 애플리케이션이 종료되면 자동으로 재시작
4. **상태 보고**: Pod와 노드의 상태를 API를 통해 보고 (Pod 인스턴스를 나타내는 객체를 업데이트)
5. **Node 객체 생성**: 클러스터에 머신이 추가되면 Kubelet이 Node 객체를 생성하여 노드를 등록

Kubelet의 동작은 컨트롤러 패턴을 따른다:
- 자신의 노드에 할당된 Pod 인스턴스를 감시
- Container Runtime을 통해 애플리케이션을 실행
- 실행 상태를 지속적으로 모니터링
- 장애 발생 시 자동 복구 시도

특이점: Node 객체는 일반적으로 사용자가 아닌 Kubelet에 의해 생성된다. Kubelet이 자신이 실행 중인 노드를 API에 등록하는 방식이다.

## 예시

```
Kubelet의 Pod 실행 흐름:

1. Scheduler가 Pod를 Worker Node 2에 할당
2. Worker Node 2의 Kubelet이 이를 감지
3. Kubelet이 Container Runtime에 지시:
   - 레지스트리에서 이미지 pull
   - 컨테이너 생성
   - 컨테이너 실행
4. Kubelet이 Pod 상태를 Running으로 업데이트
5. 지속적으로 모니터링하며 상태 보고
```

```bash
# Kubelet이 실행 중인지 확인 (Minikube)
$ minikube status
kubelet: Running
apiserver: Running
kubeconfig: Configured
```

## 관련 개념

- [Workload Plane](/knowledge/kubernetes/workload-plane/) - Kubelet이 실행되는 워커 노드 영역
- [Kubernetes API Server](/knowledge/kubernetes/kubernetes-api-server/) - Kubelet이 통신하는 API 서버
- [Container Runtime Interface](/knowledge/kubernetes/container-runtime-interface/) - Kubelet이 컨테이너 실행을 위해 사용하는 인터페이스
- [Pod](/knowledge/kubernetes/pod/) - Kubelet이 관리하는 기본 단위
- [Kubernetes Scheduler](/knowledge/kubernetes/kubernetes-scheduler/) - Pod를 노드에 할당하는 스케줄러
