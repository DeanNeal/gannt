<table class="dashboard-table">
	<% _.each(data, function(item){ %>
		<tr>
			<!-- <td>
				<div class="id"> #<%=item.id%></div>
			</td> -->

			<td class="name">
				<div class="">
					<div class="">
						<a href="#dashboard/tasks/edit/?id=<%=item.id%>">
							#<%=item.id%>: <%=item.name%>
						</a>
					</div>
				</div>
			</td>

			<td class="priority">
				<div><%=item.priority%></div>
			</td>

			<td class="status">
				<div><%=item.status%></div>
			</td>

			<td class="assignee">
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