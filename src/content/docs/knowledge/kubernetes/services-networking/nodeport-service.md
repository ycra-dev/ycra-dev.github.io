---
title: "노드포트 서비스 (NodePort Service)"
description: "NodePort Service는 ClusterIP의 확장으로, 클러스터의 모든 노드에서 특정 포트(30000-32767)를 통해 서비스에 접근할 수 있게 하여 외부 클라이언트가 노드 IP와 포트로 서비스에 도달할 수 있게 하는 서비스 타입이다"
tags: ['Kubernetes', 'Service', 'Nodeport', 'External Access', 'Networking']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/kubernetes/nodeport-service
sidebar:
  order: 4
---

## 핵심 개념

NodePort 서비스를 생성하면 ClusterIP에 추가로, 클러스터의 모든 노드(컨트롤 플레인 포함)에서 지정된 포트가 열린다. 외부 클라이언트는 어떤 노드의 IP든 해당 노드 포트로 접속하면 서비스에 도달할 수 있다. 클라이언트가 연결한 노드에 해당 파드가 없더라도, 해당 노드가 파드가 있는 다른 노드로 트래픽을 전달한다.

서비스에는 세 가지 포트 개념이 있다:
- `port`: 서비스의 클러스터 IP에서 노출되는 포트
- `targetPort`: 실제 파드가 리슨하는 포트
- `nodePort`: 모든 노드에서 열리는 외부 포트 (30000-32767 범위)

노드 포트를 명시하지 않으면 Kubernetes가 자동으로 할당한다. 직접 지정하면 서비스 간 포트 충돌에 주의해야 한다.

NodePort의 단점은 클라이언트가 특정 노드에 연결해야 하므로, 해당 노드가 다운되면 접근이 불가능하다는 것이다. 이를 해결하기 위해 보통 앞단에 외부 로드 밸런서를 두거나 LoadBalancer 서비스를 사용한다.

## 예시

NodePort 서비스 매니페스트:

```yaml
apiVersion: v1
kind: Service
metadata:
  name: kiada
spec:
  type: NodePort
  selector:
    app: kiada
  ports:
  - name: http
    port: 80
    nodePort: 30080
    targetPort: 8080
  - name: https
    port: 443
    nodePort: 30443
    targetPort: 8443
```

서비스 확인:

```bash
$ kubectl get svc
NAME    TYPE        CLUSTER-IP      PORT(S)
kiada   NodePort    10.96.226.212   80:30080/TCP,443:30443/TCP
```

외부에서 접근:

```bash
curl 172.18.0.4:30080    # 노드 IP:노드 포트
```

## 관련 개념

- [클러스터IP 서비스 (ClusterIP Service)](/knowledge/kubernetes/clusterip-service/) - NodePort의 기반이 되는 서비스 타입
- [로드밸런서 서비스 (LoadBalancer Service)](/knowledge/kubernetes/loadbalancer-service/) - NodePort를 확장하여 로드 밸런서 추가
- [서비스 (Service)](/knowledge/kubernetes/service/) - 서비스의 상위 개념
- [외부 트래픽 정책 (External Traffic Policy)](/knowledge/kubernetes/external-traffic-policy/) - 노드 간 트래픽 전달 정책
- [노드포트 (NodePort)](/knowledge/kubernetes/node-port/) - Chapter 3에서 소개된 기본 개념
