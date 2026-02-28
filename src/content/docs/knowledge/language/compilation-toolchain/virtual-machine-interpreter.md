---
title: "가상 머신 인터프리터 (Virtual Machine Interpreter)"
description: "가상의 프로세서를 위한 명령어를 소프트웨어로 실행하는 프로그램으로, 한 번 작성하면 어디서나 실행할 수 있는 이식성을 제공한다"
tags: ["Language", "Virtual-Machine", "Interpreter", "Bytecode", "Portability"]
created: 2026-02-25
updated: 2026-02-27
draft: true
slug: knowledge/language/virtual-machine-interpreter
sidebar:
  order: 103
---

## 핵심 개념

가상 머신 인터프리터는 가상의 프로세서를 위한 명령어를 소프트웨어로 실행하는 프로그램으로, 한 번 작성하면 어디서나 실행할 수 있는 이식성을 제공한다.

가상 머신(VM)은 실제 하드웨어를 추상화한 소프트웨어 프로세서이다. 프로그램을 VM의 바이트코드로 컴파일하면, VM이 있는 모든 플랫폼에서 실행 가능하다.

## 동작 원리

**기본 동작:**
1. 소스 코드를 바이트코드(bytecode)로 컴파일
2. VM이 바이트코드를 하나씩 읽어 해석(interpret)하고 실행
3. VM 자체는 각 플랫폼에 맞게 네이티브로 컴파일

**대표 사례:**
- **JVM (Java Virtual Machine)**: Java의 "Write Once, Run Anywhere"
- **CPython**: Python 인터프리터의 내부 바이트코드 VM
- **Lua VM**: 게임 스크립팅에 널리 사용
- **.NET CLR**: C#, F# 등의 실행 환경

**트레이드오프:**
- **장점**: 이식성, 보안(샌드박싱), 동적 최적화(JIT)
- **단점**: 네이티브 코드보다 느림 (인터프리트 오버헤드)
- **절충**: JIT(Just-In-Time) 컴파일로 자주 실행되는 경로를 네이티브로 변환

## 예시

```c
/* 간단한 스택 기반 VM */
enum {
    OP_PUSH, OP_ADD, OP_SUB, OP_MUL, OP_DIV,
    OP_PRINT, OP_HALT
};

typedef struct {
    int *code;       // 바이트코드 배열
    int stack[256];  // 피연산자 스택
    int sp;          // 스택 포인터
    int ip;          // 명령어 포인터
} VM;

void vm_run(VM *vm) {
    for (;;) {
        int op = vm->code[vm->ip++];
        switch (op) {
        case OP_PUSH:
            vm->stack[vm->sp++] = vm->code[vm->ip++];
            break;
        case OP_ADD: {
            int b = vm->stack[--vm->sp];
            int a = vm->stack[--vm->sp];
            vm->stack[vm->sp++] = a + b;
            break;
        }
        case OP_PRINT:
            printf("%d\n", vm->stack[--vm->sp]);
            break;
        case OP_HALT:
            return;
        }
    }
}

/* 바이트코드: 3 + 5 를 계산하고 출력 */
int program[] = {
    OP_PUSH, 3,
    OP_PUSH, 5,
    OP_ADD,
    OP_PRINT,
    OP_HALT
};
// → 어떤 플랫폼에서든 VM만 있으면 실행 가능
```

## 관련 개념

- [이식성 (Portability)](/knowledge/software-engineering/portability/) - VM의 핵심 장점인 이식성
- [도메인 특화 언어 (DSL)](/knowledge/language/domain-specific-language/) - VM은 DSL을 실행하는 방법 중 하나
- [명령어 실행 주기 (Fetch-Decode-Execute Cycle)](/knowledge/computer-architecture/fetch-decode-execute-cycle/) - VM이 모방하는 실제 CPU의 동작
