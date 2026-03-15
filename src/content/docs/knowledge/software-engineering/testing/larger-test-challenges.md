---
title: "대형 테스트의 과제 (Larger Test Challenges)"
description: "대형 테스트를 작성하고 유지보수할 때 직면하는 고유한 어려움들로, 소유권, 비결정성, 인프라 비용, 디버깅 난이도 등이 포함된다"
tags: ["Software Engineering", "Testing"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/testing/larger-test-challenges
sidebar:
  order: 74
---

## 핵심 개념

대형 테스트는 소형 테스트와 다른 고유한 문제들을 가진다. 대형 테스트만으로는 부족하며, 소형 테스트로 보완해야 한다. 대형 테스트 인프라에 투자하여 설정과 관리를 자동화하는 것이 중요하다.

## 동작 원리

**1. 소유권(Ownership)**:
- 단위 테스트는 코드 작성자가 소유하지만, 대형 테스트는 여러 팀의 코드가 관여한다
- 테스트가 실패하면 누가 수정 책임이 있는지 불분명하다
- Google에서는 대형 테스트의 소유권을 명확히 지정하는 것이 중요하다고 강조한다

**2. 비결정성(Nondeterminism)**:
- 네트워크, 타이밍, 리소스 경쟁 등으로 인해 불안정하다
- 동일한 코드에 대해 때로는 성공, 때로는 실패한다
- 엔지니어들이 테스트 결과를 무시하게 만들 수 있다

**3. 인프라 비용**:
- 대형 테스트는 더 많은 컴퓨팅 리소스를 요구한다
- 여러 서비스를 실행하고 초기화하는 시간이 필요하다

**4. 디버깅 난이도**:
- 실패 시 원인이 여러 서비스에 분산되어 있을 수 있다
- 로그가 여러 시스템에 산재한다
- 재현이 어렵다

**5. 테스트 데이터 관리**:
- 현실적인 테스트 데이터를 생성하고 관리하는 것이 복잡하다
- 민감한 데이터는 사용할 수 없으므로 대체 데이터가 필요하다

## 예시

소유권 문제의 실제 사례: 서비스 A의 E2E 테스트가 서비스 B의 변경으로 인해 실패한다. 서비스 A 팀은 자신들의 코드를 변경하지 않았으므로 실패를 무시하고, 서비스 B 팀은 해당 테스트의 존재를 모른다. 결과적으로 테스트 실패가 장기간 방치된다.

## 관련 개념

- [대형 테스팅 (Larger Testing)](/knowledge/software-engineering/testing/larger-testing/)
- [불안정 테스트 (Flaky Tests)](/knowledge/software-engineering/testing/flaky-tests/)
- [테스트 충실도 (Test Fidelity)](/knowledge/software-engineering/testing/test-fidelity/)
- [SUT 구성 (SUT Configuration)](/knowledge/software-engineering/testing/sut-configuration/)
