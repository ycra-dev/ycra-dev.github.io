---
title: "Compliance Standards"
description: "IT 컴플라이언스 표준은 조직의 정보 시스템 보안, 감사, 거버넌스를 규정하는 법률적 요구사항과 자발적 프레임워크의 총체로, SOX, HIPAA, PCI DSS, FISMA, ISO 27001 등이 대표적이다"
tags: ['Compliance', 'Regulations', 'Sox', 'Hipaa', 'Pci Dss', 'Fisma', 'Nist', 'Iso 27001', 'Itil', 'Audit']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/linux/compliance-standards
sidebar:
  order: 12
---

## 핵심 개념

**주요 법률적 규제:**
- **SOX (Sarbanes-Oxley Act)**: 모든 상장 기업에 적용. 주주를 회계 오류와 부정 행위로부터 보호. IT 일반 통제(ITGC) 포함
- **HIPAA (Health Insurance Portability and Accountability Act)**: PHI(Protected Health Information)를 전송/저장하는 조직에 적용. 건강 정보 보안
- **PCI DSS (Payment Card Industry Data Security Standard)**: 신용카드 결제를 수행하는 모든 조직에 적용. 소규모 자체 평가, 대규모 제3자 감사
- **FISMA (Federal Information Security Management Act)**: 모든 정부 기관과 계약자에 적용. NIST 보안 출판물 준수 요구
- **COPPA**: 13세 미만 어린이 정보 수집/저장 조직에 적용
- **FERPA**: 연방 교육 지원을 받는 모든 기관에 적용. 학생 정보 보호
- **GLBA (Gramm-Leach-Bliley Act)**: 금융 기관의 소비자 개인정보 사용 규제

**자발적 프레임워크:**
- **ISO 27001:2013 / ISO 27002:2013**: IT 조직을 위한 보안 관련 모범 사례 모음. IT 정책의 기초로 활용
- **COBIT**: 정보 관리 모범 사례를 체계화하는 자발적 프레임워크. ISACA/ITGI에서 개발. 5개 도메인, 37개 고위 프로세스
- **NERC CIP**: 전력, 전화, 금융 등 핵심 인프라 시스템 보호 표준
- **ITIL**: 과거 IT 서비스 관리의 사실상 표준이었으나, 무거운 프로세스와 사일로화된 기능으로 대부분 부정적 결과. DevOps가 anti-ITIL로 간주됨

**NIST 주요 출판물:**
- **NIST 800-53**: 연방 정보 시스템 보안 통제 권장사항. 자체 개발 민감 정보 애플리케이션 보안 평가에 유용. 100페이지 이상의 상세 문서
- **NIST 800-34**: IT 시스템 비상 계획 가이드. 재해 복구 바이블. 핵심 시스템 우선순위, 생존 기간, 복구 방법 등 질문에 답변

**정책과 절차의 구분:**
- **정책(Policy)**: 요구사항/규칙 정의 (높은 수준, 변경 빈도 낮음)
- **절차(Procedure)**: 요구사항 충족 방법 설명 (아키텍처/시스템 변경 시 지속 진화)

## 예시

```
# 적용 가능한 규제 판별 가이드
# 상장 기업 → SOX
# 건강 정보 취급 → HIPAA
# 신용카드 결제 → PCI DSS
# 정부 기관/계약자 → FISMA + NIST 800-53
# 아동 정보 수집 → COPPA
# 교육 기관 → FERPA
# 금융 기관 → GLBA
# 핵심 인프라 → NERC CIP

# 추천 프레임워크 (비규제 조직)
# NERC CIP: 광범위한 적용 가능성
# NIST 800-53: 철저한 보안 평가
# ISO 27001: IT 정책 기초

# NIST 800-34 재해 복구 계획 핵심 질문
# 1. 어떤 시스템이 가장 중요한가?
# 2. 이 시스템 없이 얼마나 버틸 수 있는가?
# 3. 주 데이터센터를 잃으면 어떻게 복구할 것인가?
```

## 관련 개념

- [Disaster Recovery](/knowledge/linux/disaster-recovery/) - NIST 800-34 재해 복구 표준
- [SLA](/knowledge/linux/sla/) - 서비스 수준과 규정 준수의 관계
- [CIA Triad](/knowledge/linux/cia-triad/) - 보안의 기본 원칙과 규제의 목적
- [Incident Response](/knowledge/linux/incident-response/) - 인시던트 관리 정책
- [DevOps](/knowledge/linux/devops/) - ITIL에서 DevOps로의 전환
