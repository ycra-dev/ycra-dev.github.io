---
title: "코드로서의 문서 (Documentation as Code)"
description: "문서를 코드와 동일하게 취급하여 버전 관리, 코드 리뷰, 소유권 관리 등 기존 엔지니어링 워크플로우에 통합하는 접근 방식"
tags: ["Software Engineering", "Quality", "Documentation", "Engineering Culture"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/quality-and-configuration/documentation-as-code
sidebar:
  order: 54
---

## 핵심 개념

문서를 코드와 동일하게 취급하여 버전 관리, 코드 리뷰, 소유권 관리 등 기존 엔지니어링 워크플로우에 통합하는 접근 방식이다.

## 동작 원리

Google에서 가장 성공적인 문서화 노력은 문서를 코드처럼 취급했을 때 이루어졌다. 이는 다음을 의미한다:

1. **버전 관리**: 문서를 코드 저장소에 함께 보관하여 변경 이력을 추적한다
2. **코드 리뷰**: 문서 변경도 코드 리뷰 프로세스를 거치게 한다
3. **소유권**: 문서에도 명확한 소유자를 지정하여 관리 책임을 부여한다
4. **버그 추적**: 문서의 문제도 버그 트래커에서 관리한다

2010년대 후반의 엔지니어링 문서화 상태는 1980년대 후반의 소프트웨어 테스팅 상태와 유사하다. 모두가 개선이 필요하다고 인식하지만, 아직 조직적 차원에서 그 핵심 이점을 충분히 인정하지 못하고 있다. 문서화의 이점은 모두 하류(downstream)에 있기 때문에 작성자에게 즉각적인 이익을 주지 않지만, 테스팅에 대한 투자처럼 시간이 지나면서 보상을 받게 된다.

## 예시

Google에서는 g3doc이라는 도구를 사용하여 문서를 코드와 함께 소스 저장소에 보관한다. 엔지니어가 코드를 변경할 때 관련 문서도 함께 업데이트하며, 이 변경 사항은 동일한 코드 리뷰 프로세스를 거친다. 문서가 코드 옆에 존재하기 때문에 코드 변경 시 문서를 잊어버릴 가능성이 줄어든다.

## 관련 개념

- [코드 리뷰 (Code Review)](/knowledge/software-engineering/quality-and-configuration/code-review/)
- [문서 유형 (Documentation Types)](/knowledge/software-engineering/quality-and-configuration/documentation-types/)
- [문서 최신성 (Documentation Freshness)](/knowledge/software-engineering/quality-and-configuration/documentation-freshness/)
