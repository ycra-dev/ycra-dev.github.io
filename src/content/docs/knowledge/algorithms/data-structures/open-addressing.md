---
title: "Open Addressing"
description: "개방 주소법(Open Addressing)은 모든 원소를 해시 테이블 내부에 직접 저장하고, 충돌 시 탐색 순서(probe sequence)에 따라 빈 슬롯을 찾아 삽입하는 충돌 해결 방법이다"
tags: ['Open Addressing', 'Collision Resolution', 'Hash Table', 'Probing', 'Double Hashing', 'Linear Probing']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/algorithms/open-addressing
sidebar:
  order: 11
---

## 핵심 개념

개방 주소법에서 해시 함수는 h: U x {0,1,...,m-1} -> {0,1,...,m-1} 형태로, 키와 탐색 번호를 입력으로 받는다. 각 키에 대해 탐색 순서 <h(k,0), h(k,1), ..., h(k,m-1)>는 <0,1,...,m-1>의 순열이어야 한다.

**탐색 방법:**
1. **이중 해싱(Double Hashing):** h(k,i) = (h1(k) + i*h2(k)) mod m
   - 두 보조 해시 함수 사용, Theta(m^2)개의 탐색 순서 생성
   - h2(k)는 m과 서로소여야 전체 테이블 탐색 가능
   - 무작위 순열에 가장 가까운 성능
2. **선형 탐색(Linear Probing):** h(k,i) = (h1(k) + i) mod m
   - 이중 해싱의 특수 경우 (h2(k) = 1)
   - m개의 탐색 순서만 생성
   - 1차 군집화(primary clustering) 문제 발생
   - 그러나 캐시 성능이 우수하여 계층적 메모리에서 유리
   - 5-독립 해시 함수 사용 시, alpha <= 2/3이면 기대 상수 시간 (정리 11.9)

**삭제 문제:** 슬롯을 단순히 NIL로 설정하면 탐색 경로가 끊어진다. DELETED 마커를 사용하거나 (선형 탐색의 경우) 원소 재배치로 해결한다.

**성능 분석 (독립 균일 순열 해싱, alpha < 1):**
- **비성공 검색(정리 11.6):** 기대 탐색 횟수 <= 1/(1-alpha)
- **삽입(따름정리 11.7):** 기대 탐색 횟수 <= 1/(1-alpha)
- **성공 검색(정리 11.8):** 기대 탐색 횟수 <= (1/alpha) * ln(1/(1-alpha))
- alpha=0.5: 비성공 2회, 성공 1.387회
- alpha=0.9: 비성공 10회, 성공 2.559회

## 예시

```
// 이중 해싱 예시
// m = 13, h1(k) = k mod 13, h2(k) = 1 + (k mod 11)
// 키 14 삽입: h1(14) = 1, h2(14) = 3 + 1 = 4
// 슬롯 1 점유 -> 슬롯 5 점유 -> 슬롯 9 비어있음 -> 삽입!

HASH-INSERT(T, k)
  i = 0
  repeat
    q = h(k, i)
    if T[q] == NIL
      T[q] = k
      return q
    else i = i + 1
  until i == m
  error "hash table overflow"

HASH-SEARCH(T, k)
  i = 0
  repeat
    q = h(k, i)
    if T[q] == k
      return q
    i = i + 1
  until T[q] == NIL or i == m
  return NIL

// 선형 탐색 삭제 (DELETED 마커 없이)
// 삭제 후 후속 키들을 재배치하여 탐색 경로 유지
```

## TAOCP 분석 (Knuth, Vol.3)

TAOCP Section 6.4의 개방 주소법 핵심 특성:

**균등 탐사(Uniform Probing) 가정:**
Knuth의 분석은 각 탐사가 완전히 독립적이고 균등하다고 가정(이상적). 실제로는 이중 해싱이 이 가정에 가장 근접한다.

**삭제의 해결책 (Knuth 제시):**
1. **삭제 표시(Tombstone)**: 삭제된 슬롯에 특별 마커 삽입
2. **재해시(Rehash)**: 삭제 후 테이블 전체 재구성

**체이닝과의 성능 비교:**

| 특성 | Open Addressing | Chaining |
|------|----------------|----------|
| 추가 메모리 | 없음 | 링크드 리스트 포인터 |
| 적재율 | α < 1 필수 | α > 1 가능 |
| 캐시 효율 | 높음 (배열) | 낮음 (포인터 추적) |
| 삭제 | 복잡 | 간단 |

**Knuth 성능 공식 요약:**
- 균등 탐사 성공 탐색 평균: (1/α) * ln(1/(1-α))
- 균등 탐사 실패 탐색 평균: 1/(1-α)
- 선형 탐사 성공: (1/2) * (1 + 1/(1-α))
- 선형 탐사 실패: (1/2) * (1 + 1/(1-α)²)

## 관련 개념

- [Hash Table](/knowledge/algorithms/hash-table/)
- [Collision Resolution](/knowledge/algorithms/collision-resolution/)
- [Chaining](/knowledge/algorithms/chaining/)
- [Hash Function](/knowledge/algorithms/hash-function/)
