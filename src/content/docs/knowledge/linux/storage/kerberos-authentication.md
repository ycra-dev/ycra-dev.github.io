---
title: "Kerberos Authentication"
description: "Kerberos는 네트워크 인증을 위한 신뢰할 수 있는 제3자 프로토콜로, NFS의 RPCSEC_GSS 계층과 결합하여 중앙집중식 인증, 강력한 암호화, 데이터 무결성 보장을 제공한다"
tags: ['Kerberos', 'Authentication', 'Rpcsec Gss', 'Nfs Security', 'Single Sign On']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/linux/kerberos-authentication
sidebar:
  order: 20
---

## 핵심 개념

**NFS 보안의 필요성:** 전통적 AUTH_SYS 인증은 클라이언트가 전송하는 UID/GID를 서버가 그대로 신뢰하므로, 악의적 호스트가 임의의 UID로 접근할 수 있어 근본적으로 취약하다. root 사용자는 su로 어떤 UID든 획득 가능하며, passwd 파일 일관성 유지만으로는 보안이 불충분하다.

**Kerberos + RPCSEC_GSS:** NFSv4의 필수 보안 메커니즘. 클라이언트와 서버 모두 Kerberos 영역(realm)에 참여해야 한다. Kerberos가 중앙에서 신원을 검증하여 자가 식별의 문제를 해결한다. 3가지 보안 수준을 제공:
- **krb5:** 인증만
- **krb5i:** 인증 + 무결성 검증
- **krb5p:** 인증 + 무결성 + 암호화(프라이버시)

**AUTH_SYS 보안 모드의 한계:** NFS V2/V3에서 주로 사용. passwd 파일 일관성이 필수이지만 이것도 보안 무화과잎에 불과. 신뢰할 수 있는 LAN에서만 사용해야 하며, NFSv3의 WAN 사용은 권장하지 않는다.

**방화벽 설정:** NFSv4는 TCP 포트 2049만 개방하면 된다. V2/V3는 포트 2049와 portmap 포트 111에 대한 차단이 필요.

## 예시

```bash
# NFS 마운트 시 Kerberos 보안 사용 (Linux)
sudo mount -t nfs4 -o sec=krb5p server:/export /mnt/secure

# FreeBSD exports에서 Kerberos 설정
# /exports/www -sec=krb5:krb5i:krb5p -network 10.0.0.0/24

# /etc/exports에서 보안 플레이버 지정 (Linux)
/data *(rw,sec=krb5p)

# NFSv4 방화벽 설정
sudo iptables -A INPUT -p tcp --dport 2049 -s 10.0.0.0/24 -j ACCEPT
```

## 관련 개념

- [NFS](/knowledge/linux/nfs/)
- [NFS Export](/knowledge/linux/nfs-export/)
- [Identity Management](/knowledge/linux/identity-management/)
- [PAM](/knowledge/linux/pam/)
- [LDAP](/knowledge/linux/ldap/)
