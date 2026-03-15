---
title: "유니코드 (Unicode)"
description: "전 세계 모든 문자 체계를 하나의 통합된 코드 체계로 포괄하는 국제 표준으로 12만 개 이상의 문자를 정의"
tags: ["Computer-Architecture", "Unicode", "Encoding", "Character", "Internationalization"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/computer-architecture/unicode
sidebar:
  order: 37
---

## 핵심 개념

유니코드(Unicode)는 전 세계 모든 문자 체계를 하나의 통합된 코드 체계로 포괄하는 국제 표준이다. 12만 개 이상의 문자를 정의하며, ASCII의 상위 호환(superset)으로서 ASCII 코드 0~127은 유니코드에서도 동일하게 유지된다.

## 동작 원리

ASCII가 영어만 다룰 수 있다는 한계를 극복하기 위해 유니코드가 탄생하였다. 전 세계의 문자를 **하나의 보편적 코드 체계**로 통합하는 것이 목표이다.

### 유니코드의 범위
- 한글, 한자, 일본어 가나, 아랍 문자, 데바나가리 등 세계 거의 모든 문자 체계를 포함한다.
- 이모지(😀), 수학 기호(∑), 음악 기호(♪) 등도 포함한다.
- 현재 15만 개 이상의 문자가 정의되어 있으며, 지속적으로 추가되고 있다.

### 인코딩 방식
유니코드는 문자에 번호(코드 포인트)를 부여하는 표준이고, 이를 실제 바이트로 저장하는 방식은 별도의 **인코딩**으로 정의된다:
- **UTF-8**: 가변 길이 인코딩 (1~4바이트). ASCII와 호환되며, 웹에서 가장 널리 사용된다. 영문은 1바이트, 한글은 3바이트를 사용한다.
- **UTF-16**: 2바이트 또는 4바이트 사용. Windows, Java 내부에서 사용된다.
- **UTF-32**: 고정 4바이트. 단순하지만 공간 낭비가 크다.

### ASCII와의 관계
유니코드의 처음 128개 코드 포인트(U+0000~U+007F)는 ASCII와 완전히 동일하다. 따라서 기존 ASCII 텍스트는 자동으로 유효한 유니코드(UTF-8) 텍스트이기도 하다.

## 예시

유니코드 코드 포인트 예시:

```
문자    코드 포인트    UTF-8 바이트 수
'A'     U+0041         1바이트 (41)
'é'     U+00E9         2바이트 (C3 A9)
'한'    U+D55C         3바이트 (ED 95 9C)
'😀'   U+1F600        4바이트 (F0 9F 98 80)
```

Python에서의 유니코드 활용:

```python
# 코드 포인트로 문자 생성
print('\u0041')    # A
print('\uD55C')    # 한
print('\U0001F600') # 😀

# 문자의 코드 포인트 확인
hex(ord('한'))     # '0xd55c'

# UTF-8 인코딩 바이트 확인
'A'.encode('utf-8')   # b'\x41'        (1바이트)
'한'.encode('utf-8')  # b'\xed\x95\x9c' (3바이트)
```

## 관련 개념

- [ASCII (미국 표준 정보 교환 코드)](/knowledge/computer-architecture/ascii/) - 유니코드의 부분집합이자 전신
- [비트 (Bit)](/knowledge/computer-architecture/bit/) - 유니코드 인코딩의 기본 단위
- [바이트 (Byte)](/knowledge/computer-architecture/byte/) - UTF-8 등 인코딩에서의 저장 단위

## 출처

- Understanding the Digital World, Chapter 2
