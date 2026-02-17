---
title: "Container Filesystem"
description: "Container Filesystem은 컨테이너 이미지에서 제공되는 격리된 파일 시스템으로, 각 컨테이너가 독립적으로 가지며, 컨테이너가 종료되고 재생성될 때 초기 상태(이미지 빌드 시점)로 리셋된다"
tags: ['Kubernetes', 'Container', 'Filesystem', 'Ephemeral', 'Storage']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/kubernetes/container-filesystem
sidebar:
  order: 6
---

## 핵심 개념

컨테이너가 시작되면 파일 시스템은 컨테이너 이미지를 빌드할 때 추가된 파일들로 구성된다. 프로세스는 이 파일들을 수정하거나 새 파일을 생성할 수 있지만, 컨테이너가 종료되면 모든 변경 사항이 손실된다. 이는 Kubernetes가 컨테이너를 "재시작"하는 것이 아니라 기존 컨테이너를 완전히 폐기하고 새 컨테이너를 생성하기 때문이다.

**Copy-on-Write 레이어:**
컨테이너의 파일 시스템은 이미지 레이어(읽기 전용)와 쓰기 가능한 레이어로 구성된다. 파일을 수정하면 쓰기 레이어에 복사되어 변경되며, 이 쓰기 레이어가 컨테이너 종료 시 삭제된다.

**임시적(ephemeral) 특성의 영향:**
- 데이터베이스 같은 상태 저장 애플리케이션은 반드시 볼륨을 사용해야 함
- 캐시 데이터의 경우 임시적 특성이 오히려 장점이 될 수 있음 (깨끗한 상태로 재시작)
- 로그 파일도 컨테이너 재시작 시 손실됨

**볼륨과의 관계:**
컨테이너의 각 Mount namespace는 독립적이지만, 볼륨을 마운트하면 파일 시스템의 해당 부분이 볼륨으로 대체된다. 이를 통해 특정 디렉터리의 데이터만 영속적으로 유지할 수 있다.

**설계 고려사항:**
- 볼륨을 마운트하여 재시작 간 데이터를 보존하기 전에, 이것이 컨테이너의 자가 치유 능력에 미치는 영향을 고려해야 함
- 손상된 캐시 파일을 볼륨에 보존하면 무한 크래시 루프가 발생할 수 있음
- 애플리케이션 상태와 캐시를 구분하여 상태만 볼륨에 저장하는 것이 바람직

## 예시

컨테이너 파일 시스템의 임시성 확인:

```bash
# MongoDB에 데이터 삽입
kubectl exec -it quiz -c mongo -- mongo kiada --quiet --eval "db.questions.count()"
# 1

# MongoDB 종료 (컨테이너 재시작 유발)
kubectl exec -it quiz -c mongo -- mongo admin --eval "db.shutdownServer()"

# 재시작 후 데이터 확인 - 볼륨이 없으면 데이터 손실
kubectl exec -it quiz -c mongo -- mongo kiada --quiet --eval "db.questions.count()"
# 0    (데이터 손실!)
```

볼륨으로 데이터 보존:

```yaml
spec:
  volumes:
  - name: quiz-data
    emptyDir: {}
  containers:
  - name: mongo
    image: mongo
    volumeMounts:
    - name: quiz-data
      mountPath: /data/db     # MongoDB 데이터 디렉터리를 볼륨으로 대체
```

## 관련 개념

- [Container Image](/knowledge/kubernetes/container-image/) - 컨테이너 파일 시스템의 초기 상태를 정의
- [Image Layer](/knowledge/kubernetes/image-layer/) - 파일 시스템을 구성하는 읽기 전용 레이어
- [Copy-on-Write](/knowledge/kubernetes/copy-on-write/) - 컨테이너 파일 시스템의 쓰기 메커니즘
- [Volume](/knowledge/kubernetes/volume/) - 임시적 파일 시스템의 한계를 극복하는 스토리지
- [emptyDir Volume](/knowledge/kubernetes/emptydir-volume/) - 컨테이너 재시작 간 데이터를 보존하는 가장 기본적인 방법
- [Container](/knowledge/kubernetes/container/) - 파일 시스템을 소유하는 실행 단위
