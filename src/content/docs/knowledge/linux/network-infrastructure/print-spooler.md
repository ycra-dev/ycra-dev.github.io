---
title: "인쇄 스풀러 (Print Spooler)"
description: "프린트 스풀러(Print Spooler)는 인쇄 작업을 수집, 큐잉, 스케줄링하는 시스템으로, \"SPOOL\"은 원래 Simultaneous Peripheral Operation On-Line의 약어에서 유래했으며 현재는 범용적인 용어로 사용된다"
tags: ['Print Spooler', 'Spooling', 'Queue', 'Cups', 'Printing']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/linux/print-spooler
sidebar:
  order: 21
---

## 핵심 개념

스풀러는 인쇄 시스템의 핵심 구성 요소로, 사용자가 제출한 인쇄 작업을 큐에 저장하고 프린터가 사용 가능해질 때 순서대로 처리한다. CUPS에서 스풀러 데몬(cupsd)은 중앙 집중식으로 인쇄 시스템을 제어하며, 각 프린터별로 별도의 큐를 유지한다.

큐 관리에는 두 가지 제어 지점이 있다. 출력 측(프린터 측)은 cupsenable/cupsdisable 명령으로 제어하며, 이를 비활성화하면 사용자가 작업을 제출할 수 있지만 인쇄되지 않는다. 입력 측(제출 측)은 accept/reject 명령으로 제어하며, 이를 거부하면 새로운 작업 제출이 차단되지만 이미 큐에 있는 작업은 인쇄된다. 짧은 유지보수에는 cupsdisable을, 장기 다운타임에는 reject를 사용하는 것이 적절하다.

스풀링 개념은 인쇄뿐만 아니라, 속도가 느린 주변 장치와 빠른 CPU 간의 속도 차이를 해결하기 위한 일반적인 버퍼링 패턴이다.

## 예시

```bash
# 인쇄 큐 상태 확인
lpq

# 특정 프린터의 큐 확인
lpq -P Phaser_6120

# 인쇄 작업 제거
lprm jobid

# 프린터 출력 측 비활성화 (토너 교체 등 짧은 중단)
sudo cupsdisable Phaser_6120

# 프린터 출력 측 활성화
sudo cupsenable Phaser_6120

# 프린터 입력 측 차단 (장기 다운타임)
sudo reject Phaser_6120

# 프린터 입력 측 허용
sudo accept Phaser_6120

# 기본 프린터 설정
lpoptions -d Phaser_6120

# 프린터 인스턴스 생성 (2-up 인쇄)
lpoptions -p Phaser_6120/2up -o number-up=2 -o job-sheets=standard
```

## 관련 개념

- [CUPS (공용 유닉스 인쇄 시스템)](/knowledge/linux/cups/) - 스풀러를 포함하는 인쇄 시스템
- [IPP (인터넷 인쇄 프로토콜)](/knowledge/linux/ipp/) - 스풀러 통신 프로토콜
- [프로세스 (Process)](/knowledge/linux/process/) - 데몬 프로세스로 동작하는 cupsd
