<% _.each(models, function(model) { %>
	<li data-id="<%=model.get('name')%>" data-text="<%=model.get('name')%>">
		<div class="title"><%=model.get('name')%></div>
	</li>
<% }); %>
