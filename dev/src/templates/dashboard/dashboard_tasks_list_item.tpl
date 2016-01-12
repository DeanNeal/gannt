<tr data-id="<%=id%>">
	<td class="title">
		<div class="task-name">
			<svg class="icon icon-trash">
	        	<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-trash"></use>
	    	</svg>

			<span class="" title="#<%=id%>: <%=name%>">#<%=id%>: <%=name%></span>
		</div>

		<div class="tags">
			<% _.each(tags.split(','), function(tag) { %>
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
		<div data-status="<%=status%>"><%=status%></div>
	</td>

	<td class="assignee">
		<img class="avatar" src="build/img/avatar.png" alt="">
		<!-- <div><%=assignee%></div> -->
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
		    <%=date%>
		</div>
	</td>

	<td class="updated">
		<div><%=ago%> ago</div>
	</td>
</tr>