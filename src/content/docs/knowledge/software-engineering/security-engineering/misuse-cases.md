---
title: "미스유스 케이스 (Misuse Cases)"
description: "시스템과의 악의적 상호작용을 나타내는 시나리오로, 가능한 위협을 논의하고 식별하여 시스템의 보안 요구사항을 도출하는 데 사용된다"
tags: ['Misuse Cases', 'Security Requirements', 'Threat Modeling', 'Use Case', 'Attack Scenario']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/software-engineering/misuse-cases
sidebar:
  order: 7
---

## 핵심 개념

오용 사례는 UML 사용 사례의 확장으로, 보안 요구사항 도출을 지원하기 위해 개발된 접근법이다. 오용 사례는 사용 사례 인스턴스와 연관되어 해당 사용 사례에 관련된 위협이나 공격을 나타내며, 사용 사례 다이어그램에 검은 타원으로 표현된다. 각 오용 사례에는 관련 액터, 설명, 데이터(자산), 공격 방법, 완화 조치, 요구사항이 포함된다. 오용 사례는 보안 요구사항 공학 프로세스의 일부로 사용될 수 있지만, 시스템과 직접 상호작용하지 않는 이해관계자와 관련된 위험도 고려해야 한다. 이 접근법은 요구사항 도출 시 사용 사례와 함께 사용하면 효과적이다.

## 예시

Mentcare 시스템의 "데이터 전송" 사용 사례에 대한 오용 사례 "전송 가로채기": 의료 접수원이 PC에서 서버로 데이터를 전송할 때, 공격자가 전송을 가로채서 데이터의 복사본을 가져간다. 공격 방법: (1) 네트워크 모니터 추가 및 패킷 가로채기, (2) 스푸프 서버 설정. 완화: 네트워크 장비 잠금 보관, 모든 데이터 전송 암호화, 인증서 기반 통신 사용. 요구사항: 클라이언트-서버 간 모든 통신은 SSL(https)을 사용해야 한다.

## 관련 개념

- [보안 위험 평가 (Security Risk Assessment)](/knowledge/software-engineering/security-risk-assessment/)
- [취약점 (Vulnerability)](/knowledge/software-engineering/vulnerability/)
- [보안 시스템 설계 (Secure Systems Design)](/knowledge/software-engineering/secure-systems-design/)
- [침투 테스팅 (Penetration Testing)](/knowledge/software-engineering/penetration-testing/)
