---
title: "비둘기집 원리 (Pigeonhole Principle)"
description: "비둘기집 원리(Pigeonhole Principle)란 k+1개 이상의 물체를 k개의 상자에 넣으면, 적어도 하나의 상자에는 2개 이상의 물체가 들어간다는 원리이다"
tags: ['Pigeonhole Principle', 'Dirichlet Drawer Principle', 'Counting', 'Proof Technique', 'Combinatorics']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/mathematics/pigeonhole-principle
sidebar:
  order: 3
---

## 핵심 개념

비둘기집 원리는 **디리클레 서랍 원리(Dirichlet drawer principle)**라고도 불리며, 19세기 독일 수학자 G. Lejeune Dirichlet의 이름에서 유래했다.

**기본 형태 (Theorem 1):** k+1개 이상의 물체를 k개의 상자에 넣으면, 적어도 하나의 상자에 2개 이상의 물체가 들어간다. 이는 귀류법(대우 증명)으로 증명할 수 있다: 모든 상자에 최대 1개의 물체만 있다면 총 물체 수는 최대 k개이므로 모순이다.

**일반화된 형태 (Theorem 2):** N개의 물체를 k개의 상자에 넣으면, 적어도 하나의 상자에 ceil(N/k)개 이상의 물체가 들어간다. 이 원리에서 최소 r개의 물체가 하나의 상자에 들어가도록 하려면 N = k(r-1) + 1개의 물체가 필요하다.

**함수적 해석:** k+1개 이상의 원소를 가진 정의역에서 k개의 원소를 가진 공역으로의 함수는 단사(one-to-one)일 수 없다.

비둘기집 원리는 존재성 증명에서 매우 강력한 도구이며, **램지 이론(Ramsey theory)**과도 깊이 연결된다. R(3,3) = 6이라는 결과, 즉 6명의 사람 중 반드시 3명의 상호 친구 또는 3명의 상호 적이 존재한다는 것도 이 원리를 응용하여 증명한다.

## 예시

**생일 문제:**
367명의 사람이 있으면, 366가지의 가능한 생일(윤년 포함)이므로 적어도 2명은 같은 생일을 가진다.

**일반화된 원리 적용:**
100명 중 같은 달에 태어난 사람이 최소 몇 명인가?
```
ceil(100 / 12) = 9명
```

**수학적 존재 증명:**
모든 정수 n에 대해, n의 배수 중 십진 표현이 0과 1만으로 이루어진 것이 존재함을 증명:
- n+1개의 정수 1, 11, 111, ..., 111...1 (n+1개의 1)을 고려
- n으로 나눈 나머지는 0 ~ n-1의 n가지
- n+1개의 수를 n개의 상자(나머지)에 넣으므로 같은 나머지를 가진 두 수가 존재
- 큰 수에서 작은 수를 빼면 0과 1로만 이루어진 n의 배수를 얻음

**Ramsey 이론:**
6명 중 3명의 상호 친구 또는 3명의 상호 적이 존재함:
```
사람 A에 대해 나머지 5명을 친구/적으로 분류
ceil(5/2) = 3이므로 적어도 3명이 같은 관계
그 3명 중 어떤 2명이 친구이면 → A와 합쳐 3명의 상호 친구
그 3명 모두 적이면 → 3명의 상호 적
```

## 관련 개념

- [Function](/knowledge/mathematics/function/) - 단사 함수의 존재 불가능 조건
- [Bijection](/knowledge/mathematics/injection-surjection-bijection/) - 비둘기집 원리의 함수적 해석
- [Sequence](/knowledge/mathematics/sequence/) - 단조 부분 수열의 존재 증명 (Erdos-Szekeres 정리)
