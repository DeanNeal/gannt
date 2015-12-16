<table class="dashboard-table">
	<% _.each(data, function(item){ %>
		<tr>
			<td>
				<div class="id"> #<%=item.id%></div>
			</td>

			<td>
				<div class="name">
					<a href="#dashboard/tasks/edit/?id=<%=item.id%>">
						<%=item.name%>
					</a>
				</div>
			</td>

			<td>
				<div class="priority"><%=item.priority%></div>
			</td>

			<td>
				<div class="status"><%=item.status%></div>
			</td>

			<td>
				<div class="assignee"><%=item.assignee%></div>
			</td>

			<td>
				<div class="milestone">Milestone</div>
			</td>

			<td>
				<div class="date"><%=item.date%></div>
			</td>

			<td>
				<div class="ago"><%=item.ago%> ago</div>
			</td>
		</tr>
	<% }); %>
</table>