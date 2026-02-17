---
title: "UPS Power"
description: "UPS(Uninterruptible Power Supply)는 상용 전원이 중단될 때 서버와 네트워크 장비에 지속적인 전력을 공급하는 장치로, 수 분에서 수 시간까지 백업 전력을 제공하지만 장기 정전에는 발전기가 필요하다"
tags: ['Data Center', 'Power', 'Ups', 'Generator', 'Redundancy', 'Availability']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/linux/ups-power
sidebar:
  order: 4
---

## 핵심 개념

**전력 공급 전략:**
- **UPS**: 상용 전원 중단 시 배터리 기반 단기 전력 공급. 용량에 따라 수 분~수 시간 지속
- **현장 발전기**: 디젤, LP 가스, 천연가스 연료. 연료가 있는 한 장기 전력 공급 가능. 최소 72시간분 연료 현장 저장 권장
- **이중 전원 피드**: 상용 전력망에서 복수의 전원 공급선 확보 (가능한 경우)

**UPS 관리:**
- 이더넷 또는 USB 인터페이스를 통해 서버 또는 중앙 모니터링 시스템에 연결
- 전원 장애 시 배터리 소진 전 안전한 셧다운 경고 전송
- 발전기가 있으면 UPS 용량은 발전기 기동까지의 갭만 커버하면 됨

**전력 계획:**
- kVA(킬로볼트암페어)와 kW(킬로와트) 변환: kVA = kW / 0.85
- 장비의 **실제 전력 소비량 측정** 권장 (제조사 라벨값은 최대치로 오해의 소지)
- 랙 단위 전력 소비 모델로 계획 (면적 기반보다 정확)
- 전력 소비 티어 시스템: Low(3kW), Medium(8kW), High(15kW), Ultra(20kW+) 등급

**테스트 필수:**
- 최소 6개월마다 전체 백업 전원 시스템 테스트
- 연 1회 이상 예방 정비 수행

## 예시

```bash
# 서버의 UPS 상태 모니터링 (apcupsd 사용 예)
apcaccess status

# UPS 연결 상태 확인
sudo lsusb | grep -i ups

# 전원 장애 시 자동 셧다운 설정 (/etc/apcupsd/apcupsd.conf)
# TIMEOUT 60       # 60초 후 셧다운
# ONBATTERYDELAY 6 # 6초 대기 후 이벤트 발생

# 전력 소비 측정 (Kill A Watt 미터: 15A 이하 소형 부하)
# 대형 부하: Fluke 902 클램프 전류계 사용

# kVA ↔ kW 변환 예시
# 서버가 450W 사용 → kVA = 0.45 / 0.85 ≈ 0.53 kVA
```

## 관련 개념

- [Data Center Tier](/knowledge/linux/data-center-tier/) - 데이터센터 가용성 등급과 전력 이중화
- [Data Center Cooling](/knowledge/linux/data-center-cooling/) - 전력과 냉각의 상호 의존성
- [PUE Energy Efficiency](/knowledge/linux/pue-energy-efficiency/) - 전력 사용 효율성 지표
