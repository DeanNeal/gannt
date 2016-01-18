<%console.log(disabled);%>
<a class="menu-item" href="<% if(name) { %>javascript:void(0)<% } else {%>/#<%=route%><% } %>"><%=name%></a>