---
title: "Mail Queue"
description: "메일 큐(Mail Queue)는 MTA가 메시지를 전달하기 전에 임시로 저장하는 영역으로, 배달 실패 시 재시도를 위한 메시지 보관과 큐 관리를 담당한다"
tags: ['Mail Queue', 'Email', 'Mta', 'Sendmail', 'Postfix', 'Delivery']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/network/mail-queue
sidebar:
  order: 7
---

## 핵심 개념

메일 큐는 MTA 운영의 핵심이다. 모든 메시지는 전송 전에 최소한 잠시 큐에 머무른다. 목적지 서버에 연결할 수 없거나 다른 이유로 배달이 실패하면 메시지는 큐에 남아 나중에 재시도된다.

**sendmail**: /var/spool/mqueue(MTA, 포트 25)와 /var/spool/clientmqueue(MSA, 포트 587) 두 큐 사용. 큐 메시지는 여러 파일로 분리 저장(qf: 헤더/봉투, df: 메시지 본문, xf: 트랜스크립트 등). mailq 명령(= sendmail -bp)으로 큐 모니터링.

**Postfix**: 5개 큐 관리(incoming, active, deferred, hold, corrupt). FIFO 전략이 기본이지만, 수신자가 적은 메시지를 벌크 메일보다 우선하는 선점 알고리즘도 지원. 과부하 방지를 위한 slow-start 알고리즘과 도달 불가 목적지의 상태 캐시를 사용한다.

큐 문제: 파일 시스템 가득 참(/var/spool/mqueue와 /var/log을 같은 파티션에 두지 말 것), 큐 정체, 고아 메시지 발생 가능. Postfix의 qshape 스크립트로 큐 요약 통계를 확인하여 문제를 진단할 수 있다.

## 예시

```bash
# 메일 큐 확인 (모든 MTA 공통)
mailq

# sendmail: 즉시 큐 처리
sendmail -q -v     # 상세 출력과 함께 큐 처리

# sendmail: 클라이언트 큐 확인
mailq -Ac

# Postfix: 큐 관리
postqueue -p        # 큐 내용 표시
postsuper -d ALL    # 모든 큐 메시지 삭제
postqueue -f        # 큐 즉시 플러시

# Postfix: 큐 통계 요약
qshape deferred     # 지연 큐를 수신 도메인별 요약
qshape -s deferred  # 발신 도메인별 요약

# Postfix: 특정 메시지 확인
postcat -q QUEUE_ID

# sendmail: -q 플래그로 큐 처리 간격 설정
sendmail -bd -q30m  # 30분마다 큐 처리
```

## 관련 개념

- [Mail Transfer Agent](/knowledge/network/mail-transfer-agent/)
- [Postfix](/knowledge/network/postfix/)
- [SMTP](/knowledge/network/smtp/)
- [Email Architecture](/knowledge/network/email-architecture/)
