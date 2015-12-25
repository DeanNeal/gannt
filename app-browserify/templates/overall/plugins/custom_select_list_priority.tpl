<% _.each(data, function(item) { %>
	<li data-id="<%=item.name%>" data-text="<%=item.name%>">
		<div class="title"><%=item.name%></div>
	</li>
<% }); %>
