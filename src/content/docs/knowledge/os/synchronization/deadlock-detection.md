---
title: "교착 상태 탐지 (Deadlock Detection)"
description: "교착 상태 발생을 허용하되, 주기적으로 시스템 상태를 검사하여 교착 여부를 판별하는 알고리즘"
tags: ["OS", "Deadlock", "Algorithm"]
created: 2026-01-23
updated: 2026-01-27
draft: false
slug: knowledge/os/deadlock-detection
sidebar:
  order: 24
---

## 핵심 개념

교착 상태 탐지(Deadlock Detection)는 교착 상태 발생을 허용하되, 주기적으로 시스템 상태를 검사하여 교착 여부를 판별하는 알고리즘입니다. 예방/회피 기법의 오버헤드가 크기 때문에 Linux, Windows 등 대부분의 OS는 탐지 후 복구 전략을 사용합니다.

## 동작 원리

### 1. 단일 인스턴스: Wait-for Graph

자원 할당 그래프에서 자원 노드를 제거하고 스레드 간 직접 대기 관계만 표현합니다.

- Ti → Tj: Ti가 Tj가 보유한 자원을 대기
- **사이클 존재 ↔ 교착 상태** (필요충분조건)
- 시간 복잡도: O(n²) — n은 스레드 수

### 2. 다중 인스턴스: 탐지 알고리즘

은행원 알고리즘과 유사하지만 **Need 대신 Request**를 사용합니다.

```
자료구조:
- Available[m]: 가용 자원
- Allocation[n][m]: 현재 할당
- Request[n][m]: 현재 요청 (Need 아님!)

알고리즘:
1. Work = Available
   Finish[i] = (Allocation_i == 0) ? true : false
2. Finish[i] == false && Request_i ≤ Work 인 i 탐색
   - 없으면 4단계로
3. Work = Work + Allocation_i
   Finish[i] = true → 2단계로
4. Finish[i] == false인 스레드가 있으면 교착 상태
   해당 스레드들이 교착 집합
```

- 시간 복잡도: O(m × n²)
- **낙관적 가정**: 현재 요청만 충족되면 스레드가 완료 후 자원 반환

## 예시

정기적인 건강검진과 유사합니다. 문제가 생기면 발견 후 치료합니다.

```
Available = (0, 0, 0)
T0: Allocation=(0,1,0), Request=(0,0,0) → 완료 가능
T2: Allocation=(3,0,3), Request=(0,0,0) → 완료 가능
→ Work 증가 → 나머지도 완료 가능 → 교착 없음

만약 T2가 Request=(0,0,1)이면
→ T0만 완료 가능 → T1,T2,T3,T4 교착
```

### 탐지 시점

| 전략 | 설명 |
|------|------|
| 매 요청 시 | 즉시 탐지, 원인 스레드 특정 가능. 오버헤드 큼 |
| 주기적 | 일정 간격 (예: 1시간) 또는 CPU 사용률 저하 시 |
| CPU 40% 이하 시 | 교착으로 인한 처리량 저하 의심 시점 |

## 관련 개념

- [[자원 할당 그래프 (Resource-Allocation Graph)]]
- [[교착 상태 필요조건 (Necessary Conditions)]]
- [[교착 상태 복구 (Deadlock Recovery)]]
- [[은행원 알고리즘 (Banker's Algorithm)]]
