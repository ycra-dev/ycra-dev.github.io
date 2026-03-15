---
title: "이미지 풀 정책 (Image Pull Policy)"
description: "Image Pull Policy는 컨테이너 이미지를 워커 노드로 다운로드하는 시기와 조건을 결정하는 정책으로, 컨테이너가 생성(또는 재시작)될 때마다 적용된다"
tags: ['Kubernetes', 'Container', 'Image', 'Registry', 'Deployment']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/kubernetes/image-pull-policy
sidebar:
  order: 7
---

## 핵심 개념

컨테이너가 시작되기 전에 해당 이미지가 워커 노드에 존재해야 한다. `imagePullPolicy` 필드를 통해 이미지를 언제 다운로드할지 제어할 수 있다.

| 정책 | 설명 |
|------|------|
| **미지정** | `:latest` 태그 사용 시 `Always`가 기본값. 다른 태그 사용 시 `IfNotPresent`가 기본값 |
| **Always** | 컨테이너가 (재)시작될 때마다 레지스트리에서 이미지를 확인. 로컬 캐시된 이미지가 레지스트리와 동일하면 재다운로드하지 않지만, 레지스트리 접속은 필요 |
| **Never** | 이미지를 레지스트리에서 절대 풀하지 않음. 이미지가 반드시 노드에 미리 존재해야 함 |
| **IfNotPresent** | 노드에 이미지가 없을 때만 풀. 최초 1회만 다운로드 보장 |

**주의 사항:**
- `Always` 정책에서 이미지 레지스트리가 오프라인이면, 동일한 이미지가 로컬에 있더라도 컨테이너가 시작되지 않는다
- 레지스트리 장애가 애플리케이션 (재)시작을 방해할 수 있다
- 이미지 풀 실패 시에도 지수적 백오프가 적용된다
- `Always` 정책은 컨테이너가 에러로 종료된 후 같은 태그로 수정된 이미지가 푸시된 경우, 별도의 Pod 재생성 없이 업데이트된 이미지를 자동으로 풀할 수 있다는 장점이 있다

## 예시

이미지 풀 정책 설정:

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: my-pod
spec:
  containers:
  - name: my-container
    image: my-app:1.0
    imagePullPolicy: IfNotPresent    # 이미 존재하면 풀하지 않음
```

`:latest` 태그의 기본 동작:

```yaml
# imagePullPolicy 미지정 + latest 태그 = Always 동작
containers:
- name: my-container
  image: my-app:latest
```

특정 태그의 기본 동작:

```yaml
# imagePullPolicy 미지정 + 특정 태그 = IfNotPresent 동작
containers:
- name: my-container
  image: my-app:0.1
```

## 관련 개념

- [컨테이너 이미지 (Container Image)](/knowledge/kubernetes/container-image/) - 풀 정책의 대상이 되는 이미지
- [컨테이너 레지스트리 (Container Registry)](/knowledge/kubernetes/container-registry/) - 이미지가 저장되는 저장소
- [재시작 정책 (Restart Policy)](/knowledge/kubernetes/restart-policy/) - 재시작 시 이미지 풀 정책이 다시 적용됨
- [파드 페이즈 (Pod Phase)](/knowledge/kubernetes/pod-phase/) - 이미지 풀 실패 시 Pod가 Pending 상태에 머무름
- [컨테이너 (Container)](/knowledge/kubernetes/container/) - 이미지 풀 정책이 적용되는 단위
