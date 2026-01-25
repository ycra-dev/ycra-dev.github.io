---
title: 저장장치 계층구조 (Storage Hierarchy)
description: 저장 용량과 접근 시간에 따라 다양한 저장 시스템을 계층적으로 조직한 구조
tags: ["OS", "Memory", "Storage"]
created: 2026-01-22
updated: 2026-01-25
draft: false
---

## 핵심 개념

저장 용량과 접근 시간에 따라 다양한 저장 시스템을 계층적으로 조직한 구조.

주 메모리는 모든 필요한 프로그램과 데이터를 영구적으로 저장하기에는 너무 작고, 휘발성(volatile)이어서 전원이 꺼지면 내용이 사라진다. 이러한 한계를 극복하기 위해 계층 구조가 필요하다.

## 계층 구조

위에서 아래로 (빠른 → 느린, 작은 → 큰):

| 계층 | 저장장치 | 분류 | 휘발성 |
|------|---------|------|--------|
| 1 | 레지스터 (Registers) | Primary | Volatile |
| 2 | 캐시 (Cache) | Primary | Volatile |
| 3 | 주 메모리 (Main Memory) | Primary | Volatile |
| 4 | 비휘발성 메모리 (NVM) | Secondary | Nonvolatile |
| 5 | 하드 디스크 (HDD) | Secondary | Nonvolatile |
| 6 | 광학 디스크 (Optical disk) | Tertiary | Nonvolatile |
| 7 | 자기 테이프 (Magnetic tapes) | Tertiary | Nonvolatile |

**일반 규칙**: 저장 용량과 접근 시간 사이에 트레이드오프 존재

## 저장장치 분류

### Volatile storage (휘발성 저장장치)
- 전원 제거 시 내용 손실
- 단순히 "memory"라고 부름

### Nonvolatile storage (비휘발성 저장장치)
- 전원 제거 후에도 내용 유지
- **Mechanical**: HDD, 광학 디스크, 자기 테이프
- **Electrical**: 플래시 메모리, FRAM, NRAM, SSD → "NVM"이라고 부름

## 보조 저장장치 (Secondary Storage)

- 주 메모리의 확장으로, 대용량 데이터를 영구적으로 보관
- 가장 일반적인 장치: HDD와 NVM 장치
- 주 메모리보다 훨씬 느림

## 삼차 저장장치 (Tertiary Storage)

- 백업 복사본, 드물게 사용되는 데이터, 장기 보관용 저장에 사용
- 예: 자기 테이프, CD/DVD/Blu-ray

## 트레이드오프

- **장점**: 각 계층에서 적절한 비용-성능 균형 달성 가능
- **단점**: 관리 복잡성 증가, 계층 간 데이터 이동 오버헤드

## 출처

- Operating System Concepts, 10th Edition, Chapter 1, p.11-14
