---
title: "Cattle vs Pets"
description: "분산 컴퓨팅 환경에서 개별 인스턴스를 다루는 두 방식의 비유로, 소는 대체 가능한 익명의 인스턴스를, 반려동물은 고유하고 수동 관리되는 인스턴스를 의미"
tags: ["Software Engineering", "Infrastructure", "DevOps"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/design-and-evolution/cattle-vs-pets
sidebar:
  order: 305
---

## 핵심 개념

소(Cattle) vs 반려동물(Pets)은 분산 컴퓨팅 환경에서 개별 머신이나 인스턴스를 다루는 방식의 비유이다. "소"는 대체 가능한 익명의 인스턴스를, "반려동물"은 고유하고 수동 관리되는 인스턴스를 의미한다. 이 비유는 인프라뿐 아니라 코드베이스 내의 변경에도 동일하게 적용된다.

## 동작 원리

**반려동물(Pets)**: 엔지니어가 며칠~몇 주 동안 작업하는 개별 변경. 깊이 이해하고 최종 커밋에 자부심을 느낌. 거부를 개인적으로 받아들이기 쉬움. 서버가 반려동물이면 유지보수 부담이 플릿 크기에 선형 또는 초선형으로 증가한다.

**소(Cattle)**: LSC에서 자동 생성되는 대량의 변경. 이름 없고 얼굴 없는 커밋으로, 언제든 롤백되거나 거부될 수 있다. 자동화로 도구를 업데이트하고 새 변경을 매우 낮은 비용으로 생성할 수 있으므로 일부 손실은 문제가 되지 않는다. 서버가 소면 장애 후 자동 복구가 가능하고 주말에 서버를 간호할 필요가 없다.

구별 특성: 인간 수동 설정 없이 새 인스턴스를 완전 자동으로 찍어낼 수 있는가.

## 예시

- LSC에서 700건/일의 변경을 생성할 때, 머지 충돌이나 예상치 못한 테스트 실패로 일부가 거부되는 것은 정상 (소처럼 취급)
- Borg에서 스케줄러가 일방적으로 워커를 죽이고 다른 머신으로 옮길 수 있음. 인간 개입 없이 새 인스턴스 생성이 가능해야 함
- Netflix의 Chaos Monkey: 프로덕션에서 임의로 인스턴스를 종료하여 인프라가 cattle 모델로 설계되었는지 검증

## 관련 개념

- [Large-Scale Changes](/knowledge/software-engineering/design-and-evolution/large-scale-changes/)
- [Rosie](/knowledge/software-engineering/design-and-evolution/rosie/)
- [Architecting for Failure](/knowledge/software-engineering/systems-and-services/architecting-for-failure/)
- [Borg](/knowledge/software-engineering/systems-and-services/borg/)
