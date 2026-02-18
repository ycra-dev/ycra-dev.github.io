---
title: "x86 Instruction Set"
description: "x86은 Intel이 1978년에 발표한 8086 아키텍처에서 발전한 명령어 세트로, 40년 이상에 걸쳐 여러 독립적 그룹에 의해 확장되어 왔으며 PC 시대의 지배적 아키텍처이다"
tags: ['Cisc', 'Intel', 'Amd', 'Backward Compatibility', 'Variable Length Instruction']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/x86-instruction-set
sidebar:
  order: 29
---

## 핵심 개념

x86은 하위 호환성(backward compatibility)의 "금 수갑"에 의해 형성되었다. 주요 특징: (1) 8개의 범용 레지스터(MIPS의 1/4), (2) 산술/논리 명령어가 2-피연산자 형식(소스가 동시에 목적지), (3) 피연산자 중 하나가 메모리에 있을 수 있음, (4) 가변 길이 명령어(1~15바이트), (5) 조건 코드/플래그 기반 조건 분기. 1978년부터 매달 평균 1개 이상의 명령어가 추가되었으며, MMX(1997), SSE(1999), SSE2(2001), AMD64(2003), AVX(2011), AVX-512(2015) 등으로 확장되었다. x86의 가장 자주 사용되는 컴포넌트는 구현하기 어렵지 않으며, AMD와 Intel은 시장 규모 덕분에 추가 복잡성을 극복하기 위한 자원을 투입할 수 있었다.

## 예시

```
# x86 명령어 형식의 복잡성
# 명령어 길이: 1~15 바이트
# 구성: [접두사] + 오피코드 + [mod,reg,r/m] + [SIB] + [변위] + [즉시값]

# 예시 명령어:
# MOV EAX, [EBX+ECX*4+8]  # 배열 접근 (Base+Scaled Index+Displacement)
# ADD EAX, 42             # EAX = EAX + 42
# PUSH EBX                # 스택에 EBX 저장 (1바이트)
```

## 관련 개념

- [ARMv7 Instruction Set](/knowledge/computer-architecture/armv7-instruction-set/)
- [Condition Code](/knowledge/computer-architecture/condition-code/)
- [SIMD](/knowledge/computer-architecture/simd/)
