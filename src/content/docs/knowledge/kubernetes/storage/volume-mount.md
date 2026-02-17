---
title: "Volume Mount"
description: "Volume Mount는 Pod에 정의된 볼륨을 컨테이너의 파일 시스템 내 특정 경로에 연결하는 설정으로, 컨테이너 정의의 `volumeMounts` 배열에서 구성된다"
tags: ['Kubernetes', 'Storage', 'Volume', 'Mount', 'Container']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/kubernetes/volume-mount
sidebar:
  order: 3
---

## 핵심 개념

볼륨을 Pod에 정의하는 것만으로는 컨테이너에서 사용할 수 없다. 반드시 `volumeMounts`를 통해 컨테이너에 마운트해야 한다. 마운팅이란 스토리지 장치나 볼륨의 파일 시스템을 운영 체제의 파일 트리 내 특정 위치에 연결하는 행위이다.

**Volume Mount의 설정 필드:**

| 필드 | 설명 |
|------|------|
| `name` | 마운트할 볼륨의 이름 (Pod에 정의된 볼륨 중 하나와 일치해야 함) |
| `mountPath` | 컨테이너 내 볼륨을 마운트할 경로 |
| `readOnly` | 읽기 전용 마운트 여부 (기본값: false) |
| `mountPropagation` | 추가 마운트의 전파 방식 (None, HostToContainer, Bidirectional) |
| `subPath` | 볼륨의 특정 하위 경로만 마운트 |
| `subPathExpr` | subPath와 동일하지만 환경 변수 참조 가능 `$(ENV_VAR_NAME)` |

**핵심 고려사항:**
- 같은 볼륨을 여러 컨테이너에 마운트할 수 있으며, 각 컨테이너에서 다른 경로에 마운트 가능
- 보안을 위해 읽기만 필요한 컨테이너에는 `readOnly: true`를 설정하는 것이 권장됨
- `subPathExpr`를 사용하면 Pod 이름 등의 환경 변수를 기반으로 각 복제본(replica)이 고유한 하위 디렉터리를 사용할 수 있음
- 볼륨을 마운트하면 해당 경로의 기존 파일이 숨겨지므로 마운트 경로를 신중하게 선택해야 함

## 예시

기본 볼륨 마운트:

```yaml
containers:
- name: mongo
  image: mongo
  volumeMounts:
  - name: quiz-data          # Pod에 정의된 볼륨 이름 참조
    mountPath: /data/db       # 컨테이너 내 마운트 위치
```

읽기 전용 마운트:

```yaml
containers:
- name: nginx
  image: nginx:alpine
  volumeMounts:
  - name: shared
    mountPath: /usr/share/nginx/html
    readOnly: true            # 보안을 위해 읽기 전용으로 마운트
```

같은 볼륨을 다른 경로에 마운트:

```yaml
spec:
  volumes:
  - name: shared
    emptyDir: {}
  containers:
  - name: quote-writer
    image: luksa/quote-writer:0.1
    volumeMounts:
    - name: shared
      mountPath: /var/local/output      # 쓰기용 경로
  - name: nginx
    image: nginx:alpine
    volumeMounts:
    - name: shared
      mountPath: /usr/share/nginx/html  # 읽기용 경로
      readOnly: true
```

## 관련 개념

- [Volume](/knowledge/kubernetes/volume/) - 마운트의 대상이 되는 Pod 수준의 스토리지 정의
- [emptyDir Volume](/knowledge/kubernetes/emptydir-volume/) - 가장 흔하게 마운트되는 볼륨 유형
- [Sharing Files Between Containers](/knowledge/kubernetes/sharing-files-between-containers/) - 볼륨 마운트를 활용한 파일 공유 패턴
- [Container](/knowledge/kubernetes/container/) - 마운트가 적용되는 대상
- [Downward API](/knowledge/kubernetes/downward-api/) - subPathExpr에서 활용 가능한 Pod 메타데이터
