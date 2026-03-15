---
title: "불변 컨피그맵과 시크릿 (Immutable ConfigMap and Secret)"
description: "Immutable ConfigMap과 Secret은 `immutable: true`로 설정되어 생성 후 데이터 변경이 불가능한 구성 오브젝트로, 설정의 일관성 보장과 클러스터 성능 향상을 위해 사용된다"
tags: ['Kubernetes', 'Configmap', 'Secret', 'Immutability', 'Configuration']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/kubernetes/immutable-configmap
sidebar:
  order: 8
---

## 핵심 개념

ConfigMap이나 Secret을 변경하면 예기치 않은 문제가 발생할 수 있다. configMap 볼륨의 파일은 비동기적으로 업데이트되므로, 파드 인스턴스마다 업데이트 시점이 달라 수십 초 동안 서로 다른 설정으로 운영될 수 있다. 환경 변수로 주입된 경우에는 컨테이너 재시작 전까지 아예 업데이트되지 않아, 일부 인스턴스만 새 설정을 사용하는 불일치가 발생한다.

이러한 문제를 방지하기 위해 `immutable: true`를 설정하면 API 서버가 `data`와 `binaryData` 필드의 변경을 차단한다. 새로운 설정이 필요하면 새 ConfigMap을 생성하고 파드가 이를 참조하도록 변경해야 한다.

성능 측면에서도 이점이 있다. Immutable ConfigMap을 사용하는 kubelet은 변경 알림을 감시할 필요가 없어 API 서버의 부하가 줄어든다.

## 예시

Immutable ConfigMap 생성:

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: my-immutable-configmap
data:
  mykey: myvalue
  another-key: another-value
immutable: true
```

변경 시도 시 API 서버가 거부하므로, 새 설정이 필요하면 새 ConfigMap을 만들어야 한다.

## 관련 개념

- [컨피그맵 (ConfigMap)](/knowledge/kubernetes/configmap/) - 기본 ConfigMap 개념
- [시크릿 (Secret)](/knowledge/kubernetes/secret/) - Secret에도 동일하게 적용
- [쿠버네티스 API 서버 (Kubernetes API Server)](/knowledge/kubernetes/api-server/) - 변경 차단을 수행하는 컴포넌트
- [Kubelet](/knowledge/kubernetes/kubelet/) - immutable 설정 시 감시 부하 감소
