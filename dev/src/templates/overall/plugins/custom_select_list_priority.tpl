<% _.each(models, function(model) { %>
	<li data-id="<%=model.get('id')%>" data-text="<%=model.get('name')%>">
		<div class="unit"><%=model.get('name')%></div>
	</li>
<% }); %>
