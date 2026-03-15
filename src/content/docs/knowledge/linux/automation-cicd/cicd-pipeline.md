---
title: "CI/CD 파이프라인 (CI/CD Pipeline)"
description: "CI/CD 파이프라인은 소프트웨어를 빌드, 테스트, 배포하는 순차적 단계(stages)의 시리즈로, 코드 변경이 프로덕션에 이르기까지의 자동화된 워크플로를 정의한다"
tags: ['CI/CD Pipeline', 'Stages', 'Build', 'Test', 'Deploy', 'Automation']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/linux/cicd-pipeline
sidebar:
  order: 11
---

## 핵심 개념

파이프라인의 기본 단계:
1. **빌드(Build)**: 코드를 설치 가능한 소프트웨어로 변환. 빌드 아티팩트 생성
2. **테스트(Test)**: 자동화된 테스트로 버그와 구성 오류 탐색
3. **배포(Deploy)**: 하나 이상의 환경에 코드 배포, 최종적으로 프로덕션

**테스트 유형 계층:**
- **정적 코드 분석**: 구문 오류, 보안 문제, 코딩 가이드라인 위반 검사. 코드 실행 불필요
- **유닛 테스트**: 각 함수/메서드의 입력-출력 테스트. 개발자가 작성
- **통합 테스트**: 실제 실행 환경에서 외부 의존성(DB, API 등)과 함께 실행
- **인수 테스트**: 사용자 관점에서 시뮬레이션. Selenium 등으로 브라우저 테스트
- **성능 테스트**: 프로덕션 클론 환경에서 부하 테스트. JMeter, Gatling 사용
- **인프라 테스트**: 클라우드 인프라의 올바른 구성과 운영 검증. Serverspec 등

**환경(Environments):**
- **개발(Development)**: 통합 업데이트, 인프라 변경 테스트, 명백한 실패 확인
- **스테이징(Staging)**: 수동/자동 테스트, 보안 점검, 비즈니스 이해관계자 리뷰
- **프로덕션(Production)**: 실제 사용자 서비스. 고성능, 강보안 필수

**환경 동등성(Environment Parity)**: 하위 환경이 프로덕션과 최대한 일치해야 예상치 못한 비호환성을 방지할 수 있다. OS 버전, 라이브러리, 데이터셋 크기까지 일치시키는 것이 이상적이다.

## 예시

```groovy
// 완전한 Jenkinsfile 파이프라인 예시
pipeline {
    agent any
    stages {
        stage('Checkout') {
            steps { checkout scm }
        }
        stage('Unit Test') {
            steps { sh 'go test ./...' }
        }
        stage('Build') {
            steps { sh 'go build -o ulsahgo' }
        }
        stage('Build Image') {
            steps {
                sh 'packer build pipeline/packer.json'
            }
        }
        stage('Deploy Dev') {
            steps { sh './pipeline/tf_testing.sh' }
        }
        stage('Integration Test') {
            steps {
                sh 'curl -f http://$DEV_IP:8000/healthy'
            }
        }
        stage('Deploy Production') {
            steps { sh './pipeline/tf_production.sh' }
        }
    }
}
```

## 관련 개념

- [지속적 통합 (Continuous Integration)](/knowledge/linux/continuous-integration/)
- [지속적 전달 (Continuous Delivery)](/knowledge/linux/continuous-delivery/)
- [Jenkins (젠킨스)](/knowledge/linux/jenkins/)
- [블루-그린 배포 (Blue-Green Deployment)](/knowledge/linux/blue-green-deployment/)
- [기능 플래그 (Feature Flag)](/knowledge/linux/feature-flag/)
- [빌드 아티팩트 (Build Artifact)](/knowledge/linux/build-artifact/)
