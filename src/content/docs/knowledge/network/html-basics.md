---
title: "HTML (HyperText Markup Language)"
description: "웹 페이지의 구조와 내용을 기술하는 마크업 언어로 태그를 사용하여 텍스트와 이미지 등을 정의하고 하이퍼링크로 문서를 연결한다"
tags: ["Network", "Web", "HTML", "Markup"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/network/html-basics
sidebar:
  order: 21
---

## 핵심 개념

HTML(HyperText Markup Language)은 웹 페이지의 구조와 내용을 기술하는 **마크업 언어**로, 태그(tag)를 사용하여 텍스트, 이미지, 링크 등의 요소를 정의하고 하이퍼링크로 문서를 연결한다.

## 동작 원리

HTML은 웹의 세 가지 핵심 기술(URL, HTTP, HTML) 중 하나로, Tim Berners-Lee가 1990년경에 만들었다. 프로그래밍 언어가 아닌 **마크업 언어**로서, 콘텐츠의 구조와 의미를 정의하는 역할을 한다.

**태그(Tag) 기반 구조**: HTML 문서는 여는 태그(`<tag>`)와 닫는 태그(`</tag>`)로 둘러싸인 요소(element)들로 구성된다.

주요 태그:
- `<html>`: 문서의 루트
- `<head>`: 메타 정보(제목, 스타일시트 등)
- `<body>`: 실제 표시되는 내용
- `<h1>`~`<h6>`: 제목(heading)
- `<p>`: 단락(paragraph)
- `<a href="url">`: 하이퍼링크 — 웹의 핵심인 문서 간 연결
- `<img src="url">`: 이미지
- `<form>`: 사용자 입력 양식

**하이퍼링크**는 HTML의 가장 혁신적인 기능이다. `<a>` 태그를 통해 한 문서에서 다른 문서로 즉시 이동할 수 있게 하며, 이것이 "웹(web)"이라는 이름의 유래이다.

HTML은 CSS(스타일)와 JavaScript(동작)와 함께 웹 프론트엔드의 세 가지 핵심 기술을 이룬다.

```
HTML (구조):       "여기에 버튼이 있다"
CSS (스타일):      "버튼은 파란색이고 둥글다"
JavaScript (동작): "버튼을 클릭하면 카운터가 증가한다"
```

## 예시

```html
<!DOCTYPE html>
<html>
<head>
    <title>나의 웹 페이지</title>
</head>
<body>
    <h1>환영합니다</h1>
    <p>이것은 <b>HTML</b> 예시입니다.</p>
    <a href="https://www.example.com">링크 클릭</a>
    <img src="photo.jpg" alt="사진">

    <form action="/login" method="POST">
        <input type="text" name="username">
        <input type="password" name="password">
        <button type="submit">로그인</button>
    </form>
</body>
</html>
```

브라우저는 이 태그들을 해석(파싱)하여 화면에 시각적으로 렌더링한다. 사용자는 태그를 보지 않고, 정돈된 웹 페이지를 본다.

## 관련 개념

- [URL](/knowledge/network/url/) - 하이퍼링크의 대상 주소
- [HTTP](/knowledge/network/http-basics/) - HTML 문서를 전송하는 프로토콜
- [JavaScript](/knowledge/software-engineering/javascript-basics/) - HTML에 동적 기능을 추가하는 프로그래밍 언어
- [쿠키 (Cookie)](/knowledge/network/cookie/) - HTML 폼을 통해 전송된 데이터와 세션 관리

## 출처

- Understanding the Digital World, Chapter 10
