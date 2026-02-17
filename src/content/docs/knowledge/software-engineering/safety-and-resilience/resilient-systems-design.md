---
title: "Resilient Systems Design"
description: "소프트웨어 장애와 사이버 공격에 저항하고 복구할 수 있도록, 핵심 서비스와 자산을 식별하고 인식, 저항, 복구, 복원을 지원하는 시스템 구성요소를 설계하는 과정이다"
tags: ['Resilient Design', 'Resilience Engineering', 'Recovery Planning', 'Critical Services', 'System Architecture']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/software-engineering/resilient-systems-design
sidebar:
  order: 8
---

## 핵심 개념

회복탄력적 시스템 설계는 두 가지 밀접하게 관련된 작업 흐름을 포함한다: (1) 핵심 서비스와 자산 식별, (2) 문제 인식, 저항, 복구, 복원을 지원하는 시스템 구성요소 설계. 회복탄력성 공학 방법에는 다섯 가지 작업 흐름이 있다: 비즈니스 회복탄력성 요구사항 식별, 시스템 복원 계획, 시스템 장애와 사이버 공격 식별 및 인식/저항 전략 설계, 핵심 서비스의 빠른 복구 계획, 모든 회복탄력성 계획의 테스트. 회복탄력성 테스팅은 가능한 시스템 장애와 사이버 공격을 시뮬레이션하여 회복탄력성 계획이 예상대로 작동하는지 확인하는 것으로, 운영 시스템에서 수행할 수 없으므로 비용이 높다. "데스크 테스팅"은 비용을 줄이기 위해 실제 시뮬레이션 없이 반응을 테스트하는 방법이다.

## 예시

Mentcare 시스템의 회복탄력적 아키텍처: (1) 요약 환자 기록을 로컬 클라이언트에 유지하여 서버 비가용 시에도 핵심 정보에 접근 가능, (2) 피어투피어 통신으로 클라이언트 간 정보 교환, (3) 정기적 데이터베이스 스냅샷을 위한 백업 서버로 주 서버 장애 시 전체 시스템 역할 수행, (4) 데이터베이스 무결성 검사 및 복구 소프트웨어로 손상 감지 및 백업에서 자동 복구.

## 관련 개념

- [Resilience](/knowledge/software-engineering/resilience/)
- [Recognition, Resistance, Recovery, and Reinstatement](/knowledge/software-engineering/recognition-resistance-recovery-and-reinstatement/)
- [Cybersecurity](/knowledge/software-engineering/cybersecurity/)
- [Redundancy and Diversity](/knowledge/software-engineering/redundancy-and-diversity/)
- [Sociotechnical Resilience](/knowledge/software-engineering/sociotechnical-resilience/)
- [Secure Systems Design](/knowledge/software-engineering/secure-systems-design/)
