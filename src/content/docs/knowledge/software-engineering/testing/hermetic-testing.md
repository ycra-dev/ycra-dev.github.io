---
title: "Hermetic Testing"
description: "외부 의존성으로부터 완전히 격리된 자체 완결적 테스트 환경에서 실행되는 테스트로, 결정적인 결과를 보장하기 위해 외부 영향을 차단한다"
tags: ["Software Engineering", "Testing"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/testing/hermetic-testing
sidebar:
  order: 71
---

## 핵심 개념

비격리(non-hermetic) 테스트의 가장 큰 문제는 비결정성이다. 외부 서비스의 상태, 네트워크 상태, 다른 테스트의 부수 효과 등이 테스트 결과에 영향을 미칠 수 있다. Google에서는 가능한 한 허메틱 테스트를 선호하되, 프로덕션 환경 수준의 충실도가 필요한 경우에는 비허메틱 대형 테스트도 활용한다.

## 동작 원리

**허메틱 테스트의 접근 방식**:

1. **허메틱 SUT**: 테스트 대상 시스템의 모든 의존성을 테스트 환경 내에서 로컬로 실행한다. 외부 서비스를 허메틱 인스턴스로 대체하며, 이 인스턴스의 생명주기를 테스트가 통제한다.

2. **시드 데이터(Seed Data)**: 테스트 시작 전 알려진 상태로 초기화한다. 테스트 간 상태 공유를 방지한다.

3. **네트워크 격리**: 외부 네트워크 호출을 차단하고, 모든 통신이 테스트 환경 내에서만 이루어지도록 한다.

**허메틱 테스트의 장단점**:
- **장점**: 결정적, 재현 가능, 다른 테스트나 환경에 영향받지 않음
- **단점**: 설정이 복잡하고 비용이 클 수 있음, 프로덕션과의 차이로 인해 일부 문제를 놓칠 수 있음

## 예시

허메틱 통합 테스트 구성:
```
[테스트 프로세스]
    ├── 시스템 언더 테스트 (실제 바이너리)
    ├── 허메틱 데이터베이스 (로컬 인스턴스)
    ├── 허메틱 캐시 서버 (로컬 인스턴스)
    └── Fake 외부 서비스
```

테스트가 모든 컴포넌트의 시작과 종료를 통제하므로, 동일한 입력에 대해 항상 동일한 결과를 보장한다.

## 관련 개념

- [Larger Testing](/knowledge/software-engineering/testing/larger-testing/)
- [Test Fidelity](/knowledge/software-engineering/testing/test-fidelity/)
- [Flaky Tests](/knowledge/software-engineering/testing/flaky-tests/)
- [SUT Configuration](/knowledge/software-engineering/testing/sut-configuration/)
