---
title: "자연 선택 (Natural Selection)"
description: "자연 선택(Natural Selection)은 대체 선택을 개선한 런 생성 방법으로, 외부 저장소(reservoir)를 활용하여 평균 런 길이 ≈ eP를 달성한다"
tags: ["Natural Selection", "External Sorting", "Run Generation", "Reservoir", "TAOCP", "Snowplow"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/algorithms/sorting-selection/natural-selection-run-generation
sidebar:
  order: 50
---

## 핵심 개념

자연 선택(Natural Selection)은 외부 정렬의 런 생성 단계에서 대체 선택(Replacement Selection)을 개선한 방법이다. W. D. Frazer와 C. K. Wong(1972)이 제안한 것으로, "죽은" 레코드를 외부 저장소(reservoir)에 임시 보관하여 더 긴 런을 생성한다.

## 동작 원리

**기본 아이디어**:
- 대체 선택에서 현재 런에 속할 수 없는 레코드(새 키 < LASTKEY)를 선택 트리 내에 대기시키는 대신, **외부 저장소(reservoir)에 써서 분리**
- 저장소가 P'개 레코드로 가득 차면 현재 런의 나머지를 출력하고 다음 런 시작
- 저장소 항목들이 다음 런의 초기 입력이 됨

**눈덮개 분석 확장**:
P'=P인 경우, **평균 런 길이 ≈ eP ≈ 2.718P** (대체 선택의 2P보다 35% 향상)

**저장소 크기에 따른 런 길이 (Table 2)**:
```
P'/P = 0:   런 길이 ≈ 2.000P  (대체 선택)
P'/P = 0.5: 런 길이 ≈ 2.215P
P'/P = 1:   런 길이 ≈ e·P ≈ 2.718P  ← 자연 선택
P'/P = 2:   런 길이 ≈ 3.589P
P'/P = ∞:   런 길이 → ∞
```

**자연 선택 이름의 유래**: P'=P일 때 자연상수 e가 등장하여 "자연" 선택으로 명명.

**지연 재구성(Delayed Reconstitution)** - Dinsmore 방법:
- m 자유도를 허용한 런 생성
- 블록 단위로 기록하되 인접 블록이 완전히 정렬될 필요 없음
- 병합 단계에서 m-way 내부 병합으로 재구성

**실용적 선택**: 저장소 사용의 추가 I/O 비용 vs. 런 수 감소의 이익을 고려해야 함.

## 예시

```
P=4, P'=4 (저장소 크기=선택 트리 크기)

선택 트리: {503, 087, 512, 061}
저장소: []

대체 선택과 동일하게 진행하다가,
현재 런에 속할 수 없는 원소 발견 시:
  → 선택 트리에서 꺼내 저장소에 기록
  → 새 입력 원소를 선택 트리에 삽입

저장소가 4개로 가득 차면:
  → 현재 선택 트리의 모든 원소 출력 (현재 런 종료)
  → 저장소의 4개 원소를 선택 트리로 이동
  → 새 런 시작

결과: 평균 런 길이 ≈ 2.718 × 4 ≈ 11개 레코드
(단순 대체 선택의 ≈ 8개보다 35% 향상 ✓)
```

## 관련 개념

- [대체 선택 (Replacement Selection)](/knowledge/algorithms/sorting-selection/replacement-selection/)
- [외부 정렬 개요 (External Sorting Overview)](/knowledge/algorithms/sorting-selection/external-sorting-overview/)
