---
title: "디버깅 (Debugging)"
description: "소프트웨어의 결함(버그)을 발견하고, 원인을 분석하며, 수정하는 체계적인 과정"
tags: ["Software Engineering", "Bug Hunting", "Problem Solving"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/foundations/debugging
sidebar:
  order: 14
---

## 핵심 개념

디버깅(Debugging)은 소프트웨어의 결함(버그)을 발견하고, 원인을 분석하며, 수정하는 체계적인 과정이다. 효과적인 디버깅은 체계적 접근이 핵심이다. "이번에는 해결했을 거야"라는 추측성 수정은 가장 비효율적인 방법이다.

## 동작 원리

디버깅 전략:
- **재현(Reproduce)**: 버그를 안정적으로 재현하는 것이 첫 번째 단계
- **이진 탐색(Binary Chop)**: 문제 범위를 절반씩 좁혀가는 기법. 코드 영역, 커밋 이력, 입력 데이터 등에 적용
- **트랩 설치(Lay Traps)**: 어설션, 로깅으로 문제를 감지하는 장치 배치
- **러버덕 디버깅**: 문제를 다른 사람(또는 오리 인형)에게 설명하며 스스로 해결책을 발견
- **단계적 후퇴**: 해결이 안 되면 한 발 물러서서 큰 그림을 다시 본다

과학적 방법 적용:
1. 증상 관찰
2. 가설 수립
3. 실험으로 검증
4. 성공 시 치료, 실패 시 재가설

이진 탐색(half-splitting)으로 대규모 시스템에서 효율적 탐색 가능 — 콜스택 중간 지점에서 업스트림/다운스트림 확인.

자주 하는 실수:
- 원인을 파악하기 전에 수정부터 시도
- 터널 비전에 빠져 한 가지 가설에만 집착
- 도움을 청하지 않고 혼자 끌어안기

## 예시

```bash
# 이진 탐색 디버깅: git bisect
# "언제부터 이 버그가 있었지?"를 찾는 가장 효율적인 방법

git bisect start
git bisect bad          # 현재 버전: 버그 있음
git bisect good v1.0    # v1.0: 버그 없었음
# Git이 중간 커밋을 체크아웃 → 테스트 → good/bad 표시
# O(log n)으로 원인 커밋을 특정
```

```python
# 트랩 설치: 조건부 로깅과 어설션
def process_order(order):
    assert order.total >= 0, f"Negative total: {order}"
    logger.debug(f"Processing order {order.id}: total={order.total}")

    if order.total == 0:
        logger.warning(f"Zero-value order detected: {order.id}")
```

## 관련 개념

- [방어적 프로그래밍 (Defensive Programming)](/knowledge/software-engineering/foundations/defensive-programming/)
- [하이젠버그 (Heisenbug)](/knowledge/software-engineering/foundations/heisenbug/)
- [고무 오리 디버깅 (Rubber Duck Debugging)](/knowledge/software-engineering/foundations/rubber-duck-debugging/)
- [근본 원인 분석 (Root-Cause Analysis)](/knowledge/software-engineering/quality-and-configuration/root-cause-analysis/)
