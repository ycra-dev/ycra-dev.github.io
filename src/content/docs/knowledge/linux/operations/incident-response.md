---
title: "Incident Response"
description: "인시던트 대응(Incident Response)은 보안 침해나 시스템 장애 발생 시 체계적으로 대응하기 위한 사전 계획된 절차와 역할 분담으로, 사고의 영향을 최소화하고 신속한 복구를 보장한다"
tags: ['Incident Response', 'Security', 'Breach', 'Forensics', 'Communication', 'Crisis Management']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/linux/incident-response
sidebar:
  order: 10
---

## 핵심 개념

**보안 인시던트의 특수성:**
- 웹사이트 하이재킹은 특히 신용카드 데이터를 처리하는 웹호스팅 기업에 치명적
- 고객, 미디어, 경영진으로부터 동시 문의 쇄도
- 신용카드 데이터 침해 시 법적 요구사항 준수 필요

**사전 계획해야 할 사항:**
- 누가 전화를 받을 것인가?
- 무엇을 말해야 하는가?
- 누가 책임자인가?
- 각 인원의 역할은 무엇인가?
- 법무팀을 보안 인시던트 계획에 포함

**트래픽 폭증 대비:**
- CNN/Reddit 등에서 사이트 장애가 보도되면 교통사고 구경 효과로 트래픽 25% 이상 급증
- 로드밸런서에서 초과 연결을 "현재 요청을 처리할 수 없습니다" 페이지로 라우팅
- 클라우드 오토스케일링으로 사전 대비

**인시던트 관리 정책 (ISO/IEC 27001:2013 프레임워크):**
- 정보 보안 정책, 외부 연결 합의
- 자산 관리 정책, 데이터 분류 체계
- 접근 제어 정책, 물리적 보안 정책
- 인시던트 관리 정책, 비즈니스 연속성 관리

**환경 분리 (DevOps 시대):**
- 별도 역할이 아닌 Git 등 저장소의 불변 감사 추적(immutable audit trail)으로 추적
- 자동화된 추적 프로세스를 통해 변경 적용
- 문제 발견 시 해당 커밋을 식별하고 일시적 우회로 복원

## 예시

```bash
# 인시던트 대응 체크리스트
# 1. 인시던트 식별 및 분류
# 2. 책임자(incident commander) 지정
# 3. 영향 범위 평가
# 4. 격리 조치 (네트워크 차단 등)
# 5. 증거 보존
# 6. 복구 수행
# 7. 사후 분석(post-mortem) 및 문서화

# 고가용성 대응 - 로드밸런서 설정 예시
# nginx에서 과부하 시 정적 페이지 반환
# location / {
#     error_page 503 /maintenance.html;
#     if ($maintenance) { return 503; }
# }

# 보안 인시던트 시 확인할 연락처 카드
# - CERT/보안팀 비상 연락처
# - 법무팀 담당자
# - 클라우드 벤더 서포트
# - 신용카드 처리 업체 (PCI DSS 관련)
# - 언론 대응 담당자
```

## 관련 개념

- [Disaster Recovery](/knowledge/linux/disaster-recovery/) - 재해 복구와 인시던트 대응의 관계
- [CIA Triad](/knowledge/linux/cia-triad/) - 보안의 3요소 보호
- [Intrusion Detection System](/knowledge/linux/intrusion-detection-system/) - 인시던트 탐지 시스템
- [Compliance Standards](/knowledge/linux/compliance-standards/) - PCI DSS, SOX 등 규정 준수 요구사항
- [Ticketing System](/knowledge/linux/ticketing-system/) - 인시던트 티켓 관리
