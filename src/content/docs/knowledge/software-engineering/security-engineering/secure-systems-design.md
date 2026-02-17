---
title: "Secure Systems Design"
description: "보안 문제를 시스템 설계 과정에서 고려하여 보안을 강화하는 설계 선택을 하는 것으로, 아키텍처 설계와 보안 설계 가이드라인의 적용을 포함한다"
tags: ['Secure Design', 'Security', 'Architecture', 'Design Guidelines', 'Protection', 'Compartmentalization']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/software-engineering/secure-systems-design
sidebar:
  order: 3
---

## 핵심 개념

보안 시스템 설계는 구현 후 보안을 추가하는 것이 매우 어렵기 때문에 설계 단계에서부터 보안을 고려해야 한다. 두 가지 근본적 이슈가 있다: 보호(핵심 자산을 외부 공격으로부터 어떻게 보호할 것인가)와 분산(성공적인 공격의 결과를 최소화하기 위해 자산을 어떻게 분산할 것인가)이며, 이 둘은 잠재적으로 상충된다. 10가지 보안 설계 가이드라인이 있다: 명시적 보안 정책 기반 결정, 심층 방어, 안전한 실패, 보안과 사용성의 균형, 사용자 행동 로깅, 이중화와 다양성, 시스템 입력 형식 지정, 자산 구획화, 배포를 위한 설계, 복구를 위한 설계. 보안 설계는 불가피하게 성능 및 사용성과의 타협을 수반한다.

## 예시

Mentcare 시스템의 분산 설계: 환자 개인 정보와 치료 정보를 분리하고 키로 연결하여, 공격자가 키 없이는 일상적 정보만 접근할 수 있고 개인과 연결할 수 없도록 한다. 세션 시작 시 로컬 클라이언트에 환자 기록을 복사하여 서버 장애 시에도 작업을 계속할 수 있지만, 노트북 도난 위험에 대비하여 클라이언트 기록을 암호화해야 한다.

## 관련 개념

- [Defense in Depth](/knowledge/software-engineering/defense-in-depth/)
- [Confidentiality, Integrity, and Availability](/knowledge/software-engineering/confidentiality-integrity-and-availability/)
- [Vulnerability](/knowledge/software-engineering/vulnerability/)
- [Security Risk Assessment](/knowledge/software-engineering/security-risk-assessment/)
- [Resilient Systems Design](/knowledge/software-engineering/resilient-systems-design/)
- [Redundancy and Diversity](/knowledge/software-engineering/redundancy-and-diversity/)
