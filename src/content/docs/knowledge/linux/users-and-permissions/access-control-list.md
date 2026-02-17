---
title: "Access Control List"
description: "ACL(Access Control List)은 전통적인 소유자/그룹/기타 9비트 권한 모델을 확장하여 여러 사용자와 그룹에 대해 개별적으로 권한을 지정할 수 있는 파일 접근 제어 메커니즘이다"
tags: ['Acl', 'Permissions', 'Security', 'Filesystem', 'Nfsv4']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/linux/access-control-list
sidebar:
  order: 9
---

## 핵심 개념

ACL은 전통적 9비트 모델보다 강력하지만 복잡하다. 각 파일이나 디렉토리에 연관된 ACL은 여러 개의 ACE(Access Control Entry)로 구성되며, 각 ACE는 특정 사용자 또는 그룹에 적용될 권한 집합을 정의한다.

**두 가지 ACL 표준:**
1. **POSIX 드래프트 ACL**: 공식 채택되지 않았으나 널리 구현됨
2. **NFSv4 ACL**: Windows ACL을 적용한 NFS v4 표준

고급 ACL 시스템은 부분적 권한, 부정 권한(negative permissions), 상속(inheritance) 기능을 지원하여 새로 생성된 파일에 자동으로 ACL 규칙이 전파될 수 있다. 대부분의 주요 UNIX/Linux 파일시스템은 ACL을 지원한다.

ACL은 파일시스템 구현에 의존하므로, 사용하는 파일시스템이 명시적으로 ACL을 지원해야 한다. `ls -l` 출력에서 권한 끝의 `+` 기호는 ACL이 설정되어 있음을 나타낸다.

## 예시

```bash
# ACL 확인
getfacl /shared/project

# 특정 사용자에게 읽기/쓰기 권한 부여
setfacl -m u:alice:rw /shared/project/file.txt

# 특정 그룹에게 읽기 권한 부여
setfacl -m g:developers:r /shared/project/file.txt

# ACL 제거
setfacl -x u:alice /shared/project/file.txt

# 기본 ACL 설정 (새 파일에 상속)
setfacl -d -m g:developers:rwx /shared/project/
```

## 관련 개념

- [File Permissions](/knowledge/linux/file-permissions/)
- [Filesystem](/knowledge/linux/filesystem/)
- [PAM](/knowledge/linux/pam/)
