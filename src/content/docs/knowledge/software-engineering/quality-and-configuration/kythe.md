---
title: "Kythe"
description: "컴파일러 기반 인덱싱을 통해 교차 참조(cross-references)를 제공하는 서비스로, 코드 심볼의 사용처를 전체 빌드 정보를 활용하여 동일 이름의 다른 심볼과 명확히 구분한다"
tags: ["Software Engineering", "Quality and Configuration"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/quality-and-configuration/kythe
sidebar:
  order: 207
---

## 핵심 개념

Kythe는 컴파일러 기반 인덱싱을 통해 교차 참조(cross-references)를 제공하는 서비스다. 빌드 워크플로를 계측(instrument)하여 소스 코드에서 의미론적 노드와 엣지를 추출한다. Code Search에서 Kythe 통합은 단순 텍스트 검색을 넘어 심볼의 의미론적 이해를 가능하게 한다.

## 동작 원리

Kythe의 추출 과정:
1. 각 빌드 규칙에 대한 부분적 교차 참조 그래프를 수집한다
2. 후속 단계에서 이 부분 그래프들을 하나의 전역 그래프로 병합한다
3. 가장 일반적인 쿼리(정의로 이동, 모든 사용처 찾기, 파일의 모든 데코레이션 가져오기)에 최적화한다

Code Search에서의 Kythe 통합:
- 파일을 볼 때 대부분의 토큰이 클릭 가능하다
- 함수 호출은 정의로, 임포트된 파일명은 실제 소스 파일로 연결된다
- 심볼 이름을 클릭하면 해당 심볼이 사용되는 모든 위치가 패널로 표시된다

**한계**: 교차 참조 인덱스는 검색 인덱스와 달리 증분 업데이트가 불가능하며, 하루 1회 빌드된다. Chromium의 경우 분산 환경에서 약 6시간이 소요된다.

## 예시

Kythe는 deprecation 프로세스에서도 중요한 역할을 한다. 정적으로 어떤 고객이 주어진 라이브러리를 사용하는지 판단하고, 기존 사용 패턴을 샘플링하여 예상치 못한 의존성을 파악하는 데 사용된다. vim, emacs, IntelliJ 등의 에디터/IDE에 플러그인으로 제공되어 로컬에서 코드베이스를 인덱싱할 수 없는 한계를 보완한다.

## 관련 개념

- [Code Search](/knowledge/software-engineering/quality-and-configuration/code-search/)
- [Code Search Indexing](/knowledge/software-engineering/quality-and-configuration/code-search-indexing/)
