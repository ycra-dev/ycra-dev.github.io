---
title: "메모리 단편화 (Memory Fragmentation)"
description: "메모리 공간이 작은 조각들로 나뉘어 효율적으로 사용되지 못하는 현상"
tags: ["OS", "Memory", "Fragmentation"]
created: 2026-01-27
updated: 2026-01-27
draft: false
slug: knowledge/os/fragmentation
sidebar:
  order: 5
---

## 핵심 개념

메모리 단편화는 메모리 공간이 작은 조각들로 나뉘어 효율적으로 사용되지 못하는 현상입니다. 총 가용 메모리는 충분한데 프로세스를 적재하지 못하는 상황이 발생합니다.

## 동작 원리

### 외부 단편화 (External Fragmentation)

전체 빈 공간은 요청을 만족하지만, 연속된 공간이 없어 할당이 불가합니다. 연속 메모리 할당에서 발생합니다.

```
[P1][hole][P2][hole][P3][hole] → 총 hole 충분, 연속 부족
```

- **50% 규칙**: N개 블록 할당 시 약 0.5N 블록(전체의 1/3)이 단편화로 손실
- **해결**: 압축(Compaction) - 프로세스를 이동시켜 hole을 합침 (실행 시간 바인딩 필요)

### 내부 단편화 (Internal Fragmentation)

할당된 공간이 요청보다 커서 내부에 사용되지 않는 공간이 발생합니다. 고정 크기 블록 할당(페이징 등)에서 발생합니다.

```
[  프로세스  |낭비] ← 한 페이지/블록 내부
```

- 예: 페이지 크기 2KB, 프로세스 크기 72,766B → 36페이지 필요, 962B 낭비
- 평균적으로 프로세스당 반 페이지가 내부 단편화로 손실

## 예시

- **외부 단편화**: 주차장에 10대 분량의 빈 공간이 있지만, 5곳에 2대씩 흩어져 있어 10대짜리 버스가 주차 불가
- **내부 단편화**: 사물함 크기가 정해져 있어서, 작은 물건을 넣어도 사물함 전체를 차지

### 해결책 트레이드오프

- 외부 단편화: 페이징으로 제거 가능하지만 내부 단편화 발생
- 작은 페이지: 내부 단편화 감소, 페이지 테이블 크기 증가
- 큰 페이지: 페이지 테이블 작고 I/O 효율적, 내부 단편화 증가

## 관련 개념

- [가상 메모리 (Virtual Memory)](/knowledge/os/virtual-memory/)
- [계층적 페이징 (Hierarchical Paging)](/knowledge/os/hierarchical-paging/)
- [요구 페이징 (Demand Paging)](/knowledge/os/demand-paging/)
