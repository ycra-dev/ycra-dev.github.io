---
title: "Downward API"
description: "Downward API는 파드의 메타데이터(이름, 네임스페이스, IP, 레이블, 리소스 제한 등)를 환경 변수나 파일을 통해 컨테이너 내부 애플리케이션에 전달하는 메커니즘이다"
tags: ['Kubernetes', 'Configuration', 'Downward API', 'Pod Metadata']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/kubernetes/downward-api
sidebar:
  order: 6
---

## 핵심 개념

Downward API는 REST 엔드포인트가 아니라, 파드 오브젝트의 `metadata`, `spec`, `status` 필드 값을 컨테이너로 "아래로(down)" 주입하는 방식이다. 이를 통해 애플리케이션은 Kubernetes API를 직접 호출하지 않고도 자신이 실행 중인 파드의 정보를 알 수 있다.

환경 변수를 통한 주입은 `fieldRef`(일반 메타데이터)와 `resourceFieldRef`(컴퓨팅 리소스 제한)를 사용한다. 지원되는 필드에는 `metadata.name`, `metadata.namespace`, `status.podIP`, `spec.nodeName` 등이 있다. 일부 필드(예: `metadata.labels` 전체)는 환경 변수가 아닌 볼륨을 통해서만 주입할 수 있다.

`downwardAPI` 볼륨을 사용하면 파드 메타데이터를 파일로 컨테이너 파일 시스템에 마운트할 수 있다. 리소스 필드의 경우 `divisor`를 지정하여 단위를 변환할 수 있으며(예: 메모리를 KB 단위로), `containerName`을 지정하여 다른 컨테이너의 리소스 정보도 참조할 수 있다.

## 예시

환경 변수를 통한 파드 메타데이터 주입:

```yaml
env:
- name: POD_NAME
  valueFrom:
    fieldRef:
      fieldPath: metadata.name
- name: POD_IP
  valueFrom:
    fieldRef:
      fieldPath: status.podIP
- name: NODE_NAME
  valueFrom:
    fieldRef:
      fieldPath: spec.nodeName
```

컴퓨팅 리소스 제한 주입:

```yaml
env:
- name: MAX_CPU_CORES
  valueFrom:
    resourceFieldRef:
      resource: limits.cpu
- name: MAX_MEMORY_KB
  valueFrom:
    resourceFieldRef:
      resource: limits.memory
      divisor: 1k
```

`downwardAPI` 볼륨으로 파일에 주입:

```yaml
volumes:
- name: pod-meta
  downwardAPI:
    items:
    - path: pod-name.txt
      fieldRef:
        fieldPath: metadata.name
containers:
- name: foo
  volumeMounts:
  - name: pod-meta
    mountPath: /pod-metadata
```

## 관련 개념

- [ConfigMap](/knowledge/kubernetes/configmap/) - 정적 설정 데이터를 주입하는 방법
- [Secret](/knowledge/kubernetes/secret/) - 민감한 데이터를 주입하는 방법
- [Projected Volume](/knowledge/kubernetes/projected-volume/) - Downward API를 다른 소스와 결합
- [Kubelet](/knowledge/kubernetes/kubelet/) - Downward API 값을 컨테이너에 주입하는 주체
