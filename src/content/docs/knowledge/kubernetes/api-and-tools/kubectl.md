---
title: "kubectl"
description: "kubectl(kube-control)은 Kubernetes 클러스터와 상호작용하기 위한 공식 커맨드라인 도구(CLI)이다"
tags: ['Kubernetes', 'Kubectl', 'Cli', 'Cluster Management']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/kubernetes/kubectl
sidebar:
  order: 8
---

## 핵심 개념

kubectl은 Kubernetes를 사용하는 데 있어 가장 기본적이고 강력한 도구이다. 웹 기반 대시보드도 존재하지만, kubectl이 가장 안정적이고 최신 기능을 지원한다.

주요 특징:
- **단일 실행 파일**: 다운로드하여 PATH에 배치하기만 하면 사용 가능
- **kubeconfig 파일**: `~/.kube/config`에 저장된 설정 파일을 통해 클러스터 연결 정보를 관리
- **다중 클러스터 지원**: 컨텍스트(context)를 전환하여 여러 클러스터 간 이동 가능
- **탭 완성(Tab Completion)**: bash, zsh, fish, powershell에서 명령어 및 객체 이름 자동 완성 지원

자주 사용되는 kubectl 명령어:
- `kubectl get <resource>`: 리소스 목록 조회
- `kubectl describe <resource> <name>`: 리소스 상세 정보
- `kubectl create`: 리소스 생성
- `kubectl delete`: 리소스 삭제
- `kubectl scale`: 복제본 수 조절
- `kubectl expose`: 서비스 생성
- `kubectl explain <resource>`: 리소스 필드 문서 조회
- `kubectl api-resources`: 사용 가능한 모든 리소스 유형 조회

리소스 약칭:
- `po` = pods, `no` = nodes, `svc` = services
- `deploy` = deployments, `ev` = events

## 예시

```bash
# kubectl 설치 (Linux)
$ curl -LO "https://dl.k8s.io/release/$(curl -L -s \
  https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"
$ chmod +x kubectl
$ sudo mv kubectl /usr/local/bin/

# 별칭(alias) 설정
alias k=kubectl

# 탭 완성 활성화
$ source <(kubectl completion bash)
$ complete -o default -F __start_kubectl k

# 클러스터 상태 확인
$ kubectl cluster-info
Kubernetes master is running at https://192.168.99.101:8443

# 노드 목록 조회
$ kubectl get nodes
NAME            STATUS  ROLES   AGE   VERSION
kind-worker     Ready   <none>  12m   v1.18.2

# 상세 정보 확인 (모든 리소스 타입에 사용 가능)
$ kubectl describe node kind-worker-2

# 리소스 필드 문서 조회
$ kubectl explain nodes
$ kubectl explain node.spec
$ kubectl explain pods --recursive  # 전체 계층 구조

# YAML/JSON 출력
$ kubectl get node kind-control-plane -o yaml
$ kubectl get node kind-control-plane -o json
```

## 관련 개념

- [Kubernetes API Server](/knowledge/kubernetes/kubernetes-api-server/) - kubectl이 통신하는 API 서버
- [Kubernetes API](/knowledge/kubernetes/kubernetes-api/) - kubectl이 사용하는 RESTful API
- [Deployment](/knowledge/kubernetes/deployment/) - kubectl로 생성하고 관리하는 배포 객체
- [Service](/knowledge/kubernetes/service/) - kubectl로 생성하는 서비스 객체
- [Pod](/knowledge/kubernetes/pod/) - kubectl로 조회하고 관리하는 기본 배포 단위
