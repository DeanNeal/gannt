<div>
	<div class="clearfix">
		<div class="left-filters">
			<div class="btn-add-new">
				<svg class="icon icon-add">
		            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-add"></use>
		        </svg>
			</div>

			<div class="base-filters">
				<input type="hidden" name="filter">
				<span data-filter="all" class="list-item">All</a></span>
				<span data-filter="todo" class="list-item">To Do</a></span>
				<span data-filter="my_tasks" class="list-item">My tasks</a></span>
			</div>
		</div>

		<div class="right-filters">
			<div id="projects-select" class="custom-select custom-select-base projects" data-search>
				<span class="custom-select-value">Project</span>
				<input class="custom-select-input" type="hidden" name="by-project[id]" placeholder="Project">
			</div>

			<div id="milestones-select" class="custom-select custom-select-base milestones" data-search>
				<span class="custom-select-value">Milestone</span>
				<input class="custom-select-input" type="hidden" name="by-milestone[id]" placeholder="Milestone">
			</div>

			<div id="priorities-select" class="custom-select custom-select-base priority">
				<span class="custom-select-value">Priority</span>
				<input class="custom-select-input" type="hidden" name="by-priority[id]" placeholder="Priority">
	 		</div>
			
			<a class="btn-show-sort open-filter" href="">
				<svg class="icon icon-add">
		            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-add"></use>
		        </svg>
			</a>
		</div>

		<div class="table-search">
			<input type="text" placeholder="Search">
		</div>
	</div>
	
	<div class="dashboard-table-header">
		<input type="hidden" name="sort">
		<table>
			<tbody>
				<tr>
					<td class="title list-item" data-sort="title" data-active="true">
						Title
						<svg class="icon icon-rotation">
				            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-rotation"></use>
				        </svg>
					</td>

					<td class="projects list-item" data-sort="projects">
						Projects
						<svg class="icon icon-rotation">
				            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-rotation"></use>
				        </svg>
					</td>

					<td class="priority list-item" data-sort="priority">
						Priority
						<svg class="icon icon-rotation">
				            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-rotation"></use>
				        </svg>
					</td>

					<td class="status list-item" data-sort="status">
						Status
						<svg class="icon icon-rotation">
				            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-rotation"></use>
				        </svg>
					</td>

					<td class="assignee list-item" data-sort="assignee">
						Assignee
						<svg class="icon icon-rotation">
				            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-rotation"></use>
				        </svg>
					</td>

					<td class="milestone list-item" data-sort="milestone">
						Milestone
						<svg class="icon icon-rotation">
				            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-rotation"></use>
				        </svg>
					</td>

					<td class="created list-item" data-sort="created">
						Created
						<svg class="icon icon-rotation">
				            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-rotation"></use>
				        </svg>
					</td>

					<td class="updated list-item" data-sort="updated">
						Updated
						<svg class="icon icon-rotation">
				            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-rotation"></use>
				        </svg>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
	
	<div class="pagination"></div>
</div>