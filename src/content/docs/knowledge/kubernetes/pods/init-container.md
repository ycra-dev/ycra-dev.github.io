---
title: "Init Container"
description: "Init Container는 Pod의 주 컨테이너(main container)가 시작되기 전에 순차적으로 실행되는 특수한 컨테이너로, Pod의 초기화 작업을 수행한다"
tags: ['Kubernetes', 'Pod', 'Init Container', 'Initialization', 'Container']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/kubernetes/init-container
sidebar:
  order: 3
---

## 핵심 개념

Init Container는 Pod 매니페스트의 `initContainers` 필드에 정의되며, 정의된 순서대로 하나씩 실행된다. 일반 컨테이너와 달리 병렬로 실행되지 않으며, 이전 init 컨테이너가 완료되어야 다음 init 컨테이너가 시작된다.

Init Container의 주요 용도:
1. **볼륨 초기화**: 주 컨테이너가 사용할 인증서, 설정 파일, 데이터 등을 볼륨에 준비
2. **네트워크 설정**: Pod의 네트워크 시스템을 초기화 (같은 네트워크 namespace를 공유하므로)
3. **전제 조건 확인**: 의존하는 서비스가 준비될 때까지 주 컨테이너의 시작을 지연
4. **외부 시스템 알림**: 새 애플리케이션 인스턴스의 시작을 외부 시스템에 통지

Init Container를 사용하면 주 컨테이너 이미지를 재빌드하지 않고도 초기화 작업을 수행할 수 있으며, 보안 측면에서도 유리하다. 공격자가 악용할 수 있는 도구나 민감한 데이터를 init 컨테이너의 파일시스템에만 두어 공격 표면을 줄일 수 있다.

일반적으로 init 컨테이너는 한 번만 실행되지만, 예외적으로 Kubernetes가 전체 Pod를 재시작해야 하는 경우 다시 실행될 수 있으므로, init 컨테이너의 작업은 멱등성(idempotent)을 가져야 한다.

## 예시

두 개의 init 컨테이너를 포함한 Pod 매니페스트:

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: kiada-init
spec:
  initContainers:
  - name: init-demo
    image: luksa/init-demo:0.1
  - name: network-check
    image: luksa/network-connectivity-checker:0.1
  containers:
  - name: kiada
    image: luksa/kiada:0.2
    stdin: true
    ports:
    - name: http
      containerPort: 8080
  - name: envoy
    image: luksa/kiada-ssl-proxy:0.1
    ports:
    - name: https
      containerPort: 8443
    - name: admin
      containerPort: 9901
```

Pod 시작 과정에서의 상태 변화:

```
NAME         READY   STATUS            RESTARTS   AGE
kiada-init   0/2     Init:0/2          0          0s    # 첫 번째 init 실행
kiada-init   0/2     Init:1/2          0          6s    # 두 번째 init 실행
kiada-init   0/2     PodInitializing   0          7s    # 주 컨테이너 시작 중
kiada-init   2/2     Running           0          8s    # 모든 컨테이너 실행 중
```

Init 컨테이너 로그 확인:

```bash
kubectl logs kiada-init -c network-check
```

## 관련 개념

- [Pod](/knowledge/kubernetes/pod/) - Init 컨테이너가 속하는 기본 실행 단위
- [Sidecar Container](/knowledge/kubernetes/sidecar-container/) - Pod 내에서 동작하는 또 다른 보조 컨테이너 유형
- [Volume](/knowledge/kubernetes/volume/) - Init 컨테이너가 초기화할 수 있는 스토리지
- [Pod Phase](/knowledge/kubernetes/pod-phase/) - Init 실행 중의 Pod 상태 단계
- [Container](/knowledge/kubernetes/container/) - Init 컨테이너의 기반이 되는 컨테이너 개념
