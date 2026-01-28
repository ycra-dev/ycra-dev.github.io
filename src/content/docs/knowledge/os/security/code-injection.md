---
title: "코드 인젝션 (Code Injection)"
description: "실행 코드를 주입하여 프로그램의 코드 흐름을 탈취하는 공격의 원리와 방어 기법"
tags: ["OS", "Security", "Memory"]
created: 2026-01-27
updated: 2026-01-27
draft: false
slug: knowledge/os/code-injection
sidebar:
  order: 8
---

## 핵심 개념

코드 인젝션(Code Injection)은 실행 코드를 추가하거나 수정하여 **프로그램의 코드 흐름을 탈취**하는 공격 기법이다. 방어자가 이 메커니즘을 이해해야 효과적인 보호 전략을 세울 수 있다.

C/C++ 같은 저수준 언어에서 포인터를 통한 직접 메모리 접근과 **버퍼 크기 관리 실수**가 취약점을 만든다. 메모리 손상을 통해 임의 코드를 실행할 수 있으므로 심각한 보안 위협이 된다.

## 동작 원리

### Buffer Overflow

버퍼 크기를 **초과하는 데이터를 복사**할 때 발생하는 취약점이다.

대표적인 취약 함수: `strcpy()`, `sprintf()`, `gets()` -- 모두 **크기 검사를 하지 않는다**.

### Overflow 결과 (크기에 따라)

| Overflow 크기 | 결과 |
|------|------|
| 매우 작음 | 패딩 영역만 덮어씀 → 영향 없음 |
| 중간 | 인접 변수 덮어씀 → 논리 조건 우회 가능 |
| **큼** | **Return Address 덮어씀** → 코드 흐름 탈취 |

### 공격 메커니즘 (방어 이해를 위한 분석)

```
[정상 스택 구조]
┌─────────────┬────────┬─────────────┬──────────┐
│  지역변수    │ 패딩   │ Return Addr  │ 이전 프레임 │
└─────────────┴────────┴──────┬──────┴──────────┘
                              ↑
                        함수 종료 시 점프할 주소

[Buffer Overflow 발생 후]
┌──────────┬───────────┬──────────────┐
│ Shellcode │ NOP-sled  │ 공격자 주소   │
└──────────┴───────────┴──────┬───────┘
                              ↑
                     공격자 코드로 점프
```

1. 공격자가 버퍼 크기를 초과하는 입력을 전달
2. 지역변수 영역을 넘어 **Return Address를 덮어씀**
3. 함수가 반환될 때 공격자가 지정한 주소로 점프
4. 미리 주입해둔 Shellcode가 실행됨

### Shellcode

공격자가 주입하는 작은 코드 조각이다. 보통 셸(shell)을 실행하여 시스템 제어권을 획득한다.

- 예: `execvp("/bin/sh", "/bin/sh", NULL)`
- 특징: 크기가 작아야 하고, NULL 바이트를 회피해야 함 (strcpy가 NULL에서 중단되므로)

### NOP-sled

정확한 메모리 주소를 맞추기 어렵기 때문에 사용하는 기법이다. **NOP(No Operation) 명령어 시퀀스**를 배치하면, 실행 흐름이 NOP들을 "미끄러져(sled)" 내려와 최종 payload에 도달한다.

```
[NOP-sled 구조]
┌────────────────────────────┬───────────┐
│ NOP NOP NOP NOP NOP NOP... │ Shellcode │
└──────────┬─────────────────┴───────────┘
           ↑
   어디로 점프해도 NOP을 거쳐 Shellcode에 도달
```

### 방어 기법

| 방어 기법 | 설명 |
|-----------|------|
| **ASLR** (Address Space Layout Randomization) | 메모리 주소를 무작위화하여 정확한 주소 예측 방지 |
| **크기 제한 함수** | `strncpy()` 등 복사 크기를 명시적으로 제한 |
| **Stack Canary** | Return Address 앞에 검증값 배치, 변조 탐지 |
| **NX bit** (No-eXecute) | 스택/힙 영역의 코드 실행을 하드웨어 수준에서 금지 |

```c
// 취약한 코드 -- 크기 검사 없음
char buffer[10];
strcpy(buffer, argv[1]);

// 안전한 코드 -- 크기 제한 적용
char buffer[10];
strncpy(buffer, argv[1], sizeof(buffer) - 1);
buffer[sizeof(buffer) - 1] = '\0';
```

## 예시

웹 서버에서 Buffer Overflow 공격과 방어 시나리오:

1. **공격 경로**: 웹 서버가 URL 파라미터를 고정 크기 버퍼에 `strcpy()`로 복사 → 공격자가 매우 긴 URL 전송 → Return Address 덮어씀 → 서버 권한으로 임의 코드 실행
2. **방어 적용**: `strncpy()` 사용 + ASLR 활성화 + Stack Canary + NX bit → 공격자가 주소를 예측할 수 없고, 스택에서 코드 실행이 차단됨

비유하면, 우편함에 너무 큰 소포를 밀어넣어 **옆집 우편함까지 침범**하는 것과 같다. 방어는 우편함 크기를 강제하고(크기 제한 함수), 우편함 위치를 매번 바꾸며(ASLR), 침범 여부를 감지하는 봉인(Stack Canary)을 붙이는 것이다.

## 관련 개념

- [공격 유형 (Attack Types)](/knowledge/os/attack-types/)
- [인증 (Authentication)](/knowledge/os/authentication/)
- [보호의 목표와 원칙 (Protection Goals)](/knowledge/os/protection-goals/)
- [비대칭 암호화 (Asymmetric Encryption)](/knowledge/os/asymmetric-encryption/)
