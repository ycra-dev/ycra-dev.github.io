---
title: "Samba"
description: "Samba는 UNIX/Linux 호스트에서 SMB 프로토콜의 서버 측을 구현하는 GNU GPL 소프트웨어 패키지로, Windows 클라이언트에 추가 소프트웨어 없이 파일 및 프린터 공유를 제공한다"
tags: ['Samba', 'Smbd', 'Nmbd', 'Smb Conf', 'File Sharing', 'Cross Platform']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/linux/samba
sidebar:
  order: 24
---

## 핵심 개념

**구성 데몬:**
- **smbd:** 파일/프린터 서비스, 인증/인가를 담당. 인증된 요청을 처리하면 해당 사용자 권한으로 포크되어 UNIX 파일 접근 권한을 그대로 적용.
- **nmbd:** 이름 해석(name resolution)과 서비스 공고(service announcement, 브라우징)를 담당.

**설정 파일:** `/etc/samba/smb.conf` (FreeBSD: `/usr/local/etc/smb4.conf`). Samba가 몇 초마다 자동으로 재로드하므로 재시작 불필요. `testparm -v`로 모든 설정값(기본값 포함) 확인.

**인증 방식:**
1. **로컬 인증 (security=user):** smbpasswd로 별도의 SMB 비밀번호 해시 관리. 간단하지만 이중 비밀번호 관리 필요.
2. **Active Directory 인증 (security=ads):** sssd와 Kerberos를 통해 AD 도메인 인증. 전용 keytab 파일 사용. 중앙집중식 인증으로 선호됨.

**공유(Share) 설정:** smb.conf에 각 공유별 스탠자로 정의. `[homes]` 매직 스탠자로 사용자 홈 디렉토리를 자동 공유. 프로젝트 디렉토리는 `valid users = @groupname`으로 그룹 기반 접근 제어. `force group`과 setgid 비트를 조합하여 협업 파일의 그룹 소유권을 보장.

**커널 독립:** NFS와 달리 Samba는 커널 수정 없이 완전히 사용자 공간에서 실행된다.

## 예시

```bash
# Samba 설치
sudo apt install samba            # Debian/Ubuntu
sudo pkg install samba44          # FreeBSD

# smb.conf 기본 설정 (로컬 인증)
# [global]
#   workgroup = MYCOMPANY
#   security = user

# SMB 사용자 추가
sudo smbpasswd -a tobi

# 공유 설정 (smb.conf)
# [bookshare]
#   path = /storage/bookshare
#   valid users = @eng
#   force group = eng
#   writable = yes
#   create mask = 0664
#   directory mask = 2775
#   force directory mode = 2000

# 홈 디렉토리 자동 공유
# [homes]
#   browseable = no
#   writable = yes
#   valid users = %S

# 설정 검증
testparm

# Samba 서비스 관리
sudo systemctl enable smbd nmbd
sudo systemctl restart smbd nmbd

# 접속 상태 확인
smbstatus
```

## 관련 개념

- [SMB Protocol](/knowledge/linux/smb-protocol/)
- [NFS](/knowledge/linux/nfs/)
- [Active Directory](/knowledge/linux/active-directory/)
- [File Permissions](/knowledge/linux/file-permissions/)
- [PAM](/knowledge/linux/pam/)
