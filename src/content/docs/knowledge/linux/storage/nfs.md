---
title: "NFS (네트워크 파일 시스템)"
description: "NFS(Network File System)는 네트워크를 통해 원격 파일시스템을 로컬 파일시스템처럼 투명하게 공유하는 프로토콜로, 1984년 Sun Microsystems에서 개발되어 UNIX/Linux 환경의 표준 파일 공유 솔루션이 되었다"
tags: ['Nfs', 'Network Filesystem', 'File Sharing', 'Rpc', 'Nfsv4']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/linux/nfs
sidebar:
  order: 17
---

## 핵심 개념

**프로토콜 버전:**
- **NFSv2 (1989):** 최초 공개 버전. 동기식 쓰기로 성능 저하. 현재 거의 사용되지 않음.
- **NFSv3 (1990s):** 비동기 쓰기 허용, 대용량 파일 개선, UDP/TCP 선택 가능. 무상태(stateless) 프로토콜.
- **NFSv4 (2003~):** 대폭 개편. 상태 유지(stateful), 방화벽/NAT 호환, 통합 잠금/마운트 프로토콜, 강력한 모듈식 보안(RPCSEC_GSS/Kerberos), ACL, TCP 전용(포트 2049).

**무상태 vs 상태 유지:** V2/V3는 무상태로, 서버 충돌 후 클라이언트가 단순히 대기하다 재요청 가능. V4는 상태를 유지하여 클라이언트가 서버 복구 시 사전 상태를 전송하여 일관성을 보장.

**RPC(Remote Procedure Call):** NFS는 Sun RPC 위에 구축되어 파일 읽기/쓰기, 마운트, 메타데이터 접근 등을 원격 프로시저 호출로 구현. V4의 COMPOUND RPC가 여러 연산을 하나의 요청으로 묶어 레이턴시를 줄인다.

**의사 파일시스템(Pseudo-filesystem):** V4에서 서버가 내보낸(exported) 모든 디렉토리를 단일 계층 구조로 통합하여 클라이언트에게 제공. 클라이언트는 서버의 의사 루트를 마운트하면 모든 내보낸 디렉토리에 접근 가능.

**서버 구성:** `/etc/exports`에 내보낼 디렉토리와 접근 가능 클라이언트/옵션을 정의. `exportfs -a`(Linux) 또는 `service nfsd restart`(FreeBSD)로 활성화.

## 예시

```bash
# Linux /etc/exports 설정
/home *.users.admin.com(rw,sync) 172.17.0.0/24(ro)

# exports 변경 활성화
sudo exportfs -a

# NFS 마운트 (V4)
sudo mount -t nfs4 -o rw,intr,bg monk:/ /mnt/monk

# /etc/fstab에 NFS 마운트 등록
# monk:/home  /home  nfs4  rw,hard,intr,bg  0  0

# 서버 내보내기 목록 확인 (V3)
showmount -e monk

# NFS 통계 확인
nfsstat -c   # 클라이언트 통계
nfsstat -s   # 서버 통계

# nfsd 버전 2, 3 비활성화 (Linux)
# /etc/nfs.conf에서 설정 후
sudo systemctl restart nfs-server
```

## 관련 개념

- [SMB 프로토콜 (SMB Protocol)](/knowledge/linux/smb-protocol/)
- [Samba (삼바)](/knowledge/linux/samba/)
- [Kerberos 인증 (Kerberos Authentication)](/knowledge/linux/kerberos-authentication/)
- [파일 시스템 (Filesystem)](/knowledge/linux/filesystem/)
- [fstab (파일 시스템 테이블)](/knowledge/linux/fstab/)
- [자동 마운트 (Automount)](/knowledge/linux/automount/)
