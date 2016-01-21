<div class="custom-select-container">
	<span class="custom-select-value"><%=value%></span>

	<div class="custom-select-dropdown">
		<% if (search) { %>
			<input class="custom-select-dropdown-search" type="text" placeholder="Search <%=placeholder%>">
			<svg class="icon icon-search">
	            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-search"></use>
	        </svg>
		<% } %>
		<ul class="custom-select-dropdown-list"></ul>
	</div>
</div>