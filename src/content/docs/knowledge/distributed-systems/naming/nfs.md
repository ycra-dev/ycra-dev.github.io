---
title: "NFS"
description: "NFS(Network File System)는 클라이언트가 원격 파일 시스템을 자신의 로컬 파일 시스템에 마운트하여 투명하게 접근할 수 있도록 하는 분산 파일 시스템이다"
tags: ['Nfs', 'Network File System', 'Distributed File System', 'Mounting', 'File Handle']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/distributed-systems/nfs
sidebar:
  order: 6
---

## 핵심 개념

**NFS 네이밍 모델**: 클라이언트에게 원격 파일 시스템에 대한 완전한 투명한 접근을 제공. 서버의 내보낸 디렉토리를 클라이언트의 로컬 이름 공간에 마운트.

**한계**: 사용자 간 이름 공간을 공유하지 않음. Client A의 /remote/vu/mbox와 Client B의 /work/me/mbox가 같은 파일을 가리킬 수 있지만 이름이 다름. 해결책: /usr/bin 등 표준 마운트 포인트 사용.

**파일 핸들(File Handle)**: 파일 시스템 내의 파일에 대한 불투명(opaque) 참조. 파일 이름과 독립적이며, 파일이 존재하는 한 동일 핸들 유지(영속성). NFSv2: 32바이트, NFSv3: 가변(최대 64바이트), NFSv4: 최대 128바이트. 클라이언트가 로컬에 캐시하여 반복적 이름 검색 회피.

**이름 해석의 발전**:
- NFSv3: 엄격한 반복적 해석, 한 번에 하나의 파일명만 검색. 마운트 포인트 횡단 불가 → 별도의 마운트 프로토콜 필요
- NFSv4: 재귀적 검색 지원, 마운트 포인트 횡단 가능, putrootfh 연산으로 별도 마운트 프로토콜 불필요

**자동 마운팅(Automounting)**: 필요 시 자동으로 원격 디렉토리 마운트. automounter가 /home 디렉토리를 감시하고, 접근 요청 시 해당 사용자의 홈 디렉토리를 실시간으로 마운트. 심볼릭 링크를 사용하여 마운트 후에는 automounter 개입 없이 직접 접근.

## 예시

```bash
# NFS 마운팅 예시
# 서버 coltrane(192.168.2.3)가 /audio 디렉토리 내보내기
quandar$ mount -t nfs 192.168.2.3:/audio /home/maarten/Music

# 이후 로컬 파일처럼 접근 가능
quandar$ ls /home/maarten/Music
# → coltrane의 /audio 내용 표시

# NFS URL 형태
# nfs://flits.cs.vu.nl/home/steen
# 프로토콜: nfs, 서버: flits.cs.vu.nl, 마운팅 포인트: /home/steen

# NFSv4 putrootfh:
# 클라이언트가 서버에 루트 파일 핸들 기준으로 이름 해석 요청
# → 별도 마운트 프로토콜 불필요
```

## 관련 개념

- [Name Resolution](/knowledge/distributed-systems/name-resolution/)
- [DNS](/knowledge/distributed-systems/dns/)
- [Distribution Transparency](/knowledge/distributed-systems/distribution-transparency/)
