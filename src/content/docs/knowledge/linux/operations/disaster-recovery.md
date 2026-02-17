---
title: "Disaster Recovery"
description: "재해 복구(Disaster Recovery)는 자연재해, 보안 침해, 장비 장애 등 예측 가능한 사태에 대비하여 IT 환경을 복구하기 위한 계획과 절차의 총체로, NIST 800-34 표준을 기반으로 구성된다"
tags: ['Disaster Recovery', 'Business Continuity', 'Risk Assessment', 'Backup', 'Nist 800 34', 'Failover']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/linux/disaster-recovery
sidebar:
  order: 9
---

## 핵심 개념

**위험 평가 (Risk Assessment):**
잠재적 재해 목록을 명시적으로 문서화해야 한다:
- 악의적 사용자 (외부 및 내부), 랜섬웨어
- 자연재해 (홍수, 화재, 지진, 허리케인)
- 전기 폭풍/전력 스파이크, 단기/장기 정전
- 냉각 장비 고장, ISP/클라우드 장애
- 하드웨어 장애, 네트워크 장비 장애
- 사용자 실수 (파일 삭제, 설정 손실, 비밀번호 분실)
- 내부 보안 침해가 전체 침해의 약 절반을 차지

**NIST 800-34 기반 복구 계획 구조:**
1. **도입**: 문서의 목적과 범위
2. **운영 개념**: 시스템 설명, 복구 목표, 정보 분류, 승계 체계, 책임
3. **통보 및 활성화**: 통보 절차, 피해 평가, 계획 활성화
4. **복구**: 손실 시스템 복구를 위한 일련의 이벤트와 절차
5. **정상 운영 복귀**: 병행 처리, 재구성 시스템 테스트, 계획 비활성화

**핵심 원칙:**
- 데이터 미러링만으로는 불충분 - 읽기 전용 오프라인 백업 필수
- 랜섬웨어와 악의적 해커는 오프라인 백업 없는 조직을 쉽게 파괴
- 클라우드(AWS EC2 등)는 재해 복구의 핵심 요소 - 전용 하드웨어 없이 수 분 내 원격 사이트 구축
- 네트워크 불가 시를 대비한 오프라인 문서(연락처, 절차서) 보관 필수

**재해 시 인력 관리:**
- 명확한 지휘 체계(chain of command) 수립
- 현장 관리자(sysadmin)가 IT 디렉터보다 적합할 수 있음
- 최소 정보 환경에서 어려운 결정을 내릴 수 있는 권한과 결단력 필요

## 예시

```bash
# 재해 지원 환경에 보관할 필수 데이터
# - 복구 절차 개요: 연락처, 대응 방법
# - 서비스 계약 전화번호와 고객 번호
# - 핵심 전화번호: 경찰, 소방서, 직원, 상사
# - 클라우드 벤더 로그인 정보
# - 백업 미디어 목록과 백업 스케줄
# - 네트워크 맵
# - 소프트웨어 시리얼 번호, 라이선스, 비밀번호
# - 소프트웨어 설치 미디어 (ISO)
# - 하드웨어/소프트웨어/클라우드 환경 구성 정보
# - 순차 시동 필요 시스템의 기동 지침

# AWS를 활용한 재해 복구 예시
aws ec2 run-instances \
    --image-id ami-12345678 \
    --instance-type t2.medium \
    --key-name dr-keypair \
    --security-group-ids sg-dr-group

# 오프라인 백업 확인
# - 라미네이트된 카드에 핵심 연락처/절차 인쇄
# - 지갑에 보관 가능한 크기
```

## 관련 개념

- [Data Center Tier](/knowledge/linux/data-center-tier/) - 데이터센터 가용성과 이중화
- [SLA](/knowledge/linux/sla/) - 서비스 수준 합의와 복구 목표
- [Incident Response](/knowledge/linux/incident-response/) - 보안 사고 대응 절차
- [CIA Triad](/knowledge/linux/cia-triad/) - 가용성(Availability) 보호
- [Compliance Standards](/knowledge/linux/compliance-standards/) - NIST 800-34 재해 복구 표준
