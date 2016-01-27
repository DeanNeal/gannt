<div class="full-size">
	<div class="assignee-panel_header">
		<span>
			Assignee
		</span>

		<div class="assignee-panel_search">
			<input type="text" placeholder="Search user">
			
			<svg class="icon icon-search">
	            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-search"></use>
	        </svg>
		</div>
	</div>

	<div class="assignee-panel_content scroll">
		<ul>
			<% for(var i=0;i<=5;i++) { %>
			<li data-id="<%=i * 5%>">
				<input type="checkbox">
				<img class="avatar" src="build/img/avatar.png" alt="" width="52" height="52">
				<div class="user-data">
					<div class="name">M. Shevchenko <%=i + 1%></div>
					<div>Teammember</div>
				</div>
			</li>
			<% } %>
		</ul>	
	</div>

	<div class="assignee-panel_controls">
		<div>
			<button class="btn btn-apply">Apply</button>
		</div>

		<div>
			<button class="btn btn-link btn-close assignee-panel_close">Close</button>
		</div>
	</div>
</div>