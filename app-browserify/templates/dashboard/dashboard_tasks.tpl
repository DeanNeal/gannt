<ul>
	<% _.each(data, function(item){ %>
		<li>
			<div class="id"> #<%=item.id%></div>
			<div class="name"><a href="#dashboard/tasks/?id=<%=item.id%>"><%=item.name%></a></div>
			<div class="priority"><%=item.priority%></div>
			<div class="status"><%=item.status%></div>
			<div class="assignee"><%=item.assignee%></div>
			<div class="date"><%=item.date%></div>
			<div class="ago"><%=item.ago%> ago</div>
		</li>
	<% }); %>
</ul>	
