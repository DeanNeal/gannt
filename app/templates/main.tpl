<div class="full_height">
	<div id="header" class="navbar">
		<div>
			<span class="navbar-brand" href="/">
			    <div class="logo_holder">
			        <a href="/#"><img src="build/img/logo.png"></a>
			    </div>            
			</span>
		</div>
		<div class="top_left__menu">
			<ul class="nav navbar-nav">
				<% _.each(navBarLinks, function(model, index) { %>  
					<li>
						<a class="menu-item" data-name="<%=model.get('title')%>" href="#<%=model.get('route')%>"><%=model.get('title')%></a>
					</li>
				<% }); %>
			</ul>
		</div>
	</div>
	<div class="bb-route-container"></div>
</div>