---
title: "Common Subexpression Elimination"
description: "공통 부분식 제거(Common Subexpression Elimination)는 동일한 식의 여러 인스턴스를 찾아 두 번째 이후의 계산을 첫 번째 결과의 참조로 대체하는 컴파일러 최적화 기법이다"
tags: ['Compiler Optimization', 'Local Optimization', 'Global Optimization']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/language/common-subexpression-elimination
sidebar:
  order: 16
---

## 핵심 개념

이 최적화는 로컬(단일 기본 블록 내)과 글로벌(여러 기본 블록에 걸쳐) 두 수준에서 수행된다. 예를 들어 `x[i] = x[i] + 4`에서 x[i]의 주소 계산이 두 번 발생하는데, x의 시작 주소와 i의 값이 변하지 않으므로 두 번째 계산을 제거할 수 있다. 글로벌 공통 부분식 제거에서는 데이터 흐름 분석(data flow analysis)이 필요하며, 두 문장 사이에서 피연산자가 변경되었는지를 판단해야 한다. 이 최적화는 강도 감소(strength reduction), 상수 전파(constant propagation), 복사 전파(copy propagation), 죽은 코드 제거(dead code elimination) 등 다른 최적화와 함께 수행된다.

## 예시

```
# 공통 부분식 제거 예시: x[i] = x[i] + 4
# 최적화 전:
li   R100, x           # x의 주소 로드
lw   R101, i           # i 로드
mult R102, R101, 4     # i * 4
add  R103, R100, R102  # x + i*4 (주소 계산 1)
lw   R104, 0(R103)     # x[i] 로드
add  R105, R104, 4     # x[i] + 4
li   R106, x           # x의 주소 (중복!)
lw   R107, i           # i (중복!)
mult R108, R107, 4     # i * 4 (중복!)
add  R109, R106, R108  # x + i*4 (중복!)
sw   R105, 0(R109)     # 저장

# 최적화 후:
li   R100, x
lw   R101, i
mult R102, R101, 4
add  R103, R100, R102  # 주소 계산 한 번만
lw   R104, 0(R103)
add  R105, R104, 4
sw   R105, 0(R103)     # 같은 R103 재사용
```

## 관련 개념

- [Register Allocation](/knowledge/language/register-allocation/)
- [Compiler](/knowledge/language/compiler/)
- [Data Flow Analysis](/knowledge/language/data-flow-analysis/)
