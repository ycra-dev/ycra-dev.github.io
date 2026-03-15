---
title: "원격 프로시저 호출 (Remote Procedure Call)"
description: "RPC(Remote Procedure Call)는 네트워크를 통해 원격 시스템의 프로시저를 로컬처럼 호출할 수 있게 하는 프레임워크로, Sun Microsystems가 NFS를 위해 개발한 SunRPC가 NFS의 기반이 된다"
tags: ['Rpc', 'Sunrpc', 'Nfs', 'Network Protocol', 'Distributed Systems']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/linux/rpc
sidebar:
  order: 16
---

## 핵심 개념

**SunRPC와 NFS:** 1980년대 Sun이 NFS 개발 시, 네트워크 관련 문제 해결을 범용화하여 RPC 프레임워크를 만들었다. NFS의 파일 읽기/쓰기, 마운트, 메타데이터 접근, 권한 확인 등 모든 연산이 RPC로 구현된다.

**portmap/rpcbind:** V2/V3에서 RPC 서비스의 포트를 동적으로 할당하고 관리하는 데몬. 클라이언트가 portmap에 서비스 포트를 질의하여 연결. V4에서는 고정 포트 2049를 사용하므로 portmap이 불필요하다.

**NFSv4의 COMPOUND RPC:** 여러 파일 연산을 하나의 RPC 요청으로 묶어 네트워크 왕복(round-trip)을 줄이고, WAN 환경의 높은 레이턴시를 완화한다.

**전송 프로토콜 변천:** V2는 UDP 전용, V3는 UDP/TCP 선택, V4는 TCP 전용. 빠른 CPU, 충분한 메모리, 고속 네트워크 환경에서 UDP 선호 이유가 대부분 소멸했다.

SunRPC는 원시적이고 더 나은 대안이 존재하지만, NFS는 여전히 SunRPC에 의존하며 RPC 계층을 벗어난 NFS 구현은 알려진 바 없다.

## 예시

```bash
# RPC 서비스 목록 확인
rpcinfo -p localhost

# 특정 호스트의 NFS RPC 서비스 확인
rpcinfo -p nfs-server

# portmap/rpcbind 서비스 상태
sudo systemctl status rpcbind

# NFS RPC 통계
nfsstat -c   # 클라이언트 RPC 타임아웃, badxid 확인
```

## 관련 개념

- [NFS (네트워크 파일 시스템)](/knowledge/linux/nfs/)
- [NFS 파일 잠금 (NFS File Locking)](/knowledge/linux/nfs-file-locking/)
- [Kerberos 인증 (Kerberos Authentication)](/knowledge/linux/kerberos-authentication/)
