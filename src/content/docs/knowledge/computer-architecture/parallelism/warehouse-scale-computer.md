---
title: "창고 규모 컴퓨터 (WSC)"
description: "웨어하우스 스케일 컴퓨터(WSC)는 약 50,000대의 서버를 수용하는 건물 규모의 컴퓨터로, 하나의 거대한 컴퓨터처럼 동작하며 약 1"
tags: ['Cloud Computing', 'Cluster', 'Mapreduce', 'Saas', 'Request Level Parallelism']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/warehouse-scale-computer
sidebar:
  order: 33
---

## 핵심 개념

WSC는 단순한 대형 클러스터를 넘어, 전력 배분, 냉각, 모니터링, 운영에서 혁신이 필요한 새로운 등급의 컴퓨터이다.

WSC의 세 가지 핵심 특성:
1. **풍부한 병렬성:** 수십억 개의 독립적 데이터셋(웹 페이지)이나 수백만 명의 독립적 사용자로부터 Request-Level Parallelism이 자연스럽게 발생한다.
2. **운영 비용 중요성:** 건물과 인프라의 수명이 10~20년이므로, 에너지와 냉각이 10년간 총 비용의 30% 이상을 차지한다.
3. **규모의 경제:** 50,000대 서버를 한 번에 구매하여 볼륨 할인을 받을 수 있으며, 이는 클라우드 컴퓨팅의 기반이 된다.

MTTF 25년인 서버로도 매일 5대의 서버 장애가 예상되고, 디스크 장애는 매시간 발생할 수 있으므로, 장애 허용이 서버 아키텍트보다 WSC 아키텍트에게 더 중요하다.

MapReduce와 Hadoop이 WSC에서의 배치 처리를 위한 가장 인기 있는 프레임워크이다.

## 예시

```
# MapReduce 워드 카운트 예시
Map(String key, String value):
  for each word w in value:
    EmitIntermediate(w, "1");

Reduce(String key, Iterator values):
  int result = 0;
  for each v in values:
    result += ParseInt(v);
  Emit(AsString(result));

# WSC 장애 빈도 계산
50,000 서버 x MTTF 25년 = 하루 5.5대 장애
50,000 x 4 디스크 x AFR 4% = 매 시간 1대 디스크 장애

# AWS 성장 규모 (2012년)
매일 추가되는 서버 용량 = 2003년 Amazon 전체 인프라
2020년: Amazon 수익의 10%가 AWS, 이익의 과반이 AWS
```

## 관련 개념

- [클러스터 (Cluster)](/knowledge/computer-architecture/cluster/)
- [맵리듀스 (MapReduce)](/knowledge/computer-architecture/mapreduce/)
- [메시지 전달 (Message Passing)](/knowledge/computer-architecture/message-passing/)
- [도메인 특화 아키텍처 (DSA)](/knowledge/computer-architecture/domain-specific-architecture/)
- [가상 머신 (Virtual Machine)](/knowledge/computer-architecture/virtual-machine/)
