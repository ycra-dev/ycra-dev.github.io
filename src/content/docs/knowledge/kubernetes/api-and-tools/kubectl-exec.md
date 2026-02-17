---
title: "kubectl exec"
description: "`kubectl exec`는 실행 중인 컨테이너 내부에서 임의의 명령을 원격으로 실행할 수 있게 해주는 kubectl 명령어로, 디버깅과 컨테이너 환경 탐색에 주로 사용된다"
tags: ['Kubernetes', 'Kubectl', 'Debugging', 'Container', 'Command Line']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/kubernetes/kubectl-exec
sidebar:
  order: 10
---

## 핵심 개념

`kubectl exec`는 SSH를 통해 원격 시스템에서 명령을 실행하는 것과 유사하게 동작한다. Pod의 호스트 노드에 직접 로그인하지 않고도 컨테이너 내부의 바이너리 파일을 실행할 수 있다. 단, 컨테이너의 파일 시스템에 해당 실행 파일이 존재해야 한다.

주요 사용 시나리오:
- 컨테이너 내부의 프로세스 목록 확인
- 환경 변수나 파일 시스템 탐색
- 네트워크 연결 테스트
- 데이터베이스 셸 접속
- 인터랙티브 셸 실행

명령어 작성 시 `--` (더블 대시)를 사용하여 kubectl 인수와 컨테이너 내 실행할 명령의 인수를 구분해야 한다. 이를 생략하면 대시로 시작하는 인수가 kubectl의 옵션으로 해석될 수 있다.

프로덕션 컨테이너는 보안을 위해 최소한의 바이너리만 포함하는 경우가 많아 셸이나 디버깅 도구를 실행할 수 없을 수 있다. 이 경우 Kubernetes의 ephemeral containers 기능을 사용하여 디버그 컨테이너를 연결할 수 있다.

## 예시

단일 명령 실행:

```bash
# 컨테이너 내 프로세스 목록 확인
kubectl exec kiada -- ps aux

# curl로 로컬 애플리케이션 테스트
kubectl exec kiada -- curl -s localhost:8080
```

인터랙티브 셸 실행:

```bash
# bash 셸 접속
kubectl exec -it kiada -- bash

# -i: 표준 입력을 컨테이너에 전달
# -t: TTY (터미널) 할당
```

멀티 컨테이너 Pod에서 특정 컨테이너 지정:

```bash
# -c 옵션으로 컨테이너 지정
kubectl exec -it kiada-ssl -c envoy -- bash
```

## 관련 개념

- [kubectl](/knowledge/kubernetes/kubectl/) - exec가 속한 Kubernetes CLI 도구
- [Pod](/knowledge/kubernetes/pod/) - exec 명령이 실행되는 대상
- [Container](/knowledge/kubernetes/container/) - 명령이 실제로 실행되는 격리된 환경
- [Container Runtime Interface](/knowledge/kubernetes/container-runtime-interface/) - 컨테이너 내부 명령 실행을 가능하게 하는 인터페이스
