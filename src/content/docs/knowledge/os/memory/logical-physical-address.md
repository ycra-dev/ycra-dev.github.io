---
title: "논리 주소와 물리 주소 (Logical & Physical Address)"
description: "CPU가 생성하는 논리 주소와 메모리 유닛이 실제로 보는 물리 주소의 관계"
tags: ["OS", "Memory", "Address"]
created: 2026-01-27
updated: 2026-01-27
draft: false
slug: knowledge/os/logical-physical-address
sidebar:
  order: 3
---

## 핵심 개념

논리 주소(logical address)는 CPU가 생성하는 주소이고, 물리 주소(physical address)는 메모리 유닛이 실제로 보는 주소입니다. 프로그램이 메모리의 어디에 적재될지 컴파일 시점에 알 수 없고, 여러 프로세스가 동시에 메모리를 사용해야 하므로 주소 변환이 필요합니다.

## 동작 원리

프로그램은 자신만의 논리 주소 공간(0 ~ max)을 가지고 동작합니다.

### 주소 바인딩 시점

| 시점 | 설명 | 논리=물리? |
|------|------|-----------|
| 컴파일 시간 | 메모리 위치를 미리 알면 절대 코드 생성 | 동일 |
| 적재 시간 | 컴파일 시 위치 모르면 재배치 가능 코드 생성 | 적재 시 결정 |
| 실행 시간 | 실행 중 메모리 이동 가능, MMU가 동적 변환 | 다름 |

### MMU를 통한 주소 변환

```
CPU → [논리주소: 346] → MMU(+14000) → [물리주소: 14346] → 메모리
```

재배치 레지스터에 14000이 저장되어 있으면, 논리 주소 346번지 참조 시 물리 주소 14346번지에 접근합니다.

## 예시

논리 주소는 "이 건물의 3층"이라는 상대적 표현이고, 물리 주소는 "서울시 강남구 XX빌딩 3층"이라는 절대적 표현입니다. 건물(프로세스)이 어디에 있든 내부 층수(논리 주소)는 변하지 않습니다.

- 장점: 프로그램이 물리 메모리 위치에 독립적으로 작성 가능, 멀티프로세싱 환경에서 유연한 메모리 관리
- 단점: 주소 변환을 위한 하드웨어(MMU) 필요, 매 메모리 접근마다 변환 오버헤드

## 관련 개념

- [가상 메모리 (Virtual Memory)](/knowledge/os/virtual-memory/)
- [요구 페이징 (Demand Paging)](/knowledge/os/demand-paging/)
- [계층적 페이징 (Hierarchical Paging)](/knowledge/os/hierarchical-paging/)
