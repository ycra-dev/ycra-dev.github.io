---
title: "보조기억장치 (Secondary Storage)"
description: "전원이 꺼져도 데이터를 영구적으로 보존하는 비휘발성 저장 매체로, HDD와 SSD가 대표적"
tags: ["Computer-Architecture", "Storage", "HDD", "SSD", "Hardware"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/computer-architecture/secondary-storage
sidebar:
  order: 28
---

## 핵심 개념

보조기억장치는 전원이 꺼져도 데이터를 **영구적으로** 보존하는 비휘발성 저장 매체이다. 하드디스크(HDD, 자기 방식)와 SSD/플래시 메모리(전하 방식)가 대표적이며, RAM보다 용량이 크고 느리며 저렴하다.

## 동작 원리

보조기억장치는 프로그램, 문서, 사진, 영상 등을 영구적으로 보관하는 역할을 한다. RAM이 작업 책상이라면, 보조기억장치는 서류 캐비닛에 해당한다.

### 하드디스크 드라이브(HDD)
- **자기(magnetic)** 방식으로 데이터를 저장한다.
- 회전하는 금속 원판(플래터) 위에 자기 헤드가 데이터를 읽고 쓴다.
- 기계적 부품이 있어 충격에 취약하고, 접근 속도가 느리다.
- 대용량(수 TB)을 저렴하게 제공한다.

### 솔리드 스테이트 드라이브(SSD) / 플래시 메모리
- **전하(electrical charge)** 방식으로 데이터를 저장한다.
- 움직이는 부품이 없어 HDD보다 빠르고 내구성이 좋다.
- USB 드라이브, SD 카드, 스마트폰 내장 메모리 등에도 같은 플래시 기술이 사용된다.

저장 매체 계층 비교:

| 특성 | RAM | SSD | HDD |
|------|-----|-----|-----|
| 속도 | ~10ns | ~0.1ms | ~10ms |
| 휘발성 | 예 | 아니오 | 아니오 |
| GB당 가격 | 높음 | 중간 | 낮음 |
| 용량 | 8-64GB | 256GB-4TB | 1-20TB |

## 예시

일상적인 보조기억장치 사용 예:
- **HDD**: NAS 서버에서 대용량 영상 파일 보관 (가격 대비 용량이 중요)
- **SSD**: 노트북 부팅 디스크 (속도가 중요, 부팅 시간 5초 이내)
- **USB 플래시 드라이브**: 파일 이동용 휴대 저장장치
- **SD 카드**: 카메라에서 사진 저장

1980년대 첫 PC 하드디스크는 10MB였지만, 오늘날 스마트폰에도 128GB~1TB의 플래시 저장소가 탑재된다.

## 관련 개념

- [폰 노이만 구조 (Von Neumann Architecture)](/knowledge/computer-architecture/von-neumann-architecture-basics/) - 보조기억장치가 속한 전체 컴퓨터 구조
- [RAM](/knowledge/computer-architecture/ram/) - 보조기억장치와 대비되는 휘발성 주기억장치
- [무어의 법칙 (Moore's Law)](/knowledge/computer-architecture/moores-law/) - 저장 용량 증가를 이끈 반도체 발전 법칙
- [비트 (Bit)](/knowledge/computer-architecture/bit/) - 저장되는 데이터의 기본 단위

## 출처

- Understanding the Digital World, Chapter 1
