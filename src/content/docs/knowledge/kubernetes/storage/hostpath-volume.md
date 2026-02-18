---
title: "hostPath Volume"
description: "hostPath Volume은 워커 노드의 파일 시스템에 있는 특정 파일이나 디렉터리를 Pod의 컨테이너에 마운트하는 볼륨 유형으로, 노드의 로컬 파일에 직접 접근할 수 있게 한다"
tags: ['Kubernetes', 'Storage', 'Volume', 'Hostpath', 'Node', 'Security']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/kubernetes/hostpath-volume
sidebar:
  order: 4
---

## 핵심 개념

hostPath 볼륨은 호스트 노드의 파일 시스템 경로를 직접 참조하여 Pod에 마운트한다. 같은 노드에서 실행되고 같은 경로를 사용하는 Pod들은 동일한 파일에 접근할 수 있지만, 다른 노드의 Pod들은 접근할 수 없다.

**적합한 사용 사례:**
- 시스템 수준의 로그 파일 읽기/쓰기
- 노드의 디바이스 파일 접근
- 노드의 설정 파일 읽기
- Docker 소켓 파일 등 노드 수준 리소스 접근이 필요한 시스템 Pod

**부적합한 사용 사례:**
- 데이터베이스 데이터 저장 (Pod가 다른 노드로 재스케줄링되면 데이터 손실)
- 일반 애플리케이션의 데이터 영속화

**보안 위험:**
hostPath는 Kubernetes에서 가장 위험한 볼륨 유형 중 하나이다. 무제한 사용을 허용하면:
- 노드의 전체 파일 시스템에 접근 가능
- Docker 소켓 마운트로 호스트에서 root 권한의 명령 실행 가능
- 노드의 설정 변경 가능
- 따라서 특권(privileged) Pod에서만 사용이 권장됨

**hostPath 유형:**

| 유형 | 설명 |
|------|------|
| 빈 문자열 | 체크 없이 마운트 |
| Directory | 디렉터리가 존재해야 함 |
| DirectoryOrCreate | 없으면 생성 (755 권한) |
| File | 파일이 존재해야 함 |
| FileOrCreate | 없으면 생성 (644 권한) |
| BlockDevice | 블록 디바이스여야 함 |
| CharDevice | 문자 디바이스여야 함 |
| Socket | UNIX 소켓이어야 함 |

## 예시

호스트의 루트 파일 시스템에 접근하는 Pod:

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: node-explorer
spec:
  volumes:
  - name: host-root
    hostPath:
      path: /                 # 노드의 루트 디렉터리
  containers:
  - name: node-explorer
    image: alpine
    command: ["sleep", "9999999999"]
    volumeMounts:
    - name: host-root
      mountPath: /host        # 컨테이너 내 /host에 마운트
```

호스트 파일 시스템 탐색:

```bash
kubectl exec -it node-explorer -- sh
/ # cd /host
# 이제 노드의 파일 시스템을 탐색할 수 있음
```

PersistentVolume에서의 hostPath 사용:

```yaml
apiVersion: v1
kind: PersistentVolume
metadata:
  name: quiz-data
spec:
  capacity:
    storage: 1Gi
  accessModes:
  - ReadWriteOnce
  - ReadOnlyMany
  hostPath:
    path: /var/quiz-data
```

## 관련 개념

- [Volume](/knowledge/kubernetes/volume/) - hostPath가 속하는 상위 볼륨 개념
- [Network Storage Volume](/knowledge/kubernetes/network-storage-volume/) - hostPath의 대안인 네트워크 스토리지
- [Local Persistent Volume](/knowledge/kubernetes/local-persistent-volume/) - hostPath보다 안전한 노드 로컬 스토리지
- [Pod](/knowledge/kubernetes/pod/) - 볼륨이 정의되는 리소스
