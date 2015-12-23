<table class="dashboard-table">
	<% _.each(data, function(item){ %>
		<tr data-id="<%=item.id%>">
			<td class="title">
				<div>
					<i class="fa fa-bug"></i>
					<span>#<%=item.id%>: <%=item.name%></span>
					<% _.each(item.tags.split(','), function(tag) { %>
						<span class="tag"><%=tag%></span>
					<% }); %>
					<!-- <div class="tags">
						<% _.each(item.tags.split(','), function(tag) { %>
								<span><%=tag%></span>
						<% }); %>
					</div> -->
				</div>
			</td>

			<td class="projects">
				<div>Pupkin</div>
			</td>

			<td class="priority">
				<div><%=item.priority%></div>
			</td>

			<td class="status">
				<div data-status="<%=item.status%>"><%=item.status%></div>
			</td>

			<td class="assignee">
				<img class="avatar" src="build/img/avatar.png" alt="">
				<div><%=item.assignee%></div>
			</td>

			<td class="milestone">
				<!-- <svg class="icon icon-trash-example">
					<use class="symbol" xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-trash-example"></use>
				</svg>

				<svg class="icon icon-trash">
					<use class="symbol" xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-trash"></use>
				</svg> -->

				<i class="icon-radio-unchecked"></i>

				<div class="info">
					<span>Milestone</span>
					<span class="deadline">Deadline: 18.01.16</span>
				</div>
			</td>

			<td class="created">
				<div><%=item.date%></div>
			</td>

			<td class="updated">
				<div><%=item.ago%> ago</div>
			</td>
		</tr>
	<% }); %>
</table>