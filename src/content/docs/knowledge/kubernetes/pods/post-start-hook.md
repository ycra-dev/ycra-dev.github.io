---
title: "Post-Start Hook"
description: "Post-Start Hook은 컨테이너가 생성된 직후 실행되는 생명 주기 훅(lifecycle hook)으로, 메인 프로세스와 비동기적으로 실행되어 추가적인 초기화 작업이나 알림 기능을 수행한다"
tags: ['Kubernetes', 'Lifecycle', 'Hook', 'Container', 'Initialization']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/kubernetes/post-start-hook
sidebar:
  order: 14
---

## 핵심 개념

Post-Start Hook은 컨테이너의 `lifecycle.postStart` 필드에 정의되며, 두 가지 유형으로 실행할 수 있다:
1. **exec**: 컨테이너 내부에서 명령을 실행
2. **httpGet**: HTTP GET 요청을 전송

**핵심 동작 특성:**
- "post-start"라는 이름과 달리, 메인 프로세스가 완전히 시작된 후가 아니라 컨테이너가 생성된 직후 메인 프로세스와 거의 동시에 실행된다
- 훅이 완료될 때까지 컨테이너 상태는 `Waiting` (reason: `ContainerCreating`)으로 유지된다
- 이 기간 동안 `kubectl logs`와 `kubectl port-forward`가 거부된다
- 훅의 명령이 실행 실패하거나 비정상 종료 코드를 반환하면 컨테이너 전체가 재시작된다
- 훅이 성공하면 출력이 어디에도 로깅되지 않는다 (실패 시에만 이벤트에 기록)
- 후속 컨테이너의 생성과 시작을 차단한다 (구현 세부사항)

**httpGet 유형 사용 시 주의:**
- 같은 컨테이너나 같은 Pod의 다른 컨테이너를 대상으로 하면 무한 재시작 루프에 빠질 수 있다
- 요청이 전송되는 시점에 웹 서버가 준비되지 않았을 수 있기 때문
- 404 등의 응답을 실패로 처리하지 않으므로 URI를 정확히 지정해야 한다
- `host` 필드 기본값은 Pod IP이며, localhost를 설정하면 호스트 노드로 전송된다

## 예시

exec 유형의 Post-Start Hook:

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: quote-poststart
spec:
  containers:
  - name: nginx
    image: nginx:alpine
    ports:
    - name: http
      containerPort: 80
    lifecycle:
      postStart:
        exec:
          command:
          - sh
          - -c
          - |
            apk add fortune && \
            curl -O https://luksa.github.io/kiada/book-quotes.txt && \
            curl -O https://luksa.github.io/kiada/book-quotes.txt.dat && \
            fortune book-quotes.txt > /usr/share/nginx/html/quote
```

httpGet 유형의 Post-Start Hook (외부 서비스 알림):

```yaml
lifecycle:
  postStart:
    httpGet:
      host: myservice.example.com
      port: 80
      path: /container-started
```

## 관련 개념

- [Pre-Stop Hook](/knowledge/kubernetes/pre-stop-hook/) - 컨테이너 종료 직전에 실행되는 생명 주기 훅
- [Init Container](/knowledge/kubernetes/init-container/) - Pod 수준의 초기화를 위한 또 다른 메커니즘
- [Pod Phase](/knowledge/kubernetes/pod-phase/) - 훅 실행 중의 Pod 상태
- [Restart Policy](/knowledge/kubernetes/restart-policy/) - 훅 실패 시 재시작 동작을 결정
- [Container](/knowledge/kubernetes/container/) - 훅이 정의되는 대상
