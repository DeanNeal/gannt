<table class="dashboard-table">
	<% _.each(data, function(item){ %>
		<tr data-id="<%=item.id%>">
			<td class="title">
				<div style="display: flex; flex-direction: row;">
					<div style="display: flex; flex-direction: column; flex: 1;">
						<!-- <i class="fa fa-bug"></i> -->
						<span class="text-overflow" title="#<%=item.id%>: <%=item.name%>">#<%=item.id%>: <%=item.name%></span>
					</div>

					<div class="tags">
						<div style="display: flex; flex-direction: row;">
							<% _.each(item.tags.split(','), function(tag) { %>
								<span class="tag" title="<%=tag%>"><%=tag%></span>
							<% }); %>
						</div>
					</div>
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
				<!-- <div><%=item.assignee%></div> -->
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