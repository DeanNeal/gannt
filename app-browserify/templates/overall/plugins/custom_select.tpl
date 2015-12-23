<div>
	<span class="custom-select-value"><%=value%></span>
	<ul class="custom-select-dropdown">
		<% _.each(items, function(item) { %>
			<li data-value=""><%=item%></li>
		<% }); %>
	</ul>
</div>