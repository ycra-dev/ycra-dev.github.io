---
title: "Hadoop Distributed File System"
description: "Hadoop Distributed File System(HDFS)은 대규모 데이터를 여러 머신에 분산 저장하는 분산 파일 시스템으로, 파일을 블록 단위로 분할하고 각 블록을 복수의 머신에 복제하여 장애 내성과 병렬 I/O를 제공한다"
tags: ['HDFS', 'Distributed File System', 'Hadoop', 'Big Data', 'Fault Tolerance']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/database/hadoop-distributed-file-system
sidebar:
  order: 2
---

## 핵심 개념

HDFS는 MapReduce와 같은 병렬 데이터 처리 시스템의 기반 저장소 역할을 한다. 단일 머신의 파일 시스템에 모든 데이터를 저장하면 해당 머신이 I/O 병목이 되므로, HDFS는 여러 머신이 협력하여 파일을 저장하도록 설계되었다.

HDFS의 핵심 설계 원칙은 파일을 블록 단위(일반적으로 64MB 또는 128MB)로 분할하고, 각 블록을 여러 머신에 분산 저장하는 것이다. 각 블록은 통상적으로 3개의 머신에 복제(replicate)되어, 일부 머신이 장애를 겪더라도 데이터에 접근할 수 있도록 한다. 이 복제 전략은 데이터 가용성(availability)을 보장하면서도 저렴한 상용 하드웨어를 사용할 수 있게 해준다.

Hadoop MapReduce는 HDFS 위에서 동작하며, 입력과 출력 파일을 HDFS에 저장한다. 여러 머신이 동시에 데이터를 읽고 쓸 수 있어 병렬 I/O가 가능하다. MapReduce 외에도 HBase, Spark 등 다양한 빅데이터 처리 시스템이 HDFS를 저장 계층으로 활용한다.

HDFS는 스트리밍 방식의 데이터 접근에 최적화되어 있으며, 대용량 파일의 순차 읽기에 뛰어난 성능을 보인다. 반면, 작은 파일의 랜덤 접근이나 낮은 지연 시간이 요구되는 워크로드에는 적합하지 않다. 이러한 특성은 빅데이터 분석의 배치 처리 패턴과 잘 맞는다.

## 예시

Hadoop에서 MapReduce 작업을 실행할 때 HDFS를 사용하는 방식:

```java
// Hadoop MapReduce 작업에서 HDFS의 입출력 경로 설정
FileInputFormat.addInputPath(job, new Path(args[0]));
FileOutputFormat.setOutputPath(job, new Path(args[1]));
```

위 코드에서 `args[0]`과 `args[1]`은 HDFS 상의 경로를 나타낸다. 입력 파일은 HDFS에서 여러 머신이 병렬로 읽고, 출력도 HDFS에 분산 저장된다. saveAsTextFile() 같은 함수는 RDD가 여러 머신에 파티셔닝되어 있다면 여러 파일을 동시에 생성한다.

## 관련 개념

- [MapReduce](/knowledge/database/mapreduce/)
- [Apache Spark](/knowledge/database/apache-spark/)
- [Key-Value Store](/knowledge/database/key-value-store/)
