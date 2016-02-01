<% _.each(items, function(item) { %>
	<li data-id="<%=item.id%>" data-text="<%=item.name%>">
		<div class="unit"><%=item.name%></div>
	</li>
<% }); %>
