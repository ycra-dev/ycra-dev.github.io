---
title: "Environment Variables in Kubernetes"
description: "Kubernetes에서 환경 변수는 파드 매니페스트의 `env` 또는 `envFrom` 필드를 통해 컨테이너에 설정되며, 리터럴 값, ConfigMap, Secret, Downward API 등 다양한 소스에서 값을 가져올 수 있다"
tags: ['Kubernetes', 'Configuration', 'Environment Variables', 'Container']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/kubernetes/environment-variables
sidebar:
  order: 3
---

## 핵심 개념

Kubernetes에서 환경 변수는 컨테이너별로 개별 설정되며, 파드 전체에 공통으로 설정하는 방법은 없다. 값을 설정하는 방법은 네 가지가 있다:

1. **리터럴 값**: `value` 필드에 직접 값을 지정
2. **변수 참조**: `$(VAR_NAME)` 구문으로 같은 매니페스트의 다른 변수 참조 (순서 중요)
3. **ConfigMap/Secret 참조**: `valueFrom`의 `configMapKeyRef` 또는 `secretKeyRef`로 외부 오브젝트에서 값 획득
4. **Downward API**: `fieldRef` 또는 `resourceFieldRef`로 파드 메타데이터에서 값 획득

`envFrom` 필드를 사용하면 ConfigMap이나 Secret의 전체 항목을 한 번에 주입할 수 있으며, `prefix`를 추가하여 키 이름에 접두사를 붙일 수 있다. `env` 필드의 변수가 `envFrom` 필드의 변수보다 우선순위가 높다.

주의: 환경 변수는 컨테이너 실행 중에 업데이트할 수 없다. ConfigMap이 변경되면 컨테이너 재시작 후에만 새 값이 적용된다. 또한 YAML에서 숫자, boolean 값(true, false, yes, no) 등은 반드시 따옴표로 감싸야 한다.

## 예시

다양한 소스에서 환경 변수 설정:

```yaml
spec:
  containers:
  - name: kiada
    image: luksa/kiada:0.4
    env:
    - name: POD_NAME
      value: kiada
    - name: INITIAL_STATUS_MESSAGE
      value: "My name is $(POD_NAME)."
    - name: CONFIGMAP_VALUE
      valueFrom:
        configMapKeyRef:
          name: kiada-config
          key: status-message
          optional: true
    - name: NODE_NAME
      valueFrom:
        fieldRef:
          fieldPath: spec.nodeName
```

`envFrom`으로 전체 ConfigMap 주입:

```yaml
envFrom:
- configMapRef:
    name: kiada-config
    optional: true
```

커맨드 인자에서 환경 변수 참조:

```yaml
args:
- --listen-port
- $(LISTEN_PORT)
env:
- name: LISTEN_PORT
  value: "8080"
```

## 관련 개념

- [ConfigMap](/knowledge/kubernetes/configmap/) - 환경 변수 값의 외부 소스
- [Secret](/knowledge/kubernetes/secret/) - 민감한 환경 변수의 소스
- [Downward API](/knowledge/kubernetes/downward-api/) - 파드 메타데이터를 환경 변수로 주입
- [Container](/knowledge/kubernetes/container/) - 환경 변수가 설정되는 단위
- [Dockerfile](/knowledge/kubernetes/dockerfile/) - 이미지에서 ENV로 기본값 정의
