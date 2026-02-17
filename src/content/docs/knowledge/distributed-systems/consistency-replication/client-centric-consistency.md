---
title: "Client Centric Consistency"
description: "클라이언트 중심 일관성(Client-Centric Consistency)은 단일 클라이언트의 관점에서 데이터 저장소에 대한 일관된 접근을 보장하는 모델이다"
tags: ['Client Centric Consistency', 'Monotonic Reads', 'Read Your Writes', 'Session Guarantee']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/distributed-systems/client-centric-consistency
sidebar:
  order: 4
---

## 핵심 개념

**배경**: 최종 일관성 저장소에서 클라이언트가 항상 같은 복제본에 접근하면 문제없으나, 모바일 사용자가 이동하며 다른 복제본에 접근하면 이전 업데이트가 반영되지 않은 데이터를 볼 수 있음.

**네 가지 클라이언트 중심 일관성 모델** (Bayou 시스템에서 유래):

1. **단조 읽기(Monotonic Reads)**: 값 x를 읽으면, 이후 x를 다시 읽을 때 항상 같거나 더 새로운 값을 반환. 예: 이메일을 읽은 후 다른 복제본에 접근해도 이전에 본 메일은 반드시 보여야 함.

2. **단조 쓰기(Monotonic Writes)**: 프로세스의 쓰기 연산이 같은 프로세스의 이전 쓰기보다 항상 나중에 완료. 예: 라이브러리 업데이트 후 프로그램 컴파일 시, 컴파일이 다른 복제본에서 실행되어도 라이브러리 업데이트가 먼저 적용되어야 함.

3. **자기 쓰기 읽기(Read Your Writes)**: 자신이 쓴 데이터를 항상 읽을 수 있음. 예: 비밀번호 변경 후 다른 서버에 로그인해도 새 비밀번호가 인식되어야 함.

4. **읽기 후 쓰기(Writes Follow Reads)**: 읽은 값에 기반한 쓰기가 항상 읽은 값 이후의 상태에 적용. 예: 게시글을 읽고 답글을 다른 복제본에서 작성하면, 원래 게시글이 먼저 존재해야 함.

## 예시

```
# 단조 읽기 위반 예시:
Alice가 복제본 A에서 이메일 10통 읽음
Alice가 이동 → 복제본 B에 접속 → 이메일 7통만 보임
→ 단조 읽기 위반! 복제본 B가 아직 3통을 전파받지 못함

# 자기 쓰기 읽기 위반 예시:
Alice가 복제본 A에서 비밀번호 변경
Alice가 복제본 B에서 로그인 시도 → 이전 비밀번호만 인식
→ 자기 쓰기 읽기 위반!

# 구현: 쓰기 집합(write set) 추적
# 클라이언트가 다른 복제본에 접근 시,
# 해당 복제본이 클라이언트의 이전 쓰기 집합을 반영했는지 확인
# 반영되지 않았으면 먼저 동기화 후 접근 허용
```

## 관련 개념

- [Eventual Consistency](/knowledge/distributed-systems/eventual-consistency/)
- [Sequential Consistency](/knowledge/distributed-systems/sequential-consistency/)
- [Replica Management](/knowledge/distributed-systems/replica-management/)
