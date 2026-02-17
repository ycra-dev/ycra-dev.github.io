---
title: "NFS File Locking"
description: "NFS 파일 잠금(file locking)은 네트워크를 통해 공유되는 파일에 대한 동시 접근을 관리하는 메커니즘으로, NFSv2/V3에서는 별도의 lockd/statd 데몬으로, NFSv4에서는 핵심 프로토콜에 통합되어 구현된다"
tags: ['File Locking', 'Lockd', 'Statd', 'Nfsv4', 'Concurrency']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/linux/nfs-file-locking
sidebar:
  order: 21
---

## 핵심 개념

**V2/V3의 문제:** 무상태 프로토콜에서 잠금에 필요한 상태 정보를 관리하기 위해 별도의 lockd(잠금 관리)와 statd(상태 모니터링) 데몬이 필요했다. 이 구현은 다양한 미묘한 이유로 인해 일반적으로 신뢰할 수 없다.

**V4의 해결:** 잠금을 핵심 프로토콜에 통합하여 상태 유지(stateful) 설계를 채택. 서버 장애 시 유예 기간(grace period) 동안 이전 클라이언트의 상태 보고를 기다린 뒤 새 연산을 허용. 복잡성이 증가하지만 초기 NFS 버전의 관련 문제를 해소한다.

**공존 문제:** V2/V3 클라이언트를 지원하려면 여전히 lockd/statd가 필요하다. 대부분의 배포판은 이전 버전 호환을 위해 기본적으로 이 데몬들을 실행한다.

UNIX 로컬 파일시스템에서도 파일 잠금(flock, lockf, fcntl)은 완벽하지 않으며, NFS 환경에서는 더욱 불안정하다. NFSv4 사용이 강력히 권장된다.

## 예시

```bash
# 잠금 관련 데몬 확인
ps aux | grep -E "(lockd|statd|nfsd)"

# NFSv4에서 잠금은 nfsd에 통합되어 별도 설정 불필요

# 파일 잠금 테스트 (flock)
flock /tmp/lockfile -c 'echo "locked"; sleep 10'

# NFS 잠금 상태 확인 (Linux)
cat /proc/locks
```

## 관련 개념

- [NFS](/knowledge/linux/nfs/)
- [NFS Export](/knowledge/linux/nfs-export/)
- [SMB Protocol](/knowledge/linux/smb-protocol/)
