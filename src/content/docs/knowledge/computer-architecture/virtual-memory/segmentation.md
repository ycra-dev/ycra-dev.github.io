---
title: "Segmentation"
description: "세그멘테이션은 가변 크기 블록을 사용하는 주소 매핑 방식으로, 주소가 세그먼트 번호와 세그먼트 오프셋의 두 부분으로 구성된다"
tags: ['Virtual Memory', 'Address Space', 'Memory Management', 'Protection', 'Paging']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/segmentation
sidebar:
  order: 9
---

## 핵심 개념

세그멘테이션의 주요 용도는 주소 공간에서 보다 강력한 보호 및 공유 방법을 지원하는 것이다. 세그먼트는 크기가 가변적이므로 경계 검사(bounds check)가 필요하다.

세그멘테이션의 주요 단점은 주소 공간을 논리적으로 분리된 조각으로 나누어야 하며, 두 부분(세그먼트 번호와 오프셋)으로 구성된 주소로 조작해야 한다는 것이다. 반면 페이징은 페이지 번호와 오프셋의 경계가 프로그래머와 컴파일러에게 보이지 않는다.

MIPS를 포함한 많은 아키텍처는 고정 크기 큰 블록으로 주소 공간을 분할하여 OS와 사용자 프로그램 간의 보호를 단순화한다. 이를 "세그먼트"라 부르지만, 가변 크기 세그멘테이션보다 훨씬 간단하며 사용자 프로그램에 보이지 않는다.

## 예시

```
# 세그멘테이션 주소 구조
주소 = [세그먼트 번호] [세그먼트 오프셋]

# 주소 변환 과정
1. 세그먼트 번호로 세그먼트 테이블 인덱싱
2. 세그먼트 기본 주소(base) 획득
3. 오프셋이 세그먼트 크기(limit) 내에 있는지 경계 검사
4. 물리 주소 = base + offset

# MIPS 스타일 간단한 세그멘테이션
최상위 비트로 세그먼트 결정:
  비트[31] = 0 -> 사용자 세그먼트 (스택/힙)
  비트[31] = 1 -> 커널 세그먼트

# 페이징 vs 세그멘테이션
페이징: 고정 크기 블록, 프로그래머에게 투명
세그멘테이션: 가변 크기 블록, 프로그래머가 인식
```

## 관련 개념

- [Virtual Memory](/knowledge/computer-architecture/virtual-memory/)
- [Page Table](/knowledge/computer-architecture/page-table/)
- [Address Translation](/knowledge/computer-architecture/address-translation/)
- [Supervisor Mode](/knowledge/computer-architecture/supervisor-mode/)
