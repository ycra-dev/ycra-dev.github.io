---
title: "MapReduce"
description: "MapReduce는 웨어하우스 스케일 컴퓨터에서 배치 처리를 위한 프로그래밍 프레임워크이다"
tags: ['Warehouse Scale Computer', 'Distributed Computing', 'Hadoop', 'Batch Processing', 'Parallel Computing']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/mapreduce
sidebar:
  order: 32
---

## 핵심 개념

MapReduce의 동작 과정:
1. **Map 단계:** 프로그래머가 정의한 함수를 각 논리적 입력 레코드에 적용한다. 수천 대의 서버에서 병렬로 실행되어 키-값 쌍의 중간 결과를 생성한다.
2. **셔플/정렬:** Map 단계 후 키-값 쌍을 키별로 그룹화한다.
3. **Reduce 단계:** 프로그래머가 정의한 다른 함수를 사용하여 동일한 키를 가진 값들을 하나로 합친다.

MapReduce의 핵심 장점은 높은 병렬성과 사용 용이성이다. 적절한 소프트웨어 지원이 있으면 30분 내에 초보 프로그래머도 수천 대의 서버에서 MapReduce 작업을 실행할 수 있다.

오픈소스 구현인 Hadoop이 널리 사용되며, 구글은 2008년 Dean이 발표한 원래 MapReduce 논문이 이 분야를 열었다.

## 예시

```
# 문서 컬렉션에서 단어 빈도 계산

Map(String key, String value):
  // key: 문서 이름
  // value: 문서 내용
  for each word w in value:
    EmitIntermediate(w, "1");

# 중간 결과 (셔플 후):
# "hello" -> ["1", "1", "1"]
# "world" -> ["1", "1"]

Reduce(String key, Iterator values):
  // key: 단어
  // values: 카운트 리스트
  int result = 0;
  for each v in values:
    result += ParseInt(v);
  Emit(AsString(result));

# 최종 결과:
# "hello" -> 3
# "world" -> 2

# 실행 환경
MapReduce 런타임이 자동으로:
- Map 태스크를 수천 대 서버에 분배
- 중간 결과를 키별로 셔플/정렬
- Reduce 태스크를 서버에 스케줄링
```

## 관련 개념

- [Warehouse Scale Computer](/knowledge/computer-architecture/warehouse-scale-computer/)
- [Cluster](/knowledge/computer-architecture/cluster/)
- [Message Passing](/knowledge/computer-architecture/message-passing/)
- [Strong Scaling](/knowledge/computer-architecture/strong-scaling/)
