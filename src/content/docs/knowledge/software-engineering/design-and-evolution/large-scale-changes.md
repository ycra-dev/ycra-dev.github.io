---
title: "Large-Scale Changes"
description: "코드베이스 전체에 걸쳐 수행되는 광범위한 코드 수정으로, 작은 독립적 조각으로 분할되어 테스트, 리뷰, 커밋되는 프로세스"
tags: ["Software Engineering", "Refactoring", "Automation"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/design-and-evolution/large-scale-changes
sidebar:
  order: 300
---

## 핵심 개념

대규모 변경(Large-Scale Changes, LSC)은 코드베이스 전체에 걸쳐 수행되는 광범위한 코드 수정으로, 단일 원자적 커밋이 아닌 작은 독립적 조각(shards)으로 분할되어 테스트, 리뷰, 커밋된다. Google에서 코드베이스 변경의 10-20%가 LSC의 결과물이다.

## 동작 원리

코드베이스와 엔지니어 수가 증가하면 가능한 최대 원자적 변경 크기는 역설적으로 감소한다. LSC가 필요한 이유:

1. **기술적 한계**: 대부분의 VCS는 변경 크기에 선형적으로 확장되는 연산을 가짐
2. **머지 충돌**: 변경 크기가 커질수록 충돌 가능성 증가
3. **유령의 묘지(Haunted Graveyards) 방지**: 아무도 건드리지 못하는 고대 코드는 테스트로 극복
4. **이질성**: 컴퓨터가 대부분의 작업을 수행해야 하므로 환경 일관성 필요

LSC의 4단계 프로세스:
1. **승인(Authorization)**: 경험 있는 엔지니어 그룹의 경량 승인 프로세스
2. **변경 생성(Change Creation)**: 자동화 도구로 마스터 변경 생성
3. **샤드 관리(Shard Management)**: Rosie가 샤드로 분할하여 독립 처리
4. **정리(Cleanup)**: 마이그레이션 완료 후 이전 코드 제거

## 예시

`scoped_ptr`에서 `std::unique_ptr`로의 마이그레이션: Google 코드베이스에 500,000개 이상의 참조가 있었으며, 수개월에 걸쳐 하루 700건 이상의 독립적 변경(15,000개 이상의 파일)을 생성, 테스트, 커밋했다.

Operation RoseHub: 2017년 Apache Commons 취약점(Mad Gadget) 대응으로 50명 이상의 자원봉사자가 GitHub의 영향받는 프로젝트에 2,600건 이상의 패치를 보낸 사례이다.

## 관련 개념

- [Rosie](/knowledge/software-engineering/design-and-evolution/rosie/)
- [TAP Train](/knowledge/software-engineering/design-and-evolution/tap-train/)
- [LSC Infrastructure](/knowledge/software-engineering/design-and-evolution/lsc-infrastructure/)
- [Haunted Graveyards](/knowledge/software-engineering/design-and-evolution/haunted-graveyards/)
- [Presubmit Check](/knowledge/software-engineering/quality-and-configuration/presubmit-check/)
