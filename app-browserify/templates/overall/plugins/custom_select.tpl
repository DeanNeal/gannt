<div class="custom-select-container">
	<span class="custom-select-value"><%=value%></span>

	<div class="custom-select-dropdown">
		<% if (search) { %>
			<input class="custom-select-dropdown-search" type="text" placeholder="Search <%=placeholder%>">
			<i class="fa fa-search"></i>
		<% } %>
		<ul class="custom-select-dropdown-list"></ul>
	</div>
</div>