---
title: "Seccomp"
description: "Seccomp(Secure Computing Mode)는 프로그램이 수행할 수 있는 시스템 콜(sys-calls)을 개별적으로 필터링할 수 있게 하는 Linux 커널 보안 기능이다"
tags: ['Linux', 'Security', 'Seccomp', 'Container', 'Syscall']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/kubernetes/seccomp
sidebar:
  order: 10
---

## 핵심 개념

컨테이너들은 동일한 커널을 공유하기 때문에, 악의적인 컨테이너가 시스템 콜을 통해 커널 메모리를 수정하거나, 커널 모듈을 추가/제거하거나, 시스템 시계를 변경하는 등의 행위가 가능하다. 이를 방지하기 위해 여러 보안 기술이 사용된다.

**컨테이너 보안 기술 스택 (계층적):**

1. **특권 컨테이너 (Privileged Container)**: `--privileged` 플래그로 생성. 모든 시스템 콜에 대한 완전한 접근 권한 부여. 대부분의 컨테이너는 이를 사용하면 안 됨

2. **Capabilities**: 리눅스 커널이 특권을 세분화한 단위
   - `CAP_NET_ADMIN`: 네트워크 관련 작업 수행
   - `CAP_NET_BIND_SERVICE`: 1024 미만 포트 바인딩
   - `CAP_SYS_TIME`: 시스템 시계 수정
   - Docker/Kubernetes는 기본적으로 일반 애플리케이션에 필요하지 않은 capabilities를 제거

3. **Seccomp 프로필**: 개별 시스템 콜 수준의 미세한 제어
   - JSON 파일로 허용할 시스템 콜 목록 정의
   - Docker 컨테이너 생성 시 프로필 적용

4. **AppArmor**: 파일 경로 기반의 필수 접근 제어(MAC) 메커니즘. 프로세스 중심
5. **SELinux**: 레이블 기반의 필수 접근 제어(MAC) 메커니즘. 파일, 리소스, 사용자, 프로세스에 레이블을 부착하고 정책에 따라 접근 제어

원칙: **최소 권한의 원칙(Principle of Least Privilege)**을 항상 따라야 한다. 컨테이너에 필요하지 않은 capabilities를 부여하지 않아야 공격자가 이를 악용하여 OS에 접근하는 것을 방지할 수 있다.

## 예시

```bash
# 특권 컨테이너 실행 (대부분의 경우 권장하지 않음)
$ docker run --privileged ...

# 특정 capability 추가
$ docker run --cap-add=NET_ADMIN ...

# capability 제거
$ docker run --cap-drop=SYS_TIME ...

# seccomp 프로필 적용
$ docker run --security-opt seccomp=my-profile.json ...
```

```json
// seccomp 프로필 예시 (my-profile.json)
{
  "defaultAction": "SCMP_ACT_ERRNO",
  "architectures": ["SCMP_ARCH_X86_64"],
  "syscalls": [
    {
      "names": ["read", "write", "open", "close", "stat", "fstat",
                "mmap", "mprotect", "munmap", "brk", "exit_group"],
      "action": "SCMP_ACT_ALLOW"
    }
  ]
}
```

## 관련 개념

- [Container](/knowledge/kubernetes/container/) - Seccomp에 의해 보안이 강화되는 프로세스
- [Linux Namespaces](/knowledge/kubernetes/linux-namespaces/) - 네임스페이스와 함께 격리를 구성
- [Cgroups](/knowledge/kubernetes/cgroups/) - 리소스 제한을 통한 격리
- [Kubernetes](/knowledge/kubernetes/kubernetes/) - Pod 보안 정책을 통해 seccomp 프로필 적용 가능
