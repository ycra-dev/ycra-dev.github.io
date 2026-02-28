---
title: "리소스 관리 (Resource Management)"
description: "메모리, 파일 핸들, 네트워크 연결 등의 자원을 누가 할당하고 누가 해제하는지를 명확히 하는 설계 원칙"
tags: ["Software-Engineering", "Memory-Management", "Resource-Lifecycle"]
created: 2026-02-25
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/resource-management
sidebar:
  order: 109
---

## 핵심 개념

리소스 관리는 메모리, 파일 핸들, 네트워크 연결 등의 자원을 누가 할당하고 누가 해제하는지를 명확히 하는 설계 원칙이다. 핵심 규칙: **자원을 할당한 같은 계층(layer)에서 해제하라.**

## 동작 원리

리소스 소유권(ownership)이 불분명하면 두 가지 문제가 발생한다:

1. **메모리 누수 (Memory Leak)**: 아무도 해제하지 않아 자원이 계속 축적된다.
2. **댕글링 포인터 (Dangling Pointer)**: 이미 해제된 자원을 다른 코드가 계속 사용한다.

**설계 규칙:**
- **할당한 곳에서 해제하라**: 라이브러리가 내부적으로 `malloc`한 메모리는 라이브러리가 `free`해야 한다.
- **소유권을 명확히 하라**: 함수가 반환하는 포인터가 내부 버퍼인지, 새로 할당된 메모리인지 문서화하라.
- **복사 vs 공유를 결정하라**: 데이터를 복사하면 안전하지만 비용이 들고, 공유하면 효율적이지만 수명(lifetime) 관리가 복잡해진다.

## 예시

```c
/* 나쁜 설계: 호출자가 라이브러리 내부 메모리를 free해야 함 */
char *get_data() {
    char *buf = malloc(1024);
    /* ... 데이터 채우기 ... */
    return buf;    /* 호출자가 free해야 함 - 누수 위험! */
}

/* 좋은 설계: 라이브러리가 자신의 버퍼를 관리 */
static char buf[1024];
char *get_data() {
    /* ... buf에 데이터 채우기 ... */
    return buf;    /* 내부 버퍼 반환, 다음 호출 시 덮어쓰임 */
}

/* 더 좋은 설계: 명시적 생성/소멸 함수 쌍 */
CSV *csv_open(FILE *f);         /* 자원 할당 */
char *csv_getline(CSV *csv);    /* 사용 */
void csv_close(CSV *csv);       /* 자원 해제 - 할당한 곳에서 */
```

## 관련 개념

- [인터페이스 설계 원칙 (Interface Design Principles)](/knowledge/software-engineering/interface-design/) - 리소스 소유권을 인터페이스에서 명확히 해야 한다
- [에러 처리 (Error Handling)](/knowledge/software-engineering/error-handling/) - 에러 발생 시에도 리소스가 누수되지 않아야 한다
- [정보 은닉 (Information Hiding)](/knowledge/software-engineering/information-hiding/) - 리소스 관리 구현을 숨긴다
