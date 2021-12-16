<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html>
<html>
<head>
    <title>JSP - Hello World</title>
</head>
<body>
    <c:forEach begin="0" end="10">
        <h1><%= "Hello World!" %>
    </c:forEach>
</h1>
<br/>
<a href="hello-servlet">Hello Servlet</a>
</body>
</html>