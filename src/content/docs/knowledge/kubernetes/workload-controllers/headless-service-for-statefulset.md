---
title: "스테이트풀셋을 위한 헤드리스 서비스 (Headless Service for StatefulSet)"
description: "StatefulSet과 연결된 Headless Service는 각 Pod에 개별 DNS 레코드를 생성하여 안정적인 네트워크 정체성을 부여하는 서비스로, ClusterIP가 None으로 설정되며 개별 Pod의 IP 주소를 직접 해석(resolve)할 수 있게 한다"
tags: ['Headless Service', 'Statefulset', 'DNS', 'Service Discovery', 'Kubernetes']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/kubernetes/headless-service-for-statefulset
sidebar:
  order: 18
---

## 핵심 개념

일반 Headless Service는 서비스 이름으로 DNS 조회 시 매칭되는 모든 Pod의 IP를 반환한다. 하지만 StatefulSet과 연결되면 추가로 각 Pod에 대한 개별 A/AAAA DNS 레코드가 생성된다.

DNS 레코드 형식:
- Pod 개별 주소: `{podName}.{serviceName}.{namespace}.svc.cluster.local`
  - 예: `quiz-0.quiz-pods.kiada.svc.cluster.local`
- SRV 레코드: `_{portName}._tcp.{serviceName}.{namespace}.svc.cluster.local`
  - 예: `_mongodb._tcp.quiz-pods.kiada.svc.cluster.local`

SRV 레코드는 각 Pod의 주소와 포트를 반환하므로, MongoDB 같은 분산 시스템에서 클라이언트가 모든 멤버를 자동 발견할 수 있다. MongoDB의 경우 `mongodb+srv://` 스킴을 사용하면 SRV 조회를 통해 연결한다:
```
mongodb+srv://quiz-pods.kiada.svc.cluster.local
```

`publishNotReadyAddresses: true` 설정 시 Pod가 ready 상태가 아니어도 DNS 레코드가 생성된다. 이는 StatefulSet의 초기 설정 시 중요하다.

StatefulSet spec의 `serviceName` 필드에 headless Service 이름을 지정하여 연결한다.

## 예시

Headless Service 매니페스트:
```yaml
apiVersion: v1
kind: Service
metadata:
  name: quiz-pods
spec:
  clusterIP: None              # headless
  publishNotReadyAddresses: true  # not-ready Pod도 DNS에 포함
  selector:
    app: quiz
  ports:
  - name: mongodb              # SRV 레코드 이름에 사용됨
    port: 27017
```

DNS 조회 테스트:
```bash
# 개별 Pod 해석
nslookup quiz-0.quiz-pods.kiada.svc.cluster.local

# SRV 레코드 조회
nslookup -type=SRV _mongodb._tcp.quiz-pods.kiada.svc.cluster.local
```

## 관련 개념

- [스테이트풀셋 (StatefulSet)](/knowledge/kubernetes/statefulset/) - headless Service와 반드시 결합하는 오브젝트
- [클러스터IP 서비스 (ClusterIP Service)](/knowledge/kubernetes/clusterip-service/) - headless Service는 ClusterIP가 None
- [엔드포인트 오브젝트 (Endpoints Object)](/knowledge/kubernetes/endpoints-object/) - headless Service의 엔드포인트는 개별 Pod IP
