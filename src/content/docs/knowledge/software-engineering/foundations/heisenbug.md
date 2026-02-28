---
title: "Heisenbug"
description: "관찰하거나 디버깅하려고 시도할 때 동작이 변하거나 사라지는 버그"
tags: ["Software Engineering", "Debugging", "Concurrency"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/foundations/heisenbug
sidebar:
  order: 15
---

## 핵심 개념

하이젠버그(Heisenbug)는 관찰하거나 디버깅하려고 시도할 때 동작이 변하거나 사라지는 버그이다. 하이젠베르크의 불확정성 원리에서 이름을 따왔다. 주로 타이밍, 메모리 레이아웃, 최적화 수준 등에 의존하는 버그로, 디버거를 붙이거나 로그를 추가하면 실행 타이밍이 변하므로 버그가 사라진다.

## 동작 원리

하이젠버그의 주요 원인:
- **타이밍 의존 버그**: 멀티스레딩 경쟁 조건이 대표적
- **메모리 관련 버그**: 초기화되지 않은 변수, 댕글링 포인터
- **최적화 관련 버그**: Release 빌드에서만 발생, Debug 빌드에서 사라짐
- **네트워크 레이턴시**: 분산 시스템에서 타이밍에 의존하는 문제

대응 방법:
- 로깅보다 사후 분석(post-mortem analysis) 활용
- 코어 덤프, 트레이스 기록 등 관찰 영향이 적은 도구 사용
- 정적 분석 도구로 잠재적 동시성 문제 탐지
- 스트레스 테스트로 간헐적 문제 재현 확률 높이기

## 예시

```c
// 전형적인 하이젠버그: 초기화되지 않은 변수
int calculate() {
    int result;  // 초기화 안 됨
    if (some_condition) {
        result = 42;
    }
    // some_condition이 false면 result는 쓰레기 값
    // 디버그 모드에서는 0으로 초기화되어 동작할 수 있음
    return result;
}

// 수정: 항상 초기화
int calculate() {
    int result = 0;
    if (some_condition) {
        result = 42;
    }
    return result;
}
```

## 관련 개념

- [Debugging](/knowledge/software-engineering/foundations/debugging/)
- [Concurrency](/knowledge/software-engineering/foundations/concurrency/)
- [Defensive Programming](/knowledge/software-engineering/foundations/defensive-programming/)
- [Deterministic Testing](/knowledge/software-engineering/testing/deterministic-testing/)
