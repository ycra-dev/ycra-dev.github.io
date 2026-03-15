---
title: "메시지 전달 (Message Passing)"
description: "메시지 전달(message passing)은 여러 프로세서 간에 명시적으로 정보를 송수신하여 통신하는 방식이다"
tags: ['Cluster', 'Multiprocessor', 'Distributed Computing', 'Send Receive', 'Private Address Space']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/message-passing
sidebar:
  order: 23
---

## 핵심 개념

메시지 전달 방식은 공유 메모리와 대비되는 멀티프로세서 통신 패러다임이다. 한 프로세서가 메시지를 보내면, 수신 프로세서가 메시지 도착을 인지하므로 동기화가 자연스럽게 내장된다.

장점:
- 하드웨어 구현이 공유 메모리보다 간단 (캐시 일관성 불필요)
- 통신이 명시적이라 성능 예측이 용이
- 각 노드가 독립적 OS를 실행하여 장애 격리와 확장이 용이

단점:
- 순차 프로그램을 이식하기 어려움 (모든 통신을 미리 식별해야)
- 공유 메모리보다 높은 통신 지연

클러스터가 메시지 전달 병렬 컴퓨터의 가장 대표적 형태이다. 태스크 수준 병렬성과 통신이 적은 애플리케이션(웹 검색, 메일 서버)은 공유 주소든 메시지 전달이든 잘 동작한다.

## 예시

```
# MPI 스타일 메시지 전달 예시
// 프로세서 0 (송신)
float data[100];
// ... data 계산 ...
MPI_Send(data, 100, MPI_FLOAT, 1, tag, MPI_COMM_WORLD);

// 프로세서 1 (수신)
float buffer[100];
MPI_Recv(buffer, 100, MPI_FLOAT, 0, tag, MPI_COMM_WORLD, &status);
// buffer에 프로세서 0의 data가 도착

# 공유 메모리 vs 메시지 전달
공유 메모리: 암묵적 통신 (load/store로 공유 변수 접근)
  + 이식 쉬움, - 성능 예측 어려움
메시지 전달: 명시적 통신 (send/receive)
  + 성능 예측 쉬움, - 이식 어려움
```

## 관련 개념

- [클러스터 (Cluster)](/knowledge/computer-architecture/cluster/)
- [공유 메모리 멀티프로세서 (SMP)](/knowledge/computer-architecture/shared-memory-multiprocessor/)
- [창고 규모 컴퓨터 (WSC)](/knowledge/computer-architecture/warehouse-scale-computer/)
- [맵리듀스 (MapReduce)](/knowledge/computer-architecture/mapreduce/)
