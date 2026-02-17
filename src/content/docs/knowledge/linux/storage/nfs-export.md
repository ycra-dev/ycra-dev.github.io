---
title: "NFS Export"
description: "NFS 익스포트(export)는 NFS 서버가 네트워크를 통해 클라이언트에게 제공하는 디렉토리로, `/etc/exports` 파일에서 접근 권한과 옵션을 정의한다"
tags: ['Nfs Export', 'Exports File', 'Exportfs', 'File Sharing', 'Server Config']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/linux/nfs-export
sidebar:
  order: 18
---

## 핵심 개념

**Linux exports 문법:** 왼쪽에 디렉토리 경로, 오른쪽에 접근 가능한 호스트와 괄호 안의 옵션을 나열한다. 호스트 지정 없이 나열하면 모든 호스트에 공개되어 보안 위험이 있다. 호스트와 옵션 사이에 공백을 넣으면 의도치 않게 모든 호스트에 공개되는 심각한 실수가 발생한다.

**주요 옵션:**
- `rw/ro` - 읽기-쓰기/읽기 전용
- `sync/async` - 동기/비동기 쓰기 (async는 데이터 손실 위험)
- `root_squash` - 원격 root를 nobody로 매핑 (기본값)
- `no_root_squash` - root 권한 유지
- `all_squash` - 모든 사용자를 nobody로 매핑
- `subtree_check/no_subtree_check` - 서브트리 검증

**V3 vs V4 차이:** V3에서는 각 디렉토리를 별도로 익스포트/마운트. V4에서는 서버가 단일 의사 파일시스템을 제공하여 클라이언트가 의사 루트 하나를 마운트하면 모든 익스포트에 접근.

**FreeBSD 차이점:** 형식이 Linux와 다르며, 같은 파일시스템의 여러 익스포트는 같은 줄에 나열해야 한다. V4 루트는 `V4:` 접두사로 지정.

## 예시

```bash
# Linux /etc/exports - 올바른 설정
/home *.users.admin.com(rw,sync) 172.17.0.0/24(ro)

# 보안 위험! 공백 실수
/home *.users.admin.com (rw,sync)
# -> 모든 호스트에 rw 허용!

# FreeBSD /etc/exports
/var/www -ro www*.admin.com
/var/www -sec=krb5p -network 2001:db8::/48

# 익스포트 활성화
sudo exportfs -a             # Linux
sudo service nfsd restart    # FreeBSD

# 현재 익스포트 확인
sudo exportfs -v
```

## 관련 개념

- [NFS](/knowledge/linux/nfs/)
- [Kerberos Authentication](/knowledge/linux/kerberos-authentication/)
- [File Permissions](/knowledge/linux/file-permissions/)
- [fstab](/knowledge/linux/fstab/)
