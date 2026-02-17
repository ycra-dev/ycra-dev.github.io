---
title: "Servlet"
description: "서블릿(Servlet)은 Java 서블릿 API를 구현한 서버 측 프로그램으로, 웹/애플리케이션 서버 프로세스 내에서 실행되어 HTTP 요청을 처리하고 동적 HTML 응답을 생성하는 웹 애플리케이션 컴포넌트이다"
tags: ['Servlet', 'Java', 'Web Server', 'Application Server', 'Http']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/database/servlet
sidebar:
  order: 8
---

## 핵심 개념

서블릿은 CGI(Common Gateway Interface)의 비효율성을 해결하기 위해 설계되었다. CGI는 각 요청마다 새 프로세스를 생성하므로 오버헤드가 크지만, 서블릿은 웹 서버 프로세스 내에서 실행되므로 프로세스 생성 오버헤드가 없다. Java 프로그램이 C/C++보다 느리지만, 프로세스 생성 오버헤드를 제거하여 전체 성능이 더 우수하다.

서블릿은 HttpServlet 클래스를 상속받아 구현하며, doGet() 또는 doPost() 메서드를 오버라이드하여 HTTP GET/POST 요청을 처리한다. HttpServletRequest 객체에서 사용자 입력 파라미터를 추출하고, HttpServletResponse 객체를 통해 HTML 응답을 생성한다. @WebServlet 어노테이션으로 URL 매핑을 지정한다.

서블릿은 데이터베이스와 JDBC를 통해 통신한다. PreparedStatement를 사용하여 SQL 쿼리를 안전하게 실행하며, 이는 SQL 인젝션 공격을 방지하는 데 핵심적이다.

서블릿 세션은 HTTP의 비연결 특성에도 불구하고 사용자 상태를 유지할 수 있게 한다. request.getSession()으로 세션 객체를 얻고, setAttribute()/getAttribute()로 세션 데이터를 저장/검색한다. 세션은 쿠키 기반의 세션 ID로 추적된다.

서블릿 외에도 JSP(Java Server Pages), PHP, Python(Django, Flask) 등 다양한 서버 측 기술이 존재한다. JSP는 HTML 내에 Java 코드를 삽입하는 방식으로, 서블릿으로 자동 변환되어 실행된다. Django는 Python 기반 프레임워크로 URL 매핑, 템플릿 시스템, ORM을 제공한다.

## 예시

```java
// 서블릿 예시: 학생/교수 질의
import java.io.*;
import javax.servlet.*;
import javax.servlet.http.*;

@WebServlet("PersonQuery")
public class PersonQueryServlet extends HttpServlet {
    public void doGet(HttpServletRequest request,
                      HttpServletResponse response)
        throws ServletException, IOException
    {
        response.setContentType("text/html");
        PrintWriter out = response.getWriter();

        String persontype = request.getParameter("persontype");
        String name = request.getParameter("name");

        // PreparedStatement로 SQL 인젝션 방지
        if (persontype.equals("student")) {
            try (Connection conn = dataSource.getConnection()) {
                PreparedStatement stmt = conn.prepareStatement(
                    "SELECT * FROM student WHERE name = ?");
                stmt.setString(1, name);
                ResultSet rs = stmt.executeQuery();
                // 결과를 HTML로 출력
                while (rs.next()) {
                    out.println("<tr><td>" + rs.getString("ID") +
                               "</td><td>" + rs.getString("name") +
                               "</td></tr>");
                }
            }
        }
    }
}
```

## 관련 개념

- [Web Application Architecture](/knowledge/database/web-application-architecture/)
- [REST API](/knowledge/database/rest-api/)
- [SQL Injection](/knowledge/database/sql-injection/)
- [Session Management](/knowledge/database/session-management/)
- [Object-Relational Mapping](/knowledge/database/object-relational-mapping/)
