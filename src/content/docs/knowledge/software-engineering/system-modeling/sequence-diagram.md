---
title: "Sequence Diagram"
description: "시퀀스 다이어그램은 시스템 내 객체(또는 액터)들 간의 상호작용을 시간 순서에 따라 표현하는 UML 동적 다이어그램이다"
tags: ['Sequence Diagram', 'Uml', 'Interaction', 'Message Passing', 'Dynamic Model']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/software-engineering/sequence-diagram
sidebar:
  order: 3
---

## 핵심 개념

시퀀스 다이어그램은 참여하는 객체들을 상단에 나열하고, 시간의 흐름을 위에서 아래로 표현한다. 객체 간에 교환되는 메시지는 화살표로 표시되며, 각 메시지의 매개변수와 반환 값을 명시할 수 있다. 시퀀스 다이어그램은 유스 케이스의 상세 시나리오를 표현하는 데 주로 사용되며, 시스템 테스트 시 테스트 케이스 설계의 기반이 되기도 한다. 대안 흐름은 alt/opt 프레임으로 표현된다.

## 예시

환자 정보 조회 시퀀스 다이어그램: Doctor → System: viewInfo(patientId) → System → Database: query(patientId) → Database → System: patientRecord → System → Doctor: displayRecord(patientRecord)

## 관련 개념

- [UML](/knowledge/software-engineering/uml/)
- [Use Cases](/knowledge/software-engineering/use-cases/)
- [Class Diagram](/knowledge/software-engineering/class-diagram/)
