---
title: "Stable Sorting"
description: "안정 정렬(Stable Sorting)은 동등한 키를 가진 레코드들이 정렬 후에도 원래의 상대적 순서를 유지하는 정렬 방법이다"
tags: ["Stable Sorting", "Sorting", "Properties", "TAOCP", "Multi-key Sorting"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/algorithms/sorting-selection/stable-sorting
sidebar:
  order: 34
---

## 핵심 개념

**안정 정렬(Stable Sorting)**은 동등한 키를 가진 레코드들이 정렬 후에도 원래의 상대적 순서를 유지하는 정렬 방법이다. 즉, Kp(i) = Kp(j)이고 p(i) < p(j)이면, 원래 파일에서도 i < j이어야 한다.

## 동작 원리

**안정성의 중요성**:
- **다중 키 정렬**: 부 키(minor key)로 먼저 안정 정렬하고, 주 키(major key)로 다시 안정 정렬하면 이중 정렬 효과
- 누적 정렬 작업에서 이전 정렬 결과 보존
- 예측 가능하고 일관된 정렬 결과

**내부 정렬의 안정성**:
- **안정**: 직접 삽입(K ≥ Ki 조건 사용 시), 리스트 삽입, 병합 정렬, 기수 정렬
- **불안정**: 쉘 정렬, 퀵 정렬, 힙 정렬 (기본 구현)

**직접 삽입 정렬의 안정성**:
단계 S3에서 "K ≥ Ki"를 사용하면 안정, "K > Ki"를 사용하면 불안정.
→ 동등한 원소를 만나면 더 이상 이동하지 않으므로 원래 순서 유지.

**다중 키 정렬 방법 비교**:
1. 주 키 → 소그룹별 부 키 정렬 (비안정 정렬로도 가능)
2. 부 키로 안정 정렬 → 주 키로 안정 정렬 (단 두 번의 전체 정렬)
3. 복합 키 직접 정렬 (한 번의 정렬)

**방법 2가 안정 정렬의 대표적 응용이다.**

**실용적 고려**:
- 레코드에 순서 번호를 부여하면 불안정 정렬도 안정화 가능 (추가 공간 필요)
- 정렬 키를 (K_j, j) 복합 키로 만들면 자동으로 안정

## 예시

```python
# 안정 정렬 예: 이름 + 성적 데이터
records = [('Alice', 85), ('Bob', 90), ('Charlie', 85), ('Diana', 90)]

# 성적으로 안정 정렬
# 안정: Alice(85)와 Charlie(85)의 순서 유지
stable_sorted = sorted(records, key=lambda x: x[1])
# [('Alice', 85), ('Charlie', 85), ('Bob', 90), ('Diana', 90)]
# Alice가 Charlie보다 먼저 나옴 (원래 순서 보존) ✓

# 다중 키 안정 정렬 활용:
# 이름으로 먼저 안정 정렬
by_name = sorted(records, key=lambda x: x[0])
# 성적으로 안정 정렬 (같은 성적 내에서 이름 순서 유지)
by_grade_then_name = sorted(by_name, key=lambda x: x[1])
```

## 관련 개념

- [Sorting Overview](/knowledge/algorithms/sorting-selection/sorting-overview/)
- [Straight Insertion Sort](/knowledge/algorithms/sorting-selection/straight-insertion-sort/)
- [Radix Sorting (LSD)](/knowledge/algorithms/sorting-selection/radix-sorting-lsd/)
- [Sorting Algorithm](/knowledge/algorithms/sorting-algorithm/)
