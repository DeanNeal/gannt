<div>
	<div class="pagination_left pagination_unit">
		<span href="">Prev</span>
	</div>

	<ul class="pagination_pages pagination_unit">
		<% for(var i=1; i <= pageCount; i++) { %>
			<li><span <%if (currentPage == i) { %> data-active="true" <% } %> data-page-id="<%=i%>"><%=i%></span></li>
		<% } %>
	</ul>

	<div class="pagination_right pagination_unit">
		<span href="">Next</span> 
	</div>
</div>