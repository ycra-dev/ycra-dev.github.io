---
title: "NFS Identity Mapping"
description: "NFSv4 신원 매핑은 UNIX UID/GID와 NFSv4의 문자열 식별자(user@nfs-domain 형식) 사이를 변환하는 메커니즘으로, 클라이언트와 서버의 idmapd 데몬이 이를 처리한다"
tags: ['Idmapd', 'Nfsv4', 'Uid Mapping', 'Identity', 'Nobody']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/linux/nfs-identity-mapping
sidebar:
  order: 19
---

## 핵심 개념

**작동 과정:** 파일 속성 반환 시(예: `ls -l`의 stat 호출), 서버의 idmapd가 UID/GID를 "ben@admin.com" 같은 문자열로 변환. 클라이언트의 idmapd가 이를 역으로 로컬 UID/GID로 변환. 일치하지 않으면 nobody 계정이 할당된다.

**접근 제어와의 분리:** 신원 매핑은 파일 속성(소유자 표시, chown 등)에만 사용되며, 실제 접근 제어(파일 생성, 읽기 등)는 RPC의 인증 시스템을 통해 UID가 직접 전달된다. 이로 인해 `ls -l`에서 보이는 소유자와 실제 접근 가능 여부가 불일치할 수 있다.

**Root Squashing:** 기본적으로 원격 root(UID 0)의 요청을 nobody(보통 UID 65534)로 매핑하여 원격 root의 권한을 제한. 그러나 root는 su로 어떤 UID든 가장할 수 있으므로 보호 효과는 제한적이다.

**NFS 도메인 설정:** 모든 참여 시스템이 동일한 NFS 도메인을 사용해야 한다. 일반적으로 DNS 도메인을 사용. 구현이 시스템마다 다르므로(Linux: rpc.idmapd, FreeBSD: nfsuserd) 설정 파일도 다르다.

## 예시

```bash
# Linux idmapd 설정 (/etc/idmapd.conf)
[General]
Domain = admin.com

# FreeBSD nfsuserd 설정
# /etc/rc.conf에 nfsuserd_enable="YES"

# idmapd 재시작
sudo systemctl restart nfs-idmapd     # Linux
sudo service nfsuserd restart          # FreeBSD

# 신원 매핑 불일치 예시:
# 서버에서 john의 UID = 1000
# 클라이언트에서 ben의 UID = 1000, john의 UID = 1010
# -> ls -l은 john 소유로 표시하지만, ben이 UID 1000으로 접근 가능
```

## 관련 개념

- [NFS](/knowledge/linux/nfs/)
- [UID GID](/knowledge/linux/uid-gid/)
- [Kerberos Authentication](/knowledge/linux/kerberos-authentication/)
- [LDAP](/knowledge/linux/ldap/)
- [Passwd Shadow](/knowledge/linux/passwd-shadow/)
