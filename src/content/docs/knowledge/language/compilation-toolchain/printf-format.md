---
title: "Printf 형식 문자열 (Printf Format Strings)"
description: "출력 포맷을 제어하는 미니 언어로, %d, %s, %f 등의 변환 지정자를 통해 범용 언어 안에 내장된 도메인 특화 표기법의 대표적인 사례이다"
tags: ["Language", "Printf", "Format-String", "DSL", "C"]
created: 2026-02-25
updated: 2026-02-27
draft: true
slug: knowledge/language/printf-format
sidebar:
  order: 104
---

## 핵심 개념

printf 형식 문자열은 출력 포맷을 제어하는 미니 언어(mini-language)로, `%d`, `%s`, `%f` 등의 변환 지정자를 통해 범용 언어 안에 내장된 도메인 특화 표기법의 대표적인 사례이다.

printf 형식 문자열은 **좋은 표기법이 코드를 얼마나 단순화하는지** 보여주는 대표적 예시이다.

## 동작 원리

**형식 지정자 구조**: `%[flags][width][.precision]type`

| 요소 | 의미 | 예시 |
|------|------|------|
| `-` | 왼쪽 정렬 | `%-20s` |
| `0` | 0으로 패딩 | `%05d` |
| width | 최소 너비 | `%10d` |
| .precision | 소수점 자릿수 | `%.2f` |
| `d` | 정수 | `%d` |
| `f` | 실수 | `%f` |
| `s` | 문자열 | `%s` |
| `x` | 16진수 | `%x` |

**왜 좋은 DSL인가:**
1. 간결하다: 한 문자열로 복잡한 포맷을 표현
2. 선언적이다: "어떻게"가 아니라 "무엇을" 기술
3. 조합 가능하다: 여러 지정자를 하나의 문자열에 혼합

이 설계 패턴은 Python의 f-string, Java의 `String.format`, C#의 보간 문자열 등으로 발전했다.

## 예시

```c
/* printf 형식 문자열의 표현력 */

// 테이블 형식 출력
printf("%-20s %5d %8.2f\n", name, quantity, price);
// Kim                   42   199.99

// 16진수 덤프
printf("%08x: %02x %02x %02x %02x\n", addr, b0, b1, b2, b3);
// 0000004a: 48 65 6c 6c

// 날짜 형식
printf("%04d-%02d-%02d", year, month, day);
// 2026-02-25
```

```python
# Python의 발전된 형식 문자열
name, age, score = "Kim", 30, 95.5

# % 스타일 (C 계승)
print("%-10s %d %.1f" % (name, age, score))

# format 메서드
print("{:<10} {} {:.1f}".format(name, age, score))

# f-string (가장 현대적)
print(f"{name:<10} {age} {score:.1f}")
```

## 관련 개념

- [도메인 특화 언어 (DSL)](/knowledge/language/domain-specific-language/) - printf는 내장 DSL의 대표적 사례
- [정규 표현식 (Regular Expression)](/knowledge/language/regular-expression-practice/) - 또 다른 성공적인 내장 DSL
