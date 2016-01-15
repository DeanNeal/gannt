<div class="row" data-id="<%=id%>">
	<div class="col title">
		<!-- <svg class="icon icon-trash">
        	<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-trash"></use>
    	</svg> -->

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
				<span class="tag" title="DummyTag>">DummyTag</span>
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
		<img class="avatar" src="build/img/avatar.png" alt="" title="<%=obj['taskusername']%>">
	</div>

	<div class="col milestone">
		<div class="info">
			<% if(obj['milestonename']) { %>
				<svg class="icon icon-trash">
			        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-trash"></use>
			    </svg>
			    <div>
					<span><%=obj['milestonename']%></span>
					<span class="deadline">Deadline: <%=obj['milestonedatefinish']%></span>
			    </div>
		    <% } %>
		</div>
	</div>

	<div class="col created">
		<div>
			<svg class="icon icon-trash">
		        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-trash"></use>
		    </svg>
		    <%= Helpers.formatDate(obj['date-start']) %>
		</div>
	</div>

	<div class="col updated">
		<div><%= Helpers.timeDifference(obj['timestamp']) %></div>
	</div> 
</div>
