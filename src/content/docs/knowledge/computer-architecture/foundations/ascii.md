---
title: "ASCII (American Standard Code for Information Interchange)"
description: "영문 알파벳, 숫자, 구두점, 제어 문자 등 128개의 문자를 7비트로 인코딩하는 미국 정보교환 표준 코드"
tags: ["Computer-Architecture", "ASCII", "Encoding", "Character"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/computer-architecture/ascii
sidebar:
  order: 36
---

## 핵심 개념

ASCII(American Standard Code for Information Interchange)는 영문 알파벳, 숫자, 구두점, 제어 문자 등 128개의 문자를 7비트(0~127)로 인코딩하는 미국 정보교환 표준 코드이다. 영어 중심의 한계를 가지며, Unicode로 확장되었다.

## 동작 원리

컴퓨터는 숫자만 처리할 수 있으므로, 문자를 표현하려면 각 문자에 고유한 숫자를 대응시키는 **인코딩 약속**이 필요하다. ASCII가 바로 그 표준이다.

### ASCII의 구조
- **0~31**: 제어 문자 (줄바꿈, 탭 등 눈에 보이지 않는 제어용)
- **32~47, 58~64, 91~96, 123~126**: 특수 문자와 구두점 (!, @, #, 공백 등)
- **48~57**: 숫자 '0'~'9'
- **65~90**: 대문자 'A'~'Z'
- **97~122**: 소문자 'a'~'z'

### 설계상의 특징
- 대문자와 소문자의 차이는 정확히 32이다 (A=65, a=97). 이는 1비트 차이이므로 대소문자 변환이 효율적이다.
- 숫자 문자 '0'~'9'의 코드(48~57)에서 48을 빼면 실제 정수 값(0~9)을 얻을 수 있다.

### 한계
ASCII는 오직 128개의 문자만 정의하므로 **영어 이외의 언어**(한국어, 중국어, 아랍어 등)를 표현할 수 없다. 이 한계를 극복하기 위해 Unicode가 등장하였다.

## 예시

주요 ASCII 코드표:

```
문자  10진  2진(7비트)    문자  10진  2진(7비트)
' '   32    0100000      '0'   48    0110000
'!'   33    0100001      '9'   57    0111001
'A'   65    1000001      'a'   97    1100001
'B'   66    1000010      'b'   98    1100010
'Z'   90    1011010      'z'  122    1111010
```

대소문자 변환 (비트 연산):

```
'A' = 65 = 1000001
'a' = 97 = 1100001
            ↑
        이 1비트만 다르다 (32 = 2⁵)

대문자 → 소문자: 코드 + 32 (또는 5번째 비트를 1로 설정)
소문자 → 대문자: 코드 - 32 (또는 5번째 비트를 0으로 설정)
```

Python에서의 활용:

```python
ord('A')    # 65 — 문자를 ASCII 코드로
chr(65)     # 'A' — ASCII 코드를 문자로
ord('a') - ord('A')  # 32 — 대소문자 차이
```

## 관련 개념

- [유니코드 (Unicode)](/knowledge/computer-architecture/unicode/) - ASCII를 확장하여 전 세계 문자를 포괄하는 표준
- [비트 (Bit)](/knowledge/computer-architecture/bit/) - ASCII가 7비트로 문자를 인코딩
- [바이트 (Byte)](/knowledge/computer-architecture/byte/) - ASCII 문자 하나가 1바이트에 저장
- [이진수 (Binary Number)](/knowledge/computer-architecture/binary-number/) - ASCII 코드의 이진 표현

## 출처

- Understanding the Digital World, Chapter 2
