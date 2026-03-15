---
title: "빌드 아티팩트 (Build Artifact)"
description: "빌드 아티팩트(Build Artifact)는 CI/CD 파이프라인의 빌드 단계에서 생성되는 출력물로, 이후 테스트와 배포에 사용되는 설치 가능한 소프트웨어 형태이다"
tags: ['Build Artifact', 'Ci Cd', 'Build', 'Deployment', 'Package', 'Binary']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/linux/build-artifact
sidebar:
  order: 13
---

## 핵심 개념

**"한 번 빌드, 여러 번 배포(Build Once, Deploy Often)"** 원칙에 따라, 동일한 아티팩트가 모든 환경(개발, 스테이징, 프로덕션)에 배포된다. 환경별로 다시 빌드하지 않아야 테스트의 신뢰성이 보장된다.

**빌드 아티팩트 유형:**
| 유형 | 설명 |
|------|------|
| 실행 바이너리 | C, Go 등 컴파일 언어의 출력 |
| OS 패키지 | RPM, DEB 패키지 |
| 컨테이너 이미지 | Docker 이미지 |
| VM 이미지 | AMI, DigitalOcean Snapshot 등 |
| 아카이브 | Tarball, ZIP |
| 패키지 번들 | Python wheel, Ruby gem, npm 패키지 |

**빌드 상태의 진행:**
1. **빌드(Build)**: 코드로부터 아티팩트 생성
2. **릴리스 후보(Release Candidate)**: 모든 테스트 통과한 빌드
3. **릴리스(Release)**: 프로덕션에 실제 배포된 릴리스 후보

**아티팩트 저장소:**
아티팩트는 배포에 필요한 모든 시스템에서 접근 가능한 저장소에 보관된다:
- SFTP/NFS 서버의 디렉토리
- yum/APT 저장소
- Docker 이미지 레지스트리
- AWS S3 같은 오브젝트 스토어

컨테이너 이미지가 빌드 아티팩트로 사용될 때 CI/CD와 특히 잘 어울린다. 극도로 빠른 사이클 타임으로 새 코드 배포와 이전 버전 롤백이 모두 용이하며, VM이나 구성 관리 시스템보다 한 자릿수 이상 빠르다.

## 예시

```bash
# Go 바이너리 빌드 아티팩트 생성
go build -o ulsahgo

# Docker 이미지 아티팩트 생성 및 레지스트리 저장
docker build -t myapp:v1.2.3 .
docker push registry.example.com/myapp:v1.2.3

# Packer를 이용한 VM 이미지 아티팩트
packer build -var "version=1.2.3" template.json
# 출력: DigitalOcean image ID 또는 AWS AMI ID

# 아티팩트를 S3에 저장
aws s3 cp ulsahgo s3://artifacts-bucket/ulsahgo-v1.2.3
```

## 관련 개념

- [지속적 통합 (Continuous Integration)](/knowledge/linux/continuous-integration/)
- [CI/CD 파이프라인 (CI/CD Pipeline)](/knowledge/linux/cicd-pipeline/)
- [도커 (Docker)](/knowledge/linux/docker/)
- [컨테이너 레지스트리 (Container Registry)](/knowledge/linux/container-registry/)
- [Packer (패커)](/knowledge/linux/packer/)
