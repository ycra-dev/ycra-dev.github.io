---
title: "Linux Capabilities"
description: "Linux capabilities는 root 계정의 권한을 약 30개의 개별 권한으로 분할하는 시스템으로, 프로세스에 필요한 최소한의 특권만 부여할 수 있게 한다"
tags: ['Capabilities', 'Linux', 'Security', 'Root', 'Privilege', 'Access Control']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/linux/linux-capabilities
sidebar:
  order: 7
---

## 핵심 개념

전통적 UNIX에서 root의 모든 권한은 하나의 덩어리였지만, capabilities는 이를 세분화한다. 예를 들어 `CAP_NET_BIND_SERVICE`는 1024 미만의 특권 포트 바인딩 권한만 제어한다. 웹 서버 같은 데몬은 root 전체 권한 대신 이 capability만으로 동작할 수 있다.

**Capabilities의 특성:**
- 부모 프로세스로부터 상속 가능
- 실행 파일의 속성으로 설정/해제 가능 (setuid와 유사)
- 프로세스가 불필요한 capability를 자발적으로 포기 가능
- root의 전통적 권한 = 모든 capabilities의 합집합

실제로 capabilities는 직접 사용되기보다는 AppArmor, Docker 같은 상위 시스템의 기반 기술로 활용된다. `capabilities(7)` man page에서 각 capability 버킷의 내용을 확인할 수 있다.

컨테이너 보안에서 capabilities는 핵심 역할을 한다. Linux 커널은 약 40개의 개별 capabilities를 정의하며, Docker 컨테이너는 기본적으로 이 중 큰 부분집합을 부여받는다. `--privileged` 플래그는 더 넓은 범위의 capabilities를 부여하지만 격리 이점을 크게 약화시킨다. 보안을 위해 `--cap-drop ALL`로 모든 권한을 제거한 후 `--cap-add`로 필요한 것만 추가하는 것이 권장된다.

## 예시

```bash
# 파일에 설정된 capabilities 확인
getcap /usr/bin/ping

# 파일에 capability 설정
sudo setcap cap_net_bind_service=+ep /usr/local/bin/myserver

# 프로세스의 capabilities 확인
cat /proc/self/status | grep Cap

# 주요 capabilities 예시
# CAP_NET_BIND_SERVICE - 특권 포트 바인딩
# CAP_SYS_ADMIN       - 다양한 시스템 관리 작업
# CAP_DAC_OVERRIDE     - 파일 접근 권한 우회
```

```bash
# Docker에서 capabilities 제어
docker run --cap-drop ALL --cap-add NET_BIND_SERVICE nginx
```

## 관련 개념

- [Sudo](/knowledge/linux/sudo/)
- [Setuid](/knowledge/linux/setuid/)
- [Linux Namespaces](/knowledge/linux/linux-namespaces/)
- [Container](/knowledge/linux/container/)
- [Docker](/knowledge/linux/docker/)
- [Cgroups](/knowledge/linux/cgroups/)
