---
title: "정보 은닉 (Information Hiding)"
description: "모듈의 내부 구현을 외부로부터 감추고 잘 정의된 인터페이스만을 통해 접근하도록 하는 설계 원칙으로, 변경 용이성과 이해 용이성을 높인다"
tags: ["Software-Engineering", "Encapsulation", "Modularity", "Abstraction"]
created: 2026-02-25
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/information-hiding
sidebar:
  order: 108
---

## 핵심 개념

정보 은닉(Information Hiding)은 모듈의 내부 구현을 외부로부터 감추고, 잘 정의된 인터페이스만을 통해 접근하도록 하는 설계 원칙이다. 내부를 변경해도 외부 사용자에게 영향을 주지 않는 것이 핵심이다.

## 동작 원리

David Parnas가 제안한 이 원칙은 소프트웨어의 변경 용이성과 이해 용이성을 크게 높인다. 구현 세부사항이 숨겨져 있으면:

- **변경이 쉽다**: 내부 자료구조를 배열에서 해시테이블로 바꿔도 사용자 코드는 수정할 필요가 없다.
- **이해가 쉽다**: 사용자는 인터페이스만 이해하면 되므로 인지 부하가 줄어든다.
- **오류가 줄어든다**: 내부 상태를 외부에서 직접 조작할 수 없으므로 불변식(invariant)이 깨질 가능성이 낮다.

**각 언어별 정보 은닉 메커니즘:**

| 언어 | 메커니즘 |
|------|----------|
| C | `static` 함수/변수 (파일 스코프 제한), 불완전 타입(opaque pointer) |
| C++ | `private`/`protected` 멤버, `pimpl` 이디엄 |
| Java | `private` 접근 제어자, 패키지 가시성 |

## 예시

```c
/* csv.c - 구현 파일 */
static char *line = NULL;      /* static: 외부에서 접근 불가 */
static char *sline = NULL;
static int maxline = 0;
static char **field = NULL;
static int maxfield = 0;
static int nfield = 0;

/* 외부에 노출되는 함수들만 non-static */
char *csvgetline(FILE *fin) { ... }
char *csvfield(int n) { ... }
int csvnfield(void) { ... }
```

```cpp
// C++: 클래스를 통한 정보 은닉
class Csv {
public:
    Csv(istream& fin) : fin(fin) {}
    int getline(string&);
    string getfield(int n);
    int getnfield() const { return nfield; }
private:
    istream& fin;           // 사용자가 접근 불가
    string line;
    vector<string> field;
    int nfield;
    int split();
};
```

## 관련 개념

- [인터페이스 설계 원칙 (Interface Design Principles)](/knowledge/software-engineering/interface-design/) - 정보 은닉을 실현하는 인터페이스 설계
- [추상화 (Abstraction)](/knowledge/software-engineering/abstraction/) - 정보 은닉과 동전의 양면 관계
- [리소스 관리 (Resource Management)](/knowledge/software-engineering/resource-management/) - 리소스 소유권의 은닉
