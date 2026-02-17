---
title: "MapReduce"
description: "MapReduce는 대규모 데이터를 병렬로 처리하기 위한 프로그래밍 패러다임으로, 프로그래머가 map() 함수와 reduce() 함수를 정의하면 시스템이 자동으로 여러 머신에서 병렬 실행을 관리한다"
tags: ['MapReduce', 'Parallel Processing', 'Big Data', 'Distributed Computing']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/database/mapreduce
sidebar:
  order: 1
---

## 핵심 개념

MapReduce 패러다임은 함수형 프로그래밍과 병렬 처리 커뮤니티에서 수십 년에 걸쳐 발전해 온 개념이다. Lisp 언어에서 이미 map과 reduce 함수가 지원되었으며, 이를 대규모 분산 시스템에 적용한 것이 현대의 MapReduce 시스템이다.

MapReduce의 핵심 아이디어는 두 단계로 나뉜다. 첫 번째 단계인 map()에서는 각 입력 레코드에 대해 사용자 정의 처리를 수행하고, (key, value) 쌍을 출력한다. 두 번째 단계인 reduce()에서는 같은 키를 가진 모든 값들을 모아서 집계 연산을 수행한다. 이 사이에 shuffle 단계가 있어, 서로 다른 머신에서 생성된 동일 키의 데이터를 한 곳으로 모은다.

MapReduce 시스템의 가장 큰 장점은 프로그래머가 병렬 처리의 복잡한 세부 사항(머신 간 조율, 장애 복구 등)을 신경 쓸 필요 없이, 핵심 로직인 map()과 reduce() 함수만 작성하면 된다는 것이다. 시스템이 자동으로 데이터를 분할하고, 여러 머신에서 병렬로 실행하며, 머신 장애 시 해당 부분만 재실행한다.

MapReduce는 관계형 연산도 구현할 수 있다. selection은 단일 map() 함수로, group by와 집계는 단일 MapReduce 단계로, join은 양쪽 릴레이션의 조인 속성을 reduce key로 사용하여 구현할 수 있다. 이러한 가능성을 바탕으로 Apache Hive, Apache Pig 등 SQL-on-MapReduce 시스템이 개발되었다.

그러나 MapReduce는 단일 map-reduce 단계만 지원하므로, 복잡한 다단계 처리를 위해서는 여러 MapReduce 작업을 연결해야 하며, 중간 결과를 파일 시스템에 기록하고 다시 읽어야 하는 오버헤드가 있다. 이러한 한계를 극복하기 위해 Apache Spark 같은 차세대 시스템이 등장했다.

## 예시

단어 수 세기(Word Count) 프로그램은 MapReduce의 대표적인 예시이다:

```
map(String record) {
    For each word in record
        emit(word, 1).
}

reduce(String key, List value_list) {
    String word = key;
    int count = 0;
    For each value in value_list
        count = count + value
    output(word, count)
}
```

입력 문장 "One a penny, two a penny, hot cross buns."에 대해:
- map() 출력: ("one", 1), ("a", 1), ("penny", 1), ("two", 1), ("a", 1), ("penny", 1), ...
- shuffle 후: ("a", [1,1]), ("penny", [1,1]), ("one", [1]), ...
- reduce() 출력: ("a", 2), ("penny", 2), ("one", 1), ...

## 관련 개념

- [Hadoop Distributed File System](/knowledge/database/hadoop-distributed-file-system/)
- [Apache Spark](/knowledge/database/apache-spark/)
- [Key-Value Store](/knowledge/database/key-value-store/)
