---
title: "지속적 전달 (Continuous Delivery)"
description: "지속적 배포(Continuous Delivery, CD)는 CI 프로세스 완료 후 빌드를 비프로덕션 환경에 자동 배포하는 프로세스이며, 지속적 배치(Continuous Deployment)는 이를 확장하여 실제 사용자에게 서비스하는 라이브 시스템에 운영자 개입 없..."
tags: ['Continuous Delivery', 'Cd', 'Deployment', 'Automation', 'Release', 'Pipeline']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/linux/continuous-delivery
sidebar:
  order: 10
---

## 핵심 개념

**Continuous Delivery vs Continuous Deployment:**
- **Continuous Delivery**: 자동 빌드, 테스트, 비프로덕션 배포. 프로덕션 배포 전 인간의 승인 가능
- **Continuous Deployment**: 모든 과정이 자동. 테스트 통과 시 프로덕션까지 자동 배포

CI/CD는 DevOps 철학의 기둥이다. 개발자와 운영팀을 연결하는 접착제이며, 기술적 혁신인 동시에 비즈니스 자산이다.

**배포 기법:**
- **셸 스크립트**: SSH로 각 시스템에 접속하여 설치. 소규모에만 적합
- **구성 관리 도구**: 관리되는 시스템 세트에 걸쳐 설치 오케스트레이션
- **컨테이너 관리 API**: Kubernetes/Swarm/ECS에 API 호출로 배포
- **Capistrano/Fabric**: 개발자 친화적 원격 배포 도구
- **클라우드 서비스**: AWS CodeDeploy, Google Deployment Manager, Heroku

**이뮤터블 배포(Immutable Deployment)**: 서버를 초기화 후 수정하지 않는 원칙. 새 릴리스 배포 시 업데이트된 아티팩트가 포함된 완전히 새로운 서버를 생성. 서버는 일회용이며 임시적이다. API를 통해 인스턴스를 할당할 수 있는 프로그래밍 가능한 인프라(클라우드)에 기반한다.

## 예시

```groovy
// Jenkins Pipeline: CD 스테이지
pipeline {
    agent any
    stages {
        stage('Build') {
            steps { sh 'make build' }
        }
        stage('Test') {
            steps { sh 'make test' }
        }
        stage('Deploy to Staging') {
            steps { sh './deploy.sh staging' }
        }
        stage('Deploy to Production') {
            steps {
                input "Deploy to production?"  // 수동 승인
                sh './deploy.sh production'
            }
        }
    }
}
```

```bash
# Terraform을 이용한 이뮤터블 배포
terraform plan -var "image_id=$IMAGE_ID"
terraform apply -auto-approve
```

## 관련 개념

- [지속적 통합 (Continuous Integration)](/knowledge/linux/continuous-integration/)
- [CI/CD 파이프라인 (CI/CD Pipeline)](/knowledge/linux/cicd-pipeline/)
- [Jenkins (젠킨스)](/knowledge/linux/jenkins/)
- [블루-그린 배포 (Blue-Green Deployment)](/knowledge/linux/blue-green-deployment/)
- [Terraform (테라폼)](/knowledge/linux/terraform/)
- [DevOps (데브옵스)](/knowledge/linux/devops/)
