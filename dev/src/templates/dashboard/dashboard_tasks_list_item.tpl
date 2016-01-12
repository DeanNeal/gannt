<tr data-id="<%=item.id%>">
	<td class="title">
		<div class="task-name">
			<svg class="icon icon-trash">
	        	<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-trash"></use>
	    	</svg>

			<span class="" title="#<%=item.id%>: <%=item.name%>">#<%=item.id%>: <%=item.name%></span>
		</div>

		<div class="tags">
			<% _.each(item.tags.split(','), function(tag) { %>
				<span class="tag" title="<%=tag%>"><%=tag%></span>
			<% }); %>
		</div>
	</td>

	<td class="projects">
		<div>Pupkin</div>
	</td>

	<td class="priority">
		<svg class="icon icon-critical">
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-critical"></use>
        </svg>
	</td>

	<td class="status">
		<div data-status="<%=item.status%>"><%=item.status%></div>
	</td>

	<td class="assignee">
		<img class="avatar" src="build/img/avatar.png" alt="">
		<!-- <div><%=item.assignee%></div> -->
	</td>

	<td class="milestone">
		<div class="info">
			<svg class="icon icon-trash">
		        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-trash"></use>
		    </svg>

		    <div>
				<span>Design </span>
				<span class="deadline">Deadline: 18.01.16</span>
		    </div>
		</div>
	</td>

	<td class="created">
		<div>
			<svg class="icon icon-trash">
		        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-trash"></use>
		    </svg>
		    <%=item.date%>
		</div>
	</td>

	<td class="updated">
		<div><%=item.ago%> ago</div>
	</td>
</tr>