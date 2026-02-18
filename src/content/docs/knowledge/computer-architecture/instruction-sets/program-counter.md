---
title: "Program Counter"
description: "프로그램 카운터(PC, Program Counter)는 현재 실행 중인 명령어의 주소를 담고 있는 레지스터이다"
tags: ['CPU', 'Instruction Address', 'Control Flow', 'Register', 'Execution']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/program-counter
sidebar:
  order: 20
---

## 핵심 개념

프로그램 카운터는 저장 프로그램 개념에 내재된 핵심 요소이다. 프로세서는 PC가 가리키는 주소의 명령어를 가져와(fetch) 실행하고, 일반적으로 PC를 다음 명령어 주소(PC + 4, MIPS에서 각 명령어가 4바이트이므로)로 업데이트한다. 분기(branch)나 점프(jump) 명령어가 실행되면 PC가 대상 주소로 변경된다. jal(jump-and-link) 명령어는 PC + 4를 $ra에 저장하여 프로시저 복귀를 가능하게 한다. PC-상대 주소 지정에서 분기 대상 주소는 PC(다음 명령어, PC + 4)에 오프셋을 더하여 계산된다.

PC는 상태 요소(state element)로서, 매 클록 사이클의 끝에서 기록되며 별도의 쓰기 제어 신호가 필요하지 않다. 파이프라인 구현에서 PC는 IF 단계에 공급되는 파이프라인 레지스터로 간주할 수 있다.

## 예시

```
순차 실행에서의 PC 변화:
  PC = 0x00400000: add $s0, $s1, $s2   # PC → 0x00400004
  PC = 0x00400004: sub $s3, $s0, $s4   # PC → 0x00400008
  PC = 0x00400008: lw  $t0, 0($s3)     # PC → 0x0040000C

분기 실행에서의 PC 변화:
  PC = 0x00400000: beq $s0, $s1, L1    # $s0 == $s1이면
                                        # PC → L1의 주소
                                        # 아니면 PC → 0x00400004

jal 명령어:
  PC = 0x00400010: jal func            # $ra = 0x00400014
                                        # PC → func의 주소
```

MIPS에서 PC 업데이트 경로:
```
1. 순차 실행: PC <= PC + 4
2. 분기(taken): PC <= PC + 4 + (sign-extended offset << 2)
3. 점프: PC <= {PC[31:28], jump_address[25:0], 00}
```

## 관련 개념

- [Procedure Call](/knowledge/computer-architecture/procedure-call/)
- [Conditional Branch](/knowledge/computer-architecture/conditional-branch/)
- [PC-Relative Addressing](/knowledge/computer-architecture/pc-relative-addressing/)
- [Stored-Program Concept](/knowledge/computer-architecture/stored-program-concept/)
- [Datapath](/knowledge/computer-architecture/datapath/)
- [Control Hazard](/knowledge/computer-architecture/control-hazard/)
