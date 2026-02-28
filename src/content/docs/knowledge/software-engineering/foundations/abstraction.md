---
title: "추상화 (Abstraction)"
description: "복잡한 시스템의 세부사항을 감추고 단순화된 모델을 제공하는 것으로, 소프트웨어 복잡성을 관리하는 가장 근본적인 도구"
tags: ["Software-Engineering", "Abstraction", "Complexity", "Design"]
created: 2026-02-25
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/abstraction
sidebar:
  order: 111
---

## 핵심 개념

추상화(Abstraction)는 복잡한 시스템의 세부사항을 감추고 단순화된 모델을 제공하는 것이다. 소프트웨어 복잡성을 관리하는 가장 근본적인 도구로, 인터페이스는 구현과 사용자 사이의 추상화 계층을 형성한다.

추상화는 "무엇을(what)"과 "어떻게(how)"를 분리한다.

## 동작 원리

**추상화의 수준:**
- **하드웨어 → 운영체제**: 메모리 주소, 디스크 섹터 대신 파일과 프로세스
- **운영체제 → 라이브러리**: 시스템 콜 대신 `printf`, `fopen`
- **라이브러리 → 애플리케이션**: 바이트 스트림 대신 CSV 필드

**좋은 추상화의 특성:**
1. **적절한 수준**: 너무 낮으면 사용이 번거롭고, 너무 높으면 유연성이 부족하다.
2. **일관성**: 추상화 수준이 섞이지 않는다. 한 인터페이스에서 "필드 가져오기"와 "내부 버퍼 포인터 조작"이 공존하면 안 된다.
3. **완전성**: 필요한 연산을 모두 수행할 수 있어야 한다. 사용자가 추상화를 우회해야 한다면 추상화가 불완전한 것이다.

추상화와 정보 은닉은 동전의 양면이다. 추상화는 "무엇을 보여줄 것인가"에 초점을 맞추고, 정보 은닉은 "무엇을 숨길 것인가"에 초점을 맞춘다.

## 예시

```
추상화 계층 예시: 파일 시스템

애플리케이션:  csv = csv_open("data.csv")
    ↓
CSV 라이브러리: fopen, fgets, strtok
    ↓
C 표준 라이브러리: read(), write() 시스템 콜 래핑
    ↓
운영체제: 디스크 블록 → 파일 추상화
    ↓
하드웨어: 섹터, 트랙, 실린더
```

```c
/* 추상화 수준이 일관된 인터페이스 */
/* 모든 함수가 "CSV 필드" 수준에서 동작 */
char *csvgetline(FILE *f);   /* 한 레코드 읽기 */
char *csvfield(int n);        /* n번째 필드 */
int csvnfield(void);          /* 필드 개수 */

/* 추상화 수준이 섞인 나쁜 인터페이스 */
char *csvgetline(FILE *f);
char *csvfield(int n);
char *csv_internal_buffer();  /* 추상화 누출! */
void csv_realloc_buffer(int); /* 추상화 누출! */
```

## 관련 개념

- [정보 은닉 (Information Hiding)](/knowledge/software-engineering/information-hiding/) - 추상화와 동전의 양면
- [인터페이스 설계 원칙 (Interface Design Principles)](/knowledge/software-engineering/interface-design/) - 추상화를 구현하는 인터페이스
- [API](/knowledge/software-engineering/api-basics/) - 추상화 계층의 공개 인터페이스
