<div class="dashboard">
	<div class="dashboard-menu">
		<ul class="nav navbar-nav">
			<% _.each(navBarLinks, function(model, index) { %>  
				<li><a class="menu-item" href="#<%=model.get('route')%>"><%=model.get('title')%></a></li>
			<% }); %>
		</ul>
	</div>
	<div class="bb-route-container"></div>
</div>