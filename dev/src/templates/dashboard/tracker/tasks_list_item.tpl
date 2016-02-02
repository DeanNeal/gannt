<div class="row" data-id="<%=id%>">
	<div class="col type">
    	<span class="icon-round"></span>
	</div>
	
	<div class="col title">
		<div class="task-name">
			<span class="" title="#<%=id%>: <%=name%>">#<%=id%>: <%=name%></span>
		</div>
	</div>

	<div class="col tags">
		<div class="">
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
		<div class="details-table_desc priorities-select custom-select custom-select-base priority">
			<span class="custom-select-value"></span>
			<input class="custom-select-input" type="hidden" name="priority">
			<input class="custom-select-input-name" type="hidden" name="priority-name">
 		</div>
	</div>

	<div class="col status">
		<div class="details-table_desc custom-select custom-select-status">
			<span class="custom-select-value"></span>
			<input class="custom-select-input" type="hidden" name="processing">
			<input class="custom-select-input-name" type="hidden" name="processing-name">
 		</div>
	</div>

	<div class="col assignee">
		<% if(obj['avatar']) { %>
			<img class="avatar" alt="" title="<%=taskusername%>" name="avatar">
		<% } %>
	</div>

	<div class="col milestone">
		<div class="info">
			<% if(obj['milestonename']) { %>
			    <span class="icon-round-full"></span>
			    <div title="<%=obj['milestonename']%>">
					<%=obj['milestonename']%>
					<span class="deadline">Deadline: <%=obj['milestonedatefinish']%></span>
			    </div>
		    <% } else { %>
				<span>+ Add Milestone</span>
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
