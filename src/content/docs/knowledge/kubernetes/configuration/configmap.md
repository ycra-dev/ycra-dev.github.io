---
title: "ConfigMap"
description: "ConfigMap은 키-값 쌍으로 구성된 Kubernetes API 오브젝트로, 컨테이너 이미지에서 설정 데이터를 분리하여 애플리케이션 구성을 외부화하는 데 사용된다"
tags: ['Kubernetes', 'Configuration', 'Configmap', 'Decoupling']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/kubernetes/configmap
sidebar:
  order: 1
---

## 핵심 개념

ConfigMap은 애플리케이션의 설정 데이터를 파드 매니페스트나 컨테이너 이미지와 분리하여 관리할 수 있게 해주는 핵심 메커니즘이다. 이를 통해 동일한 파드 정의를 개발, 스테이징, 프로덕션 등 여러 환경에서 재사용할 수 있으며, 각 환경에 맞는 ConfigMap만 별도로 관리하면 된다.

ConfigMap의 값은 짧은 문자열부터 대용량 구성 파일까지 다양하게 저장할 수 있다. 파드는 ConfigMap의 키-값 쌍을 환경 변수로 주입하거나, `configMap` 볼륨을 통해 파일 시스템에 마운트하여 사용할 수 있다. 애플리케이션은 Kubernetes API를 직접 호출하지 않고도 설정값을 받을 수 있어 Kubernetes에 대한 의존성 없이 동작할 수 있다.

ConfigMap의 최대 크기는 etcd의 제한에 따라 약 1MB이다. `immutable: true`를 설정하면 변경을 방지하여 안전하게 운영할 수 있으며, kubelet의 부하도 줄일 수 있다.

## 예시

ConfigMap을 YAML 매니페스트로 생성하는 예시:

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: kiada-config
data:
  status-message: This status message is set in the kiada-config config map
```

`kubectl` 명령어로 직접 생성하는 방법:

```bash
kubectl create configmap kiada-config \
  --from-literal status-message="This status message is set in the kiada-config config map"
```

파일에서 ConfigMap 생성:

```bash
kubectl create configmap kiada-envoy-config \
  --from-file=envoy.yaml \
  --dry-run=client -o yaml > cm.kiada-envoy-config.yaml
```

환경 변수로 주입:

```yaml
env:
- name: INITIAL_STATUS_MESSAGE
  valueFrom:
    configMapKeyRef:
      name: kiada-config
      key: status-message
      optional: true
```

`envFrom`으로 전체 ConfigMap 주입:

```yaml
envFrom:
- configMapRef:
    name: kiada-config
    optional: true
```

## 관련 개념

- [Secret](/knowledge/kubernetes/secret/) - 민감한 데이터를 위한 유사한 오브젝트
- [Downward API](/knowledge/kubernetes/downward-api/) - 파드 메타데이터를 주입하는 또 다른 방법
- [Projected Volume](/knowledge/kubernetes/projected-volume/) - 여러 소스를 하나의 볼륨으로 결합
- [Volume](/knowledge/kubernetes/volume/) - ConfigMap 볼륨의 기반이 되는 볼륨 개념
- [etcd](/knowledge/kubernetes/etcd/) - ConfigMap이 저장되는 백엔드 저장소
- [Pod Manifest](/knowledge/kubernetes/pod-manifest/) - ConfigMap을 참조하는 파드 정의
