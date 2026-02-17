---
title: "Secret"
description: "Secret은 비밀번호, TLS 인증서, 암호화 키 등 민감한 데이터를 저장하기 위한 Kubernetes API 오브젝트로, ConfigMap과 유사하지만 보안에 특화된 처리 방식을 갖는다"
tags: ['Kubernetes', 'Configuration', 'Secret', 'Security']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/kubernetes/secret
sidebar:
  order: 2
---

## 핵심 개념

Secret은 ConfigMap과 구조적으로 매우 유사하지만, Kubernetes가 민감한 데이터의 보안을 보장하기 위해 특별한 방식으로 처리한다. Secret의 데이터는 해당 Secret을 사용하는 파드가 실행되는 노드에만 배포되며, 워커 노드에서는 항상 메모리(tmpfs)에 저장되어 물리적 스토리지에 기록되지 않는다.

Secret의 `data` 필드는 Base64로 인코딩된 값을 저장하고, `stringData` 필드는 평문을 받아 쓰기 전용으로 동작한다(읽을 때는 `data` 필드에서 Base64로 표시). `type` 필드를 통해 용도를 명시할 수 있으며, `Opaque`, `kubernetes.io/tls`, `kubernetes.io/dockerconfigjson` 등 다양한 내장 타입이 있다.

Secret은 환경 변수로 주입할 수 있지만, 보안 관점에서 `secret` 볼륨을 통해 파일로 마운트하는 것이 권장된다. 환경 변수는 에러 보고서에 노출되거나 자식 프로세스에 상속될 수 있기 때문이다.

## 예시

TLS Secret 생성:

```bash
kubectl create secret tls kiada-tls \
  --cert example-com.crt \
  --key example-com.key
```

Secret 볼륨으로 컨테이너에 마운트:

```yaml
spec:
  volumes:
  - name: cert-and-key
    secret:
      secretName: kiada-tls
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
    - name: cert-and-key
      mountPath: /etc/certs
      readOnly: true
```

`stringData`를 사용한 Secret 매니페스트:

```yaml
apiVersion: v1
kind: Secret
stringData:
  user: my-username
  pass: my-password
```

## 관련 개념

- [ConfigMap](/knowledge/kubernetes/configmap/) - 비민감 데이터를 위한 유사 오브젝트
- [Projected Volume](/knowledge/kubernetes/projected-volume/) - Secret과 ConfigMap을 하나의 볼륨으로 결합
- [Volume](/knowledge/kubernetes/volume/) - Secret 볼륨의 기반 개념
- [Container Image](/knowledge/kubernetes/container-image/) - 이미지에 민감 데이터를 넣지 말아야 하는 이유
