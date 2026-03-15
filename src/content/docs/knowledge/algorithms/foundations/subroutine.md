---
title: "서브루틴 (Subroutine)"
description: "프로그램 내 여러 곳에서 반복되는 코드를 한 곳에만 배치하여 호출하고 복귀하는 코드 단위 — 현대 함수(function)의 원형"
tags: ["Algorithms", "Programming", "Abstraction", "TAOCP"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/algorithms/foundations/subroutine
sidebar:
  order: 32
---

## 핵심 개념

서브루틴(Subroutine)은 프로그램 내 여러 곳에서 반복되는 코딩 작업을 한 곳에만 배치한 코드 단위다. 호출 시 제어를 전달하고, 완료 후 호출 지점으로 돌아오는 메커니즘을 **서브루틴 연결(subroutine linkage)**이라 한다. 현대 프로그래밍 언어의 함수(function), 메서드(method)의 직접적 원형이다.

## 동작 원리

**서브루틴의 목적**:

1. **공간 절약**: 동일한 코드를 여러 번 복제하지 않음
   - k개 위치를 차지하는 코드가 m곳에 쓰일 때:
   - 서브루틴 사용 시: m + k + 2 워드 (vs 직접 복사 mk 워드)
   - 절약량 = (m-1)(k-2) - 3

2. **프로그램 구조화**: 복잡한 프로그램을 논리적 단위로 분할
3. **디버깅 용이성**: 각 서브루틴을 독립적으로 검증
4. **코드 재사용**: 서브루틴 라이브러리 구축

**시간 비용**: t번 호출 시 JMP + STJ + JMP(복귀)로 인한 추가 시간 = 4t 사이클

**MIX에서의 연결 방식**:
```mixal
* 서브루틴 진입:
SUBR    STJ EXIT    * J레지스터에 복귀 주소 자동 저장
        ...         * 서브루틴 본체

* 서브루틴 종료:
EXIT    JMP *       * 복귀 (STJ가 저장한 주소로)
```

**매개변수 전달 방식**:
1. 레지스터를 통해 (간단한 경우)
2. 고정 메모리 위치에 저장
3. JMP 명령어 다음에 나열 (J레지스터로 참조)

**다중 진입점(Multiple Entrances)**: 서브루틴에 여러 시작점을 두어 다양한 초기 상태에서 호출 가능.

**재귀 서브루틴**: MIX의 기본 연결 방식은 EXIT 변수가 덮어쓰여 재귀를 지원하지 않는다. 스택 기반 해결이 필요하다.

**프로그램 작성 방법론**:
1. 최상위 레벨부터 하향식(top-down) 분해
2. 최하위 서브루틴부터 상향식(bottom-up) 구현

## 예시

MAX100 서브루틴 (배열에서 최대값 찾기):

```mixal
MAX100  STJ EXIT        * 복귀 주소 저장
        ENT3 100        * 탐색 범위
        ENT2 100        * 최대값 위치 초기화
        LDA  X+100      * 첫 번째 원소 로드
LOOP    CMPA X,3        * 비교
        JGE  *+2
        LDA  X,3; ENT2 0,3  * 새 최대값 발견
        DEC3 1
        J3P  LOOP
EXIT    JMP  *          * 복귀 (rA = 최대값, rI2 = 위치)

* 호출 (한 줄):
        JMP  MAX100
```

공간 절약 계산 (k=5, m=10):

```
서브루틴 없이: 5 × 10 = 50 워드
서브루틴 사용: 10 + 5 + 2 = 17 워드
절약: 33 워드 (65.4%)
```

## 관련 개념

- [MIX 컴퓨터 (MIX Computer)](/knowledge/algorithms/foundations/mix-computer/)
- [코루틴 (Coroutine)](/knowledge/algorithms/foundations/coroutine/)
- [스택 (Stack)](/knowledge/algorithms/data-structures/stack/)
