---
title: "프로그래밍 언어 비교 (Language Comparison)"
description: "동일한 프로그램을 서로 다른 언어로 구현하여 각 언어의 표현력, 성능, 코드 크기, 개발 속도 등의 트레이드오프를 객관적으로 평가하는 것"
tags: ["Software-Engineering", "Programming-Language", "Trade-offs"]
created: 2026-02-25
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/language-comparison
sidebar:
  order: 106
---

## 핵심 개념

프로그래밍 언어 비교는 동일한 프로그램을 서로 다른 언어로 구현하여, 각 언어의 표현력, 성능, 코드 크기, 개발 속도 등의 트레이드오프를 객관적으로 평가하는 것이다.

"올바른" 언어는 없다 — 상황(성능 요구, 개발 시간, 유지보수 필요성)에 따라 최적의 선택이 달라진다.

## 동작 원리

Kernighan과 Pike는 마르코프 체인 텍스트 생성기를 C, C++, Java, Awk, Perl 다섯 가지 언어로 구현하여 직접 비교했다.

**언어별 특성 비교:**

| 언어 | 코드 크기 | 속도 | 메모리 관리 | 자료구조 |
|------|----------|------|------------|---------|
| C | 중간 | 가장 빠름 | 수동 (malloc/free) | 직접 구현 |
| C++ | 중간 | 빠름 | STL이 관리 | STL (deque, map) |
| Java | 중간 | 빠름 | GC가 관리 | 표준 라이브러리 |
| Awk | 짧음 | 느림 | 자동 | 연관 배열 내장 |
| Perl | 가장 짧음 | 느림 | 자동 | 해시, 배열 내장 |

**핵심 교훈들:**
1. **C**: 최고의 성능이 필요할 때. 모든 것을 직접 관리해야 하지만 결과를 완전히 통제한다.
2. **C++/Java**: 표준 라이브러리 덕분에 자료구조를 직접 구현하지 않아도 됨. C보다 약간 느리지만 개발 시간 단축.
3. **Awk/Perl**: 프로토타이핑이나 일회성 작업에 최적. 코드가 극히 짧지만 성능이 낮다.

## 예시

```c
// C: 해시 테이블을 직접 구현해야 함 (~150줄)
unsigned int hash(char *s[NPREF]) { ... }
void build(char *prefix[NPREF], FILE *f) { ... }
void generate(int nwords) { ... }
```

```perl
# Perl: 내장 해시로 ~20줄
while (<>) {
    for (split) {
        push(@{$statetab{$w1}{$w2}}, $_);
        ($w1, $w2) = ($w2, $_);
    }
}
```

## 관련 개념

- [자료구조 설계 (Data Structure Design)](/knowledge/software-engineering/data-structure-design/) - 자료구조 설계가 언어를 넘어 유사한 이유
- [컴파일러 (Compiler)](/knowledge/language/compiler-basics/) - 컴파일 언어(C, C++, Java)의 특성
- [인터프리터 (Interpreter)](/knowledge/language/interpreter-basics/) - 인터프리터 언어(Awk, Perl)의 특성
