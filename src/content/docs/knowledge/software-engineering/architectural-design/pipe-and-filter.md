---
title: "파이프와 필터 (Pipe and Filter)"
description: "파이프 앤 필터 아키텍처는 데이터 처리를 일련의 변환(필터) 단계로 구성하고, 각 단계의 출력이 다음 단계의 입력이 되도록 파이프로 연결하는 아키텍처 패턴이다"
tags: ['Pipe And Filter', 'Data Transformation', 'Pipeline', 'Unix Pipes', 'Architecture']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/software-engineering/pipe-and-filter
sidebar:
  order: 7
---

## 핵심 개념

각 필터는 독립적인 데이터 변환을 수행하며, 파이프는 필터 간에 데이터를 전달한다. 이 패턴은 UNIX 셸의 파이프라인에서 유래했으며, 데이터 변환이 순차적으로 이루어지는 시스템에 적합하다. 장점은 필터의 재사용성, 직관적인 이해, 병렬 처리 가능성이다. 단점은 각 필터 간에 공통 데이터 형식이 필요하고, 대화형 시스템에는 적합하지 않다는 것이다. 컴파일러, 데이터 처리 파이프라인, 신호 처리 시스템 등에서 사용된다.

## 예시

텍스트 처리 파이프라인: 입력 텍스트 → [토크나이저] → 토큰 스트림 → [구문 분석기] → AST → [의미 분석기] → 주석된 AST → [코드 생성기] → 기계 코드. UNIX 예: `cat file.txt | grep "error" | sort | uniq -c`

## 관련 개념

- [아키텍처 패턴 (Architectural Patterns)](/knowledge/software-engineering/architectural-patterns/)
- [소프트웨어 아키텍처 (Software Architecture)](/knowledge/software-engineering/software-architecture/)
