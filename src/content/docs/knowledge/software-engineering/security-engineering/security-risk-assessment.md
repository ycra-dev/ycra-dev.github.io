---
title: "보안 위험 평가 (Security Risk Assessment)"
description: "조직의 정보 자산(시스템과 데이터)에 대한 위험을 식별하고 이해하기 위한 조직 활동으로, 자산 식별, 위협 식별, 공격 평가, 통제 식별을 포함한다"
tags: ['Security Risk Assessment', 'Threat Identification', 'Asset Analysis', 'Security', 'Organizational']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/software-engineering/security-risk-assessment
sidebar:
  order: 4
---

## 핵심 개념

보안 리스크 평가는 기술적 활동이 아닌 조직 활동이며, 예비 리스크 평가, 설계 리스크 평가, 운영 리스크 평가의 세 단계로 진행된다. 예비 리스크 평가는 시스템에 적용 가능한 일반적 위험을 식별하고 합리적 비용으로 적절한 보안 수준을 달성할 수 있는지 판단한다. 설계 리스크 평가는 기술적 시스템 설계 및 구현 결정에 의해 영향을 받으며 보안 요구사항의 변경이나 추가로 이어질 수 있다. 운영 리스크 평가는 시스템 사용과 발생 가능한 위험에 초점을 맞추며, 시스템 설치 후에도 계속된다. 리스크 평가 프로세스에는 자산 식별, 자산 가치 평가, 노출 평가, 위협 식별, 공격 평가, 통제 식별, 실현 가능성 평가, 보안 요구사항 정의의 8단계가 포함된다.

## 예시

Mentcare 시스템의 자산 분석에서 환자 데이터베이스는 "높은 가치"로 분류되며, 이 자산에 대한 위협으로 "권한 없는 사용자가 시스템 관리자로 접근" (낮은 확률, 통제: 물리적으로 안전한 특정 위치에서만 시스템 관리 허용)과 "권한 없는 사용자가 기밀 정보에 접근" (높은 확률, 통제: 생체 인증 또는 환자 정보 변경 로깅) 등이 식별된다.

## 관련 개념

- [취약점 (Vulnerability)](/knowledge/software-engineering/vulnerability/)
- [미스유스 케이스 (Misuse Cases)](/knowledge/software-engineering/misuse-cases/)
- [보안 시스템 설계 (Secure Systems Design)](/knowledge/software-engineering/secure-systems-design/)
- [위험 평가 (Risk Assessment)](/knowledge/software-engineering/risk-assessment/)
- [심층 방어 (Defense in Depth)](/knowledge/software-engineering/defense-in-depth/)
