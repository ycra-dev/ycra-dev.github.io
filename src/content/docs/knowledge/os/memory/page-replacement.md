---
title: "페이지 교체 기본 개념 (Page Replacement)"
description: "물리 메모리에 빈 프레임이 없을 때 기존 페이지를 교체하여 새 페이지를 적재하는 과정"
tags: ["OS", "Memory", "VirtualMemory"]
created: 2026-01-27
updated: 2026-01-27
draft: false
slug: knowledge/os/page-replacement
sidebar:
  order: 15
---

## 핵심 개념

페이지 교체는 **물리 메모리가 가득 찼을 때**, 새 페이지를 적재하기 위해 기존 페이지를 내보내는 과정이다. 마치 책장이 꽉 찬 상태에서 새 책을 꽂으려면 기존 책 하나를 빼야 하는 것과 같다.

- **발생 조건**: Page fault 발생 + 빈 프레임(free frame)이 없음
- **Modify Bit (Dirty Bit)**: 수정되지 않은 페이지는 디스크에 이미 같은 내용이 있으므로 swap out이 불필요하다. 이를 통해 **디스크 I/O를 절반으로 줄일 수 있다**.
- **Reference String**: 알고리즘의 성능을 비교하기 위한 메모리 참조 시퀀스
- **평가 기준**: 페이지 폴트 횟수 (낮을수록 좋은 알고리즘)

## 동작 원리

페이지 교체는 다음 4단계로 진행된다.

```
1. Victim 선택          2. Dirty 확인
   ┌─────────┐            ┌─────────┐
   │ 교체     │            │ dirty=1 │──► swap out (디스크 쓰기)
   │ 알고리즘  │──►victim──►│ dirty=0 │──► 바로 덮어쓰기 (I/O 절약)
   └─────────┘            └─────────┘

3. 새 페이지 적재        4. 테이블 갱신
   ┌─────────┐            ┌─────────────┐
   │ 디스크   │──►프레임──►│ 페이지 테이블  │ 갱신
   │ → 메모리 │            │ valid bit=1  │
   └─────────┘            └─────────────┘
```

### 교체 과정 상세

1. **Victim page 선택**: 교체 알고리즘(FIFO, LRU, Optimal 등)에 따라 내보낼 페이지 결정
2. **Dirty bit 확인**: dirty bit가 1이면 수정된 페이지이므로 디스크에 써야 함 (swap out)
3. **새 페이지 적재**: 디스크에서 새 페이지를 해당 프레임에 읽어들임
4. **페이지 테이블 갱신**: victim의 valid bit을 0으로, 새 페이지의 valid bit을 1로 설정

### Belady's Anomaly

일반적으로 프레임 수가 증가하면 페이지 폴트가 감소한다. 그러나 **FIFO 알고리즘**에서는 프레임 수를 늘렸는데 오히려 **페이지 폴트가 증가**하는 이상 현상이 발생할 수 있다. 이를 **Belady's Anomaly**라고 한다.

## 예시

```
Reference String: 7, 0, 1, 2, 0, 3, 0, 4, 2, 3
프레임 수: 3

FIFO 교체 시:
  [7][ ][ ] → fault (7 적재)
  [7][0][ ] → fault (0 적재)
  [7][0][1] → fault (1 적재)
  [2][0][1] → fault (7 교체 → 2 적재)
  [2][0][1] → hit   (0 이미 있음)
  [2][3][1] → fault (0 교체 → 3 적재)
  [2][3][0] → fault (1 교체 → 0 적재)
  [4][3][0] → fault (2 교체 → 4 적재)
  [4][2][0] → fault (3 교체 → 2 적재)
  [4][2][3] → fault (0 교체 → 3 적재)

총 페이지 폴트: 9회
```

## 관련 개념

- [요구 페이징](/knowledge/os/demand-paging/)
- [프레임 할당](/knowledge/os/frame-allocation/)
- [스래싱](/knowledge/os/thrashing/)
