---
title: "UID/GID (사용자/그룹 ID)"
description: "UID(User ID)와 GID(Group ID)는 UNIX/Linux 시스템에서 사용자와 그룹을 식별하는 32비트 부호 없는 정수로, 파일 소유권, 프로세스 권한, 리소스 접근 제어 등 모든 권한 관리의 기반이다"
tags: ['Uid', 'Gid', 'User Management', 'Authentication', 'Access Control', 'Unix']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/linux/uid-gid
sidebar:
  order: 1
---

## 핵심 개념

root 계정은 UID 0, bin/daemon 같은 pseudo-user는 낮은 UID를 갖는다. 실제 사용자에게는 1000 이상의 UID를 할당하며, 보안과 파일 복구 문제를 방지하기 위해 UID를 재사용하지 않는 것이 중요하다. NFS 환경에서는 조직 전체에서 UID를 고유하게 유지해야 한다.

현대적 관행은 각 사용자를 자신만의 개인 그룹에 배치하여 부주의한 권한 설정 위험을 줄이는 것이다. 파일 공유가 필요하면 별도 그룹을 생성한다. setgid 비트(02000)를 디렉토리에 설정하면 새 파일이 부모 디렉토리의 그룹을 상속하여 협업을 촉진한다.

대규모 환경에서는 LDAP 같은 중앙 데이터베이스로 UID/GID 고유성을 강제하는 것이 최선이다.

## 예시

```bash
# 현재 사용자의 UID/GID 확인
id
id -u username

# 소유자가 없는 파일 찾기 (삭제된 사용자)
find / -xdev -nouser

# 특정 UID로 사용자 추가
useradd -u 1500 -g 1500 newuser

# 사용자의 모든 그룹 확인
groups username

# 파일 소유권 변경
chown 1000:1000 /path/to/file
```

## 관련 개념

- [파일 권한 (File Permissions)](/knowledge/linux/file-permissions/)
- [접근 제어 목록 (Access Control List)](/knowledge/linux/access-control-list/)
- [Sudo (관리자 권한 실행)](/knowledge/linux/sudo/)
- [Setuid (사용자 ID 설정)](/knowledge/linux/setuid/)
- [PAM (장착형 인증 모듈)](/knowledge/linux/pam/)
