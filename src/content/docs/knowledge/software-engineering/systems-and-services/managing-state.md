---
title: "Managing State"
description: "cattle 모델에서 작업이 대체될 때 인프로세스 상태와 로컬 스토리지가 손실되므로, 상태를 일시적으로 취급하고 실제 저장은 외부에서 수행하는 원칙"
tags: ["Software Engineering", "Infrastructure", "Distributed Systems"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/systems-and-services/managing-state
sidebar:
  order: 304
---

## 핵심 개념

상태 관리(Managing State)는 cattle 모델에서 작업이 대체될 때 인프로세스 상태와 로컬 스토리지가 손실되므로, 상태를 일시적(transient)으로 취급하고 실제 저장은 외부 영구 스토리지에서 수행하는 원칙이다.

## 동작 원리

"소(cattle)"로 취급되는 작업이 교체되면 모든 인프로세스 상태와 로컬 스토리지가 손실된다. 따라서 인프로세스 상태는 일시적으로 취급하고, "실제 저장"은 외부 영구 스토리지에서 수행해야 한다.

핵심 패턴:
1. **외부 영구 스토리지**: 단일 요청 서빙/단일 데이터 청크 처리 범위를 넘는 모든 것은 영구 스토리지에 저장
2. **영구 스토리지도 cattle**: 상태 복제를 통해 구현 (보통 3-5개 복제본, 합의 처리 필요)
3. **캐싱**: 로컬에 보관하는 "재생성 가능한" 데이터. 핵심 교훈: 캐시는 지연 목표에 맞게 프로비저닝하되, 코어 애플리케이션은 전체 부하에 맞게 프로비저닝. 캐시 계층 손실 시에도 장애 방지
4. **배치 쓰기**: 모니터링 데이터 등에서 일부 데이터 손실이 허용되는 경우
5. **주기적 체크포인팅**: 긴 계산도 영구 스토리지에 주기적 상태 저장으로 작은 시간 창으로 분할

## 예시

RAID 배열 비유: 디스크를 일시적으로 취급(하나가 사라질 수 있음을 수용)하면서도 상태를 유지한다. 서버 세계에서도 동일 — 복수 복제본이 데이터를 보유하고 동기화한다.

Google의 캐시 교훈: 캐시 계층이 손실될 때 장애를 방지하려면 비캐싱 경로를 전체 부하용으로 프로비저닝해야 한다. 모든 로컬 상태가 불변(immutable)이면 장애 저항 앱을 만들기가 상대적으로 쉽다.

## 관련 개념

- [Architecting for Failure](/knowledge/software-engineering/systems-and-services/architecting-for-failure/)
- [Cattle vs Pets](/knowledge/software-engineering/design-and-evolution/cattle-vs-pets/)
- [Borg](/knowledge/software-engineering/systems-and-services/borg/)
