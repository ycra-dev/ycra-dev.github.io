---
title: "Rosie"
description: "Google의 대규모 변경(LSC) 인프라의 핵심 도구로, 마스터 변경을 작은 샤드로 분할하고 독립적으로 테스트-리뷰-커밋하는 파이프라인을 관리하는 플랫폼"
tags: ["Software Engineering", "Automation", "Google Tools"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/design-and-evolution/rosie
sidebar:
  order: 301
---

## 핵심 개념

Rosie는 Google의 대규모 변경(LSC) 인프라의 핵심 도구로, 마스터 변경을 프로젝트 경계와 소유권 규칙에 따라 작은 샤드(shard)로 분할하고 독립적으로 테스트-리뷰-커밋하는 파이프라인을 관리하는 플랫폼이다.

## 동작 원리

Rosie는 단순한 도구가 아니라 Google 규모에서 LSC를 수행하기 위한 전체 플랫폼이다.

작동 방식:
1. 큰 변경을 프로젝트 경계 기준으로 원자적 커밋 가능한 단위로 샤드화
2. 각 샤드를 독립적 test-mail-submit 파이프라인에 넣음
3. Google 개발 인프라의 부하를 고려하여 동시 처리 샤드 수를 제한
4. 낮은 우선순위로 실행하며 공유 테스트 인프라에 적절한 부하만 생성

개별 변경은 "cattle vs pets" 접근법을 따른다: LSC에서의 변경은 "소(cattle)"처럼 취급되어 언제든 롤백되거나 거부될 수 있다. 자동화를 통해 도구를 업데이트하고 새 변경을 매우 낮은 비용으로 생성할 수 있으므로 일부 손실은 문제가 되지 않는다.

각 샤드의 처리 과정:
- **테스트**: TAP(Google CI 프레임워크)를 통해 영향받는 모든 테스트를 전이적으로 실행
- **리뷰**: LSC의 성격에 따라 단일 "글로벌 승인자"가 리뷰 (로컬 프로젝트 소유자가 아닌)
- **제출**: 테스트와 리뷰를 통과한 샤드만 제출

## 예시

대부분의 샤드는 1,000개 미만의 테스트에 영향을 미치며, 더 많은 경우 배치로 그룹화하여 효율성을 높인다. `scoped_ptr` → `std::unique_ptr` 마이그레이션 시 Rosie는 하루 700건 이상의 독립적 변경을 처리했다.

## 관련 개념

- [Large-Scale Changes](/knowledge/software-engineering/design-and-evolution/large-scale-changes/)
- [TAP Train](/knowledge/software-engineering/design-and-evolution/tap-train/)
- [Cattle vs Pets](/knowledge/software-engineering/design-and-evolution/cattle-vs-pets/)
- [LSC Infrastructure](/knowledge/software-engineering/design-and-evolution/lsc-infrastructure/)
