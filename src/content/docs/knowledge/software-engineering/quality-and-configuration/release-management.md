---
title: "릴리스 관리 (Release Management)"
description: "릴리스 관리는 외부 릴리스를 위한 소프트웨어 준비와, 고객에게 배포된 시스템 버전의 추적을 담당하는 프로세스이다"
tags: ['Release Management', 'Deployment', 'Software Release', 'Versioning', 'Distribution']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/software-engineering/release-management
sidebar:
  order: 10
---

## 핵심 개념

시스템 릴리스에는 대규모 릴리스(주요 새 기능)와 소규모 릴리스(버그 수정, 고객 문제 해결)가 있다. 릴리스에는 실행 코드뿐만 아니라 구성 파일, 데이터 파일, 설치 프로그램, 문서, 패키징 및 홍보 자료가 포함된다. 릴리스 시기 결정에는 경쟁, 마케팅 요구사항, 플랫폼 변경, 시스템의 기술적 품질이 영향을 미친다. 릴리스 생성 과정에는 버전 관리 시스템에서 실행 코드와 데이터 파일 식별 및 태깅, 구성 설명 작성, 설치 스크립트 작성, 웹 페이지 생성, 마스터 이미지 준비가 포함된다. 고객이 이전 릴리스를 건너뛸 수 있으므로, 새 릴리스는 이전 릴리스의 설치를 전제할 수 없다. SaaS(Software as a Service)는 릴리스 관리와 설치 문제를 크게 단순화한다.

## 예시

릴리스 건너뛰기 시나리오: 릴리스 1이 배포되어 사용 중이고, 릴리스 2가 새 데이터 파일 설치를 요구하지만 일부 고객은 릴리스 1에 남아 있으며, 릴리스 3이 릴리스 2의 데이터 파일을 필요로 할 때, 릴리스 1에서 직접 릴리스 3으로 업그레이드하는 고객을 위해 릴리스 3에 데이터 파일을 포함해야 한다.

## 관련 개념

- [버전 관리 (Version Management)](/knowledge/software-engineering/version-management/)
- [변경 관리 (Change Management)](/knowledge/software-engineering/change-management/)
- [시스템 빌드 (System Building)](/knowledge/software-engineering/system-building/)
