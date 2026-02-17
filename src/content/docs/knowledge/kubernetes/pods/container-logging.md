---
title: "Container Logging"
description: "Container Logging은 컨테이너화된 애플리케이션이 표준 출력(stdout)과 표준 에러(stderr)에 쓰는 로그를 컨테이너 런타임이 캡처하여 저장하고, `kubectl logs` 명령으로 조회할 수 있게 하는 메커니즘이다"
tags: ['Kubernetes', 'Logging', 'Container', 'Kubectl', 'Observability']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/kubernetes/container-logging
sidebar:
  order: 6
---

## 핵심 개념

컨테이너화된 애플리케이션은 파일 대신 표준 출력에 로그를 기록하는 것이 관례이다. 이렇게 하면 컨테이너 런타임이 출력을 가로채서 일관된 위치(보통 `/var/log/containers`)에 저장하며, 각 애플리케이션이 어디에 로그를 저장하는지 알 필요 없이 접근할 수 있다.

핵심 특징:
- **컨테이너별 독립 로그 파일**: Kubernetes는 각 컨테이너에 대해 별도의 로그 파일을 유지
- **컨테이너 재시작 시 새 파일 생성**: 컨테이너가 재시작(실제로는 재생성)되면 로그가 새 파일에 기록됨
- **런타임 타임스탬프 자동 첨부**: `--timestamps` 옵션으로 확인 가능
- **로그 회전(rotation)**: 클러스터 설정에 따라 로그 파일이 특정 크기에 도달하면 회전
- **Pod 삭제 시 로그 삭제**: 영구적인 로그 보관을 위해서는 중앙 집중식 로깅 시스템이 필요

하나의 컨테이너에서 하나의 프로세스만 실행해야 하는 이유 중 하나도 로그 관리와 관련이 있다. 여러 프로세스가 같은 출력에 쓰면 로그가 뒤섞여 어떤 프로세스가 어떤 줄을 출력했는지 구분하기 어렵다.

## 예시

기본 로그 조회:

```bash
kubectl logs kiada
```

실시간 로그 스트리밍:

```bash
kubectl logs kiada -f
# 또는
kubectl logs kiada --follow
```

타임스탬프 포함:

```bash
kubectl logs kiada --timestamps=true
# 또는 간단히
kubectl logs kiada --timestamps
```

시간 기반 필터링:

```bash
# 최근 2분 동안의 로그
kubectl logs kiada --since=2m

# 특정 시간 이후의 로그
kubectl logs kiada --since-time=2020-02-01T09:50:00Z
```

마지막 N줄만 표시:

```bash
kubectl logs kiada --tail=10
```

이전 컨테이너(재시작 전)의 로그:

```bash
kubectl logs kiada --previous
# 또는
kubectl logs kiada -p
```

멀티 컨테이너 Pod의 특정 컨테이너 로그:

```bash
kubectl logs kiada-ssl -c envoy
```

## 관련 개념

- [Pod](/knowledge/kubernetes/pod/) - 로그가 수집되는 대상 리소스
- [Container](/knowledge/kubernetes/container/) - 실제 로그를 생성하는 실행 단위
- [kubectl](/knowledge/kubernetes/kubectl/) - 로그 조회에 사용되는 CLI 도구
- [Sidecar Container](/knowledge/kubernetes/sidecar-container/) - 로그 수집/회전을 위한 사이드카 패턴 활용
