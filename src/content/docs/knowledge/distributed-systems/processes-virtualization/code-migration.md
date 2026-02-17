---
title: "Code Migration"
description: "코드 마이그레이션(Code Migration)은 프로그램을 한 머신에서 다른 머신으로 이동시켜 대상 머신에서 실행하는 것을 말한다"
tags: ['Code Migration', 'Weak Mobility', 'Strong Mobility', 'Process Migration', 'Federated Learning', 'Mobile Agent']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/distributed-systems/code-migration
sidebar:
  order: 5
---

## 핵심 개념

**코드 마이그레이션의 동기**:
1. **성능**: 데이터가 있는 곳에서 처리하여 네트워크 부하 감소. 데이터 센터에서 에너지 최적화를 위해 VM을 경부하 머신으로 이전.
2. **프라이버시/보안**: 연합 학습(Federated Learning)에서 민감한 데이터를 중앙에 수집하지 않고, 모델을 데이터가 있는 곳으로 이동시켜 훈련.
3. **유연성**: 클라이언트가 서버에 바인딩할 때 동적으로 클라이언트 측 소프트웨어를 다운로드. 동적 웹의 핵심 원리.

**프로세스의 3가지 세그먼트** (Fuggetta et al. 모델):
- **코드 세그먼트**: 실행할 프로그램의 명령어 집합
- **리소스 세그먼트**: 파일, 프린터, 장치 등 외부 리소스에 대한 참조
- **실행 세그먼트**: 현재 실행 상태 (데이터, 스택, 프로그램 카운터)

**4가지 코드 이동성 패러다임**:
- **클라이언트-서버(CS)**: 코드, 실행, 리소스 모두 서버에 위치
- **원격 평가(REV)**: 클라이언트가 서버로 코드를 보내 실행 (송신자 주도)
- **코드 온 디맨드(CoD)**: 클라이언트가 서버에서 코드를 가져와 실행. Java 애플릿이 대표적 (수신자 주도)
- **모바일 에이전트(MA)**: 코드와 실행 상태를 함께 이동 (송신자 주도)

**약한 이동성 vs 강한 이동성**:
- **약한 이동성(Weak Mobility)**: 코드 세그먼트만 전송. 대상에서 새로 시작. 구현이 단순하고 이식성만 요구. Java 애플릿, 웹 스크립트가 예.
- **강한 이동성(Strong Mobility)**: 실행 세그먼트도 전송. 중단된 지점에서 재개 가능하나 OS 의존 데이터 때문에 구현이 매우 어려움. 원격 클로닝도 강한 이동성의 일종.

**가상 머신 마이그레이션**: pre-copy 방식 - 메모리 페이지를 먼저 복사하고 수정된 페이지를 재전송한 후 짧은 stop-and-copy 단계로 완료. 다운타임 60ms~4초, 전체 마이그레이션 수십 초 소요.

**연합 학습(Federated Learning)**: 부분 훈련된 모델을 데이터가 있는 로컬에 보내 추가 훈련 → 업데이트된 모델들을 서버에서 집계 → 반복. 코드 마이그레이션 관점에서는 비교적 단순.

## 예시

```
# 4가지 코드 이동성 패러다임 비교

         실행 전                  실행 후
         Client    Server        Client    Server
CS       -         code/exec/res -         code/exec*/res
REV      code →    exec/res      -         code/exec*/res
CoD      exec/res  ← code        code/exec*/res  ←
MA       code/exec → res         res →     code/exec*/res

# 연합 학습 흐름
# 1. 서버가 초기 모델을 클라이언트들에 배포
# 2. 각 클라이언트가 로컬 데이터로 모델 훈련 (가중치 조정)
# 3. 업데이트된 모델을 서버로 전송
# 4. 서버가 모델들을 집계 (aggregation)
# 5. 집계된 모델을 다시 클라이언트에 배포 → 2번으로 반복

# VM 마이그레이션 (pre-copy 방식)
# Phase 1: 메모리 페이지 복사 (실행 중)
# Phase 2: 수정된 dirty 페이지 재전송 (실행 중)
# Phase 3: VM 중지 → 남은 dirty 페이지 복사 → 새 VM 시작
# → 다운타임: 60ms ~ 4초
```

## 관련 개념

- [Virtualization](/knowledge/distributed-systems/virtualization/)
- [Container](/knowledge/distributed-systems/container/)
- [Cloud Computing](/knowledge/distributed-systems/cloud-computing/)
- [Distributed System](/knowledge/distributed-systems/distributed-system/)
- [Distribution Transparency](/knowledge/distributed-systems/distribution-transparency/)
