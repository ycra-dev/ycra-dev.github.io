---
title: "로컬 데몬 통신 (Local Daemon Communication)"
description: "로컬 데몬 통신은 클라이언트 Pod가 동일한 노드에서 실행 중인 데몬 Pod에만 연결하도록 보장하는 패턴으로, hostPort, hostNetwork, 또는 internalTrafficPolicy가 Local인 Service를 통해 구현할 수 있다"
tags: ['Daemonset', 'Service', 'Internal Traffic Policy', 'Host Port', 'Kubernetes']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/kubernetes/local-daemon-communication
sidebar:
  order: 29
---

## 핵심 개념

DaemonSet으로 배포된 에이전트 Pod에 접근하는 세 가지 방법:

**1. hostPort 사용**:
- 노드의 특정 포트를 컨테이너 포트로 포워딩
- 클라이언트는 Downward API로 노드 IP를 얻어 접근
- NodePort와 다름: 로컬 Pod에만 트래픽 전달
- 외부 접근이 필요할 때 사용

**2. hostNetwork 사용**:
- Pod가 노드의 네트워크 환경을 직접 사용
- 에이전트가 노드의 네트워크 인터페이스에 직접 바인딩
- 보안 위험: 공격자가 Pod를 통해 노드의 모든 포트에 바인딩 가능

**3. Local Service 사용** (권장):
- `internalTrafficPolicy: Local` 설정으로 동일 노드의 Pod로만 트래픽 전달
- 가장 깔끔하고 안전한 방법
- 노드 네트워크에 영향 없음, 특별 권한 불필요
- 클라이언트는 일반 Service 이름으로 접근 가능
- 주의: 에이전트가 없는 노드에서 Service 접근 시 실패

권장 순서: Local Service > hostPort > hostNetwork

## 예시

Local Service 방식:
```yaml
# Service 정의
apiVersion: v1
kind: Service
metadata:
  name: node-agent
spec:
  internalTrafficPolicy: Local    # 로컬 Pod로만 트래픽 전달
  selector:
    app: node-agent
  ports:
  - name: http
    port: 80

# 클라이언트 Deployment에서 Service로 접근
env:
- name: NODE_AGENT_URL
  value: http://node-agent    # Service 이름만으로 접근
```

hostPort 방식:
```yaml
# DaemonSet Pod
ports:
- name: http
  containerPort: 80
  hostPort: 11559

# 클라이언트에서 Downward API로 노드 IP 사용
env:
- name: NODE_IP
  valueFrom:
    fieldRef:
      fieldPath: status.hostIP
- name: NODE_AGENT_URL
  value: http://$(NODE_IP):11559
```

## 관련 개념

- [데몬셋 (DaemonSet)](/knowledge/kubernetes/daemonset/) - 데몬 Pod를 배포하는 오브젝트
- [Downward API](/knowledge/kubernetes/downward-api/) - 노드 IP를 Pod에 전달하는 방법
- [호스트 네트워크와 특권 컨테이너 (Host Network and Privileged Containers)](/knowledge/kubernetes/host-network-and-privileged-containers/) - hostNetwork의 상세 설명
