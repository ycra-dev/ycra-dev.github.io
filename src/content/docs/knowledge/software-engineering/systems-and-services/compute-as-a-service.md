---
title: "Compute as a Service"
description: "프로그램을 실행하는 데 필요한 컴퓨팅 파워를 서비스로 제공하는 것으로, 조직의 성장과 진화에 따라 복잡한 시스템으로 발전하는 인프라 패턴"
tags: ["Software Engineering", "Infrastructure", "Cloud"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/systems-and-services/compute-as-a-service
sidebar:
  order: 300
---

## 핵심 개념

CaaS(Compute as a Service)는 프로그램을 실행하는 데 필요한 컴퓨팅 파워를 서비스로 제공하는 것이다. "내 프로그램을 실행할 하드웨어를 제공해달라"는 단순한 개념이 조직의 성장과 진화에 따라 복잡한 시스템으로 발전한다.

## 동작 원리

CaaS는 조직이 성장하면서 세 가지 축에서 확장된다:
- 관리할 애플리케이션 수
- 필요한 복제본 수
- 최대 애플리케이션 크기

CaaS의 진화 단계:
1. **수동 관리**: SFTP와 SSH로 개별 머신에 배포
2. **자동 스케줄링**: 중앙 시스템이 머신 풀에 작업 할당
3. **머신 상태 모니터링**: 고장난 머신 감지 및 자동 재스케줄링
4. **컨테이너화와 멀티테넌시**: 리소스 요구사항 기반 빈-패킹
5. **오토스케일링**: 리소스 설정 자동화

시간이 지남에 따라 자동화 자체도 새로운 요구사항(GPU/TPU 스케줄링 등)과 증가된 규모를 다루기 위해 더 복잡해진다.

핵심 원칙: "쉬운 것은 쉽게, 복잡한 것은 가능하게" — 대부분의 엔지니어가 리소스 크기 조정의 번거롭고 오류가 발생하기 쉬운 부담을 지지 않도록 한다.

## 예시

Google의 초기 도입 사례 (2002년 Global WorkQueue 설계 문서):
> "프로그램을 실행하려면 SSH로 머신에 접속하고 실행해야 합니다. 여러 머신에서 실행하려면 이 작업을 반복해야 합니다. 비서가 하루도 안 되어 한 머신을 가져가버리면 다른 머신으로 작업을 직접 마이그레이션해야 합니다."

현대 CaaS 옵션: Kubernetes, Mesos (오픈소스), GKE, AKS, AWS Lambda, Cloud Functions (공용 클라우드).

## 관련 개념

- [Borg](/knowledge/software-engineering/systems-and-services/borg/)
- [Containerization](/knowledge/software-engineering/systems-and-services/containerization/)
- [Architecting for Failure](/knowledge/software-engineering/systems-and-services/architecting-for-failure/)
- [Batch vs Serving Jobs](/knowledge/software-engineering/systems-and-services/batch-vs-serving-jobs/)
- [Cattle vs Pets](/knowledge/software-engineering/design-and-evolution/cattle-vs-pets/)
