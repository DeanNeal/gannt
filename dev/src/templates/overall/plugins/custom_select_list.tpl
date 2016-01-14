<% _.each(models, function(model) { %>
	<li data-id="<%=model.get('id')%>" data-text="<%=model.get('name')%>">
		<div class="title"><%=model.get('name')%></div>
		<span></span>
	</li>
<% }); %>
