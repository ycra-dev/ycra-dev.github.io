---
title: "Spectre Side-Channel Attack"
description: "Spectre는 2018년에 공개된 마이크로아키텍처 취약점으로, 명령어 투기 실행(speculative execution), 캐시, 하드웨어 멀티스레딩을 악용하여 비공개 정보를 유출하는 사이드 채널 공격이다"
tags: ['Security', 'Speculative Execution', 'Cache', 'Timing Channel', 'Hardware Vulnerability']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/spectre-side-channel-attack
sidebar:
  order: 21
---

## 핵심 개념

Spectre는 ISA가 물리적 구현 특성을 완전히 숨길 수 있다는 가정이 잘못되었음을 보여준다. 세 가지 마이크로아키텍처 기법을 악용한다: (1) 명령어 투기 실행 - 프로세서가 분기 예측을 넘어 수십 개의 명령어를 동시에 실행하며, ISA 변경은 오추측 시 롤백되지만 마이크로아키텍처적 "빵부스러기"는 남는다. (2) 캐싱 - 캐시는 ISA에서 보이지 않으며, 특히 LRU 상태는 오추측 시 복원되지 않아 비밀 데이터를 전달하는 "사이드 채널"로 사용된다. (3) 하드웨어 멀티스레딩 - 공격 프로그램이 대상 프로그램에 가까이 실행될 수 있어 미세한 타이밍 변화를 감지하기 쉽다. 클라우드 제공자는 "전용 인스턴스"를 제공하여 서버 공유를 방지하는 대응책을 마련했다.

## 예시

```
Spectre 공격 과정:

1. 공격자가 분기 예측기를 훈련시켜 특정 분기를 "항상 참"으로 예측하게 함
2. 비밀 데이터가 있는 메모리 접근 코드를 투기적으로 실행시킴
3. 투기적 실행 중 비밀 값에 따라 다른 캐시 라인에 접근
4. 투기적 실행이 롤백되어도 캐시 상태는 변경된 채로 남음
5. 공격자가 캐시 타이밍을 측정하여 어떤 라인이 접근되었는지 추론
6. 이를 통해 비밀 데이터 값을 유출

대응: AWS "Dedicated Instances" (약 5% 추가 비용)
```

## 관련 개념

- [Hardware Multithreading](/knowledge/computer-architecture/hardware-multithreading/)
