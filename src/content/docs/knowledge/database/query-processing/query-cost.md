---
title: "Query Cost"
description: "쿼리 비용(Query Cost)이란 쿼리 평가 계획의 실행에 소요되는 자원 소비량을 측정하는 것으로, 주로 디스크 접근(블록 전송 수와 랜덤 I/O 접근 수), CPU 시간, 그리고 분산 시스템에서는 통신 비용을 포함한다"
tags: ['Query Cost', 'Disk Access', 'Block Transfer', 'Performance']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/database/query-cost
sidebar:
  order: 2
---

## 핵심 개념

쿼리 비용 추정에서 가장 중요한 두 가지 요소는 **블록 전송 수(number of block transfers)**와 **랜덤 I/O 접근 수(number of random I/O accesses)**이다.

디스크 시스템이 블록 하나를 전송하는 데 평균 t_T 초, 블록 접근(디스크 탐색 시간 + 회전 지연 시간)에 평균 t_S 초가 걸린다면, b개의 블록을 전송하고 S번의 랜덤 I/O 접근을 수행하는 연산의 비용은 `b * t_T + S * t_S` 초이다.

2018년 기준 고성능 자기 디스크의 일반적인 값은 t_S = 4밀리초, t_T = 0.1밀리초(4KB 블록 크기, 40MB/초 전송률 기준)이다. SSD의 경우 SATA 인터페이스에서 t_S는 약 90마이크로초, t_T는 약 10마이크로초이다. PCIe 3.0x4 인터페이스를 사용하는 SSD는 t_S가 20~60마이크로초, t_T가 약 2마이크로초이다.

비용 추정 시 고려해야 할 사항들이 있다. 메모리에 사용 가능한 블록 수 M은 중요한 파라미터이며, 이미 버퍼에 있는 블록은 디스크에서 읽을 필요가 없다. PostgreSQL은 기본적으로 유효 캐시 크기를 4GB로 가정하며, 랜덤 페이지 읽기 비용을 실제의 1/10로 설정하여 90%의 읽기가 캐시에 있는 상황을 모델링한다.

최종 결과를 디스크에 쓰는 비용은 일반적으로 별도로 계산하며, 비용 추정에는 포함하지 않는다. 옵티마이저는 응답 시간 대신 **전체 자원 소비량**을 최소화하려고 한다.

## 예시

예를 들어, 릴레이션 r이 100블록으로 구성되어 있고 선형 스캔을 수행한다고 가정하자.

```
비용 = t_S + b_r * t_T
     = 4ms + 100 * 0.1ms
     = 4ms + 10ms = 14ms  (자기 디스크 기준)
```

만약 B+-tree 클러스터링 인덱스를 사용하여 키 값으로 단일 레코드를 검색한다면:

```
비용 = (h_i + 1) * (t_T + t_S)
     = (2 + 1) * (0.1ms + 4ms)
     = 3 * 4.1ms = 12.3ms
```

여기서 h_i는 B+-tree의 높이이다. 내부 노드가 버퍼에 있다고 가정하면 h_i = 1로 설정하여 비용이 크게 줄어든다.

## 관련 개념

- [Query Processing](/knowledge/database/query-processing/)
- [Selection Operation](/knowledge/database/selection-operation/)
- [Cost Estimation](/knowledge/database/cost-estimation/)
- [External Sort-Merge](/knowledge/database/external-sort-merge/)
