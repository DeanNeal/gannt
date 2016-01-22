<div class="row" data-id="<%=id%>">
	<div class="col title">
    	<span class="icon-round"></span>

		<div class="task-name">
			<span class="" title="#<%=id%>: <%=name%>">#<%=id%>: <%=name%></span>
		</div>

		<div class="tags">
			<% if(obj['tasktag-name']) { %>
				<% _.each(obj['tasktag-name'].split(','), function(tag) { %>
					<span class="tag" title="<%=tag%>"><%=tag%></span>
				<% }); %>
			<% }  else { %>
				<span class="tag" title="Title">Tag 1</span>
				<span class="tag" title="Title">Tag 2</span>
				<span class="tag" title="Title">Tag 3</span>
			<% } %>
		</div>
	</div>

	<div class="col projects">
		<div title="<%=obj['taskmaintagname']%>"><%=obj['taskmaintagname']%></div>
	</div>

	<div class="col priority">
        <div data-priority-name name="priority-name"></div>
	</div>

	<div class="col status">
		<div data-processing-name name="processing-name"><%=obj['processing-name']%></div>
		<div class="status-select">
			<ul>
				<li>
					<div data-processing-name="send">Send back</div>		
				</li>
				<li>
					<div data-processing-name="done">Done</div>		
				</li>
				<li>
					<div data-processing-name="complete">Completed</div>		
				</li>
				<li>
					<div data-processing-name="hold">On hold</div>
				</li>
				<li>
					<div data-processing-name="new">New</div>
				</li>
			</ul>
		</div>
	</div>

	<div class="col assignee">
		<% if(obj['avatar']) { %>
			<img class="avatar" src="http://195.138.79.46<%=obj['avatar']%>" alt="" title="<%=taskusername%>">
		<% } %>
	</div>

	<div class="col milestone">
		<div class="info">
			<% if(obj['milestonename']) { %>
			    <span class="icon-round-full"></span>
			    <div>
					<span><%=obj['milestonename']%></span>
					<span class="deadline">Deadline: <%=obj['milestonedatefinish']%></span>
			    </div>
		    <% } %>
		</div>
	</div>

	<div class="col created">
		<div>
			<svg class="icon icon-calendar">
	            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-calendar"></use>
	        </svg>

	        <span>
		    	<%= Helpers.formatDate(obj['date-start']) %>
	        </span>
		</div>
	</div>

	<div class="col updated">
		<div><%= Helpers.timeDifference(obj['timestamp']) %></div>
	</div> 
</div>
