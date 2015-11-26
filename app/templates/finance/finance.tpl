<div class="full_height">
	<div class="finance_page__left scroller">
		<ul class="nav navbar-nav">
			<% _.each(sideBarLinks, function(model, index) { %>  
				<li>
					<a class="menu-item" data-name="<%=model.get('title')%>" href="#<%=model.get('route')%>"><%=model.get('title')%></a>
				</li>
			<% }); %>
		</ul>
	</div> 
	<div class="bb-route-container"></div>
</div>