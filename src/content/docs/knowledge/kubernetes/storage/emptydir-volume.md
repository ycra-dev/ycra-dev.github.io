---
title: "emptyDir Volume"
description: "emptyDir Volume은 Pod가 시작될 때 빈 디렉터리로 생성되어 Pod의 수명 동안 데이터를 저장하는 가장 기본적인 볼륨 유형으로, Pod가 삭제되면 데이터도 함께 삭제된다"
tags: ['Kubernetes', 'Storage', 'Volume', 'Emptydir', 'Ephemeral']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/kubernetes/emptydir-volume
sidebar:
  order: 2
---

## 핵심 개념

emptyDir은 컨테이너의 재시작 간에 데이터를 보존하면서도, Pod 수준에서 수명이 관리되는 임시 스토리지이다. 워커 노드의 파일 시스템에 디렉터리를 생성하여 이를 컨테이너에 마운트하는 방식으로 동작한다.

**주요 사용 사례:**
1. **단일 컨테이너 Pod**: 컨테이너 재시작 시에도 데이터 보존 필요 시
2. **읽기 전용 파일 시스템**: 컨테이너의 파일 시스템이 읽기 전용일 때 쓰기 가능한 영역이 필요한 경우
3. **멀티 컨테이너 Pod**: 컨테이너 간 데이터 공유 시
4. **Init Container와의 조합**: init 컨테이너가 데이터를 준비하고 주 컨테이너가 사용

**설정 옵션:**
- `medium`: 스토리지 매체 유형. 빈 문자열(기본값)은 노드의 디스크를 사용, `Memory`는 tmpfs(메모리 기반 파일 시스템)를 사용
- `sizeLimit`: 볼륨의 최대 크기 제한 (예: `10Mi`). 특히 메모리 기반 볼륨에서 중요

**파일 저장 위치:**
디스크 기반 emptyDir의 파일은 노드의 다음 경로에 저장된다:
`/var/lib/kubelet/pods/<pod_UID>/volumes/kubernetes.io~empty-dir/<volume_name>`

**메모리 기반 볼륨의 장점:**
- 디스크 I/O보다 훨씬 빠른 성능
- 민감한 데이터가 디스크에 기록되지 않으므로 보안에 유리
- Kubernetes가 Secret 데이터를 노출할 때도 동일한 인메모리 방식을 사용

## 예시

기본 emptyDir 볼륨:

```yaml
spec:
  volumes:
  - name: quiz-data
    emptyDir: {}              # 빈 중괄호는 기본 설정 사용을 명시
  containers:
  - name: mongo
    image: mongo
    volumeMounts:
    - name: quiz-data
      mountPath: /data/db
```

메모리 기반 emptyDir 볼륨:

```yaml
volumes:
- name: content
  emptyDir:
    medium: Memory            # tmpfs 사용
```

크기 제한이 있는 emptyDir:

```yaml
volumes:
- name: cache
  emptyDir:
    sizeLimit: 10Mi           # 최대 10MiB
```

Init Container로 emptyDir 초기화:

```yaml
spec:
  volumes:
  - name: initdb
    emptyDir: {}
  - name: quiz-data
    emptyDir: {}
  initContainers:
  - name: installer
    image: luksa/quiz-initdb-script-installer:0.1
    volumeMounts:
    - name: initdb
      mountPath: /initdb.d
  containers:
  - name: mongo
    image: mongo
    volumeMounts:
    - name: quiz-data
      mountPath: /data/db
    - name: initdb
      mountPath: /docker-entrypoint-initdb.d/
      readOnly: true
```

## 관련 개념

- [Volume](/knowledge/kubernetes/volume/) - emptyDir이 속하는 상위 볼륨 개념
- [Volume Mount](/knowledge/kubernetes/volume-mount/) - 볼륨을 컨테이너에 연결하는 설정
- [Init Container](/knowledge/kubernetes/init-container/) - emptyDir을 초기화하는 데 자주 사용되는 패턴
- [Sharing Files Between Containers](/knowledge/kubernetes/sharing-files-between-containers/) - emptyDir의 주요 활용 패턴
- [Secret](/knowledge/kubernetes/secret/) - 민감한 데이터에 인메모리 볼륨을 사용하는 유사 사례
