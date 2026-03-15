---
title: "보그 (Borg)"
description: "Google의 내부 클러스터 관리 시스템으로, 배치 작업과 서빙 작업을 모두 관리하는 단일 대규모 풀로 통합한 컴퓨트 서비스이며 Kubernetes의 전신"
tags: ["Software Engineering", "Infrastructure", "Google Tools"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/systems-and-services/borg
sidebar:
  order: 301
---

## 핵심 개념

Borg는 Google의 내부 클러스터 관리 시스템으로, 2003년에 시작되어 배치 작업과 서빙 작업을 모두 관리하는 단일 대규모 풀로 통합한 컴퓨트 서비스이다. Kubernetes의 전신이며, 컨테이너(cgroups + chroot) 기반으로 동작한다.

## 동작 원리

Borg의 핵심 설계 결정: **"머신은 익명이다"**. 프로그램은 올바른 특성을 가진 한 어떤 머신에서 실행되든 상관하지 않는다. 이전에는 배치 작업용 공유 풀과 서빙 작업용 전용 풀이 분리되어 있었으나, Borg는 이를 데이터센터당 단일 대규모 풀로 통합했다.

두 가지 핵심 효율성 이점:
1. **서빙 머신의 cattle화**: 통합 관리 인프라로 n개의 다른 관리 방식 대신 하나의 Borg만 관리
2. **배치-서빙 보완성**: 서빙 작업은 스파이크/장애 대비를 위해 과잉 프로비저닝되어 유휴 리소스 발생. 배치 작업이 이 여유 70%를 활용 (CPU는 동결, RAM은 킬로 회수). Google에서 대부분의 배치 워크로드는 사실상 무료로 실행된다.

Borg는 컨테이너 기반(cgroups + chroot)이며, Linux 커널에 Google 엔지니어가 2007년에 cgroups를 기여했다. Kubernetes는 Borg의 오픈소스 후속작이다.

## 예시

PID 공간 고갈 사례 (2011년): PID가 기본 32,000 범위로 제한. Hyrum's Law에 의해 로그 저장 프로세스 등이 PID가 5자리라는 암묵적 보장에 의존. 해결에 수년 소요:
1. 단일 컨테이너의 PID 수 상한 설정 (임시)
2. 스레드와 프로세스의 PID 공간 분리
3. PID 네임스페이스 도입 시도 (8년 후에도 진행 중)

교훈: 2003년 설계 시점에 PID 네임스페이스가 존재하지 않았고, 그 가치를 예측하는 것은 비합리적이었다.

## 관련 개념

- [서비스형 컴퓨팅 (Compute as a Service)](/knowledge/software-engineering/systems-and-services/compute-as-a-service/)
- [컨테이너화 (Containerization)](/knowledge/software-engineering/systems-and-services/containerization/)
- [배치 작업 vs 서빙 작업 (Batch vs Serving Jobs)](/knowledge/software-engineering/systems-and-services/batch-vs-serving-jobs/)
- [장애를 고려한 설계 (Architecting for Failure)](/knowledge/software-engineering/systems-and-services/architecting-for-failure/)
- [가축 vs 애완동물 (Cattle vs Pets)](/knowledge/software-engineering/design-and-evolution/cattle-vs-pets/)
