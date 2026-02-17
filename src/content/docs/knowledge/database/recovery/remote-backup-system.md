---
title: "Remote Backup System"
description: "원격 백업 시스템(Remote Backup System)은 주 사이트(primary site)의 데이터베이스를 지리적으로 떨어진 원격 사이트(remote backup site)에 복제하여, 주 사이트의 재해(화재, 홍수, 지진 등) 발생 시에도 데이터를 보존하고 ..."
tags: ['Remote Backup', 'High Availability', 'Disaster Recovery', 'Replication']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/database/remote-backup-system
sidebar:
  order: 7
---

## 핵심 개념

**기본 아키텍처:**
주 사이트에서 트랜잭션이 실행되면, 해당 로그 레코드가 네트워크를 통해 원격 백업 사이트로 전송된다. 원격 사이트는 수신된 로그를 적용하여 주 사이트의 데이터베이스 복제본을 유지한다.

**장애 감지와 전환(Failover):**
주 사이트에 장애가 발생하면, 원격 사이트가 이를 감지하고 주 사이트 역할을 인계받는다. 원격 사이트는 수신된 로그를 사용하여 데이터베이스를 최신 상태로 복구한 후 새로운 트랜잭션을 처리하기 시작한다.

**동기식 vs 비동기식 복제:**

*비동기식 복제:*
- 주 사이트는 트랜잭션 커밋 후 로그를 원격 사이트에 전송
- 성능 영향이 적음 (커밋 지연 없음)
- 주 사이트 장애 시 아직 전송되지 않은 최근 트랜잭션이 손실될 수 있음
- "hot spare" 방식으로 운영 가능

*동기식 복제:*
- 트랜잭션 커밋 전에 로그가 원격 사이트에 기록됨을 확인
- 데이터 손실 없음 보장
- 네트워크 지연으로 인한 성능 저하 (커밋 시 원격 응답 대기)

**One-Safe와 Two-Very-Safe:**
- **One-Safe:** 로그가 주 사이트에만 기록되면 커밋 (비동기)
- **Two-Very-Safe:** 로그가 주 사이트와 원격 사이트 모두에 기록되면 커밋 (동기)
- 실용적 타협: 원격 사이트 응답이 일정 시간 내에 오면 동기, 아니면 비동기로 전환

**커밋 시점과 데이터 손실:**
원격 백업 시스템에서 "주 사이트에서 커밋된 트랜잭션"의 의미가 중요하다. 비동기식에서는 주 사이트에서 커밋되었지만 원격 사이트에 아직 전송되지 않은 트랜잭션이 있을 수 있다. 이 경우 주 사이트 장애 시 해당 트랜잭션의 효과가 손실된다. 금융 등 데이터 손실이 허용되지 않는 분야에서는 동기식 복제를 사용한다.

## 예시

원격 백업 시스템의 동작:

```
주 사이트 (서울):                    원격 사이트 (부산):
  T1: start
  T1: write(A, 100→200)
  T1: commit
  로그 전송 →                        ← 로그 수신
                                     로그 적용: A = 200
  T2: start
  T2: write(B, 300→400)
  *** 주 사이트 장애 (화재) ***
                                     T2 로그가 아직 미전송
```

비동기식 복구:
```
원격 사이트가 주 역할 인계:
  1. 수신된 로그 적용 (T1의 변경은 적용됨)
  2. T2의 로그는 수신되지 않았으므로 T2의 변경은 손실
  3. 원격 사이트가 새로운 트랜잭션 처리 시작
  결과: A=200 (유지), B=300 (T2 손실)
```

동기식 복구:
```
주 사이트:
  T1: write(A, 100→200)
  T1: commit 요청
  로그를 원격 사이트로 전송 →         ← 로그 수신 및 기록
  ← 확인 응답 수신                    확인 응답 전송 →
  T1: commit 완료

  → 주 사이트 장애 시에도 T1의 변경은 원격 사이트에 보존됨
```

## 관련 개념

- [Write-Ahead Logging](/knowledge/database/write-ahead-logging/)
- [Recovery Algorithm](/knowledge/database/recovery-algorithm/)
- [ACID Properties](/knowledge/database/acid-properties/)
- [Checkpoint](/knowledge/database/checkpoint/)
