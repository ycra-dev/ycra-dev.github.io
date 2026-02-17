---
title: "Data Center Cooling"
description: "데이터센터 냉각은 서버와 네트워크 장비를 안전한 작동 온도 범위 내로 유지하기 위한 환경 관리 시스템으로, ASHRAE 가이드라인에 따라 서버 입구 온도 18~27도C를 권장한다"
tags: ['Data Center', 'Cooling', 'Hvac', 'Hot Aisle', 'Cold Aisle', 'Ashrae', 'Temperature']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/linux/data-center-cooling
sidebar:
  order: 5
---

## 핵심 개념

**ASHRAE 온도/습도 가이드라인:**
- 서버 입구 온도: 18~27도C (64.4~80.6도F) - 2012년 완화된 기준
- 습도: 8%~60% 유지
- 습도 과도 저하 → 정전기 문제, 과도 상승 → 결로 및 단락/산화

**핫 에일/콜드 에일 배치:**
- 랙을 교대 배치하여 콜드 에일(냉기 흡입)과 핫 에일(배기) 분리
- 콜드 에일에만 천공 바닥 타일 배치
- 인접 랙의 배기면이 서로 마주보도록(back-to-back) 배열
- 장비가 항상 냉기를 흡입하고 다른 서버의 배기를 흡입하지 않도록 최적화

**냉각 방식:**
- **CRAC(Computer Room Air Conditioner)**: 레이즈드 플로어 하부로 냉기 공급, 천장으로 배기 수집
- **인로우 냉각(In-Row Cooling)**: APC 등 제조사의 랙 사이 설치형 냉각 유닛. 레이즈드 플로어 불필요
- 냉매 루프(냉각수, Puron/R410A, R22)를 통해 열을 외부로 배출

**냉각 부하 산정:**
- 전자 장비 열부하: 전력 소비량 × 3.413 BTUH/watt
- 조명: 형광등 × 40W × 3.413 BTUH/watt
- 인원: 1인당 300 BTUH
- 총 냉각 부하를 톤으로 변환: BTUH / 12,000
- 최소 50% 여유분(slop factor) 적용

## 예시

```bash
# 냉각 부하 계산 예시
# 서버 25대 × 450W = 11,250W
# 11,250W × 3.413 BTUH/W = 38,396 BTUH (전자장비)
# 형광등 6개 × 160W = 960W → 3,276 BTUH (조명)
# 인원 4명 × 300 = 1,200 BTUH (인원)
# 벽/지붕/창문 = 20,000 BTUH (HVAC 팀 산정)
# 총합 = 62,872 BTUH
# 톤 변환: 62,872 / 12,000 = 5.24톤
# 50% 여유: 5.24 × 1.5 ≈ 7.86톤 → 8톤 냉각 필요

# 온도 모니터링
# Sensaphone 등 자동 환경 감시 장치 사용
# 온도, 소음, 전력 이상 시 전화/문자 알림

# 적외선 온도계로 핫/콜드 에일 온도 확인
# Fluke 62: 최대 6피트 거리에서 즉각 온도 측정
```

## 관련 개념

- [UPS Power](/knowledge/linux/ups-power/) - 전력과 냉각의 상호 의존성
- [PUE Energy Efficiency](/knowledge/linux/pue-energy-efficiency/) - 냉각 오버헤드와 에너지 효율
- [Data Center Tier](/knowledge/linux/data-center-tier/) - 냉각 이중화와 가용성 등급
