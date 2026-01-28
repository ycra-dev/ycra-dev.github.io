---
title: "객체 스토리지 (Object Storage)"
description: "데이터를 계층적 디렉터리 없이 고유 ID로 식별되는 객체 단위로 저장하는 방식"
tags: ["OS", "Storage", "Cloud"]
created: 2026-01-27
updated: 2026-01-27
draft: true
slug: knowledge/os/object-storage
sidebar:
  order: 7
---

## 핵심 개념

객체 스토리지는 데이터를 계층적 디렉터리 없이 고유 ID로 식별되는 객체 단위로 저장하며, 수평 확장과 비정형 데이터에 적합한 저장 방식입니다. 전통적 파일 시스템은 계층 구조와 메타데이터 관리에 한계가 있어(수십억 개 파일 시 성능 저하), 페타바이트 규모의 데이터를 저렴하고 확장 가능하게 저장할 필요성에서 등장했습니다.

## 동작 원리

### 객체(Object)의 구성

1. **데이터**: 실제 저장 내용 (이미지, 동영상, 로그 등)
2. **메타데이터**: 객체 자체를 설명하는 정보 (커스텀 가능)
3. **고유 식별자(Object ID)**: 객체를 찾는 유일한 키

### 파일 시스템 vs 객체 스토리지

| 항목 | 파일 시스템 | 객체 스토리지 |
|------|------------|--------------|
| 구조 | 계층적 디렉터리 | 평면 네임스페이스 |
| 접근 | 경로 (/home/user/file.txt) | 객체 ID (UUID) |
| 인터페이스 | POSIX (open, read, write) | REST API (PUT, GET, DELETE) |
| 메타데이터 | 제한적 (이름, 크기, 시간) | 풍부하고 커스텀 가능 |
| 수정 | 부분 수정 가능 | 보통 전체 교체 (immutable) |
| 확장성 | 제한적 | 수평 확장 용이 |

### 동작 방식

```
# 객체 생성 (PUT)
PUT /bucket/object-id-12345
Body: [이미지 데이터]
→ 201 Created

# 객체 조회 (GET)
GET /bucket/object-id-12345
→ 200 OK, [이미지 데이터]

# 객체 삭제 (DELETE)
DELETE /bucket/object-id-12345
→ 204 No Content
```

### 데이터 보호와 확장

- **복제(Replication)**: N개 노드에 객체 복사본 저장
- **수평 확장**: 노드(서버+디스크) 추가로 용량/성능 선형 증가
- **콘텐츠 주소 지정(CAS)**: 객체의 내용 해시를 ID로 사용하여 자동 중복 제거

### 대표 시스템

Amazon S3, HDFS (Hadoop), Ceph, OpenStack Swift, MinIO

## 예시

파일 시스템이 정리된 서류 캐비닛(서랍 > 폴더 > 파일)이라면, 객체 스토리지는 라벨 붙인 상자들이 쌓인 대형 창고(상자 ID로만 찾음)입니다.

- 장점: 무제한에 가까운 확장성(페타바이트+), 풍부한 메타데이터, REST API 접근
- 단점: 낮은 랜덤 I/O 성능, 부분 수정 불가, 디렉터리 탐색 불가
- 적합: 백업/아카이브, 미디어 스트리밍, 빅데이터 분석
- 부적합: 데이터베이스, 빈번한 부분 수정, 저지연 요구

## 관련 개념

- [저장장치 계층구조 (Storage Hierarchy)](/knowledge/os/storage-hierarchy/)
- [분산 파일 시스템 (DFS)](/knowledge/os/dfs/)
- [클러스터 기반 DFS (GFS, HDFS)](/knowledge/os/cluster-dfs/)
