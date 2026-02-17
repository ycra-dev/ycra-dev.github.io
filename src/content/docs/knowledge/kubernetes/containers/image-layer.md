---
title: "Image Layer"
description: "이미지 레이어(Image Layer)는 컨테이너 이미지를 구성하는 읽기 전용(read-only)의 파일시스템 변경분이다"
tags: ['Container', 'Image Layer', 'Docker', 'Storage', 'Optimization']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/kubernetes/image-layer
sidebar:
  order: 3
---

## 핵심 개념

VM 이미지가 전체 파일시스템의 하나의 큰 블록(blob)인 반면, 컨테이너 이미지는 상대적으로 작은 여러 레이어로 구성된다. 이 레이어 구조는 컨테이너 이미지의 효율성을 보장하는 핵심 설계이다.

레이어의 핵심 특징:
1. **공유(Sharing)**: 동일한 레이어는 여러 이미지에서 재사용됨. Docker는 각 레이어를 한 번만 저장
2. **효율적 전송**: 이미지 pull 시 이미 로컬에 있는 레이어는 다시 다운로드하지 않음
3. **읽기 전용**: 이미지의 레이어는 모두 읽기 전용. 수정은 별도의 read/write 레이어에서 이루어짐
4. **증분 구조**: 각 레이어는 이전 레이어 위에 쌓이는 파일시스템 변경분

레이어와 이미지 크기의 관계:
- 파일을 삭제해도 새 레이어에 "삭제됨"으로 표시만 되며, 하위 레이어에서 실제로 제거되지 않음
- 따라서 파일 삭제로는 이미지 크기가 줄어들지 않음
- 파일 권한이나 소유자 변경도 전체 파일의 새 복사본을 생성하여 이미지 크기를 증가시킴
- RUN 지시어에서 생성된 임시 파일은 같은 명령 내에서 삭제해야 함

## 예시

```
이미지 레이어 구조 시각화:

이미지 A (kiada):              이미지 B (다른 앱):
+---------------------+       +---------------------+
| ENTRYPOINT 레이어   |       | 다른 앱 레이어       |
+---------------------+       +---------------------+
| COPY html/ 레이어   |       | 다른 파일 레이어     |
+---------------------+       +---------------------+
| COPY app.js 레이어  |       |                     |
+---------------------+       +---------------------+
|    node:16 베이스 이미지 레이어들 (공유됨!)         |
|    - Ubuntu 기본 레이어                           |
|    - apt-get 패키지 레이어                        |
|    - Node.js 설치 레이어                          |
+---------------------------------------------------+

두 이미지가 같은 베이스 이미지를 사용하면
해당 레이어는 한 번만 저장/다운로드됨
```

```bash
# 이미지 레이어 확인
$ docker history kiada:latest
IMAGE         CREATED     CREATED BY                            SIZE
b0ecc49d7a1d  7 min ago   ENTRYPOINT ["node", "app.js"]         0B    # 자체 레이어
1d4de446f0f0  7 min ago   COPY dir:... (html/)                  534kB # 자체 레이어
28d67701d6d9  7 min ago   COPY file:... (app.js)                2.8kB # 자체 레이어
e498dabfee1c  2 days ago  CMD ["node"]                          0B    # 베이스 이미지
<missing>     3 weeks ago  apt-get update && apt...             142MB # 베이스 이미지
```

## 관련 개념

- [Container Image](/knowledge/kubernetes/container-image/) - 레이어로 구성되는 이미지
- [Dockerfile](/knowledge/kubernetes/dockerfile/) - 각 지시어가 레이어를 생성하는 빌드 명세
- [Copy-on-Write](/knowledge/kubernetes/copy-on-write/) - 레이어의 읽기 전용 특성을 보완하는 메커니즘
- [Container Registry](/knowledge/kubernetes/container-registry/) - 레이어 단위로 이미지를 효율적으로 전송
