---
title: "코루틴 (Coroutine)"
description: "특정 지점에서 실행을 일시 중단하고 제어를 다른 코루틴에 양보하며, 나중에 중단된 지점부터 재개할 수 있는 프로그램 단위"
tags: ["Algorithms", "Concurrency", "Programming", "TAOCP"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/algorithms/foundations/coroutine
sidebar:
  order: 33
---

## 핵심 개념

코루틴(Coroutine)은 특정 지점에서 실행을 일시 중단하고 제어를 다른 코루틴에 양보하며, 나중에 중단된 지점부터 재개할 수 있는 프로그램 단위다.

서브루틴과의 핵심 차이:
- **서브루틴**: 호출자와 피호출자의 비대칭 관계. 매번 처음부터 시작.
- **코루틴**: 대칭적 관계. 상태(state)를 보존하며 중단된 지점에서 재개.

## 동작 원리

**코루틴의 특성**:
- 각 코루틴은 독자적인 실행 컨텍스트(스택, 레지스터 상태)를 유지
- RESUME 또는 TRANSFER 연산으로 제어를 다른 코루틴에 이전
- 재개 시 이전에 중단된 바로 다음 명령부터 실행

**MIX에서의 구현**:
```mixal
* 코루틴 A에서 B로 제어 이전:
SWITCH  STJ  RE-A    * A의 재개 주소 저장
        JMP  RE-B    * B의 저장된 재개 주소로 점프
RE-B    JMP  *       * B의 시작점 (업데이트될 위치)
```

**주요 사용 사례**:
1. **디스크리트 시뮬레이션**: 여러 독립적인 프로세스 시뮬레이션 (예: 엘리베이터 시뮬레이션)
2. **생산자-소비자 패턴**: 한 코루틴이 데이터를 생성하고 다른 코루틴이 소비
3. **파이프라인 처리**: 여러 처리 단계를 코루틴으로 구성
4. **파서와 어휘 분석기**: 두 모듈이 교대로 제어를 주고받음

**코루틴 vs 스레드**:
| 특성 | 코루틴 | 스레드 |
|------|--------|--------|
| 스케줄링 | 프로그래머가 직접 | OS가 결정 |
| 멀티태스킹 방식 | 협력적(cooperative) | 선점적(preemptive) |
| 컨텍스트 전환 비용 | 낮음 | 높음 |
| 동기화 필요성 | 불필요 | 필요 |

**현대적 구현**:
- Python: `yield` 키워드, `async/await`
- Go: goroutine
- Kotlin: coroutine
- JavaScript: `async/await`, generator

## 예시

엘리베이터 시뮬레이션 (TAOCP 1.4.2절):

```
코루틴 U (사용자 행동):
    U1: 엘리베이터 버튼 누름
    U2: RESUME E  → 엘리베이터 코루틴에 제어 이전
    U3: 엘리베이터 탑승 대기...
    U4: RESUME E  → 다시 제어 이전

코루틴 E (엘리베이터 행동):
    E1: 대기
    E2: RESUME U  → 사용자 코루틴에 제어 이전
    E3: 이동
    ...
```

Python 코루틴 예시:

```python
def producer():
    """데이터를 생성하며 소비자에게 제어를 넘김"""
    for i in range(5):
        print(f"생산: {i}")
        yield i  # 소비자에게 값 전달 후 일시 중단

def consumer():
    """생산자로부터 값을 받아 처리"""
    gen = producer()
    for val in gen:
        print(f"소비: {val}")

consumer()
# 생산: 0, 소비: 0, 생산: 1, 소비: 1, ...

# asyncio 코루틴 (Python 3.5+)
import asyncio

async def fetch_data(url):
    await asyncio.sleep(1)  # 다른 코루틴에 제어 양보
    return f"data from {url}"
```

## 관련 개념

- [서브루틴 (Subroutine)](/knowledge/algorithms/foundations/subroutine/)
- [스택 (Stack)](/knowledge/algorithms/data-structures/stack/)
- [MIX 컴퓨터 (MIX Computer)](/knowledge/algorithms/foundations/mix-computer/)
