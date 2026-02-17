---
title: "Name Resolution"
description: "이름 해석(Name Resolution)은 이름 공간(name space)에서 경로 이름(path name)을 따라가며, 해당 이름이 참조하는 엔티티의 정보(주소, 상태 등)를 검색하는 과정이다"
tags: ['Name Resolution', 'Name Space', 'Iterative', 'Recursive', 'Closure Mechanism']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/distributed-systems/name-resolution
sidebar:
  order: 2
---

## 핵심 개념

**이름 공간 구조**: 라벨이 부여된 방향 그래프. 리프 노드는 명명된 엔티티(파일 등), 디렉토리 노드는 (노드 식별자, 에지 라벨) 쌍을 저장. 경로 이름은 에지 라벨의 순서.

**폐쇄 메커니즘(Closure Mechanism)**: 이름 해석 시작점을 알아야 한다. 예: Unix 파일 시스템에서 루트 디렉토리의 inode 위치는 하드코딩됨. 전화번호는 "전화기에 입력"이라는 행위가 폐쇄 메커니즘.

**링킹과 마운팅**:
- **하드 링크**: 동일 노드에 대한 여러 절대 경로 (예: /keys와 /home/steen/keys)
- **심볼릭 링크**: 리프 노드가 절대 경로 이름을 저장
- **마운팅**: 디렉토리 노드가 외부 이름 공간의 디렉토리 노드 식별자를 저장. 마운트 포인트 → 마운팅 포인트.

**반복적(Iterative) 해석**: 클라이언트의 리졸버가 각 네임 서버를 순차적으로 접촉. 서버는 자기 부분만 해석하고 다음 서버 주소를 반환. 클라이언트가 다음 서버에 나머지를 요청.

**재귀적(Recursive) 해석**: 네임 서버가 다음 서버에 직접 요청을 전달하고, 최종 결과를 역순으로 반환. 장점: 중간 서버에서 캐싱 효과적, 통신 비용 절감. 단점: 서버 부하 증가.

**이름 공간의 계층적 분산**: 전역 계층(안정적, 느린 변경), 관리 계층(조직 단위), 관리자 계층(빈번한 변경). 상위 계층일수록 캐싱 효과가 크고 가용성이 중요.

## 예시

```
# 반복적 이름 해석: ftp://ftp.cs.vu.nl/pub/globe/index.html
클라이언트 → 루트 서버: [nl, vu, cs, ftp] → #[nl] 반환
클라이언트 → nl 서버: [vu, cs, ftp] → #[vu] 반환
클라이언트 → vu 서버: [cs, ftp] → #[cs,ftp] 반환
클라이언트 → FTP 서버: [pub, globe, index.html] → 파일 반환

# 재귀적 이름 해석: 같은 요청
클라이언트 → 루트 서버 → nl 서버 → vu 서버 → cs 서버
결과가 역순으로 반환되며 각 서버에서 캐싱 가능

# NFS 마운팅 예:
# quandar$ mount -t nfs 192.168.2.3:/audio /home/maarten/Music
# → 원격 /audio가 로컬 /home/maarten/Music으로 접근 가능
```

## 관련 개념

- [DNS](/knowledge/distributed-systems/dns/)
- [NFS](/knowledge/distributed-systems/nfs/)
- [Flat Naming](/knowledge/distributed-systems/flat-naming/)
- [Distributed Hash Table](/knowledge/distributed-systems/distributed-hash-table/)
