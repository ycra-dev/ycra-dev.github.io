---
title: "Three Cs Model"
description: "Three Cs 모델은 모든 캐시 미스를 세 가지 범주로 분류하는 캐시 모델이다: 강제 미스(compulsory miss), 용량 미스(capacity miss), 충돌 미스(conflict miss)"
tags: ['Cache', 'Miss Rate', 'Compulsory Miss', 'Capacity Miss', 'Conflict Miss']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/three-cs-model
sidebar:
  order: 14
---

## 핵심 개념

**강제 미스(Compulsory Miss / Cold-Start Miss):** 캐시에 한 번도 존재한 적 없는 블록에 대한 첫 접근으로 발생하는 미스. 블록 크기를 늘려 프로그램을 구성하는 캐시 블록 수를 줄임으로써 감소시킬 수 있지만, 블록이 너무 크면 미스 페널티가 증가한다.

**용량 미스(Capacity Miss):** 캐시가 프로그램 실행 중 필요한 모든 블록을 담을 수 없어 발생하는 미스. 완전 연관(fully associative) 캐시에서도 발생한다. 캐시 크기를 늘려 감소시킬 수 있지만, 접근 시간이 증가할 수 있다.

**충돌 미스(Conflict Miss / Collision Miss):** 집합 연관 또는 직접 매핑 캐시에서 여러 블록이 같은 세트를 놓고 경쟁하여 발생하는 미스. 같은 크기의 완전 연관 캐시에서는 제거된다. 연관도를 높여 감소시킬 수 있지만, 접근 시간이 느려질 수 있다.

메모리 계층 구조 설계의 도전은 미스율을 개선할 수 있는 모든 변경이 전체 성능에 부정적 영향도 줄 수 있다는 점이다.

## 예시

```
# Three Cs 분석 예시 (직접 매핑 캐시, 8개 블록)
주소 시퀀스: 0, 8, 0, 8, 0, 8, ...

1. 주소 0 접근: 강제 미스 (처음 접근)
2. 주소 8 접근: 강제 미스 (처음 접근), 블록 0을 교체
3. 주소 0 접근: 충돌 미스 (8과 같은 캐시 블록에 매핑)
4. 주소 8 접근: 충돌 미스 (0과 같은 캐시 블록에 매핑)
# -> 2-way set associative로 바꾸면 충돌 미스 제거 가능

# 대응 전략 정리
강제 미스 -> 블록 크기 증가, 프리페칭
용량 미스 -> 캐시 크기 증가
충돌 미스 -> 연관도(associativity) 증가
```

## 관련 개념

- [Cache Coherence](/knowledge/computer-architecture/cache-coherence/)
- [Translation Lookaside Buffer](/knowledge/computer-architecture/translation-lookaside-buffer/)
- [Virtual Memory](/knowledge/computer-architecture/virtual-memory/)
