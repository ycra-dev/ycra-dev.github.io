---
title: "프로젝티드 볼륨 (Projected Volume)"
description: "Projected Volume은 여러 소스(ConfigMap, Secret, Downward API, ServiceAccountToken)의 데이터를 하나의 볼륨으로 결합하여 단일 디렉터리에 마운트할 수 있게 하는 Kubernetes 볼륨 타입이다"
tags: ['Kubernetes', 'Volume', 'Projected Volume', 'Configuration']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/kubernetes/projected-volume
sidebar:
  order: 7
---

## 핵심 개념

일반적으로 `configMap`, `secret`, `downwardAPI` 볼륨은 각각 별도의 디렉터리에 마운트해야 한다. `subPath`를 사용하면 개별 파일을 같은 디렉터리에 마운트할 수 있지만, 이 경우 소스 값이 변경되었을 때 파일이 자동으로 업데이트되지 않는다는 단점이 있다.

Projected Volume은 이 문제를 해결하여 여러 소스의 파일을 하나의 디렉터리에 모아 마운트할 수 있다. 각 소스의 설정 방식은 개별 볼륨 타입과 거의 동일하며, `items`, `path`, `mode` 등의 필드를 그대로 사용할 수 있다. 이를 통해 설정 파일과 TLS 인증서를 같은 디렉터리에 배치하는 것과 같은 유연한 구성이 가능해진다.

## 예시

ConfigMap과 Secret을 하나의 Projected Volume으로 결합:

```yaml
spec:
  volumes:
  - name: etc-envoy
    projected:
      sources:
      - configMap:
          name: kiada-envoy-config
      - secret:
          name: kiada-tls
          items:
          - key: tls.crt
            path: example-com.crt
          - key: tls.key
            path: example-com.key
            mode: 0600
  containers:
  - name: envoy
    image: envoyproxy/envoy:v1.14.1
    volumeMounts:
    - name: etc-envoy
      mountPath: /etc/envoy
      readOnly: true
```

이 구성으로 `/etc/envoy` 디렉터리에 envoy.yaml(ConfigMap), example-com.crt, example-com.key(Secret) 파일이 모두 함께 마운트된다.

## 관련 개념

- [컨피그맵 (ConfigMap)](/knowledge/kubernetes/configmap/) - Projected Volume의 소스 중 하나
- [시크릿 (Secret)](/knowledge/kubernetes/secret/) - Projected Volume의 소스 중 하나
- [Downward API](/knowledge/kubernetes/downward-api/) - Projected Volume의 소스 중 하나
- [볼륨 (Volume)](/knowledge/kubernetes/volume/) - 볼륨의 기본 개념
- [사이드카 컨테이너 (Sidecar Container)](/knowledge/kubernetes/sidecar-container/) - Envoy 같은 사이드카에 설정을 주입할 때 유용
