---
title: "Architecting for Failure"
description: "개별 인스턴스의 장애를 정상적인 운영 조건으로 간주하고, 시스템이 자동으로 복구할 수 있도록 설계하는 원칙"
tags: ["Software Engineering", "Infrastructure", "Resilience"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/systems-and-services/architecting-for-failure
sidebar:
  order: 303
---

## 핵심 개념

장애 대비 아키텍처(Architecting for Failure)는 개별 인스턴스의 장애를 정상적인 운영 조건으로 간주하고, 시스템이 자동으로 복구할 수 있도록 설계하는 원칙이다. Borg 환경에서 스케줄러는 일방적으로 워커를 죽이고 다른 머신으로 옮길 수 있다.

## 동작 원리

200대의 머신에서 하나가 죽는 것은 상당히 가능성이 높으며, 이를 우아하게 처리하려면 아키텍처가 달라야 한다.

핵심 패턴:
1. **동적 작업 할당**: 정적 할당 대신, 작업을 작은 청크로 나누어 워커가 완료 시 다음 청크를 가져감. 워커 장애 시 최대 하나의 청크만 손실
2. **Graceful shutdown**: 서빙 작업의 경우, 스케줄러가 재스케줄링 의도를 미리 신호하고 컨테이너가 새 요청을 거부하면서 진행 중인 요청을 완료
3. **로드 밸런싱**: "새 요청을 받지 않겠다"는 응답을 이해하는 로드 밸런서 필요

서버가 "소(cattle)"라면 자동 복구가 가능하지만, 추가적인 노력이 필요하다: 적당한 실패율을 경험하면서도 원활하게 기능할 수 있어야 한다.

## 예시

배치 작업 사례: 100만 문서 처리를 200대에 분산. 정적 할당 시 워커 하나가 죽으면 50분의 처리 시간 손실. 동적 할당(1,000청크 x 1,000문서)으로 전환하면 최대 1청크만 손실.

MapReduce와 Flume: Google의 표준 데이터 처리 프레임워크로, 동적 작업 할당과 장애 대비가 기본 내장.

서빙 작업: 자연적으로 장애 저항에 더 적합 (개별 사용자 요청이 자연적으로 작은 청크). 하지만 "리더" 서버, 데이터 샤딩, 호스트명 기반 참조는 장애 대비를 어렵게 만듦.

## 관련 개념

- [Borg](/knowledge/software-engineering/systems-and-services/borg/)
- [Cattle vs Pets](/knowledge/software-engineering/design-and-evolution/cattle-vs-pets/)
- [Managing State](/knowledge/software-engineering/systems-and-services/managing-state/)
- [Batch vs Serving Jobs](/knowledge/software-engineering/systems-and-services/batch-vs-serving-jobs/)
