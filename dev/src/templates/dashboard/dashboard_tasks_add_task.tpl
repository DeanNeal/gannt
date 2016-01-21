<div class="add-task-panel full-size">
	<svg class="icon icon-close close-panel">
    	<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-close"></use>
	</svg>
	<div class="left-view">
		<div class="subject">
			<input type="text" placeholder="Subject">
		</div>
		
		<div class="desc">
			<textarea name="" placeholder="Description"></textarea>
		</div>

		<div>
			<input type="text" placeholder="Tags">
		</div>

		<div class="tags">
			<span class="tag" title="Title">
				Tag 1
				<svg class="icon icon-close">
			    	<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-close"></use>
				</svg>
			</span>

			<span class="tag" title="Title">
				Tag 1
				<svg class="icon icon-close">
			    	<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-close"></use>
				</svg>
			</span>

			<span class="tag" title="Title">
				Tag 1
				<svg class="icon icon-close">
			    	<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-close"></use>
				</svg>
			</span>

			<span class="tag" title="Title">
				Tag 1
				<svg class="icon icon-close">
			    	<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-close"></use>
				</svg>
			</span>

			<span class="tag" title="Title">
				Tag 1
				<svg class="icon icon-close">
			    	<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-close"></use>
				</svg>
			</span>
		</div>

		<div class="left-view_control">
			<div class="btn-apply">
				Apply
			</div>
		</div>
	</div>

	<div class="right-view">
		<ul class="details-table">
			<li class="details-table_project">
				<div class="details-table_desc">
					<div class="project-name" name="taskmaintagname">No project</div>
<!-- 					<div class="company-name">Company: Dummy</div> -->
				</div>
			</li>

			<li class="details-table_priority">
				<span class="details-table_desc_priority" data-priority-name="major" name="priority-name">Major</span>
				<div class="priority-select" style="display: none">
					<ul>
						<li><div class="priority-select-item" data-priority-name="critical">Critical</div></li>
						<li><div class="priority-select-item" data-priority-name="major">Major</div></li>
						<li><div class="priority-select-item" data-priority-name="minor">Minor</div></li>
						<li><div class="priority-select-item" data-priority-name="trivial">Trivial</div></li>
					</ul>
				</div>
			</li>

			<li class="details-table_status">
				<div class="details-table_desc">
					<span class="details-table_desc_status" data-processing-name="new" name="processing-name">New</span>
					<div class="status-select">
						<ul>
							<li>
								<div class="status-select-item" data-processing-name="new">New</div>		
							</li>
							<li>
								<div class="status-select-item" data-processing-name="proccesing">Proccesing</div>		
							</li>
							<li>
								<div class="status-select-item" data-processing-name="send-back">Send Back</div>		
							</li>
							<li>
								<div class="status-select-item" data-processing-name="completed">Completed</div>
							</li>
							<li>
								<div class="status-select-item" data-processing-name="done">Done</div>
							</li>
						</ul>
					</div>
				</div>
			</li>

			<li class="details-table_assignee">
				<div class="details-table_desc">
					<img src="" alt="" width="32" height="32" data-host="http://195.138.79.46/" name="avatar">
					<div class="info">
						<span class="name" name="taskusername">Assign to me</span>
					</div>
				</div>
			</li>

			<li class="details-table_task">
				<div class="details-table_desc">
					<span class="icon-round"></span>
					<span class="desc" name="type">Task</span>
				</div>
			</li>

			<li class="details-table_milestone">
				<div class="details-table_desc" name="milestonename">
<!-- 					<span class="icon-round-full"></span> -->
					<span name="milestonename">+ Select Milestone</span>
				</div>
			</li>

			<li class="details-table_date">
				<div class="details-table_desc">
					<div>
						<svg class="icon icon-calendar">
				            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-calendar"></use>
				        </svg>
						<input type="text" id="task-date-start" class="datepicker" name="date-start" value="0000-00-00">
					</div>
					
					<div>
						<svg class="icon icon-calendar">
				            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-calendar"></use>
				        </svg>
						<input type="text" id="task-date-finish" class="datepicker" name="date-finish" value="0000-00-00">
					</div>
				</div>
			</li>

			<li class="details-table_watchers">
				<div class="details-table_desc">
					<img src="build/img/avatar.png" alt="" width="32" height="32">
				</div>
			</li>

			<li class="details-table_hours">
				<div class="details-table_desc">
					<input type="text"  value="22">

					<svg class="icon icon-request">
			            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-request"></use>
			        </svg>
				</div>
			</li>
		</ul>
	</div>
</div>