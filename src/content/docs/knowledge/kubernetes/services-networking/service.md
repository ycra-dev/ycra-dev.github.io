---
title: "Service"
description: "Kubernetes Service는 하나 이상의 Pod에 대한 단일 통신 진입점을 제공하는 API 객체이다"
tags: ['Kubernetes', 'Service', 'Networking', 'Load Balancing', 'Discovery']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/kubernetes/service
sidebar:
  order: 1
---

## 핵심 개념

Service가 필요한 핵심 이유는 Pod의 임시성에 있다:
- Pod는 언제든 사라질 수 있음 (노드 장애, 의도적 삭제, 퇴거)
- 새로 생성된 Pod는 완전히 새로운 IP 주소를 받음
- Service 없이 Pod IP에 직접 연결하면, Pod 교체 시 모든 클라이언트를 재설정해야 함

Service의 핵심 특성:
1. **안정적 IP**: Service는 생성 시 할당된 고정 IP(Cluster IP)를 수명 동안 유지
2. **로드 밸런싱**: 뒤에 여러 Pod가 있으면 요청을 자동으로 분산
3. **서비스 디스커버리**: 클러스터 내 다른 애플리케이션이 안정적으로 통신 가능
4. **Pod 집합 추상화**: Pod가 계속 변경되어도 클라이언트는 Service IP만 알면 됨

Service의 유형:
- **ClusterIP**: 클러스터 내부에서만 접근 가능 (기본값)
- **NodePort**: 각 워커 노드의 특정 포트를 통해 외부 접근 가능
- **LoadBalancer**: 외부 로드 밸런서를 프로비저닝하여 공개 IP 제공

Service는 Pod가 하나뿐이더라도 사용하는 것이 좋다. Pod가 교체되어 IP가 변경되더라도 Service의 IP는 변하지 않기 때문이다.

## 예시

```bash
# Service 생성 (Deployment를 expose)
$ kubectl expose deployment kiada --type=LoadBalancer --port 8080
service/kiada exposed

# Service 목록 확인
$ kubectl get svc
NAME         TYPE          CLUSTER-IP     EXTERNAL-IP   PORT(S)         AGE
kubernetes   ClusterIP     10.19.240.1    <none>        443/TCP         34m
kiada        LoadBalancer  10.19.243.17   35.246.179.22 8080:30838/TCP  82s

# Service를 통한 접근 (로드 밸런싱 확인)
$ curl 35.246.179.22:8080
Request processed by "kiada-9d785b578-58vhc"
$ curl 35.246.179.22:8080
Request processed by "kiada-9d785b578-p449x"
$ curl 35.246.179.22:8080
Request processed by "kiada-9d785b578-jmnj8"
# 각 요청이 다른 Pod로 분산됨
```

```
Service 로드 밸런싱 구조:

클라이언트 --> Service (10.19.243.17:8080)
                    |
              +-----+-----+
              |     |     |
            Pod A Pod B Pod C
```

## 관련 개념

- [Pod](/knowledge/kubernetes/pod/) - Service가 트래픽을 라우팅하는 대상
- [LoadBalancer Service](/knowledge/kubernetes/loadbalancer-service/) - 외부 로드 밸런서를 사용하는 Service 유형
- [NodePort](/knowledge/kubernetes/nodeport-service/) - 노드 포트를 통한 외부 접근
- [Deployment](/knowledge/kubernetes/deployment/) - Service가 expose하는 배포 객체
- [Kube Proxy](/knowledge/kubernetes/kube-proxy/) - Service의 로드 밸런싱 규칙을 설정하는 컴포넌트
