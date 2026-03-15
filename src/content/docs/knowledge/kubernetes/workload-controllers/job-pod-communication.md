---
title: "잡 파드 통신 (Job Pod Communication)"
description: "Job Pod 간 통신은 Indexed completion mode, Headless Service, 그리고 Pod 템플릿의 `subdomain` 설정을 결합하여 구현하며, 각 Pod가 예측 가능한 DNS 이름으로 다른 Pod에 접근할 수 있게 한다"
tags: ['Job', 'Pod Communication', 'Headless Service', 'Indexed', 'Kubernetes']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/kubernetes/job-pod-communication
sidebar:
  order: 35
---

## 핵심 개념

대부분의 Job Pod는 독립적으로 실행되지만, 일부 작업은 Pod 간 통신이 필요하다. 이를 구현하기 위한 세 가지 요소:

1. **Indexed completionMode**: 각 Pod에 고유 인덱스를 부여하여 예측 가능한 hostname 생성
   - Pod hostname: `{job-name}-{index}` (예: comm-demo-0)

2. **Headless Service**: Pod의 DNS 레코드를 생성
   - Service의 label selector가 Job의 Pod와 일치해야 함
   - `job-name` 자동 레이블을 활용하면 편리

3. **subdomain 설정**: Pod 템플릿에 headless Service 이름을 subdomain으로 지정
   - 이를 통해 Pod가 `{job-name}-{index}.{service-name}` 형식으로 접근 가능

각 Pod는 completions 값을 알면 모든 peer Pod의 DNS 주소를 계산할 수 있다:
```
{job-name}-{0..completions-1}.{service-name}.{namespace}.svc.cluster.local
```

같은 네임스페이스 내에서는 축약형도 사용 가능:
```
{job-name}-{index}.{service-name}
```

이 패턴은 분산 계산, MapReduce 스타일 작업, 또는 Peer-to-peer 통신이 필요한 배치 작업에 유용하다.

## 예시

Headless Service:
```yaml
apiVersion: v1
kind: Service
metadata:
  name: demo-service
spec:
  clusterIP: none
  selector:
    job-name: comm-demo
  ports:
  - name: http
    port: 80
```

Job 매니페스트:
```yaml
apiVersion: batch/v1
kind: Job
metadata:
  name: comm-demo
spec:
  completionMode: Indexed
  completions: 2
  parallelism: 2
  template:
    spec:
      subdomain: demo-service    # headless Service 이름
      restartPolicy: Never
      containers:
      - name: comm-demo
        image: busybox
        command: ["sleep", "600"]
```

Pod 간 통신 테스트:
```bash
# Pod 0의 hostname 확인
kubectl exec comm-demo-0-mrvlp -- hostname -f
# comm-demo-0.demo-service.kiada.svc.cluster.local

# Pod 1에서 Pod 0으로 ping
kubectl exec comm-demo-1-kvpb4 -- ping comm-demo-0.demo-service
# PING comm-demo-0.demo-service (10.244.2.71): 56 data bytes
# 64 bytes from 10.244.2.71: seq=0 ttl=63 time=0.060 ms
```

## 관련 개념

- [인덱스드 잡 완료 모드 (Indexed Job Completion Mode)](/knowledge/kubernetes/indexed-job-completion-mode/) - Pod 간 통신의 전제 조건
- [스테이트풀셋을 위한 헤드리스 서비스 (Headless Service for StatefulSet)](/knowledge/kubernetes/headless-service-for-statefulset/) - StatefulSet에서의 유사한 DNS 패턴
- [잡 (Job)](/knowledge/kubernetes/job/) - 통신 패턴이 적용되는 오브젝트
