---
title: "버퍼 오버플로우 공격 (Buffer Overflow Attack)"
description: "버퍼 오버플로우 공격(Buffer Overflow Attack)은 C 프로그램의 배열 범위 검사 부재를 악용하여, 스택의 지역 변수 경계를 넘어 데이터를 기록함으로써 리턴 주소를 조작하고 악의적 코드를 실행하는 보안 공격 기법이다"
tags: ['Security', 'Stack', 'Vulnerability', 'C Programming', 'Memory Safety']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/buffer-overflow-attack
sidebar:
  order: 16
---

## 핵심 개념

C의 strcpy 함수처럼 배열 범위를 검사하지 않는 함수가 사용될 때 발생할 수 있다. 스택이 아래로 성장하므로, 지역 변수 아래에는 이전 프로시저 호출의 스택 프레임과 리턴 주소가 존재한다. 공격자는 입력을 지역 변수 크기보다 훨씬 크게 만들어 리턴 주소를 덮어쓰고, 스택에 자신의 코드를 삽입한 후, 프로시저가 리턴할 때 공격자의 코드가 실행되게 한다. 자바는 런타임에 배열 범위를 검사하여 이러한 공격을 방지하지만, 성능 비용이 발생한다. 이는 프로그램이 메모리에 저장된 "숫자에 불과한" 코드라는 저장 프로그램 개념의 보안적 취약점을 보여준다.

## 예시

```c
// 취약한 C 코드
void copyinput(char *input) {
    char copy[10];         // 10바이트 지역 변수
    strcpy(copy, input);   // 범위 검사 없음!
}

// 공격: 10바이트 이상 입력
// 스택 구조 (위→아래):
// [copy[0..9]] ← 10바이트
// [이전 프레임 포인터]
// [리턴 주소] ← 공격자가 이 값을 조작!
// ...
// 공격자가 삽입한 코드가 실행됨
```

## 관련 개념

- [저장 프로그램 개념 (Stored-Program Concept)](/knowledge/computer-architecture/stored-program-concept/)
- [객체지향 언어 (Object-Oriented Language)](/knowledge/language/object-oriented-language/)
