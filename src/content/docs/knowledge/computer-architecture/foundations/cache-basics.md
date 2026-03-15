---
title: "캐시 (Cache)"
description: "CPU와 RAM 사이에 위치한 소량의 고속 메모리로 최근 사용된 데이터를 임시 저장하여 RAM 접근 대기 시간을 줄인다"
tags: ["Computer-Architecture", "Cache", "Memory", "Performance", "Hardware"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/computer-architecture/cache-basics
sidebar:
  order: 41
---

## 핵심 개념

캐시(cache)는 CPU와 RAM 사이에 위치한 소량의 고속 메모리로, 최근 사용된 데이터와 명령어를 임시 저장하여 RAM 접근 대기 시간을 줄이는 역할을 한다. L1, L2, L3의 계층 구조를 가지며, 시간적·공간적 지역성(locality)을 활용한다.

## 동작 원리

CPU의 속도는 매우 빠르지만 RAM은 상대적으로 느리다. 이 속도 차이로 인해 CPU가 RAM의 데이터를 기다리며 놀게 되는 문제가 발생한다. 캐시는 이 **속도 격차를 메우는 완충 장치**이다.

### 메모리 계층 구조

```
빠름/작음/비쌈  ←─────────────────→  느림/큼/저렴
  레지스터 → L1 캐시 → L2 캐시 → L3 캐시 → RAM → SSD → HDD
  (~1ns)    (~2ns)    (~5ns)   (~10ns)  (~100ns) (~0.1ms) (~10ms)
```

### 캐시 계층
- **L1 캐시**: CPU 코어에 가장 가까움. 가장 빠르고 가장 작다 (보통 32~64KB).
- **L2 캐시**: L1보다 크고 약간 느리다 (보통 256KB~1MB).
- **L3 캐시**: 여러 코어가 공유. 가장 크고 가장 느리다 (보통 4~64MB).

### 지역성(Locality) 원리
캐시가 효과적인 이유는 프로그램이 데이터에 접근하는 패턴에 규칙성이 있기 때문이다:
- **시간적 지역성(Temporal Locality)**: 최근에 접근한 데이터는 곧 다시 접근될 가능성이 높다. (예: 루프 변수)
- **공간적 지역성(Spatial Locality)**: 특정 주소에 접근하면 인접한 주소도 곧 접근될 가능성이 높다. (예: 배열 순회)

### 캐시 히트와 미스
- **캐시 히트(hit)**: 요청한 데이터가 캐시에 있음 → 빠르게 처리
- **캐시 미스(miss)**: 캐시에 없음 → RAM에서 가져와야 해서 느림

## 예시

캐시 효과의 체감 비유:

```
RAM   = 도서관 서고 (가서 찾아오는 데 10분)
캐시  = 책상 위 (손만 뻗으면 1초)

자주 참조하는 책을 책상 위에 올려놓으면(캐시에 저장),
매번 서고까지 걸어갈 필요가 없다(RAM 접근을 피함).
```

캐시 지역성이 성능에 미치는 영향:

```python
# 공간적 지역성이 좋은 코드 (행 우선 순회) → 빠름
for i in range(N):
    for j in range(N):
        sum += matrix[i][j]    # 인접한 메모리를 순서대로 접근

# 공간적 지역성이 나쁜 코드 (열 우선 순회) → 느림
for j in range(N):
    for i in range(N):
        sum += matrix[i][j]    # 메모리를 건너뛰며 접근
```

큰 행렬에서 위 두 코드의 성능 차이는 수 배에 달할 수 있다.

## 관련 개념

- [CPU (중앙처리장치)](/knowledge/computer-architecture/cpu-basics/) - 캐시가 보조하는 프로세서
- [RAM (랜덤 액세스 메모리)](/knowledge/computer-architecture/ram/) - 캐시가 속도 격차를 메우는 대상
- [명령어 실행 주기 (Fetch-Decode-Execute Cycle)](/knowledge/computer-architecture/fetch-decode-execute-cycle/) - Fetch 단계에서 캐시를 먼저 확인
- [보조기억장치 (Secondary Storage)](/knowledge/computer-architecture/secondary-storage/) - 메모리 계층 구조의 하위 단계

## 출처

- Understanding the Digital World, Chapter 3
