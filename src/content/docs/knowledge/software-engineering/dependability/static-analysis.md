---
title: "정적 분석 (Static Analysis)"
description: "프로그램의 소스 코드를 자동으로 스캔하여 가능한 결함과 이상(anomaly)을 탐지하는 소프트웨어 도구 기반의 검증 기법이다"
tags: ['Static Analysis', 'Verification', 'Automated Tool', 'Code Inspection', 'Defect Detection', 'Safety']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/software-engineering/static-analysis
sidebar:
  order: 12
---

## 핵심 개념

자동화된 정적 분석기는 프로그램 텍스트를 구문 분석하여 다양한 유형의 문장을 인식하고, 문장이 올바르게 구성되었는지 확인하며, 제어 흐름을 추론하고, 프로그램 데이터의 가능한 모든 값을 계산한다. 정적 분석은 데이터 결함(초기화되지 않은 변수, 배열 범위 위반 등), 제어 결함(도달 불가능한 코드), 입출력 결함, 인터페이스 결함, 저장소 관리 결함(메모리 누수) 등을 탐지할 수 있다. 세 수준의 검사가 있다: 특성 오류 검사, 사용자 정의 오류 검사, 단언(assertion) 검사. 정적 분석은 거짓 양성(false positives)을 많이 생성하는 단점이 있지만, 테스트되지 않는 코드 부분을 포함하여 프로그램의 모든 부분을 검사할 수 있다는 장점이 있다. Microsoft는 디바이스 드라이버 개발에서 정적 분석을 도입하고 보안 문제 검사로 확장했다.

## 예시

정적 분석이 탐지할 수 있는 결함 유형: 초기화 전 사용되는 변수, 선언되었으나 사용되지 않는 변수, 배열 범위 위반, 도달 불가능한 코드, 루프 내 무조건 분기, 매개변수 유형 불일치, 할당되지 않은 포인터, 메모리 누수 등.

## 관련 개념

- [정형 기법 (Formal Methods)](/knowledge/software-engineering/formal-methods/)
- [모델 검사 (Model Checking)](/knowledge/software-engineering/model-checking/)
- [안전 사례 (Safety Case)](/knowledge/software-engineering/safety-case/)
- [안전 필수 시스템 (Safety-Critical Systems)](/knowledge/software-engineering/safety-critical-systems/)
- [침투 테스팅 (Penetration Testing)](/knowledge/software-engineering/penetration-testing/)
