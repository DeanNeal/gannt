<div class="row" data-id="<%=id%>">
	<div class="col title">
		<svg class="icon icon-trash">
        	<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-trash"></use>
    	</svg>

		<div class="task-name">
			<span class="" title="#<%=id%>: <%=name%>">#<%=id%>: <%=name%></span>
		</div>

		<div class="tags">
			<% if(tasktagName) { %>
				<% _.each(tasktagName.split(','), function(tag) { %>
					<span class="tag" title="<%=tag%>"><%=tag%></span>
				<% }); %>
			<% }  else { %>
				<span class="tag" title="DummyTag>">DummyTag></span>
			<% } %>
		</div>
	</div>

	<div class="col projects">
		<div title="<%=taskmaintagName%>"><%=taskmaintagName%></div>
	</div>

	<div class="col priority">
		<!-- <svg class="icon icon-critical">
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-critical"></use>
        </svg> -->
        <div data-priority="<%=priorityName%>"></div>
	</div>

	<div class="col status">
		<div data-processingName name="processingName" data-status="<%=processingName%>"><%=processingName%></div>

		<div class="status-select">
			<ul>
				<li>
					<div data-status="send">Send back</div>		
				</li>

				<li>
					<div data-status="done">Done</div>		
				</li>

				<li>
					<div data-status="completed">Completed</div>		
				</li>

				<li>
					<div data-status="hold">On hold</div>
				</li>

				<li>
					<div data-status="new">New</div>
				</li>
			</ul>
		</div>
	</div>

	<div class="col assignee">
		<img class="avatar" src="build/img/avatar.png" alt="" title="<%=taskuserName%>">
	</div>

	<div class="col milestone">
		<div class="info">
			<% if(milestoneName) { %>
				<svg class="icon icon-trash">
			        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-trash"></use>
			    </svg>
			    <div>
					<span><%=milestoneName%></span>
					<span class="deadline">Deadline: <%=milestoneDateFinish%></span>
			    </div>
		    <% } %>
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
