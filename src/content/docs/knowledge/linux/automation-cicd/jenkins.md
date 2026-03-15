---
title: "Jenkins (젠킨스)"
description: "Jenkins는 Java로 작성된 오픈소스 자동화 서버로, CI/CD 구현에 가장 널리 사용되는 소프트웨어이며, 광범위한 플러그인 생태계를 통해 다양한 빌드, 테스트, 배포 시나리오를 지원한다"
tags: ['Jenkins', 'Ci Cd', 'Automation Server', 'Pipeline', 'Java', 'Build']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/linux/jenkins
sidebar:
  order: 12
---

## 핵심 개념

Jenkins의 핵심은 일련의 도구를 체인(파이프라인)으로 연결하는 **조율 서버(coordination server)**이다. 모든 실제 작업은 소스 코드 저장소, 컴파일러, 빌드 도구, 테스트 하네스, 배포 시스템 등 외부 서비스에 의존한다.

**핵심 개념:**
- **프로젝트(Job)**: 연결된 단계(stages)의 컬렉션
- **빌드 트리거**: 빌드를 시작하는 신호 (폴링, 스케줄, 웹훅)
- **빌드 단계(Build Steps)**: 빌드 아티팩트를 생성하는 구체적 작업
- **빌드 컨텍스트**: Jenkins 시스템에서 빌드를 실행하는 작업 디렉토리
- **파이프라인(Pipeline)**: Groovy 기반 DSL로 CI/CD 파이프라인을 코드로 정의

**분산 빌드 아키텍처:**
- **빌드 마스터**: 모든 프로젝트와 상태를 추적하는 중앙 시스템
- **빌드 에이전트(Agent)**: 실제 빌드 단계를 실행하는 별도 호스트
- 에이전트는 컨테이너, 원격 VM, 또는 온디맨드 클라우드 인스턴스에서 실행 가능

**Pipeline as Code (Jenkinsfile):**
Jenkins 2에서 도입된 핵심 기능. Groovy 기반 선언적 DSL로 파이프라인을 코드화하여 소스 저장소에 함께 커밋. 이를 통해 파이프라인의 투명성과 재현 가능성을 확보한다.

**플러그인**: Git, Docker, 클라우드 플랫폼, SaaS 서비스 등 거의 모든 도구와의 통합을 제공. Jenkins의 초능력(superpowers)으로 불린다.

## 예시

```groovy
// Jenkinsfile (Pipeline as Code)
pipeline {
    agent any
    environment {
        DO_TOKEN = credentials('do-api-token')
    }
    stages {
        stage('Checkout') {
            steps { checkout scm }
        }
        stage('Test') {
            steps { sh 'go test ./...' }
        }
        stage('Build') {
            steps { sh 'go build -o ulsahgo' }
        }
        stage('Deploy') {
            steps { sh './deploy.sh' }
        }
    }
}
```

```bash
# Docker에서 Jenkins 실행
docker run -d -p 8080:8080 -p 50000:50000 jenkins

# Jenkins CLI 도구
java -jar jenkins-cli.jar -s http://localhost:8080/ \
  build my-project
```

## 관련 개념

- [CI/CD 파이프라인 (CI/CD Pipeline)](/knowledge/linux/cicd-pipeline/)
- [지속적 통합 (Continuous Integration)](/knowledge/linux/continuous-integration/)
- [지속적 전달 (Continuous Delivery)](/knowledge/linux/continuous-delivery/)
- [도커 (Docker)](/knowledge/linux/docker/)
- [DevOps (데브옵스)](/knowledge/linux/devops/)
