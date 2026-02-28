---
title: "LSC Infrastructure"
description: "대규모 변경을 가능하게 하는 기술적, 사회적 도구의 집합으로, 변경 생성, 관리, 리뷰, 테스트를 위한 도구와 문화적 규범을 포함"
tags: ["Software Engineering", "Automation", "Tooling"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/design-and-evolution/lsc-infrastructure
sidebar:
  order: 304
---

## 핵심 개념

LSC 인프라(LSC Infrastructure)는 대규모 변경을 가능하게 하는 기술적, 사회적 도구의 집합이다. 변경 생성, 관리, 리뷰, 테스트를 위한 도구와 문화적 규범을 모두 포함한다.

## 동작 원리

Google의 LSC 인프라 핵심 구성요소:

1. **코드베이스 인사이트**: Kythe(시맨틱 인덱싱 도구)로 함수 호출자, 파생 클래스 등의 관계를 파악. ClangMR, JavacFlume, Refaster 등으로 AST 기반 변환을 대규모 병렬 수행
2. **변경 관리**: Rosie가 마스터 변경을 샤드로 분할하고 test-mail-submit 파이프라인 관리
3. **테스트**: TAP을 통한 전이적 테스트 실행, TAP Train으로 효율적 배치 테스트
4. **언어 지원**: 정적 타입 언어가 자동 변환에 훨씬 유리. 타입 앨리어싱, 포워딩 함수가 점진적 마이그레이션에 필수. 자동 포매터(google-java-format, clang-format)가 LSC 인프라의 핵심 부분

정책/문화: 경량 승인 프로세스(약 12명의 경험 있는 엔지니어가 감독), "글로벌 승인자" 제도, 코드 소유자의 신뢰 구축을 위한 FAQ와 실적 추적.

변경 생성 도구의 인간 노력은 코드베이스 크기에 대해 서브-선형적으로 확장되어야 한다. 500개 이상 편집 시 도구 사용이 더 효율적이다.

## 예시

- **ClangMR**: C++ AST 기반 변환을 MapReduce로 병렬 수행
- **Refaster**: 전후 코드 스니펫으로 분석기를 작성하는 도구
- **Kythe**: "이 함수의 호출자는 어디인가?" 같은 시맨틱 질의 지원

Python, Ruby, JavaScript 같은 동적 타입 언어는 LSC가 특히 어렵다. 개발자 생산성에 초점을 맞춘 언어가 유지보수에 더 어려운 경향이 있다.

## 관련 개념

- [Large-Scale Changes](/knowledge/software-engineering/design-and-evolution/large-scale-changes/)
- [Rosie](/knowledge/software-engineering/design-and-evolution/rosie/)
- [TAP Train](/knowledge/software-engineering/design-and-evolution/tap-train/)
