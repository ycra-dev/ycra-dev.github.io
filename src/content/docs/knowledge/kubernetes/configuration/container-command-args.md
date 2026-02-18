---
title: "Container Command and Args"
description: "Kubernetes에서 `command`와 `args` 필드는 Dockerfile의 `ENTRYPOINT`와 `CMD`에 대응하며, 컨테이너 이미지를 재빌드하지 않고도 파드 매니페스트에서 실행 명령어와 인자를 오버라이드할 수 있다"
tags: ['Kubernetes', 'Container', 'Command', 'Args', 'Entrypoint']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/kubernetes/container-command-args
sidebar:
  order: 4
---

## 핵심 개념

Docker의 `ENTRYPOINT`는 Kubernetes의 `command` 필드에, `CMD`는 `args` 필드에 대응한다. 컨테이너 실행 시 이 두 배열이 연결되어 최종 실행 명령을 구성한다. 파드 매니페스트에서 `command`를 지정하면 Dockerfile의 `ENTRYPOINT`를, `args`를 지정하면 `CMD`를 오버라이드한다. 둘 다 독립적으로 오버라이드할 수 있다.

이 메커니즘은 동일한 컨테이너 이미지를 다양한 설정으로 실행해야 할 때 매우 유용하다. 이미지를 재빌드하지 않고 프로파일링 옵션 추가, 포트 변경 등의 설정 변경이 가능하다.

`command`와 `args` 필드에서 `$(VAR_NAME)` 구문으로 매니페스트에 정의된 환경 변수를 참조할 수 있다. 단, 이미지에서 정의된 환경 변수는 참조할 수 없으며, 쉘을 통해 실행하면 `$VAR_NAME` 구문으로 모든 환경 변수를 참조할 수 있다.

## 예시

명령어 오버라이드 (프로파일링 활성화):

```yaml
spec:
  containers:
  - name: kiada
    image: luksa/kiada:0.4
    command: ["node", "--cpu-prof", "--heap-prof", "app.js"]
```

인자만 오버라이드:

```yaml
spec:
  containers:
  - name: kiada
    image: luksa/kiada:0.4
    args: ["--listen-port", "9090"]
```

여러 줄로 명령어 지정:

```yaml
command:
- node
- --cpu-prof
- --heap-prof
- app.js
```

쉘을 통한 환경 변수 참조:

```yaml
containers:
- name: main
  image: alpine
  command:
  - sh
  - -c
  - 'echo "Hostname is $HOSTNAME."; sleep infinity'
```

## 관련 개념

- [Container](/knowledge/kubernetes/container/) - 명령어가 실행되는 단위
- [Container Image](/knowledge/kubernetes/container-image/) - 기본 ENTRYPOINT와 CMD가 정의되는 곳
- [Dockerfile](/knowledge/kubernetes/dockerfile/) - 이미지 레벨의 명령어 설정
