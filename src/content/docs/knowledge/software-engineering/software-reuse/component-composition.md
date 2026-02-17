---
title: "Component Composition"
description: "컴포넌트 합성(composition)은 컴포넌트들을 서로 통합하고, 특별히 작성된 \"글루 코드(glue code)\"와 결합하여 시스템이나 새로운 컴포넌트를 생성하는 프로세스이다"
tags: ['Component Composition', 'Glue Code', 'Adaptor', 'Sequential', 'Hierarchical', 'Additive', 'Integration']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/software-engineering/component-composition
sidebar:
  order: 10
---

## 핵심 개념

컴포넌트 합성에는 세 가지 유형이 있다. 순차적 합성(sequential composition)은 기존 컴포넌트를 순서대로 호출하여 새 컴포넌트를 만드는 것이다. 계층적 합성(hierarchical composition)은 한 컴포넌트가 다른 컴포넌트의 서비스를 직접 호출하는 것이다. 가산적 합성(additive composition)은 두 개 이상의 컴포넌트를 결합하여 기능을 합치는 것이다. 독립적으로 개발된 컴포넌트를 합성할 때 파라미터 비호환, 연산 비호환, 연산 불완전성 등의 인터페이스 비호환성이 발생할 수 있으며, 이를 해결하기 위해 어댑터(adaptor) 컴포넌트가 필요하다. 기능적 요구사항, 비기능적 요구사항, 적응 용이성 간의 트레이드오프를 고려해야 한다.

## 예시

주소 찾기 컴포넌트(addressFinder)와 지도 표시 컴포넌트(mapper)를 합성할 때, 위치 데이터에서 우편번호를 추출하는 postCodeStripper 어댑터를 사용한다:

```
address = addressFinder.location(phonenumber);
postCode = postCodeStripper.getPostCode(address);
mapper.displayMap(postCode, 10000);
```

## 관련 개념

- [Component-Based Software Engineering](/knowledge/software-engineering/component-based-software-engineering/)
- [Component Model](/knowledge/software-engineering/component-model/)
- [Software Reuse](/knowledge/software-engineering/software-reuse/)
- [Middleware](/knowledge/software-engineering/middleware/)
