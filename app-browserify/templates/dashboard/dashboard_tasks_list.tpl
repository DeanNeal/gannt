<table class="dashboard-table">
	<% _.each(data, function(item){ %>
		<tr data-href="#dashboard/tasks?id=<%=item.id%>">
			<td class="name">
				<div>
					<i class="icon-radio-unchecked"></i>
					<span>#<%=item.id%>: <%=item.name%></span>
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
				<i class="icon-radio-unchecked"></i>

				<div class="info">
					<span>Milestone</span>
					<span class="deadline">Deadline: 18.01.16</span>
				</div>
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