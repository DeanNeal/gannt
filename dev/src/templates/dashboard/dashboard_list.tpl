<div class="dashboard-menu_btn menu-item">
	<a class="<%=name%>" href="<% if(disabled) { %>javascript:void(0)<% } else {%>#<%=route%><% } %>">
		<!-- <div>
			<svg class="icon icon-project-menu">
	            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-project-menu"></use>
	        </svg>
		</div> -->
		<%=name%>
	</a>
</div>