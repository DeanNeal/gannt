<div class="row" data-id="<%=id%>">
	<div class="col title">
		<div class="task-name">
			<svg class="icon icon-trash">
	        	<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-trash"></use>
	    	</svg>

			<span class="" title="#<%=id%>: <%=name%>">#<%=id%>: <%=name%></span>
		</div>
		<div class="tags">
			<% if(tasktagName) { %>
				<% _.each(tasktagName.split(','), function(tag) { %>
					<span class="tag" title="<%=tag%>"><%=tag%></span>
				<% }); %>
			<% } %>
		</div>
	</div>

	<div class="col projects">
		<div><%=taskmaintagName%></div>
	</div>

	<div class="col priority" data-priority="<%=priorityName%>">
		<svg class="icon icon-critical">
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-critical"></use>
        </svg>
	</div>

	<div class="col status">
		<div data-processingName name="processingName" data-status="<%=processingName%>"><%=processingName%></div>
	</div>

	<div class="col assignee">
		<img class="avatar" src="build/img/avatar.png" alt="">
		<span name="taskuser_name"></span>
	</div>

	<div class="col milestone">
		<div class="info">
			<svg class="icon icon-trash">
		        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-trash"></use>
		    </svg>

		    <div>
				<span>Design </span>
				<span class="deadline">Deadline: 18.01.16</span>
		    </div>
		</div>
	</div>

	<div class="col created">
		<div>
			<svg class="icon icon-trash">
		        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-trash"></use>
		    </svg>
		    <%=date_start%>
		</div>
	</div>

	<div class="col updated">
		<div>10.20.2016</div>
	</div>
</div>
