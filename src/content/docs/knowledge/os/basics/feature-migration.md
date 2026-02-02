---
title: "기능 이동 (Feature Migration)"
description: "운영체제 기능이 대형 컴퓨터에서 소형 컴퓨터로 점진적으로 이동하는 현상"
tags: ["OS", "History"]
created: 2026-01-23
updated: 2026-01-27
draft: false
slug: knowledge/os/feature-migration
sidebar:
  order: 11
---

## 핵심 개념

기능 이동(Feature Migration)은 운영체제 기능이 대형 컴퓨터에서 소형 컴퓨터로 점진적으로 이동하는 현상이다. 하드웨어 발전과 함께 동일한 운영체제 개념이 다양한 컴퓨터 클래스에 적용 가능해졌다.

## 동작 원리

1. 새로운 기능이 대형 시스템(메인프레임)에서 먼저 개발됨
2. 기술 발전으로 미니컴퓨터에서 구현 가능해짐
3. 다시 마이크로컴퓨터(PC)로 이동
4. 최종적으로 핸드헬드/스마트폰까지 확장

### 이동한 기능의 예

| 시대 | 메인프레임 | 미니컴퓨터 | 데스크톱 | 핸드헬드 |
|------|------------|------------|----------|----------|
| 초기 | batch, resident monitor | - | - | - |
| 중기 | time-shared, multiuser | time-shared | interactive | - |
| 후기 | distributed, fault tolerant | multiprocessor, networked | multiprocessor, networked | networked |

## 예시

**MULTICS → UNIX**:
1. MULTICS (1965-1970): MIT에서 대형 GE-645 메인프레임용으로 개발
2. UNIX (1970): Bell Labs에서 PDP-11 미니컴퓨터용으로 MULTICS 아이디어 채택
3. 1980년대: UNIX 기능이 마이크로컴퓨터에 적용
4. 현재: Microsoft Windows, macOS, Linux에서 동일 기능 사용 가능

고급 레스토랑의 메뉴가 점차 패밀리 레스토랑, 패스트푸드로 퍼지는 것과 유사하다.
