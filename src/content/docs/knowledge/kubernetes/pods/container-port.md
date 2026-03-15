---
title: "컨테이너 포트 (Container Port)"
description: "Container Port는 Pod 매니페스트에서 컨테이너가 수신 대기하는 네트워크 포트를 선언하는 필드로, 순전히 정보 제공 목적이지만 서비스를 통한 노출 시 포트 이름 참조에 활용된다"
tags: ['Kubernetes', 'Pod', 'Container', 'Port', 'Networking']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/kubernetes/container-port
sidebar:
  order: 5
---

## 핵심 개념

Pod 매니페스트에서 `containerPort`를 명시하는 것은 기술적으로 필수가 아니다. 포트를 명시하지 않아도 컨테이너의 IP 주소에 바인딩된 포트로 클라이언트가 접속할 수 있다. 잘못된 포트 번호를 지정해도 실제 연결에는 영향이 없다.

그럼에도 불구하고 포트를 명시하는 것이 권장되는 이유:
1. **문서화**: 클러스터에 접근할 수 있는 누구나 각 Pod가 노출하는 포트를 볼 수 있다
2. **포트 이름 지정**: 각 포트에 이름을 부여하여 서비스(Service)에서 포트를 참조할 때 번호 대신 이름을 사용할 수 있다
3. **가독성**: 매니페스트를 읽는 사람이 각 포트 번호의 용도를 쉽게 파악할 수 있다

같은 Pod 내의 컨테이너들은 네트워크 namespace를 공유하므로 동일한 포트 번호를 사용할 수 없다. 다른 Pod의 컨테이너들은 각자 고유한 네트워크 인터페이스와 포트 공간을 가지므로 포트 충돌이 발생하지 않는다.

## 예시

포트에 이름을 부여하여 정의하는 예시:

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: kiada-ssl
spec:
  containers:
  - name: kiada
    image: luksa/kiada:0.2
    ports:
    - name: http              # 포트 이름 지정
      containerPort: 8080
  - name: envoy
    image: luksa/kiada-ssl-proxy:0.1
    ports:
    - name: https             # 포트 이름 지정
      containerPort: 8443
    - name: admin             # 포트 이름 지정
      containerPort: 9901
```

Liveness Probe에서 포트 이름으로 참조:

```yaml
livenessProbe:
  httpGet:
    path: /ready
    port: admin    # 번호(9901) 대신 이름으로 참조
```

## 관련 개념

- [파드 (Pod)](/knowledge/kubernetes/pod/) - 포트가 정의되는 리소스
- [파드 네트워킹 (Pod Networking)](/knowledge/kubernetes/pod-networking/) - 포트 공간 공유의 기본이 되는 네트워크 구조
- [서비스 (Service)](/knowledge/kubernetes/service/) - 포트 이름을 활용하여 Pod를 외부에 노출
- [라이브니스 프로브 (Liveness Probe)](/knowledge/kubernetes/liveness-probe/) - 포트 이름 또는 번호를 사용하여 컨테이너 상태를 확인
