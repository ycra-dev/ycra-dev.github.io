---
title: "LSM Tree"
description: "LSM 트리(Log-Structured Merge Tree)는 여러 레벨의 B+트리로 구성된 쓰기 최적화 인덱스 구조로, 인메모리 트리에 먼저 삽입한 뒤 배경에서 디스크 기반 트리로 병합하여 랜덤 I/O를 최소화한다"
tags: ['Lsm Tree', 'Log Structured Merge Tree', 'Write Optimization', 'Compaction', 'Bloom Filter']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/database/lsm-tree
sidebar:
  order: 12
---

## 핵심 개념

LSM 트리는 인메모리 B+트리 L_0과 디스크 기반 B+트리 L_1, L_2, ..., L_k로 구성된다. 레코드가 삽입되면 먼저 L_0에 추가된다. L_0이 할당된 메모리를 채우면, L_0의 리프 레벨을 L_1과 병합하여 새로운 L_1을 bottom-up 방식으로 생성한다. 마찬가지로 L_1이 최대 크기에 도달하면 L_2와 병합한다.

검색(lookup) 시에는 L_0부터 L_k까지 모든 트리에서 별도로 검색하고 결과를 병합한다. 이는 읽기 비용의 증가 요인이지만, 블룸 필터(Bloom filter)를 사용하여 특정 트리에 검색 키가 없음을 빠르게 판별함으로써 비용을 줄인다.

병합 비용을 줄이기 위한 두 가지 기법:
1. **다중 레벨**: L_{i+1}의 최대 크기를 L_i의 k배로 설정하여, 각 레코드가 한 레벨에서 최대 k번만 복사된다.
2. **스텝 병합(Stepped-merge)**: 각 레벨에 최대 b개의 트리를 허용하고, b개가 되면 하나로 병합하여 다음 레벨로 내린다.

삭제는 직접 레코드를 찾아 제거하지 않고, 삭제 엔트리(deletion entry)를 삽입한다. 검색 시 삭제 엔트리와 원본 엔트리가 매칭되어 필터링되며, 트리 병합 시 양쪽이 만나면 둘 다 폐기된다. 갱신도 유사하게 갱신 엔트리로 처리한다.

LSM 트리는 플래시 메모리 SSD에서도 이점이 있다. 인플레이스 갱신을 하지 않아 페이지 소거 비용을 줄이기 때문이다. Google BigTable, Apache HBase, Cassandra, MongoDB, LevelDB, MySQL(MyRocks) 등에서 널리 채택되었다.

## 예시

LSM 트리 (k=2) 동작 흐름:

```
[삽입 단계]
INSERT 50, 30, 70, 20, 60, 40, 80

L_0 (인메모리, 최대 4개):
  삽입: 50 → {50}
  삽입: 30 → {30, 50}
  삽입: 70 → {30, 50, 70}
  삽입: 20 → {20, 30, 50, 70}  ← L_0 가득 참!

[병합: L_0 → L_1]
L_1 (디스크): {20, 30, 50, 70}  ← 순차 쓰기로 생성
L_0 비움: {}

계속 삽입: 60, 40, 80, 10
L_0: {10, 40, 60, 80}  ← 다시 가득 참!

[병합: L_0 + 기존 L_1 → 새 L_1]
병합 정렬: {10, 20, 30, 40, 50, 60, 70, 80}
L_1 (디스크): {10, 20, 30, 40, 50, 60, 70, 80}

[삭제 처리]
DELETE 50 → L_0에 삭제 엔트리 {DEL:50} 삽입
검색 시: L_0에서 DEL:50 발견 → L_1의 50을 결과에서 제외
```

## 관련 개념

- [B-Plus Tree](/knowledge/database/b-plus-tree/)
- [Flash Memory](/knowledge/database/flash-memory/)
- [Key-Value Store](/knowledge/database/key-value-store/)
- [Hash Index](/knowledge/database/hash-index/)
