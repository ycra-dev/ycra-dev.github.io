---
title: "프로시저 호출 규약 (Procedure Call Convention)"
description: "프로시저 호출 규약(Procedure Call Convention)은 프로시저 간에 레지스터 사용, 인자 전달, 반환 값, 스택 프레임 관리 등을 규정하는 소프트웨어 프로토콜이다"
tags: ['Calling Convention', 'Stack Frame', 'Register Usage', 'Mips']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/procedure-call-convention
sidebar:
  order: 18
---

## 핵심 개념

MIPS에서 프로시저 호출 규약은 레지스터를 역할별로 구분한다: $a0-$a3는 처음 4개 인자 전달, $v0-$v1은 반환 값, $t0-$t9는 호출자 저장(caller-saved) 임시 레지스터, $s0-$s7은 피호출자 저장(callee-saved) 레지스터이다. 프로시저 호출 시 세 단계를 거친다: (1) 호출 전 - 인자를 레지스터/$스택에 배치하고 호출자 저장 레지스터를 보존한 후 jal 명령어로 점프. (2) 진입 시 - 스택 프레임을 할당하고 피호출자 저장 레지스터를 저장한 후 프레임 포인터 설정. (3) 반환 시 - 반환 값을 $v0에 놓고, 레지스터를 복원하고, 스택을 정리한 후 $ra로 점프. 이 규약은 하드웨어가 아닌 소프트웨어 합의에 의해 유지된다.

## 예시

```
MIPS 레지스터 사용 규약:
$a0-$a3 (4-7):   인자 전달 (caller-saved)
$v0-$v1 (2-3):   반환 값
$t0-$t9 (8-15,24,25): 임시값 (caller-saved)
$s0-$s7 (16-23): 보존값 (callee-saved)
$sp (29):        스택 포인터
$fp (30):        프레임 포인터
$ra (31):        복귀 주소

스택 프레임:
  ┌──────────────┐ ← $fp
  │ 저장된 $ra    │
  │ 저장된 $fp    │
  │ 저장된 $s 레지스터│
  │ 로컬 변수     │
  │ 인자 5, 6, ...│
  └──────────────┘ ← $sp
```

## 관련 개념

- [레지스터 파일 (Register File)](/knowledge/computer-architecture/register-file/)
