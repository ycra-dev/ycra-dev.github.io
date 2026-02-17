---
title: "Write Buffer"
description: "쓰기 버퍼(Write Buffer)는 메모리에 기록될 데이터를 대기시키는 큐로, 프로세서가 메모리 쓰기 완료를 기다리지 않고 계속 실행할 수 있게 한다"
tags: ['Cache', 'Write Through', 'Memory Hierarchy', 'Performance', 'Queue']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/write-buffer
sidebar:
  order: 18
---

## 핵심 개념

쓰기 버퍼는 write-through 캐시에서 쓰기 성능을 크게 개선한다. 프로세서가 캐시와 쓰기 버퍼에 데이터를 기록한 후 즉시 실행을 계속하고, 메모리 쓰기가 완료되면 버퍼 항목이 해제된다. 쓰기 버퍼가 가득 차면 프로세서는 빈 자리가 생길 때까지 스톨해야 한다. 메모리가 쓰기를 처리하는 속도가 프로세서가 쓰기를 생성하는 속도보다 느리면 버퍼링으로도 도움이 되지 않는다. 쓰기가 버스트로 발생하면 순간적으로 스톨이 발생할 수 있어, 대부분의 프로세서는 쓰기 버퍼를 단일 항목 이상으로 확장한다. Write-back 캐시에서도 쓰기 버퍼가 사용되는데, 미스 시 더티 블록의 교체를 위해 수정된 블록을 쓰기 버퍼로 이동시키고 동시에 새 블록을 메모리에서 읽어 미스 패널티를 절반으로 줄일 수 있다.

## 예시

```
쓰기 버퍼 동작 (4항목):

프로세서: store 실행
  → 캐시 기록 + 쓰기 버퍼에 추가

쓰기 버퍼:
[주소1, 데이터1] → 메모리 기록 중
[주소2, 데이터2] → 대기
[주소3, 데이터3] → 대기
[             ] → 빈 항목 (여기에 추가 가능)

메모리 기록 완료 → 항목1 해제
쓰기 버퍼 가득 참 → 프로세서 스톨 (빈 항목 대기)
```

## 관련 개념

- [Write-Through](/knowledge/computer-architecture/write-through/)
- [Write-Back](/knowledge/computer-architecture/write-back/)
- [Cache Memory](/knowledge/computer-architecture/cache-memory/)
- [Pipeline Stall](/knowledge/computer-architecture/pipeline-stall/)
