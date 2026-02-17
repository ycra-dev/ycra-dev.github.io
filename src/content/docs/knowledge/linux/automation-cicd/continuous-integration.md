---
title: "Continuous Integration"
description: "지속적 통합(Continuous Integration, CI)은 팀 구성원이 작업을 자주 통합하고, 공유 코드 베이스에 병합될 때마다 자동으로 빌드와 테스트를 실행하는 소프트웨어 개발 실천 방법이다"
tags: ['Continuous Integration', 'Ci', 'Build', 'Testing', 'Version Control', 'Automation']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/linux/continuous-integration
sidebar:
  order: 9
---

## 핵심 개념

Martin Fowler가 기술한 CI의 핵심은 "팀 구성원이 자신의 작업을 자주 통합하는 실천"이다. 이는 장기간 독립적으로 개발된 코드 조각들을 조율하는 고통스러운 작업을 제거한다.

**CI의 핵심 원칙:**
1. **버전 제어 사용**: 모든 코드는 Git 등의 소스 제어 시스템에 추적. 버전 제어가 유일한 진실의 원천(single source of truth)
2. **한 번 빌드, 여러 번 배포**: 빌드의 출력물(아티팩트)을 이후 테스트와 배포에 동일하게 사용
3. **모든 통합 커밋 빌드**: 통합 브랜치에 커밋 시 자동으로 빌드 트리거
4. **빠르게 빌드, 빠르게 수정**: 피드백은 분 단위로 제공되어야 함
5. **공유 책임**: 빌드 실패 시 이전 문제 해결 전까지 새 코드 푸시 금지

**빌드 프로세스:**
- 빌드는 소프트웨어 프로젝트의 현재 상태 스냅샷
- 통합 브랜치에 커밋되거나 정기 일정에 의해 트리거
- 언어별로 다름: C/Go는 컴파일, Python/Ruby는 패키징

**빌드 아티팩트 유형:**
- 실행 바이너리
- OS 패키지 (RPM, DEB)
- 컨테이너 이미지
- VM 이미지
- 아카이브 (tarball)

아티팩트는 아티팩트 저장소(yum/APT 저장소, Docker 레지스트리, S3 버킷 등)에 저장된다.

## 예시

```groovy
// Jenkinsfile 예시 - CI 파이프라인
pipeline {
    agent any
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        stage('Test') {
            steps {
                sh 'go test ./...'
            }
        }
        stage('Build') {
            steps {
                sh 'go build -o myapp'
            }
        }
    }
}
```

```bash
# Go 프로젝트의 테스트 및 빌드
go test ./...           # 유닛 테스트 실행
go build -o ulsahgo     # 바이너리 빌드
```

## 관련 개념

- [Continuous Delivery](/knowledge/linux/continuous-delivery/)
- [CI/CD Pipeline](/knowledge/linux/cicd-pipeline/)
- [Jenkins](/knowledge/linux/jenkins/)
- [DevOps](/knowledge/linux/devops/)
- [Build Artifact](/knowledge/linux/build-artifact/)
