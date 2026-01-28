---
title: "클라이언트-서버 DFS (NFS, OpenAFS)"
description: "서버가 파일을 저장하고 클라이언트가 네트워크를 통해 투명하게 접근하는 DFS 아키텍처"
tags: ["OS", "DistributedSystem", "DFS", "NFS", "AFS"]
created: 2026-01-23
updated: 2026-01-27
draft: false
slug: knowledge/os/client-server-dfs
sidebar:
  order: 6
---

## 핵심 개념

클라이언트-서버 DFS 모델은 서버가 파일과 메타데이터를 저장하고, 클라이언트가 네트워크를 통해 투명하게 파일에 접근하는 분산 파일 시스템 아키텍처입니다. 대표적으로 NFS와 OpenAFS가 있습니다.

## 동작 원리

### NFS (Network File System)

Sun Microsystems에서 개발한 오픈 프로토콜입니다.

- **설계 목표**: 서버 장애 시 빠른 복구
- **무상태(Stateless) 서버**: 어떤 클라이언트가 어떤 파일을 접근 중인지 추적하지 않음
  - 서버 장애 후 재시작해도 상태 복원 불필요
  - 모든 파일 연산이 **멱등성(Idempotent)** - 여러 번 실행해도 같은 결과
- **chatty 프로토콜**: 파일 사용 중 블록 읽기/쓰기 요청을 서버로 자주 전송

### OpenAFS (Andrew File System)

Carnegie Mellon University에서 개발했습니다.

- **설계 목표**: 확장성 (서버가 최대한 많은 클라이언트 지원)
- **파일 단위 캐싱**: 요청 시 전체 파일을 클라이언트 로컬 스토리지에 다운로드
- **콜백(Callback)**: 서버가 캐시된 파일 변경 시 클라이언트에 알림
- **전역 네임스페이스**: 모든 클라이언트가 동일한 파일 경로 사용 (/afs/...)

### NFS vs OpenAFS

| 특성 | NFS | OpenAFS |
|------|-----|---------|
| 설계 목표 | 빠른 장애 복구 | 확장성 |
| 서버 상태 | 무상태 | 상태 유지 (콜백) |
| 캐싱 단위 | 블록 | 전체 파일 (64KB 청크) |
| 서버 트래픽 | 많음 (chatty) | 적음 |
| 네임스페이스 | 머신별 마운트 | 전역 |
| 위치 독립성 | 제한적 | 지원 |

## 예시

- NFS = 도서관에서 책 한 페이지씩 복사해 옴 (자주 왔다 갔다)
- OpenAFS = 책 전체를 집으로 대출해 와서 다 읽고 반납 (왕복 최소화)

```
NFS 시나리오:
1. open("/mnt/nfs/doc.txt")
2. read() → 서버에 블록 요청
3. 서버: 블록 반환
4. write() → 서버에 쓰기 요청
5. ... (반복)

OpenAFS 시나리오:
1. open("/afs/org/doc.txt")
2. 서버: 전체 파일을 클라이언트 로컬 캐시로 전송
3. 로컬에서 읽기/쓰기 (서버 접촉 없음)
4. close() → 변경사항 서버에 업로드
```

## 관련 개념

- [[분산 파일 시스템 (DFS)]]
- [[DFS 캐싱과 일관성]]
- [[분산 시스템의 투명성 (Transparency)]]
