---
title: "Apache Spark"
description: "Apache Spark는 다양한 대수적 연산(algebraic operations)을 지원하는 널리 사용되는 병렬 데이터 처리 시스템으로, 여러 스토리지 시스템으로부터 데이터를 입출력할 수 있다"
tags: ['Apache Spark', 'Big Data', 'Parallel Processing', 'Rdd', 'Algebraic Operations']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/database/apache-spark
sidebar:
  order: 3
---

## 핵심 개념

Spark의 핵심 데이터 추상화는 Resilient Distributed Dataset(RDD)이다. RDD는 여러 머신에 분산 저장될 수 있는 레코드들의 컬렉션이다. 'distributed'는 레코드가 서로 다른 머신에 저장됨을 의미하고, 'resilient'는 머신 하나가 실패해도 다른 머신에서 레코드를 복구할 수 있는 장애 복원력을 의미한다.

Spark의 연산자는 하나 이상의 RDD를 입력으로 받아 RDD를 출력한다. RDD에 저장되는 레코드의 타입은 사전 정의되지 않으며, 애플리케이션이 원하는 어떤 타입이든 가능하다. Spark는 또한 DataSet이라는 관계형 데이터 표현을 지원하며, Parquet, ORC, Avro 같은 파일 형식과 잘 연동된다.

Spark의 중요한 특징 중 하나는 지연 평가(lazy evaluation)이다. 연산 트리는 정의 시점에 바로 실행되지 않고, saveAsTextFile()이나 collect() 같은 특정 연산이 트리의 실행을 요구할 때 비로소 평가된다. 이러한 지연 평가는 실제 실행 전에 쿼리 최적화기가 트리를 재작성하여 더 빠른 실행 계획을 만들 수 있게 해준다.

Spark는 Java, Scala, Python용 API를 제공하며, Hive SQL 쿼리를 Spark 연산 트리로 컴파일하는 것도 지원한다. 또한 머신 러닝 관련 대수적 연산 등 데이터베이스 연산 이외의 연산도 지원한다.

## 예시

Spark에서의 Word Count 프로그램 예시 (Java):

```java
SparkSession spark =
    SparkSession.builder().appName("WordCount").getOrCreate();
JavaRDD<String> lines = spark.read().textFile(args[0]).javaRDD();
JavaRDD<String> words = lines.flatMap(
    s -> Arrays.asList(s.split(" ")).iterator());
JavaPairRDD<String, Integer> ones =
    words.mapToPair(s -> new Tuple2<>(s, 1));
JavaPairRDD<String, Integer> counts =
    ones.reduceByKey((i1, i2) -> i1 + i2);
counts.saveAsTextFile("outputDir");
spark.stop();
```

DataSet을 이용한 관계형 연산 예시:

```java
Dataset<Row> instructor = spark.read().parquet("...");
Dataset<Row> department = spark.read().parquet("...");
instructor.filter(instructor.col("salary").gt(100000))
    .join(department, instructor.col("dept_name")
        .equalTo(department.col("dept_name")))
    .groupBy(department.col("building"))
    .agg(count(instructor.col("ID")));
```

## 관련 개념

- [MapReduce](/knowledge/database/mapreduce/)
- [Hadoop Distributed File System](/knowledge/database/hadoop-distributed-file-system/)
- [Streaming Data](/knowledge/database/streaming-data/)
- [Data Warehouse](/knowledge/database/data-warehouse/)
