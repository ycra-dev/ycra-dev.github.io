---
title: "버퍼 오버플로우 (Buffer Overflow)"
description: "버퍼 오버플로우는 프로그램이 할당된 메모리 버퍼의 크기를 초과하는 데이터를 기록할 때 발생하는 보안 취약점으로, 인접 메모리를 덮어써 프로그램 충돌이나 임의 코드 실행을 유발할 수 있다"
tags: ['Security', 'Vulnerability', 'Input Validation', 'Memory Safety', 'Exploit']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/linux/buffer-overflow
sidebar:
  order: 3
---

## 핵심 개념

버퍼 오버플로우는 입력 유효성 검사 취약점(input validation vulnerability)의 하위 범주에 속한다. 개발자가 미리 정해진 크기의 임시 메모리 공간(버퍼)을 할당한 후, 입력 데이터의 크기를 버퍼 크기와 비교 검사하지 않으면, 할당된 공간 인접 메모리가 덮어씌워질 위험이 있다.

공격자는 정교하게 구성된 데이터를 입력하여:
- 프로그램을 충돌시키거나
- 최악의 경우 임의 코드를 실행할 수 있다

시스템 관리자의 대응 방안:
- 애플리케이션이 실행되는 권한을 최소화하여 보안 버그의 영향을 줄인다 (최소 권한 원칙)
- root가 아닌 비특권 사용자로 프로세스를 실행한다
- SELinux 같은 강제 접근 제어(MAC) 시스템을 사용한다
- 제한된 capabilities를 가진 컨테이너를 활용한다
- 소프트웨어 패치를 지속적으로 적용한다

오픈 소스 운영체제는 수천 명이 소스 코드를 검토할 수 있어 보안상 이점이 있다고 널리 인식된다.

## 예시

```c
// 취약한 코드 예시 (C 언어)
void vulnerable_function(char *input) {
    char buffer[64];
    strcpy(buffer, input);  // 입력 크기 검사 없음 - 위험!
}

// 안전한 코드 예시
void safe_function(char *input) {
    char buffer[64];
    strncpy(buffer, input, sizeof(buffer) - 1);  // 크기 제한
    buffer[sizeof(buffer) - 1] = '\0';
}
```

```bash
# 최소 권한으로 서비스 실행
# nginx를 비특권 사용자로 실행
sudo -u www-data nginx

# Linux capabilities로 권한 제한
setcap cap_net_bind_service=+ep /usr/sbin/nginx
```

## 관련 개념

- [리눅스 캐퍼빌리티 (Linux Capabilities)](/knowledge/linux/linux-capabilities/) - 프로세스 권한을 세밀하게 제한하는 메커니즘
- [리눅스 네임스페이스 (Linux Namespaces)](/knowledge/linux/linux-namespaces/) - 컨테이너를 통한 격리
- [Setuid (사용자 ID 설정)](/knowledge/linux/setuid/) - 특권 프로그램의 보안 위험
- [프로세스 (Process)](/knowledge/linux/process/) - 프로세스 권한과 보안의 관계
