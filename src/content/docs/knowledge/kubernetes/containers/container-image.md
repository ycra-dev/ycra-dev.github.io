---
title: "컨테이너 이미지 (Container Image)"
description: "컨테이너 이미지는 애플리케이션과 그 환경(라이브러리, 의존성, OS 파일시스템 전체)을 하나의 휴대 가능한 패키지로 묶은 것이다"
tags: ['Container', 'Image', 'Docker', 'Packaging', 'Distribution']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/kubernetes/container-image
sidebar:
  order: 2
---

## 핵심 개념

컨테이너 이미지는 Docker의 세 가지 핵심 개념(이미지, 레지스트리, 컨테이너) 중 하나이다.

이미지의 구성 요소:
- **파일시스템 내용**: 애플리케이션이 사용할 전체 파일시스템 (OS 파일 포함)
- **메타데이터**: 실행할 실행 파일 경로, 포트 정보, 환경 변수 등
- **레이어 구조**: 이미지는 여러 레이어로 구성되어 효율적인 저장과 전송이 가능

이미지의 이식성(Portability):
- Docker가 설치된 모든 Linux 컴퓨터에서 실행 가능
- 호스트의 Linux 배포판과 무관하게 동일한 환경 제공 (예: RHEL 이미지를 Fedora에서 실행 가능)
- 단, 커널 버전이나 커널 모듈에 의존하는 경우 호환성 문제 발생 가능
- CPU 아키텍처가 일치해야 함 (x86 이미지는 ARM에서 실행 불가)

이미지 태그(Tag):
- 같은 이미지의 여러 버전이나 변형을 구분하는 식별자
- 태그를 지정하지 않으면 `latest` 태그가 기본 사용됨
- 예: `redis:5.0.7-alpine` (Redis 5.0.7의 Alpine Linux 기반 변형)

## 예시

```bash
# 이미지 빌드
$ docker build -t kiada:latest .

# 이미지 태깅
$ docker tag kiada luksa/kiada:0.1

# 이미지 목록 확인
$ docker images
REPOSITORY     TAG       IMAGE ID        VIRTUAL SIZE
luksa/kiada    0.1       b0ecc49d7a1d    908 MB
kiada          latest    b0ecc49d7a1d    908 MB

# 이미지 레이어 확인
$ docker history kiada:latest
IMAGE         CREATED     CREATED BY                            SIZE
b0ecc49d7a1d  7 min ago   /bin/sh -c #(nop) ENTRYPOINT ["n...   0B
1d4de446f0f0  7 min ago   /bin/sh -c #(nop) COPY dir:6ecee...   534kB
28d67701d6d9  7 min ago   /bin/sh -c #(nop) COPY file:2ed5...   2.8kB

# 이미지 삭제
$ docker rmi kiada:latest
```

## 관련 개념

- [컨테이너 (Container)](/knowledge/kubernetes/container/) - 이미지로부터 생성되는 실행 인스턴스
- [컨테이너 레지스트리 (Container Registry)](/knowledge/kubernetes/container-registry/) - 이미지가 저장되고 배포되는 저장소
- [Dockerfile](/knowledge/kubernetes/dockerfile/) - 이미지를 빌드하기 위한 명세 파일
- [이미지 레이어 (Image Layer)](/knowledge/kubernetes/image-layer/) - 이미지를 구성하는 레이어 구조
- [Copy-on-Write](/knowledge/kubernetes/copy-on-write/) - 이미지 레이어의 읽기 전용 특성과 관련된 메커니즘
