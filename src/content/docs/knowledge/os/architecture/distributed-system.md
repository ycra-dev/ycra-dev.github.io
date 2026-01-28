---
title: "분산 시스템 (Distributed System)"
description: "메모리를 공유하지 않는 프로세서들이 네트워크를 통해 통신하는 시스템"
tags: ["OS", "DistributedSystem", "Architecture"]
created: 2026-01-23
updated: 2026-01-27
draft: true
slug: knowledge/os/distributed-system
sidebar:
  order: 3
---

## 핵심 개념

분산 시스템(Distributed System)은 메모리나 클럭을 공유하지 않는 프로세서들의 집합으로, 각 노드가 자신의 로컬 메모리를 가지고 통신 네트워크를 통해 서로 통신하는 시스템입니다. 단일 컴퓨터의 자원, 처리 능력, 신뢰성 한계를 극복하기 위해 사용됩니다.

## 동작 원리

- **자원 공유(Resource Sharing)**: 한 사이트의 사용자가 다른 사이트의 자원(파일, 데이터베이스, 하드웨어)에 접근 가능
- **계산 속도 향상(Computation Speedup)**: 계산을 분할하여 여러 사이트에서 동시 실행. 부하 분산(Load Balancing)으로 과부하된 요청을 다른 노드로 이동
- **신뢰성(Reliability)**: 한 사이트가 실패해도 나머지 사이트가 계속 동작. 충분한 중복성이 있으면 일부 노드 실패에도 시스템 운영 지속

### 시스템 구성

```
site A              site C
 client              server
    \                  /
     \                /
      ===== network =====
           /
          /
      site B
      resources
```

- **클라이언트-서버 구성**: 서버가 자원을 보유하고 클라이언트가 요청
- **피어-투-피어 구성**: 모든 노드가 동등한 책임을 가지고 클라이언트이자 서버로 동작

## 예시

여러 지점에 창고가 있는 물류 회사와 유사합니다. 한 창고가 문 닫아도 다른 창고에서 물건 배송 가능(신뢰성), 여러 창고에서 동시에 출하하면 더 빠르고(속도 향상), 특정 창고의 특수 장비를 다른 지점에서도 이용 가능(자원 공유)합니다.

인터넷이 가장 기본적인 분산 시스템의 예입니다.

## 관련 개념

- [[멀티프로세서 시스템 (Multiprocessor System)]]
- [[운영체제 (Operating System)]]
