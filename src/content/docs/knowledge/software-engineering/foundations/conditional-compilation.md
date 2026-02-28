---
title: "조건부 컴파일 (Conditional Compilation)"
description: "#ifdef 등의 전처리기 지시문을 사용하여 플랫폼에 따라 다른 코드를 컴파일하는 기법으로, 가능한 한 피해야 하는 방식이다"
tags: ["Software-Engineering", "Portability", "Preprocessor", "Maintainability"]
created: 2026-02-25
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/conditional-compilation
sidebar:
  order: 117
---

## 핵심 개념

조건부 컴파일은 `#ifdef` 등의 전처리기 지시문을 사용하여 플랫폼에 따라 서로 다른 코드를 컴파일하는 기법으로, 가능한 한 피해야 하는 방식이다.

`#ifdef`는 이식성 문제의 가장 흔한 해결책이지만, 동시에 코드 품질을 크게 떨어뜨린다.

## 동작 원리

**조건부 컴파일의 문제점:**
1. **가독성 저하**: 코드 흐름이 분절되어 읽기 어려움
2. **테스트 난이도 증가**: 모든 조합을 테스트해야 함 (n개 조건이면 2^n 경우)
3. **조합 폭발**: `#ifdef`가 중첩되면 경우의 수가 기하급수적으로 증가
4. **유지보수 어려움**: 새 플랫폼 추가 시 모든 `#ifdef` 블록을 검토해야 함

**더 나은 대안:**
- **시스템 의존성을 별도 파일로 격리**: `platform_unix.c`, `platform_win.c`
- **인터페이스 뒤에 숨기기**: 헤더 파일에 공통 인터페이스 정의, 구현을 플랫폼별 파일로 분리
- **추상화 계층**: 플랫폼 차이를 래핑하는 얇은 추상화 레이어 제공

`#ifdef`가 불가피한 경우, 한 곳에 집중시키고 나머지 코드에서는 사용하지 않는다.

## 예시

```c
/* 나쁜 예: #ifdef 남발 */
void create_temp_file(char *name) {
    #ifdef _WIN32
    char buf[MAX_PATH];
    GetTempPath(MAX_PATH, buf);
    strcat(buf, name);
    #elif defined(__linux__)
    char buf[PATH_MAX];
    strcpy(buf, "/tmp/");
    strcat(buf, name);
    #endif
}

/* 좋은 예: 인터페이스 뒤에 숨기기 */

// platform.h - 공통 인터페이스
char *get_temp_dir(void);
char *path_join(const char *dir, const char *file);

// platform_unix.c
char *get_temp_dir(void) { return "/tmp"; }

// platform_win.c
char *get_temp_dir(void) {
    static char buf[MAX_PATH];
    GetTempPath(MAX_PATH, buf);
    return buf;
}

// 나머지 코드에서는:
void create_temp_file(char *name) {
    char *path = path_join(get_temp_dir(), name);
    // → #ifdef 없이 깔끔
}
```

## 관련 개념

- [이식성 (Portability)](/knowledge/software-engineering/portability/) - 조건부 컴파일의 목적과 대안
- [국제화 (Internationalization)](/knowledge/software-engineering/internationalization/) - 이식성의 또 다른 측면
