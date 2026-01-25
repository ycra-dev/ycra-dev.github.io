---
title: "가상화 (Virtualization)"
description: "단일 컴퓨터의 하드웨어를 여러 실행 환경으로 추상화하는 기술"
tags: ["OS", "Virtualization", "VMM"]
created: 2026-01-25
updated: 2026-01-25
draft: false
slug: knowledge/os/virtualization
sidebar:
  order: 11
---

## 핵심 개념

가상화는 단일 컴퓨터의 하드웨어(CPU, 메모리, 디스크, 네트워크 인터페이스 등)를 여러 실행 환경으로 추상화하여, 각 환경이 자체 개인 컴퓨터에서 실행되는 것처럼 보이게 하는 기술이다.

> 서로 다른 운영체제(예: Windows와 UNIX)가 동시에 실행되고 상호 작용할 수 있다.

## 에뮬레이션 vs 가상화

| 구분 | 에뮬레이션 | 가상화 |
|------|-----------|--------|
| CPU 아키텍처 | 소스와 대상이 다름 | 동일한 CPU 아키텍처 |
| 동작 방식 | 소프트웨어로 하드웨어 시뮬레이션 | 네이티브 실행 |
| 성능 | 느림 (명령어 변환 필요) | 빠름 |
| 예시 | Apple Rosetta (IBM Power → Intel x86) | VMware, VirtualBox |

## Virtual Machine Manager (VMM)

VMM은 게스트 운영체제를 실행하고, 자원 사용을 관리하며, 각 게스트를 다른 게스트로부터 보호한다.

**VMM 모드**: 가상화를 지원하는 CPU는 VMM이 시스템을 제어할 때를 위한 별도의 모드를 가진다.
- 사용자 프로세스보다 더 많은 권한
- 커널보다는 적은 권한

## 가상화의 용도

| 용도 | 설명 |
|------|------|
| **데스크톱** | 네이티브 호스트가 아닌 OS용 애플리케이션 실행 |
| **개발/테스트** | 단일 물리 서버에서 여러 OS 실행 |
| **데이터 센터** | 컴퓨팅 환경 실행 및 관리 |

## 출처

- Operating System Concepts, 10th Edition, Chapter 1, p.34-35
