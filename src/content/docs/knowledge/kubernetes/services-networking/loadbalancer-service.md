---
title: "로드밸런서 서비스 (LoadBalancer Service)"
description: "LoadBalancer Service는 Kubernetes Service의 한 유형으로, 클라우드 인프라에 외부 로드 밸런서를 프로비저닝하여 애플리케이션을 공개 IP 주소를 통해 외부에 노출하는 방식이다"
tags: ['Kubernetes', 'Service', 'Load Balancer', 'Cloud', 'Networking', 'External Access']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/kubernetes/loadbalancer-service
sidebar:
  order: 6
---

## 핵심 개념

LoadBalancer 타입의 Service를 생성하면 다음과 같은 과정이 진행된다:

1. Kubernetes가 클라우드 인프라에 로드 밸런서 프로비저닝 요청
2. 클라우드 프로바이더가 로드 밸런서를 생성하고 설정
3. 로드 밸런서의 공개 IP가 Service의 외부 IP로 할당
4. 외부 트래픽이 로드 밸런서 -> 노드 포트 -> Pod로 라우팅

중요한 구분 - 두 가지 수준의 로드 밸런싱:
1. **인프라 로드 밸런서**: 클라우드 프로바이더가 제공. 요청을 워커 노드들에 분산
2. **Kubernetes Service 로드 밸런서**: Kube Proxy가 설정. 요청을 Pod들에 분산

환경별 차이:
- **GKE/EKS/AKS**: 실제 클라우드 로드 밸런서가 프로비저닝되고 외부 IP가 할당됨
- **Docker Desktop**: `localhost`로 접근 가능한 로컬 로드 밸런서 유형 생성
- **Minikube**: 로드 밸런서가 프로비저닝되지 않음 (External IP가 `<pending>` 상태). `minikube service` 명령이나 NodePort로 접근

Kubernetes 자체는 로드 밸런서를 제공하지 않는다. 클라우드 인프라에 로드 밸런서 프로비저닝을 요청할 뿐이며, 실제 로드 밸런서는 클라우드 프로바이더가 제공한다.

로드 밸런서의 장점:
- 건강한 노드에만 트래픽을 전달하여 가용성 보장
- 노드 간 연결을 균등하게 분배
- 단일 공개 IP로 접근 가능

`EXTERNAL-IP` 필드에 로드 밸런서 IP가 표시되며, 프로비저닝 중에는 `<pending>`으로 표시된다. 온프레미스 환경에서는 MetalLB 같은 애드온을 설치하여 LoadBalancer 서비스를 지원할 수 있다. 추가 설정 필드로 `loadBalancerIP`(원하는 IP 지정), `loadBalancerSourceRanges`(접근 허용 IP 범위), `loadBalancerClass`(로드 밸런서 구현체 선택) 등이 있다.

## 예시

```bash
# LoadBalancer 타입 Service 생성
$ kubectl expose deployment kiada --type=LoadBalancer --port 8080
service/kiada exposed

# 로드 밸런서 프로비저닝 대기 후 확인
$ kubectl get svc kiada
NAME   TYPE          CLUSTER-IP    EXTERNAL-IP    PORT(S)         AGE
kiada  LoadBalancer  10.19.243.17  35.246.179.22  8080:30838/TCP  82s
#                                  ^^^^^^^^^^^^^ 외부 접근 IP

# 외부에서 접근
$ curl 35.246.179.22:8080
Kiada version 0.1. Request processed by "kiada-9d785b578-p449x"

# Minikube에서 (로드 밸런서 없음)
$ kubectl get svc kiada
NAME   TYPE          CLUSTER-IP    EXTERNAL-IP  PORT(S)         AGE
kiada  LoadBalancer  10.19.243.17  <pending>    8080:30838/TCP  82s

# Minikube 대안 접근 방법
$ minikube service kiada --url
http://192.168.99.102:30838
```

```
트래픽 흐름:

외부 클라이언트
       |
       v
[클라우드 로드 밸런서] (35.246.179.22:8080)
       |
       +-------+-------+
       v       v       v
  Node 1    Node 2   Node 3   (NodePort: 30838)
       |       |       |
       +---+---+---+---+
           |       |
        Pod A   Pod B   Pod C  (Kube Proxy에 의한 분산)
```

LoadBalancer 서비스 매니페스트 (다중 포트):

```yaml
apiVersion: v1
kind: Service
metadata:
  name: kiada
spec:
  type: LoadBalancer
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

## 관련 개념

- [서비스 (Service)](/knowledge/kubernetes/service/) - LoadBalancer는 Service의 한 유형
- [노드포트 서비스 (NodePort Service)](/knowledge/kubernetes/nodeport-service/) - LoadBalancer의 기반 서비스 타입
- [클러스터IP 서비스 (ClusterIP Service)](/knowledge/kubernetes/clusterip-service/) - 내부 전용 서비스 타입
- [Kube Proxy](/knowledge/kubernetes/kube-proxy/) - 노드 내에서 Pod로 트래픽을 분산하는 컴포넌트
- [디플로이먼트 (Deployment)](/knowledge/kubernetes/deployment/) - LoadBalancer Service가 expose하는 대상
- [외부 트래픽 정책 (External Traffic Policy)](/knowledge/kubernetes/external-traffic-policy/) - 트래픽 전달 정책
- [인그레스 컨트롤러 (Ingress Controller)](/knowledge/kubernetes/ingress-controller/) - HTTP 수준의 외부 노출 대안
