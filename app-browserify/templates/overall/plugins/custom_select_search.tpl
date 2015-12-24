<div>
	<span class="custom-select-value"><%=value%></span>

	<div class="custom-select-dropdown">
		<input class="custom-select-dropdown-search" type="text" placeholder="Search project">
		<ul>
			<% _.each(items, function(item) { %>
				<li data-value=""><%=item%></li>
			<% }); %>
		</ul>
	</div>
</div>