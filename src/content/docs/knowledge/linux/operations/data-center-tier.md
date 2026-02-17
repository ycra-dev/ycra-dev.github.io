---
title: "Data Center Tier"
description: "데이터센터 티어는 Uptime Institute가 개발한 4단계 신뢰성 분류 체계로, 전력, 냉각, 네트워크의 이중화 수준에 따라 데이터센터의 가용성을 등급화한다"
tags: ['Data Center', 'Reliability', 'Availability', 'Uptime Institute', 'Redundancy', 'Tier Classification']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/linux/data-center-tier
sidebar:
  order: 7
---

## 핵심 개념

**티어 분류 (Uptime Institute):**

| 티어 | 가용성 | 연간 다운타임 | 이중화 수준 |
|------|--------|--------------|------------|
| Tier I | 99.671% | ~29시간 | N (최소 필요량) |
| Tier II | 99.749% | ~22시간 | N+1 (1개 여분) |
| Tier III | 99.982% | ~1.6시간 | N+1, 이중 배전 |
| Tier IV | 99.995% | ~26분 | 2N (각 장치에 전용 여분) |

**핵심 개념:**
- **N**: 정상 운영에 필요한 최소한의 장비 수
- **N+1**: 필요량 + 여분 1개
- **2N**: 모든 장비에 대한 완전한 이중화

**Tier IV 요구사항:**
- "구획화(Compartmentalized)" 필수: 시스템 그룹별 독립적 전력/냉각
- 한 그룹의 장애가 다른 그룹에 영향을 주지 않아야 함

**중요 고려사항:**
- 99.671%도 연간 약 29시간 다운타임에 해당
- 인프라 이중화만으로는 가용성 보장 불가
- 부적절한 관리나 잘못된 아키텍처는 물리적 이중화를 무의미하게 함
- Uptime Institute 인증은 설계, 건설, 운영 단계를 포함하지만 인증비가 높음
- 인증 없이도 티어 개념의 공통 어휘와 평가 방법론을 활용하는 것이 핵심

**데이터센터 구성 요소:**
- 물리적 보안이 확보된 공간
- 서버/네트워크/스토리지 장비를 수용하는 랙 (19인치 표준)
- 전력 공급 및 백업 전원 (UPS, 발전기)
- 냉각 시스템
- 내부 및 외부 네트워크 연결
- 현장 운영 인력

## 예시

```
# 티어별 가용성 비교
Tier I:   99.671% → 28.8시간/년 다운타임
Tier II:  99.749% → 22.0시간/년 다운타임
Tier III: 99.982% →  1.6시간/년 다운타임
Tier IV:  99.995% →  0.4시간/년 다운타임 (26분)

# 이중화 수준 비교
# UPS 예시:
# N   = UPS 2대 필요 → 정확히 2대 설치
# N+1 = UPS 2대 필요 → 3대 설치 (1대 여분)
# 2N  = UPS 2대 필요 → 4대 설치 (각각 전용 백업)

# 랙 전력 티어 (별도 개념)
# Low:    3kW/랙  (네트워크 장비)
# Medium: 8kW/랙  (일반 서버)
# High:   15kW/랙 (고밀도 서버)
# Ultra:  20kW+/랙 (블레이드 서버 섀시)
```

## 관련 개념

- [UPS Power](/knowledge/linux/ups-power/) - 전력 이중화와 백업 전원 전략
- [Data Center Cooling](/knowledge/linux/data-center-cooling/) - 냉각 이중화와 환경 관리
- [PUE Energy Efficiency](/knowledge/linux/pue-energy-efficiency/) - 이중화와 에너지 효율의 균형
- [Disaster Recovery](/knowledge/linux/disaster-recovery/) - 데이터센터 장애 대비 복구 전략
