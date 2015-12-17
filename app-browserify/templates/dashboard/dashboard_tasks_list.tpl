<table class="dashboard-table">
	<% _.each(data, function(item){ %>
		<tr>
			<td class="name">
				<div>
					<i class="icon-radio-unchecked"></i>
					<a href="#dashboard/tasks/edit/?id=<%=item.id%>">
						#<%=item.id%>: <%=item.name%>
					</a>
				</div>
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
				<div>Milestone</div>
			</td>

			<td class="date">
				<div><%=item.date%></div>
			</td>

			<td class="ago">
				<div><%=item.ago%> ago</div>
			</td>
		</tr>
	<% }); %>
</table>