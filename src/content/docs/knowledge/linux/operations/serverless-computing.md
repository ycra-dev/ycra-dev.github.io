---
title: "Serverless Computing"
description: "서버리스 컴퓨팅(Functions-as-a-Service)은 장기 실행 인프라 없이 이벤트(HTTP 요청, 파일 업로드 등)에 응답하여 함수를 실행하는 모델로, 서버나 OS를 관리할 필요 없이 함수 실행 시간에 대해서만 비용을 지불한다"
tags: ['Serverless', 'Lambda', 'Faas', 'Event Driven', 'Cloud Functions', 'Microservices']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/linux/serverless-computing
sidebar:
  order: 3
---

## 핵심 개념

AWS Lambda(2014)가 최초의 클라우드 함수 서비스이며, Google Cloud Functions가 뒤따랐다. **트리거 소스**: HTTP 요청, S3 파일 업로드, 데이터베이스 변경, 예약 시간(cron 유사), 메시지 큐 도착 등.

**자동 확장**: 트래픽 급증 시 더 많은 함수 인스턴스를 자동 생성하고, 감소 시 축소. 전통적 서버 아키텍처에서 달성하기 어려운 탄력성을 제공한다.

**사용 사례**: 이미지 썸네일 생성, 로그 처리, 데이터 변환, 웹훅 처리, IoT 백엔드, API 백엔드. 마이크로서비스 아키텍처와 잘 어울린다.

## 예시

```bash
# AWS Lambda 함수 생성
aws lambda create-function \
  --function-name my-function \
  --runtime python3.9 \
  --role arn:aws:iam::123:role/lambda-role \
  --handler lambda_function.lambda_handler \
  --zip-file fileb://function.zip

# Lambda 함수 호출
aws lambda invoke --function-name my-function \
  --payload '{"key": "value"}' response.json

# S3 트리거 설정 (파일 업로드 시 Lambda 실행)
aws lambda add-permission --function-name my-function \
  --statement-id s3-trigger --action lambda:InvokeFunction \
  --principal s3.amazonaws.com

# 예약 실행 (cron 유사)
aws events put-rule --name hourly-rule \
  --schedule-expression 'rate(1 hour)'

# Google Cloud Functions 배포
gcloud functions deploy hello --runtime python39 \
  --trigger-http --allow-unauthenticated
```

## 관련 개념

- [Infrastructure as a Service](/knowledge/linux/infrastructure-as-a-service/)
- [Cron](/knowledge/linux/cron/)
- [Process](/knowledge/linux/process/)
- [DevOps](/knowledge/linux/devops/)
