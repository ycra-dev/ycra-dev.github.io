---
title: "배치 작업 vs 서빙 작업 (Batch vs Serving Jobs)"
description: "배치 작업은 특정 작업을 완료하고 종료되는 프로그램이고, 서빙 작업은 무기한 실행되며 들어오는 요청을 처리하는 프로그램으로 두 유형은 서로 다른 특성과 장애 대비 패턴을 가짐"
tags: ["Software Engineering", "Infrastructure", "Distributed Systems"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/systems-and-services/batch-vs-serving-jobs
sidebar:
  order: 305
---

## 핵심 개념

배치 작업(Batch Jobs)은 특정 작업을 완료하고 종료되는 프로그램(데이터 처리, ML 학습 등)이고, 서빙 작업(Serving Jobs)은 무기한 실행되며 들어오는 요청을 처리하는 프로그램(검색 쿼리 서빙 등)이다. 두 유형은 서로 다른 특성과 장애 대비 패턴을 가진다.

## 동작 원리

두 유형의 작업은 전형적으로 다른 특성을 가진다:

| 구분 | 배치 작업 | 서빙 작업 |
|------|---------|---------|
| 관심사 | 처리 처리량 | 개별 요청 지연 |
| 실행 시간 | 단기 (분~시간) | 장기 (새 릴리스 때만 재시작) |
| 시작 시간 | 짧음 | 길 수 있음 |

배치 작업 장애 대비: MapReduce → Flume으로 진화. 작업을 작은 청크로 나누어 동적 할당.

서빙 작업은 자연적으로 장애에 더 강함 (개별 요청이 자연적 청크, 로드 밸런싱이 오래전부터 사용). 하지만 "리더" 서버, 데이터 샤딩, 호스트명 참조 등은 장애 대비를 어렵게 만든다.

**Borg의 통합 관리 효율성**: 서빙 작업의 여유(slack) 리소스에 배치 작업을 실행. 서빙 작업이 리소스가 필요하면 배치 작업에서 회수 (CPU 동결, RAM 킬). 결과: 배치 워크로드가 사실상 무료로 실행되거나, 서빙 워크로드가 실제 사용량만 지불.

## 예시

Google의 멀티테넌시 효율성: 서빙 작업이 머신의 CPU와 RAM 합계를 요구하면 추가 서빙 작업 배치 불가. 하지만 실제 사용률은 30%만. 나머지 70%에 배치 작업 배치 가능. 배치 작업은 처리량(수백 워커의 집계)에 관심이 있고 개별 복제본은 cattle이므로, 여유 용량을 기꺼이 활용한다.

서빙 작업의 멀티테넌시 추가 요구사항: 재스케줄링 스로틀링(50% 복제본을 한 번에 죽이면 안 됨), 사전 경고를 통한 graceful shutdown.

## 관련 개념

- [보그 (Borg)](/knowledge/software-engineering/systems-and-services/borg/)
- [서비스형 컴퓨팅 (Compute as a Service)](/knowledge/software-engineering/systems-and-services/compute-as-a-service/)
- [장애를 고려한 설계 (Architecting for Failure)](/knowledge/software-engineering/systems-and-services/architecting-for-failure/)
- [가축 vs 애완동물 (Cattle vs Pets)](/knowledge/software-engineering/design-and-evolution/cattle-vs-pets/)
