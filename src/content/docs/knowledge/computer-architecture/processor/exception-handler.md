---
title: "예외 처리기 (Exception Handler)"
description: "예외 처리기(Exception Handler)는 명령어 실행 중 발생하는 오류 예외 또는 I/O 장치로부터의 외부 인터럽트에 응답하여 실행되는 코드로, MIPS에서는 주소 80000180(hex)에 위치한다"
tags: ['Exception', 'Interrupt', 'Coprocessor 0', 'Mips', 'Epc']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/exception-handler
sidebar:
  order: 27
---

## 핵심 개념

MIPS 프로세서에서 예외와 인터럽트는 코프로세서 0이 처리한다. 주요 레지스터로는: EPC(예외 발생 명령어 주소), Cause(예외 원인 코드와 대기 인터럽트 비트), Status(인터럽트 마스크와 활성화 비트), BadVAddr(잘못된 메모리 참조 주소)가 있다. 예외 발생 시 프로세서는 80000180(hex)로 점프하여 예외 처리기를 실행한다. 처리기는 Cause 레지스터를 검사하여 예외 원인을 판별하고, 적절한 운영체제 루틴으로 분기한다. 예외 유형에는 하드웨어 인터럽트(0), 주소 오류(4,5), 시스템 호출(8), 산술 오버플로우(12), 부동소수점 예외(15) 등이 있다. Status 레지스터의 EXL 비트는 예외 처리 중 추가 예외가 EPC를 덮어쓰는 것을 방지한다.

## 예시

```
예외 처리기 흐름:

1. 레지스터 저장 ($at, $a0, $a1)
   - 스택 사용 불가 (스택 포인터가 잘못된 값일 수 있음)
   - $k0, $k1 레지스터와 고정 메모리 주소 사용

2. Cause, EPC 레지스터 읽기
   mfc0 $k0, $13    # Cause 레지스터 → $k0
   mfc0 $k1, $14    # EPC 레지스터 → $k1

3. 예외 유형 판별
   - 인터럽트이면 무시
   - 다른 예외이면 메시지 출력

4. 복원 및 반환
   - Cause 레지스터 초기화
   - Status 레지스터 복원 (인터럽트 활성화, EXL 비트 해제)
   - eret 명령어로 EPC 주소로 복귀
```

## 관련 개념

- [운영체제 (Operating System)](/knowledge/computer-architecture/operating-system/)
