---
title: "Copy-on-Write"
description: "Copy-on-Write(CoW)는 컨테이너 파일시스템에서 사용되는 메커니즘으로, 여러 컨테이너가 동일한 이미지 레이어(읽기 전용)를 공유하면서도 각자 독립적인 파일시스템 뷰를 제공한다"
tags: ['Container', 'Filesystem', 'Copy On Write', 'Image Layer', 'Storage']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/kubernetes/copy-on-write
sidebar:
  order: 8
---

## 핵심 개념

컨테이너의 파일시스템은 이미지의 읽기 전용(read-only) 레이어들과 그 위에 쌓인 추가적인 읽기/쓰기(read/write) 레이어로 구성된다. 이 구조를 통해 여러 컨테이너가 동일한 이미지 레이어를 안전하게 공유할 수 있다.

CoW 동작 방식:
1. **읽기**: 컨테이너가 파일을 읽을 때, 가장 위의 레이어부터 아래로 파일을 탐색
2. **쓰기**: 읽기 전용 레이어의 파일을 수정하면, 전체 파일이 컨테이너의 R/W 레이어로 복사된 후 수정됨
3. **삭제**: 파일을 삭제해도 R/W 레이어에서 "삭제됨"으로 표시만 되며, 하위 레이어에서는 여전히 존재

핵심 특성:
- 각 컨테이너는 자체 쓰기 가능 레이어를 가짐
- 공유 파일에 대한 변경은 해당 컨테이너의 R/W 레이어에서만 이루어짐
- 다른 컨테이너에서는 변경 사항이 보이지 않음
- 파일 삭제가 이미지 크기를 줄이지 않음

주의사항:
- 파일 권한이나 소유권 변경도 전체 파일의 복사를 유발
- 큰 파일이나 많은 파일에 대한 이러한 작업은 이미지 크기를 크게 증가시킬 수 있음

## 예시

```
Copy-on-Write 동작 시각화:

컨테이너 A                컨테이너 B
+------------------+     +------------------+
| R/W 레이어       |     | R/W 레이어       |
| (수정된 config)  |     | (비어있음)       |
+------------------+     +------------------+
        |                        |
        +--------+-------+------+
                 |
+----------------------------------+
| 공유 이미지 레이어 (읽기 전용)      |
| - app.js                         |
| - config.json  (원본)            |
| - /node_modules/                 |
+----------------------------------+

1. 컨테이너 A가 config.json을 수정하려 함
2. 커널이 config.json을 A의 R/W 레이어로 복사
3. A의 R/W 레이어에서 복사본 수정
4. 컨테이너 B는 여전히 원본 config.json을 봄
```

```
파일 삭제의 비직관적 동작:

Dockerfile에서:
COPY large-file.dat /data/   # 레이어 1: +100MB
RUN rm /data/large-file.dat  # 레이어 2: 삭제 마크만 추가

결과: 이미지 크기는 여전히 100MB 이상
      (레이어 1에 파일이 여전히 존재)

올바른 방법:
RUN curl -o /data/large-file.dat ... && \
    process /data/large-file.dat && \
    rm /data/large-file.dat
# 같은 RUN 명령 (같은 레이어)에서 생성과 삭제를 처리
```

## 관련 개념

- [이미지 레이어 (Image Layer)](/knowledge/kubernetes/image-layer/) - CoW가 적용되는 읽기 전용 레이어
- [컨테이너 이미지 (Container Image)](/knowledge/kubernetes/container-image/) - CoW 메커니즘의 기반이 되는 이미지
- [컨테이너 (Container)](/knowledge/kubernetes/container/) - 각 컨테이너가 자체 R/W 레이어를 소유
- [Dockerfile](/knowledge/kubernetes/dockerfile/) - 레이어 생성에 영향을 미치는 빌드 명세
