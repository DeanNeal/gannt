<div>
	<% if(obj['pageCount']) { %>
		<div class="pagination_left pagination_unit">
			<svg class="icon icon-pagination-prev">
	            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-pagination-prev"></use>
	        </svg>
		</div>

		<ul class="pagination_pages pagination_unit">
			<%var startVal = currentPage <= 10 ? 1 : (currentPage - 10)%>
			<%var endVal = pageCount < (currentPage + 10) ? pageCount : currentPage + 10%>

			<% if (startVal !== 1) {%>
				<li><span>...</span></li>
			<% } %>
			<% for(var i=startVal; i <= endVal; i++) { %>
				<li><span class="pagination_item"<%if (currentPage == i) { %> data-active="true" <% } %> data-page-id="<%=i%>"><%=i%></span></li>
			<% } %>
			<% if (endVal !== pageCount) {%>
				<li><span>...</span></li>
			<% } %>
		</ul>

		<div class="pagination_right pagination_unit">
			<svg class="icon icon-pagination-next">
	            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-pagination-next"></use>
	        </svg>
		</div>
	<% } %>
</div>