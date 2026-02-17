---
title: "XML"
description: "XML(eXtensible Markup Language)은 사용자 정의 태그를 통해 데이터의 구조와 의미를 기술하는 마크업 언어로, 레코드의 속성 집합과 속성 타입에 유연성을 제공하는 반정형 데이터 표현 형식이다"
tags: ['Xml', 'Semi Structured Data', 'Markup Language', 'Data Exchange']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/database/xml
sidebar:
  order: 3
---

## 핵심 개념

XML은 HTML과 달리 데이터의 표현이 아닌 데이터의 구조와 의미를 기술하는 데 목적이 있다. HTML이 고정된 태그 집합을 사용하는 반면, XML은 사용자가 태그를 자유롭게 정의할 수 있어 다양한 도메인의 데이터를 표현할 수 있다.

XML 문서는 요소(element)로 구성되며, 각 요소는 시작 태그와 종료 태그로 둘러싸인 내용을 가진다. 요소는 중첩될 수 있어 계층적 구조를 표현할 수 있고, 속성(attribute)을 가질 수 있다. XML은 문서의 구조를 정의하는 DTD(Document Type Definition)나 XML Schema를 통해 데이터의 유효성을 검증할 수 있다.

XML은 JSON보다 먼저 등장하여 웹 서비스와 데이터 교환의 표준으로 널리 사용되었다. SOAP 기반 웹 서비스("Big Web Services")는 XML을 사용하여 매개변수와 결과를 인코딩하며, 웹 API의 형식적 정의를 위한 특수 언어(WSDL)도 XML 기반이다.

현재 RESTful 웹 서비스에서는 JSON이 더 널리 사용되지만, XML은 여전히 설정 파일, 문서 기반 데이터, SOAP 웹 서비스 등에서 광범위하게 사용된다. XQuery와 XPath 같은 XML 전용 질의 언어가 존재하며, XSLT는 XML 문서를 다른 형식으로 변환하는 데 사용된다.

많은 데이터베이스 시스템이 XML 데이터 타입을 네이티브로 지원하며, XML 데이터에 대한 질의와 인덱싱 기능을 제공한다.

## 예시

```xml
<!-- 대학 데이터베이스의 XML 표현 -->
<university>
  <student>
    <ID>00128</ID>
    <name>Zhang</name>
    <dept_name>Comp. Sci.</dept_name>
    <tot_cred>102</tot_cred>
    <takes>
      <course course_id="CS-101" semester="Fall" year="2017" grade="A"/>
      <course course_id="CS-347" semester="Fall" year="2017" grade="A-"/>
    </takes>
  </student>
  <department>
    <dept_name>Comp. Sci.</dept_name>
    <building>Taylor</building>
    <budget>100000</budget>
  </department>
</university>
```

```
-- XML은 DTD를 통해 구조를 정의할 수 있음
<!DOCTYPE university [
  <!ELEMENT student (ID, name, dept_name, tot_cred, takes?)>
  <!ELEMENT takes (course*)>
  <!ELEMENT course EMPTY>
  <!ATTLIST course course_id CDATA #REQUIRED>
]>
```

## 관련 개념

- [Semi-structured Data](/knowledge/database/semi-structured-data/)
- [JSON](/knowledge/database/json/)
- [RDF](/knowledge/database/rdf/)
- [REST API](/knowledge/database/rest-api/)
