---
title: "UTP 케이블링 (UTP Cabling)"
description: "UTP(Unshielded Twisted Pair) 케이블링은 비차폐 꼬임 쌍선을 사용하는 이더넷의 주요 물리적 전송 매체로, Category 분류 체계에 따라 지원 대역폭이 결정되며 최대 100미터 길이까지 사용 가능하다"
tags: ['Utp', 'Cabling', 'Ethernet', 'Physical Layer', 'Cat6', 'Rj45']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/linux/utp-cabling
sidebar:
  order: 2
---

## 핵심 개념

UTP 케이블은 TIA(Telecommunications Industry Association)에서 정의한 8가지 카테고리로 분류된다:

- **Cat 5/5e**: 100 Mb/s ~ 1 Gb/s 지원. 현재 최소 기준
- **Cat 6/6a**: 1 Gb/s ~ 10 Gb/s 지원. 신규 설치에 권장되며, Cat 6a는 10BASE-T 등 구형 표준의 간섭에 특히 강함
- **Cat 7/7a**: 10 Gb/s 지원
- **Cat 8**: 40 Gb/s 지원

빠른 표준일수록 여러 쌍의 UTP가 필요하다: 100BASE-TX는 2쌍(Cat 5), 1000BASE-T는 4쌍(Cat 5e/6), 10GBASE-T는 4쌍(Cat 6a/7) 필요.

**피복 종류**: PVC 코팅(일반 환경)과 테플론 코팅(환기 덕트 내 설치 시 필수)이 있다. PVC는 화재 시 유독 가스를 발생시키므로 에어 플레넘(return air plenum)에서는 사용할 수 없다.

**RJ-45 단자 표준**: TIA/EIA-568A 표준을 따라 4쌍 UTP를 RJ-45 잭에 연결한다. 양쪽 끝의 배선이 일관되어야 한다.

**신규 설치 권장사항**: 현재 Cat 6a가 최적의 가성비를 제공한다. 케이블 설치 시 실제 필요량의 3~4배를 설치하는 것이 좋으며, 설치 비용의 대부분은 인건비이지 자재비가 아니다.

## 예시

```bash
# 일반적인 UTP 카테고리별 용도
# Cat 5e  : 1000BASE-T (1 Gb/s) - 기존 설치
# Cat 6a  : 10GBASE-T (10 Gb/s) - 신규 설치 권장
# Cat 7   : 10GBASE-T (10 Gb/s) - 고급 설치
# Cat 8   : 40GBASE-T (40 Gb/s) - 데이터센터

# 케이블 테스트 (Fluke LanMeter 등 사용)
# - 연속성 검사 (continuity test)
# - 길이 측정 (time domain reflectometry)
# - 누화 측정 (crosstalk measurement)
# - 대역폭 인증 (bandwidth certification)

# TIA/EIA-568A 핀 배치 (RJ-45):
# Pin 1: 흰녹   Pin 2: 녹
# Pin 3: 흰주황 Pin 4: 파랑
# Pin 5: 흰파랑 Pin 6: 주황
# Pin 7: 흰갈색 Pin 8: 갈색
```

## 관련 개념

- [이더넷 (Ethernet)](/knowledge/linux/ethernet/) - UTP가 전송하는 네트워크 프로토콜
- [광섬유 (Optical Fiber)](/knowledge/linux/optical-fiber/) - UTP의 대안적 물리적 매체
- [네트워크 토폴로지 (Network Topology)](/knowledge/linux/network-topology/) - UTP 기반 네트워크 설계
- [전원 공급 이더넷 (Power over Ethernet, PoE)](/knowledge/linux/power-over-ethernet/) - UTP를 통한 전력 공급
