---
title: "RAM (랜덤 액세스 메모리)"
description: "현재 실행 중인 프로그램과 데이터를 저장하는 휘발성 주기억장치로, 어떤 위치든 동일한 속도로 접근할 수 있다"
tags: ["Computer-Architecture", "RAM", "Memory", "Hardware"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/computer-architecture/ram
sidebar:
  order: 27
---

## 핵심 개념

랜덤 액세스 메모리(Random Access Memory)는 현재 실행 중인 프로그램과 데이터를 저장하는 **휘발성 주기억장치**이다. 어떤 위치든 동일한 속도로 접근할 수 있으며(순차 접근과 대비), 전원이 꺼지면 내용이 사라진다.

## 동작 원리

RAM은 CPU가 직접 빠르게 접근할 수 있는 작업 공간이다. "랜덤 액세스"라는 이름은 메모리의 어느 위치든 **순서에 무관하게 동일한 시간**에 접근할 수 있다는 의미이다. 이는 테이프처럼 처음부터 순차적으로 읽어야 하는 순차 접근 방식과 대비된다.

RAM의 주요 특성:
- **휘발성(volatile)**: 전원이 꺼지면 저장된 모든 내용이 소멸한다.
- **빠른 속도**: 보조기억장치(SSD, HDD)보다 수십~수백 배 빠르다. 나노초(ns) 단위로 접근 가능하다.
- **용량**: 현대 컴퓨터는 보통 8GB~64GB의 RAM을 탑재한다.
- **바이트 단위 주소 지정**: 각 바이트마다 고유한 주소가 부여되어 CPU가 정확한 위치를 지정하여 읽고 쓸 수 있다.

RAM 용량이 부족하면 운영체제는 보조기억장치를 가상 메모리로 활용하는데, 이 경우 속도가 급격히 저하된다.

## 예시

RAM 용량에 따른 대략적 용도:

| 용량 | 용도 |
|------|------|
| 4GB | 가벼운 웹 브라우징 |
| 8GB | 일반 사무용 |
| 16GB | 개발, 사진 편집 |
| 32GB+ | 영상 편집, 대규모 데이터 처리 |

RAM의 랜덤 접근 vs 순차 접근 비유:
- **RAM** = 책의 목차에서 바로 원하는 페이지로 이동 (어디든 같은 시간)
- **테이프** = 카세트테이프에서 원하는 곡까지 빨리감기 (위치에 따라 시간 다름)

## 관련 개념

- [폰 노이만 구조 (Von Neumann Architecture)](/knowledge/computer-architecture/von-neumann-architecture-basics/) - RAM이 속한 전체 컴퓨터 구조
- [CPU (중앙처리장치)](/knowledge/computer-architecture/cpu-basics/) - RAM에서 명령어와 데이터를 읽어 처리하는 장치
- [보조기억장치 (Secondary Storage)](/knowledge/computer-architecture/secondary-storage/) - RAM과 대비되는 비휘발성 저장장치
- [캐시 (Cache)](/knowledge/computer-architecture/cache-basics/) - RAM보다 빠른 CPU 근접 메모리 계층
- [바이트 (Byte)](/knowledge/computer-architecture/byte/) - RAM 주소 지정의 기본 단위

## 출처

- Understanding the Digital World, Chapter 1
