---
title: "Platform as a Service"
description: "PaaS(Platform as a Service)는 인프라 관리를 제거하여 웹 호스팅을 단순화하는 클라우드 서비스 모델로, 개발자가 코드를 패키징하여 업로드하면 제공자가 자동으로 시스템을 프로비저닝하고 실행한다"
tags: ['Paas', 'Cloud', 'Web Hosting', 'Heroku', 'App Engine', 'Elastic Beanstalk']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/linux/platform-as-a-service
sidebar:
  order: 14
---

## 핵심 개념

PaaS는 인프라를 관심사에서 제거한다. 개발자는 특정 형식으로 코드를 패키징하여 업로드하고, 제공자가 적절한 시스템을 프로비저닝하여 자동 실행한다. 제공자는 실행 중인 애플리케이션에 연결된 DNS 엔드포인트를 발급하며, 클라이언트는 DNS CNAME 레코드로 커스터마이징할 수 있다.

장점은 인프라 관리의 간소화이지만, 유연성과 커스터마이징이 제한된다. 대부분의 PaaS는 셸에 대한 관리자 접근을 허용하지 않거나 적극적으로 비권장한다.

주요 PaaS:
- **Google App Engine**: PaaS 개념의 선구자. Python, Java, PHP, Go 지원. cron 스케줄링, 로그 접근, 실시간 메시징, 다양한 DB 접근 제공. "PaaS의 캐딜락"
- **AWS Elastic Beanstalk**: App Engine 지원 언어 + Ruby, Node.js, .NET, Docker. ELB/Auto Scaling 통합. 프로토타이핑에는 좋지만 많은 서비스로 구성된 프로덕션 워크로드에는 부적합.
- **Heroku**: dyno(경량 Linux 컨테이너)에 배포. 강력한 파트너 네트워크. AWS 위에서 동작하므로 가격이 높음.

## 예시

```bash
# Google App Engine 배포 (Python)
# app.yaml
runtime: python39
entrypoint: gunicorn -b :$PORT main:app

gcloud app deploy

# AWS Elastic Beanstalk 배포
eb init my-app --platform python-3.8
eb create my-env
eb deploy

# Heroku 배포
heroku create my-app
git push heroku main
heroku open

# Heroku dyno 관리
heroku ps
heroku ps:scale web=2
heroku logs --tail
```

## 관련 개념

- [Infrastructure as a Service](/knowledge/linux/infrastructure-as-a-service/)
- [Serverless Computing](/knowledge/linux/serverless-computing/)
- [Load Balancer](/knowledge/linux/load-balancer/)
- [Web Server](/knowledge/linux/web-server/)
- [HTTP](/knowledge/linux/http/)
