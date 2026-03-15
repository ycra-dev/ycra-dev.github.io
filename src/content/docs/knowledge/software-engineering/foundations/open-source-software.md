---
title: "오픈 소스 소프트웨어 (Open Source Software)"
description: "소스코드가 공개되어 누구나 자유롭게 열람, 사용, 수정, 배포할 수 있는 소프트웨어로 GPL, MIT 등의 라이선스로 규정된다"
tags: ["Software-Engineering", "Open-Source", "Licensing", "Collaboration"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/open-source-software
sidebar:
  order: 31
---

## 핵심 개념

오픈 소스 소프트웨어는 소스코드가 공개되어 누구나 자유롭게 열람, 사용, 수정, 배포할 수 있는 소프트웨어이다. 특정 라이선스(GPL, MIT 등)에 의해 사용 조건이 규정되며, 현대 컴퓨팅 인프라의 상당 부분을 차지한다.

## 동작 원리

### 핵심 원칙
1. **소스코드 공개**: 누구나 코드를 읽고 이해할 수 있다.
2. **자유로운 수정**: 필요에 따라 코드를 수정하여 개선할 수 있다.
3. **재배포 허용**: 원본 또는 수정된 버전을 다른 사람에게 배포할 수 있다.
4. **라이선스 조건**: 완전한 무제한은 아니며, 라이선스에 따른 조건이 있다.

### 주요 라이선스
- **GPL (GNU General Public License)**: 수정·배포 시 반드시 같은 GPL로 공개해야 한다. "카피레프트(copyleft)" 방식. Linux 커널이 대표적.
- **MIT License**: 거의 제한 없이 사용 가능. 저작권 표시만 유지하면 된다.
- **Apache License**: MIT와 유사하지만 특허권 관련 조항이 추가되어 있다.

### 오픈 소스의 장점
- **투명성**: 보안 취약점을 많은 눈이 검토할 수 있다 ("given enough eyeballs, all bugs are shallow").
- **혁신**: 전 세계 개발자들의 협력으로 빠르게 발전한다.
- **비용**: 무료로 사용할 수 있어 진입 장벽이 낮다.
- **종속성 회피**: 특정 기업에 종속되지 않는다.

## 예시

오픈 소스 vs 독점 소프트웨어:

```
오픈 소스:                        독점 소프트웨어:
┌─────────────────────┐          ┌─────────────────────┐
│ Linux               │          │ Windows             │
│ - 소스코드 공개      │          │ - 소스코드 비공개    │
│ - 무료 사용          │          │ - 라이선스 비용      │
│ - 누구나 수정 가능   │          │ - MS만 수정 가능     │
│ - GPL 라이선스       │          │ - 상업 라이선스      │
└─────────────────────┘          └─────────────────────┘
```

GPL "카피레프트" 효과:

```
GPL 프로그램 A를 수정하여 B를 만들면:
A (GPL) → 수정 → B (반드시 GPL)
→ B를 배포할 때 소스코드도 반드시 공개해야 함

MIT 프로그램 C를 수정하여 D를 만들면:
C (MIT) → 수정 → D (어떤 라이선스든 가능)
→ D를 독점 소프트웨어로 배포해도 됨
```

일상에서 사용하는 오픈 소스 (알지 못하는 사이에):
- 안드로이드 스마트폰 → Linux 커널 기반
- 웹 서핑 → 서버 측 Apache/Nginx
- Netflix 시청 → 수백 개의 오픈 소스 구성요소 사용

## 관련 개념

- [API (애플리케이션 프로그래밍 인터페이스)](/knowledge/software-engineering/api-basics/) - 오픈 소스 라이브러리는 API를 통해 기능 제공
- [컴파일러 (Compiler)](/knowledge/language/compiler-basics/) - GCC 등 오픈 소스 컴파일러

## 출처

- Understanding the Digital World, Chapter 5
