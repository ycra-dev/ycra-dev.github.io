---
title: "Change Management"
description: "변경 관리는 제안된 변경 사항의 비용과 이점을 분석하고, 비용 효과적인 변경을 승인하며, 시스템 내 어떤 컴포넌트가 변경되었는지 추적하는 프로세스이다"
tags: ['Change Management', 'Change Control', 'Change Request', 'Ccb', 'Traceability']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/software-engineering/change-management
sidebar:
  order: 11
---

## 핵심 개념

변경 관리 프로세스는 소프트웨어가 고객에게 릴리스된 후 또는 조직 내 배포 후에 시작된다. 프로세스는 변경 요청 제출, 유효성 검증, 변경 평가 및 비용 산정, 변경 통제 위원회(CCB)의 승인/거부 결정, 변경 구현, 변경 검증의 단계로 진행된다. 변경 요청 양식(CRF)에는 요청된 변경, 영향받는 컴포넌트, 변경 평가, 우선순위, 예상 노력, CCB 결정 등이 기록된다. 변경 승인 시 고려 요인에는 변경하지 않을 경우의 결과, 변경의 이점, 영향받는 사용자 수, 변경 비용, 제품 릴리스 주기가 포함된다. 개발 중에는 일일 미팅에서 문제와 요청을 논의하는 비공식적 변경 관리가 사용되며, 이슈 추적 시스템이 이를 지원한다.

## 예시

변경 요청 양식(CRF) 예시:
```
Project: SICSA/AppProcessing  Number: 23/02
Change requester: I. Sommerville  Date: 20/07/12
Requested change: 지원자의 상태(거부, 수락 등)가
  지원자 목록에 시각적으로 표시되어야 함
Components affected: ApplicantListDisplay, StatusUpdater
Change priority: Medium
Estimated effort: 2 hours
CCB decision: Accept - Release 1.2에서 구현
```

## 관련 개념

- [Version Management](/knowledge/software-engineering/version-management/)
- [Release Management](/knowledge/software-engineering/release-management/)
- [System Building](/knowledge/software-engineering/system-building/)
