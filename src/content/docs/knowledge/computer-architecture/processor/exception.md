---
title: "Exception"
description: "예외(Exception)는 프로그램 실행을 방해하는 비예정적 이벤트로, 예를 들어 오버플로우를 감지하는 데 사용된다"
tags: ['Interrupt', 'Overflow', 'Error Handling', 'Control Flow', 'Epc']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/exception
sidebar:
  order: 26
---

## 핵심 개념

예외는 본질적으로 비예정적 프로시저 호출이다. 오버플로우가 발생한 명령어의 주소가 레지스터에 저장되고, 컴퓨터는 미리 정의된 주소로 점프하여 해당 예외를 처리하는 적절한 루틴을 호출한다. 중단된 주소가 저장되므로 상황에 따라 교정 코드 실행 후 프로그램을 계속할 수 있다. MIPS에서는 프로세서 외부에서 온 예외를 특별히 인터럽트(interrupt)라고 부른다. MIPS는 예외 프로그램 카운터(EPC)라는 레지스터를 포함하여 예외를 발생시킨 명령어의 주소를 저장하며, mfc0 명령어로 EPC를 범용 레지스터로 복사하고, 점프 레지스터로 복귀한다. $k0, $k1 레지스터는 운영 체제가 예외 처리에 사용하도록 예약되어 있다.

MIPS에서 예외가 발생하면 프로세서는 문제 명령어의 주소를 EPC에 저장하고, 원인을 Cause 레지스터에 기록한 후, 운영체제의 예외 처리 루틴(주소 8000 0180hex)으로 제어를 이전한다. 파이프라인에서 예외는 또 다른 형태의 제어 해저드로 처리된다: 문제 명령어 이후의 명령어들을 플러시하고, 예외 처리 주소에서 명령어 인출을 시작한다. 정밀 예외(precise exception)는 예외 명령어 이전의 모든 명령어가 완료되고 이후의 명령어는 효과가 없도록 보장한다.

## 예시

```assembly
# MIPS 예외 처리 흐름
# 1. 오버플로우 발생 (예: add $t0, $s0, $s1)
# 2. EPC에 해당 명령어 주소 저장
# 3. 미리 정의된 예외 처리 주소로 점프

# 예외 처리 루틴에서 복귀:
mfc0 $k0, $epc       # EPC를 $k0로 복사
jr   $k0              # 중단된 명령어로 복귀
```

```
파이프라인에서 예외 처리:
add $1, $2, $1  # 산술 오버플로우 발생 (EX 단계에서 검출)

처리 과정:
1. EPC <= 문제 명령어 주소 + 4
2. Cause <= 예외 원인 코드 (12 = 산술 오버플로우)
3. IF, ID, EX 단계의 명령어를 플러시 (제어 신호 = 0)
4. PC <= 8000 0180hex (예외 처리 루틴 시작)
5. 예외 핸들러의 첫 명령어 인출

벡터화된 인터럽트:
- 정의되지 않은 명령어: 8000 0000hex
- 산술 오버플로우: 8000 0180hex
```

## 관련 개념

- [Overflow Detection](/knowledge/computer-architecture/overflow-detection/)
- [Arithmetic Logic Unit](/knowledge/computer-architecture/arithmetic-logic-unit/)
- [Interrupt](/knowledge/computer-architecture/interrupt/)
- [Control Hazard](/knowledge/computer-architecture/control-hazard/)
- [Precise Interrupt](/knowledge/computer-architecture/precise-interrupt/)
- [Pipelining](/knowledge/computer-architecture/pipelining/)
