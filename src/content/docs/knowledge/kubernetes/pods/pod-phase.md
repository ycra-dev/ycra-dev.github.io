---
title: "파드 페이즈 (Pod Phase)"
description: "Pod Phase는 Pod의 생명 주기에서 현재 위치를 나타내는 상위 수준의 상태 정보로, Pending, Running, Succeeded, Failed, Unknown 중 하나의 값을 가진다"
tags: ['Kubernetes', 'Pod', 'Lifecycle', 'Status']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/kubernetes/pod-phase
sidebar:
  order: 8
---

## 핵심 개념

Pod는 생성부터 종료까지 다섯 가지 단계(phase) 중 하나에 항상 속한다:

| Phase | 설명 |
|-------|------|
| **Pending** | Pod 오브젝트가 생성된 직후의 초기 단계. 노드에 스케줄링되고 컨테이너 이미지가 풀되어 시작될 때까지 이 상태를 유지 |
| **Running** | Pod의 컨테이너 중 하나 이상이 실행 중인 상태 |
| **Succeeded** | 무한히 실행되도록 설계되지 않은 Pod의 모든 컨테이너가 성공적으로 완료된 상태 |
| **Failed** | 무한히 실행되도록 설계되지 않은 Pod에서 하나 이상의 컨테이너가 실패(비정상 종료)한 상태 |
| **Unknown** | Kubelet이 API 서버와의 통신을 중단하여 Pod의 상태를 알 수 없는 상태. 워커 노드 장애 또는 네트워크 단절 가능성 |

주의: `kubectl get pods` 명령의 STATUS 컬럼은 정상 Pod에서는 phase를 표시하지만, 비정상 Pod에서는 더 구체적인 문제 정보를 표시할 수 있다. 따라서 STATUS 컬럼이 항상 phase와 일치하지는 않는다.

Pod의 생명 주기는 크게 세 단계로 나뉜다:
1. **초기화 단계(Initialization)**: init 컨테이너 실행
2. **실행 단계(Run)**: 주 컨테이너 실행
3. **종료 단계(Termination)**: 컨테이너 정리

## 예시

Pod의 phase 확인 방법:

```bash
# YAML 출력에서 phase 필드 검색
kubectl get po kiada -o yaml | grep phase
# phase: Running

# jq로 직접 추출
kubectl get po kiada -o json | jq .status.phase

# kubectl describe로 확인
kubectl describe po kiada
# Status: Running
```

`kubectl get pods` 출력:

```
NAME    READY   STATUS    RESTARTS   AGE
kiada   1/1     Running   0          40m
```

## 관련 개념

- [파드 (Pod)](/knowledge/kubernetes/pod/) - Phase가 속하는 기본 리소스
- [파드 컨디션 (Pod Conditions)](/knowledge/kubernetes/pod-conditions/) - Phase보다 더 상세한 Pod 상태 정보
- [스펙과 상태 (Spec and Status)](/knowledge/kubernetes/spec-and-status/) - Phase가 포함된 오브젝트의 상태 섹션
- [쿠버네티스 스케줄러 (Kubernetes Scheduler)](/knowledge/kubernetes/scheduler/) - Pending에서 Running으로의 전환을 담당
- [Kubelet](/knowledge/kubernetes/kubelet/) - Pod 상태를 API 서버에 보고하는 에이전트
