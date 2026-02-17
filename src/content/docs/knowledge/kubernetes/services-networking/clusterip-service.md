---
title: "ClusterIP Service"
description: "ClusterIP Service는 Kubernetes의 기본 서비스 타입으로, 클러스터 내부에서만 접근 가능한 안정적인 가상 IP 주소를 제공하여 여러 파드에 대한 로드 밸런싱과 서비스 디스커버리를 수행한다"
tags: ['Kubernetes', 'Service', 'Clusterip', 'Networking', 'Internal']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/kubernetes/clusterip-service
sidebar:
  order: 2
---

## 핵심 개념

ClusterIP는 서비스 타입을 명시하지 않을 때 기본으로 생성되는 타입이다. 클러스터 내부의 파드들만 접근할 수 있으며, 외부 클라이언트는 직접 접근할 수 없다.

서비스를 생성하면 고유한 클러스터 IP가 할당되며, 이 IP는 서비스가 존재하는 한 변경되지 않는다. 파드의 IP는 재생성 시 변경되지만 서비스 IP는 안정적이므로, 다른 파드들은 서비스 IP를 통해 항상 백엔드 파드에 접근할 수 있다.

서비스는 레이블 셀렉터를 통해 백엔드 파드를 결정한다. 셀렉터에 매칭되는 파드들의 IP가 Endpoints 및 EndpointSlice 오브젝트에 기록되며, 서비스로 들어오는 연결은 이 엔드포인트 중 하나로 무작위로 전달된다. 세션 어피니티(`sessionAffinity: ClientIP`)를 설정하면 같은 클라이언트 IP의 연결을 같은 파드로 전달할 수 있다.

서비스의 `port`는 서비스가 노출하는 포트이고, `targetPort`는 실제 파드의 포트이다. 이 두 포트는 다를 수 있어 유연한 포트 매핑이 가능하다.

## 예시

ClusterIP Service 매니페스트:

```yaml
apiVersion: v1
kind: Service
metadata:
  name: quote
spec:
  type: ClusterIP
  selector:
    app: quote
  ports:
  - name: http
    port: 80
    targetPort: 80
    protocol: TCP
```

서비스 조회:

```bash
kubectl get svc -o wide
```

파드에서 서비스 접근:

```bash
kubectl exec -it quote-001 -c nginx -- sh
/ # curl http://10.96.74.151
/ # curl http://quote        # DNS를 통한 접근
```

서비스 IP는 가상 IP이므로 ping이 불가:

```bash
kubectl exec -it quote-001 -c nginx -- ping quiz
# 100% packet loss - 정상적인 동작
```

## 관련 개념

- [Service](/knowledge/kubernetes/service/) - 서비스의 상위 개념
- [NodePort Service](/knowledge/kubernetes/nodeport-service/) - 외부 접근을 추가로 제공하는 서비스 타입
- [LoadBalancer Service](/knowledge/kubernetes/loadbalancer-service/) - 외부 로드 밸런서를 프로비저닝하는 서비스 타입
- [Headless Service](/knowledge/kubernetes/headless-service/) - ClusterIP가 없는 특수한 서비스
- [Label Selector](/knowledge/kubernetes/label-selector/) - 백엔드 파드를 결정하는 메커니즘
- [Kube Proxy](/knowledge/kubernetes/kube-proxy/) - 서비스의 네트워크 규칙을 관리하는 컴포넌트
