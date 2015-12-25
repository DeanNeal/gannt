<% _.each(data, function(item) { %>
	<li data-id="<%=item.id%>">
		<div class="title"><%=item.name%></div>
		<span><%=item.assignee%> > <%=item.priority%></span>
	</li>
<% }); %>
