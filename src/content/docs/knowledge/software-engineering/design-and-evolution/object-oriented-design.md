---
title: "Object-oriented Design"
description: "객체지향 설계는 시스템을 상호작용하는 객체들의 집합으로 모델링하는 설계 접근법으로, 각 객체는 자체적인 상태(데이터)와 행위(메서드)를 캡슐화한다"
tags: ['Object Oriented Design', 'OOP', 'Encapsulation', 'Class', 'Object', 'Inheritance']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/software-engineering/object-oriented-design
sidebar:
  order: 1
---

## 핵심 개념

객체지향 설계에서는 시스템 컨텍스트 및 사용 모델 개발, 아키텍처 설계, 주요 시스템 객체 식별, 설계 모델 개발, 인터페이스 명세의 과정을 거친다. 객체 식별 방법으로는 문법 기반 접근법(요구사항에서 명사를 추출하여 클래스 후보로 식별), 도메인 분석, 시나리오 기반 분석 등이 있다. 설계 패턴은 공통적인 설계 문제에 대한 재사용 가능한 해결책을 제공하여 객체지향 설계의 품질을 높인다.

## 예시

기상 관측 시스템의 OO 설계: 주요 객체 식별 - WeatherStation(기상 관측소), WeatherData(기상 데이터), Sensor(센서), Display(표시 장치). 각 객체의 인터페이스 정의: WeatherStation.reportWeather(), WeatherData.summarize(), Sensor.readValue().

## 관련 개념

- [Design Patterns](/knowledge/software-engineering/design-patterns/)
- [Class Diagram](/knowledge/software-engineering/class-diagram/)
- [UML](/knowledge/software-engineering/uml/)
- [Software Architecture](/knowledge/software-engineering/software-architecture/)
