---
title: "Optical Fiber"
description: "광섬유(Optical Fiber)는 빛을 이용하여 데이터를 전송하는 네트워크 케이블링 매체로, 구리 케이블보다 긴 전송 거리와 전기적 간섭에 대한 내성을 제공하며, 멀티모드와 싱글모드 두 가지 유형으로 구분된다"
tags: ['Optical Fiber', 'Fiber Optic', 'Physical Layer', 'Networking', 'Multimode', 'Single Mode']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/linux/optical-fiber
sidebar:
  order: 3
---

## 핵심 개념

**멀티모드(Multimode) 광섬유**: 여러 광선을 동시에 전송할 수 있어 저가의 전자장치(LED 광원 등)를 사용할 수 있다. 주로 건물 내부 또는 캠퍼스 내 연결에 사용된다. OM1(62.5/125um, 주황색)~OM4(50/125um, 자주색) 분류가 있으며, 같은 주황색이라도 OM1과 OM2는 호환되지 않으므로 케이블에 인쇄된 규격을 확인해야 한다.

**싱글모드(Single Mode) 광섬유**: 단일 광선만 전송하며 정밀한 전자장치가 필요하지만, 장거리(도시 간, 주 간) 전송에 적합하다. OS1(9/125um, 노란색) 분류가 있다.

**CWDM(Coarse Wavelength Division Multiplexing)**: 하나의 광섬유에 여러 파장(색상)의 빛을 다중화하여 대역폭을 증가시키는 기술이다. 기존 다크 파이버 링크의 용량을 확장하는 데에도 사용된다.

**핵심 규칙**: 양 끝점의 광섬유, 크로스커넥트 케이블, 엔드포인트 전자장치가 모두 동일한 유형과 크기여야 한다. 불일치 시 분리하기 어려운 문제가 발생한다.

30종 이상의 커넥터 유형이 존재하며, 사용할 커넥터는 장비 벤더나 기존 건물 광섬유 인프라에 의해 결정된다.

## 예시

```bash
# TIA-598C 광섬유 색상 코딩
# OM1 (62.5/125um) : 주황색 - 멀티모드
# OM2 (50/125um)   : 주황색 - 멀티모드 (OM1과 비호환!)
# OM3 (50/125um)   : 청록색 - 멀티모드 (레이저 최적화)
# OM4 (50/125um)   : 자주색 - 멀티모드 (고성능)
# OS1 (9/125um)    : 노란색 - 싱글모드

# 광섬유 사용 이더넷 표준 예시
# 1000BASE-SX : 멀티모드, 최대 550m
# 1000BASE-LX : 싱글모드, 최대 5km
# 10GBASE-SR  : 멀티모드, 최대 300m (OM3)
# 10GBASE-LR  : 싱글모드, 최대 10km

# Linux에서 광섬유 인터페이스 확인
ethtool eth1  # SFP/SFP+ 모듈 정보 포함
ethtool -m eth1  # 트랜시버 진단 정보
```

## 관련 개념

- [utp-cabling](/knowledge/linux/utp-cabling/) - 광섬유의 대안적 구리 케이블링
- [ethernet](/knowledge/linux/ethernet/) - 광섬유로 전송하는 네트워크 프로토콜
- [network-topology](/knowledge/linux/network-topology/) - 광섬유를 포함하는 네트워크 설계
