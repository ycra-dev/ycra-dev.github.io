---
title: "SMB 프로토콜 (SMB Protocol)"
description: "SMB(Server Message Block)는 네트워크를 통해 파일, 프린터, 기타 리소스를 공유하는 프로토콜로, Windows와 macOS의 기본 파일 공유 시스템이며 UNIX/Linux에서는 Samba를 통해 구현된다"
tags: ['Smb', 'Cifs', 'File Sharing', 'Windows', 'Network Protocol']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/linux/smb-protocol
sidebar:
  order: 23
---

## 핵심 개념

**역사:** 1980년대 초 Barry Feigenbaum이 BAF 프로토콜로 개발. Microsoft가 채택하여 PC 세계의 표준이 됨. 1996년 CIFS(Common Internet File System)로 마케팅했으나 버그가 많아 SMB 2.0(2006), SMB 3.0(2012)으로 대체. CIFS는 이미 폐기되었으며 SMB만 존속.

**NFS와의 비교:**
- SMB는 거의 모든 OS에서 지원(범용성 우위)
- NFS는 UNIX/Linux 환경에서 더 자연스럽고 통합도 높음
- SMB는 사용자별 마운트, NFS는 시스템 수준 마운트
- SMB의 최신 버전은 강력한 암호화와 무결성 검증 내장
- NFS(AUTH_SYS)는 신뢰할 수 있는 LAN에서 암호화 없이 사용하는 경우가 많음

**SMB 마운트 특성:** Windows는 네트워크 마운트를 특정 사용자가 수립한 것으로 간주. UNIX에서 마운트하면 마운트한 사용자가 모든 파일의 소유자로 표시된다. `uid`, `gid`, `fmask`, `dmask` 옵션으로 소유권/퍼미션을 조정할 수 있다.

**보안:** Samba는 인증에만 암호화를 사용하고 데이터 전송은 평문. 조직 외부로의 접근은 방화벽에서 UDP 137-139, TCP 137, 139, 445를 차단해야 한다.

## 예시

```bash
# Linux에서 SMB 공유 마운트
sudo mount -t cifs -o username=joe //server/share /mnt/share

# FreeBSD에서 SMB 공유 마운트
sudo mount_smbfs -I server //joe@server/share /mnt/share

# SMB 공유 목록 조회
smbclient -L server -U dan

# SMB 공유에 대화형 접속
smbclient //server/share -U dan

# /etc/fstab에 SMB 마운트 등록
# //server/share  /mnt/share  cifs  username=joe,password=xxx  0  0
```

## 관련 개념

- [Samba (삼바)](/knowledge/linux/samba/)
- [NFS (네트워크 파일 시스템)](/knowledge/linux/nfs/)
- [파일 시스템 (Filesystem)](/knowledge/linux/filesystem/)
- [Active Directory (액티브 디렉토리)](/knowledge/linux/active-directory/)
