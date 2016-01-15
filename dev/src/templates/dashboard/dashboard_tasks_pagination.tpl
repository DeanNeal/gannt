<div>
	<% if(obj['pageCount']) { %>
		<div class="pagination_left pagination_unit">
			<!-- <span href="">Prev</span> -->
			<svg class="icon icon-pagination-prev">
	            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-pagination-prev"></use>
	        </svg>
		</div>

		<ul class="pagination_pages pagination_unit">
			<% for(var i=1; i <= pageCount; i++) { %>
				<li><span <%if (currentPage == i) { %> data-active="true" <% } %> data-page-id="<%=i%>"><%=i%></span></li>
			<% } %>
		</ul>

		<div class="pagination_right pagination_unit">
			<!-- <span href="">Next</span> -->
			<svg class="icon icon-pagination-next">
	            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-pagination-next"></use>
	        </svg>
		</div>
	<% } %>
</div>