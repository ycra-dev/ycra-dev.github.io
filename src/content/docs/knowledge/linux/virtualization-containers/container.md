---
title: "컨테이너 (Container)"
description: "컨테이너(Container)는 Linux 커널의 네임스페이스, cgroups, capabilities 등을 활용하여 프로세스를 격리된 실행 환경에서 실행하는 OS 수준의 가상화 기술로, 호스트 커널을 공유하면서도 독립적인 파일시스템과 프로세스 네임스페이스를 제공한다"
tags: ['Container', 'Docker', 'Containerization', 'Isolation', 'Linux', 'Cgroups', 'Namespaces']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/linux/container
sidebar:
  order: 8
---

## 핵심 개념

컨테이너는 마법이 아니라 수년간 존재해온 UNIX/Linux 기능의 융합이다. 컨테이너 엔진(Docker 등)이 이를 통합 관리한다.

**컨테이너를 구성하는 커널 기능:**
- **네임스페이스(Namespaces)**: 파일시스템 마운트, 프로세스 관리, 네트워킹 등에서 컨테이너 프로세스를 격리
- **컨트롤 그룹(cgroups)**: CPU, 메모리 등 시스템 자원 사용을 제한하고 우선순위 지정
- **캐퍼빌리티(Capabilities)**: 민감한 커널 오퍼레이션과 시스템 콜 실행 권한 제어
- **Seccomp**: 시스템 콜 접근을 세밀하게 제한

**컨테이너 이미지**는 애플리케이션과 그 전제 조건을 표준 이식 가능한 파일로 패키징한다. 유니온 파일시스템을 사용하여 여러 읽기 전용 레이어 위에 읽기/쓰기 레이어를 추가하는 **copy-on-write** 전략을 채택한다. 이를 통해 여러 컨테이너가 같은 불변(immutable) 기반 레이어를 공유하여 저장 효율과 시작 시간을 개선한다.

**컨테이너 사용 원칙:**
- 스케줄된 작업에 컨테이너 내부에서 cron 실행 금지 - 호스트의 cron으로 단수명 컨테이너 실행
- 컨테이너 내부에 sshd 실행 금지 - `docker exec`으로 셸 접속
- 환경 변수로 구성 정보 전달
- "컨테이너당 하나의 프로세스" 규칙에 얽매이지 말 것

## 예시

```bash
# 기본 컨테이너 실행
docker run debian /bin/echo "Hello World"

# 대화형 셸 실행
docker run -it --hostname mycontainer debian /bin/bash

# 백그라운드 데몬 실행 (포트 매핑)
docker run -d --name nginx -p 80:80 nginx

# 실행 중인 컨테이너에 셸 접속
docker exec -it nginx /bin/bash

# 컨테이너 목록 확인
docker ps        # 실행 중인 컨테이너
docker ps -a     # 전체 컨테이너 (중지된 것 포함)
```

## 관련 개념

- [도커 (Docker)](/knowledge/linux/docker/)
- [리눅스 네임스페이스 (Linux Namespaces)](/knowledge/linux/linux-namespaces/)
- [Cgroups (컨트롤 그룹)](/knowledge/linux/cgroups/)
- [리눅스 캐퍼빌리티 (Linux Capabilities)](/knowledge/linux/linux-capabilities/)
- [가상 머신 (Virtual Machine)](/knowledge/linux/virtual-machine/)
- [Kubernetes (쿠버네티스)](/knowledge/linux/kubernetes/)
- [컨테이너 오케스트레이션 (Container Orchestration)](/knowledge/linux/container-orchestration/)
