---
title: "정규 표현식 실용 가이드 (Regular Expression - Practice)"
description: "문자열의 패턴을 기술하기 위한 간결한 표기법으로, 텍스트 검색, 치환, 유효성 검사 등에 광범위하게 사용되는 도메인 특화 언어(DSL)의 대표적 사례"
tags: ["Language", "Regex", "Pattern-Matching", "DSL"]
created: 2026-02-25
updated: 2026-02-27
draft: true
slug: knowledge/language/regular-expression-practice
sidebar:
  order: 100
---

## 핵심 개념

정규 표현식(regular expression)은 문자열의 패턴을 기술하기 위한 간결한 표기법으로, 텍스트 검색, 치환, 유효성 검사 등에 광범위하게 사용된다. grep, sed, 에디터, 프로그래밍 언어 등에서 널리 사용된다.

정규 표현식은 **도메인 특화 언어(DSL)**의 가장 성공적인 사례 중 하나이다. 수십 줄의 코드로 작성해야 할 패턴 매칭을 한 줄의 정규식으로 표현할 수 있다.

## 동작 원리

**기본 메타문자:**

| 기호 | 의미 |
|------|------|
| `.`  | 임의의 한 문자 |
| `*`  | 앞 요소의 0회 이상 반복 |
| `^`  | 줄의 시작 |
| `$`  | 줄의 끝 |
| `[]` | 문자 클래스 |
| `\`  | 이스케이프 |

약 30줄의 C 코드로 간단한 정규식 매처를 구현할 수 있다. 이 간결한 구현은 `.`, `*`, `^`, `$`만 지원하지만 재귀적 백트래킹의 아름다움을 보여준다.

## 예시

```c
/* Kernighan & Pike의 간결한 정규식 매처 */

/* match: s에서 regexp 패턴 검색 */
int match(char *regexp, char *text) {
    if (regexp[0] == '^')
        return matchhere(regexp+1, text);
    do {  /* 문자열의 모든 위치에서 시도 */
        if (matchhere(regexp, text))
            return 1;
    } while (*text++ != '\0');
    return 0;
}

/* matchhere: text의 시작에서 regexp 매칭 */
int matchhere(char *regexp, char *text) {
    if (regexp[0] == '\0')
        return 1;
    if (regexp[1] == '*')
        return matchstar(regexp[0], regexp+2, text);
    if (regexp[0] == '$' && regexp[1] == '\0')
        return *text == '\0';
    if (*text != '\0' && (regexp[0] == '.' || regexp[0] == *text))
        return matchhere(regexp+1, text+1);
    return 0;
}

/* matchstar: c*regexp를 text에서 매칭 */
int matchstar(int c, char *regexp, char *text) {
    do {
        if (matchhere(regexp, text))
            return 1;
    } while (*text != '\0' && (*text++ == c || c == '.'));
    return 0;
}
```

```bash
# grep에서의 정규식 사용 예
grep '^#include' *.c        # #include로 시작하는 줄
grep 'error.*fatal' log.txt  # error와 fatal이 같은 줄에
grep '^$' file.txt           # 빈 줄 찾기
```

## 관련 개념

- [도메인 특화 언어 (DSL)](/knowledge/language/domain-specific-language/) - 정규 표현식은 DSL의 가장 성공적인 사례
- [printf 형식 문자열 (Printf Format Strings)](/knowledge/language/printf-format/) - 또 다른 성공적인 내장 DSL
