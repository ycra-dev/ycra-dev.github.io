---
title: "Horizontal Scaling"
description: "수평 확장(Horizontal Scaling)은 애플리케이션의 인스턴스(복제본) 수를 늘리거나 줄여 시스템의 처리 용량을 조절하는 방식이다"
tags: ['Kubernetes', 'Scaling', 'Horizontal', 'Autoscaling', 'Performance']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/kubernetes/horizontal-scaling
sidebar:
  order: 11
---

## 핵심 개념

Kubernetes에서 수평 확장은 핵심 기능 중 하나이며, 매우 간단하게 수행할 수 있다.

수평 확장의 원리:
- **Scale Out (확장)**: 부하가 증가하면 애플리케이션 인스턴스(Pod)를 추가하여 부하 분산
- **Scale In (축소)**: 부하가 감소하면 불필요한 인스턴스를 제거하여 리소스 절약
- 선언적 접근: "3개의 복제본이 실행되어야 한다"고 선언하면 Kubernetes가 현재 상태와의 차이를 계산하여 조치

Kubernetes의 수평 확장 방식:
1. **수동 확장**: `kubectl scale deployment` 명령으로 복제본 수 직접 지정
2. **자동 확장(Autoscaling)**: Kubernetes가 리소스 소비량과 기타 메트릭을 모니터링하여 자동으로 인스턴스 수 조절
3. **클러스터 수준 확장**: 클라우드 환경에서 노드가 부족하면 클라우드 프로바이더 API를 통해 추가 노드를 자동 프로비저닝

수평 확장 vs 수직 확장:
- **수직 확장**: 과거 모놀리식 아키텍처에서 주로 사용. 더 강력한 하드웨어로 교체
- **수평 확장**: 마이크로서비스 아키텍처에서 선호. 여러 인스턴스에 부하 분산

전제조건:
- 애플리케이션 자체가 수평 확장을 지원해야 함 (stateless 설계 등)
- Kubernetes는 복제를 용이하게 만들 뿐, 애플리케이션을 자동으로 확장 가능하게 만들지 않음

## 예시

```bash
# 수동 수평 확장 (1개 -> 3개)
$ kubectl scale deployment kiada --replicas=3
deployment.apps/kiada scaled

# 결과 확인
$ kubectl get deploy
NAME    READY   UP-TO-DATE   AVAILABLE   AGE
kiada   3/3     3            3           18m

# 수평 축소 (3개 -> 1개)
$ kubectl scale deployment kiada --replicas=1

# GKE에서 클러스터 노드 수 확장
$ gcloud container clusters resize kiada --size 5

# 비용 절감을 위해 노드 0개로 축소 (객체는 유지됨)
$ gcloud container clusters resize kiada --size 0
```

```
수평 확장 전후:

[확장 전]                    [확장 후]
Service                     Service
   |                           |
 Pod A                 Pod A  Pod B  Pod C
(부하 100%)           (부하 33%) (33%) (33%)
```

클라우드 환경에서의 자동 확장 흐름:
```
부하 증가 -> HPA가 감지 -> 복제본 수 증가
                            |
                     노드 용량 부족?
                            |
                  클러스터 오토스케일러가
                  클라우드에 노드 추가 요청
```

## 관련 개념

- [Deployment](/knowledge/kubernetes/deployment/) - 수평 확장의 대상이 되는 객체
- [Replica](/knowledge/kubernetes/replica/) - 수평 확장으로 관리되는 Pod 복제본
- [Service](/knowledge/kubernetes/service/) - 확장된 복제본에 대한 로드 밸런싱
- [Kubernetes](/knowledge/kubernetes/kubernetes/) - 수평 확장을 자동화하는 플랫폼
