---
title: "컨테이너 간 파일 공유 (Sharing Files Between Containers)"
description: "Sharing Files Between Containers는 같은 Pod 내의 여러 컨테이너가 공유 볼륨을 통해 파일을 읽고 쓸 수 있는 패턴으로, 사이드카 컨테이너 패턴의 핵심 활용 사례 중 하나이다"
tags: ['Kubernetes', 'Storage', 'Volume', 'Sidecar', 'Container Pattern']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/kubernetes/sharing-files-between-containers
sidebar:
  order: 8
---

## 핵심 개념

Pod 내의 각 컨테이너는 독립적인 Mount namespace를 가지므로 기본적으로 파일 시스템이 격리되어 있다. 하지만 Pod에 볼륨을 정의하고 여러 컨테이너에 마운트하면, 해당 볼륨을 통해 파일을 공유할 수 있다.

**파일 공유 패턴:**

1. **콘텐츠 생성 + 웹 서버**: 한 컨테이너가 콘텐츠를 생성하여 볼륨에 저장하고, 다른 컨테이너(웹 서버)가 이를 서빙
2. **로그 수집**: 주 컨테이너가 로그를 볼륨에 기록하고, 사이드카가 로그를 수집/처리
3. **Init Container + Main Container**: init 컨테이너가 데이터를 준비하고 주 컨테이너가 사용
4. **설정 파일 공유**: 한 컨테이너가 설정을 생성하고 다른 컨테이너가 읽어서 사용

**설계 원칙:**
- 같은 볼륨을 다른 경로에 마운트 가능 (각 컨테이너의 요구에 맞게)
- 쓰기 권한은 필요한 컨테이너에만 부여하고, 읽기만 하는 컨테이너는 `readOnly: true`로 설정
- 보안 관점에서 웹 서버 같은 외부 노출 컨테이너에는 쓰기 권한을 제한하는 것이 권장

## 예시

두 컨테이너가 볼륨을 공유하는 Quote 서비스:

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: quote
spec:
  volumes:
  - name: shared
    emptyDir: {}
  containers:
  - name: quote-writer                      # 콘텐츠 생성 컨테이너
    image: luksa/quote-writer:0.1
    volumeMounts:
    - name: shared
      mountPath: /var/local/output          # 쓰기 경로
  - name: nginx                             # 웹 서버 컨테이너
    image: nginx:alpine
    volumeMounts:
    - name: shared
      mountPath: /usr/share/nginx/html      # 서빙 경로
      readOnly: true                        # 읽기 전용
    ports:
    - name: http
      containerPort: 80
```

양쪽 컨테이너에서 같은 파일 확인:

```bash
# quote-writer 컨테이너에서 확인
kubectl exec quote -c quote-writer -- cat /var/local/output/quote

# nginx 컨테이너에서 확인 (동일한 내용)
kubectl exec quote -c nginx -- cat /usr/share/nginx/html/quote
```

Init Container로 볼륨 초기화 후 주 컨테이너에서 사용:

```yaml
spec:
  volumes:
  - name: initdb
    emptyDir: {}
  initContainers:
  - name: installer
    image: luksa/quiz-initdb-script-installer:0.1
    volumeMounts:
    - name: initdb
      mountPath: /initdb.d        # init 컨테이너가 파일을 복사
  containers:
  - name: mongo
    image: mongo
    volumeMounts:
    - name: initdb
      mountPath: /docker-entrypoint-initdb.d/    # 주 컨테이너가 사용
      readOnly: true
```

## 관련 개념

- [볼륨 (Volume)](/knowledge/kubernetes/volume/) - 파일 공유의 기반이 되는 스토리지 단위
- [emptyDir 볼륨 (emptyDir Volume)](/knowledge/kubernetes/emptydir-volume/) - 파일 공유에 가장 흔히 사용되는 볼륨 유형
- [볼륨 마운트 (Volume Mount)](/knowledge/kubernetes/volume-mount/) - 각 컨테이너에 볼륨을 연결하는 설정
- [사이드카 컨테이너 (Sidecar Container)](/knowledge/kubernetes/sidecar-container/) - 파일 공유 패턴의 주요 구조적 요소
- [초기화 컨테이너 (Init Container)](/knowledge/kubernetes/init-container/) - 볼륨을 미리 초기화하는 데 사용
- [파드 (Pod)](/knowledge/kubernetes/pod/) - 공유 볼륨이 정의되는 리소스
