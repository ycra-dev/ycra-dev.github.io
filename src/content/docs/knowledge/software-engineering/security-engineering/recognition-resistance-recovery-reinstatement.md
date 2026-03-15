---
title: "인식, 저항, 복구, 복원 (Recognition, Resistance, Recovery, and Reinstatement)"
description: "시스템 문제의 탐지와 복구에 관련된 네 가지 회복탄력성 활동으로, 문제 증상 인식, 장애 저항, 핵심 서비스 복구, 전체 서비스 복원을 포함한다(4Rs 모델)"
tags: ['4rs Model', 'Recognition', 'Resistance', 'Recovery', 'Reinstatement', 'Resilience', 'Incident Response']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/software-engineering/recognition-resistance-recovery-reinstatement
sidebar:
  order: 10
---

## 핵심 개념

인식(Recognition)은 시스템이나 운영자가 시스템 장애로 이어질 수 있는 문제의 증상을 인식하는 활동으로, 장애 발생 전에 인식이 이루어지는 것이 이상적이다. 저항(Resistance)은 문제나 사이버 공격의 징후가 조기에 감지되면 시스템 장애 확률을 줄이는 전략을 발동하는 활동으로, 선제적 저항(방어 기능 내장)과 반응적 저항(문제 발견 시 조치)이 있다. 복구(Recovery)는 장애 발생 시 핵심 시스템 서비스를 빠르게 복원하여 사용자가 심각하게 영향받지 않도록 하는 활동이다. 복원(Reinstatement)은 모든 시스템 서비스를 복구하여 정상적인 시스템 운영이 재개되도록 하는 활동이다. 이 활동들은 정상 운영 -> 저항 상태 -> 복구 상태 -> 복원 상태 -> 정상 운영으로의 상태 변화를 유발한다.

## 예시

Mentcare 시스템에서 서버 비가용 시: 인식 - 클라이언트의 와치독 타이머가 응답 없으면 타임아웃, 시스템 관리자의 문자 메시지. 저항 - 로컬에 핵심 정보 사본 유지, 피어투피어 검색, 백업 서버 제공. 복구 - 로컬 사본과 백업 서버를 사용하여 핵심 서비스(환자 정보, 위험 환자 경고) 유지. 복원 - 야간에 전체 시스템을 정상 운영 상태로 복원.

## 관련 개념

- [복원력 (Resilience)](/knowledge/software-engineering/resilience/)
- [사이버 보안 (Cybersecurity)](/knowledge/software-engineering/cybersecurity/)
- [복원 시스템 설계 (Resilient Systems Design)](/knowledge/software-engineering/resilient-systems-design/)
- [사회기술적 복원력 (Sociotechnical Resilience)](/knowledge/software-engineering/sociotechnical-resilience/)
- [스위스 치즈 모델 (Swiss Cheese Model)](/knowledge/software-engineering/swiss-cheese-model/)
