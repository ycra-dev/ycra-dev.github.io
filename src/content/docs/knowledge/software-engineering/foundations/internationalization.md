---
title: "국제화 (Internationalization, i18n)"
description: "소프트웨어가 다양한 언어와 지역 설정에 적응할 수 있도록 설계하는 것으로, ASCII와 영어만을 전제하지 않는 프로그래밍을 의미한다"
tags: ["Software-Engineering", "Internationalization", "Unicode", "Locale"]
created: 2026-02-25
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/internationalization
sidebar:
  order: 118
---

## 핵심 개념

국제화(internationalization, i18n)는 소프트웨어가 다양한 언어와 지역 설정(locale)에 적응할 수 있도록 설계하는 것으로, ASCII와 영어만을 전제하지 않는 프로그래밍을 의미한다.

- **국제화(i18n)**: 다국어 지원이 가능한 구조 설계
- **지역화(l10n)**: 특정 로케일에 맞게 번역/조정

## 동작 원리

**핵심 원칙들:**
1. **ASCII를 가정하지 마라**: 전 세계 문자를 표현하려면 유니코드가 필요하다
2. **영어를 가정하지 마라**: 텍스트의 방향(좌→우, 우→좌), 정렬 순서, 날짜/숫자 형식이 다르다
3. **텍스트를 코드에서 분리하라**: 문자열을 하드코딩하지 말고 별도 리소스 파일로 관리
4. **다중 바이트 문자 집합을 처리하라**: UTF-8에서 한 문자가 1~4바이트

**주의해야 할 가정들:**
- `char` = 문자? (UTF-8에서는 아님)
- `strlen()` = 문자 수? (바이트 수일 뿐)
- `toupper('a')` = 'A'? (독일어 ß → SS)
- 날짜 형식: MM/DD/YYYY vs DD/MM/YYYY vs YYYY-MM-DD

## 예시

```c
/* 나쁜 예: ASCII와 영어 가정 */
if (c >= 'a' && c <= 'z')   // ASCII 문자만 처리
    c = c - 'a' + 'A';

printf("Enter your name: ");  // 영어 하드코딩

/* 좋은 예: 로케일 인식 */
#include <locale.h>
#include <wchar.h>
#include <wctype.h>

setlocale(LC_ALL, "");  // 시스템 로케일 사용

wchar_t wc = L'ä';
wchar_t upper = towupper(wc);  // 로케일 인식 대문자 변환

/* 좋은 예: 텍스트 분리 */
// messages_ko.h
#define MSG_ENTER_NAME "이름을 입력하세요: "
printf(MSG_ENTER_NAME);

/* UTF-8에서 문자열 길이 주의 */
char *s = "한글";      // UTF-8: 6바이트
int bytes = strlen(s); // 6 (바이트 수)
// 실제 문자 수: 2 (mbstowcs로 계산)
```

## 관련 개념

- [이식성 (Portability)](/knowledge/software-engineering/portability/) - 국제화는 이식성의 언어/로케일 측면
- [유니코드 (Unicode)](/knowledge/computer-architecture/unicode/) - 전 세계 문자를 표현하는 표준
- [조건부 컴파일 (Conditional Compilation)](/knowledge/software-engineering/conditional-compilation/) - 이식성 문제의 또 다른 측면
