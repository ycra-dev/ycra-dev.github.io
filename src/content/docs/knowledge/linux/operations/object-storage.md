---
title: "오브젝트 스토리지 (Object Storage)"
description: "객체 스토리지는 평면 네임스페이스에서 개별 객체(파일)를 저장하는 클라우드 스토리지 시스템으로, 사실상 무제한의 데이터를 매우 높은 신뢰성(99"
tags: ['Cloud Storage', 'S3', 'Blob Storage', 'Distributed Storage', 'Backup']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/linux/object-storage
sidebar:
  order: 2
---

## 핵심 개념

AWS S3와 Google Cloud Storage가 대표적이다. HTTPS를 통해 네트워크로 접근하며, 디렉토리 구조 없이 고유한 키(이름)로 객체를 식별한다. 데이터는 여러 가용 영역과 데이터센터에 자동 복제되어 하드웨어 장애로부터 보호된다.

**블록 스토리지**(EBS)와의 차이: 블록 스토리지는 가상 하드디스크로 VPS에 연결하여 사용하며, I/O 프로필을 커스터마이징할 수 있다. **임시 스토리지**는 호스트 로컬 디스크로 빠르지만 VPS 삭제 시 데이터가 손실된다.

주요 사용 사례: 백업, 아카이브, 정적 웹 콘텐츠 호스팅, 로그 파일 저장, 대용량 미디어 파일 저장. 사용량 기반 과금으로 미사용 용량에 비용을 지불할 필요가 없다.

## 예시

```bash
# S3 버킷 생성 및 파일 업로드
aws s3 mb s3://my-bucket
aws s3 cp /path/to/file.txt s3://my-bucket/

# 디렉토리 동기화
aws s3 sync /local/dir s3://my-bucket/backup/

# GCS 버킷 생성 및 업로드
gsutil mb gs://my-bucket
gsutil cp /path/to/file.txt gs://my-bucket/

# 버전 관리 활성화
aws s3api put-bucket-versioning --bucket my-bucket \
  --versioning-configuration Status=Enabled

# 수명 주기 정책 (30일 후 삭제)
aws s3api put-bucket-lifecycle-configuration \
  --bucket my-bucket --lifecycle-configuration file://lifecycle.json
```

## 관련 개념

- [서비스형 인프라 (Infrastructure as a Service)](/knowledge/linux/infrastructure-as-a-service/)
- [파일 시스템 (Filesystem)](/knowledge/linux/filesystem/)
- [DevOps (데브옵스)](/knowledge/linux/devops/)
