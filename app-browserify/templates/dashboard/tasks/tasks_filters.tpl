<div class="clearfix">
	<div class="left-filters">
		<a class="btn-add-new" href="">+</a>
		<div class="base-filters">
			<input type="hidden" name="filter">
			<span data-filter="all" class="list-item">All</a></span>
			<span data-filter="todo" class="list-item">To Do</a></span>
			<span data-filter="my_tasks" class="list-item">My tasks</a></span>
		</div>
	</div>

	<div class="right-filters">
<!-- 		<div class="custom-select">
			<input class="custom-select-input" type="hidden" name="project">
			<span class="custom-select-value">Project1</span>
			<ul class="custom-select-dropdown">
				<li>Project1</li>
				<li>Project2</li>
				<li>Project3</li>
			</ul>
		</div> -->

		<select class="selectric type" name="project">
			<option value="project1">Project1</option>
			<option value="project2">Project2</option>
			<option value="project3">Project3</option>
		</select>
		<select class="selectric type" name="milestone">
			<option value="milestone1">Milestone1</option>
			<option value="milestone2">Milestone2</option>
			<option value="milestone3">Milestone3</option>
		</select>
		<select class="selectric priority" name="priority">
			<option value="major">Major</option>
			<option value="critical">Critical</option>
			<option value="minor">Minor</option>
		</select>
		<a class="btn-add-new open-filter" href="">+</a>
	</div>
	
	<div class="dashboard-table-header">	
		<input type="hidden" name="sort">
		<table>
			<tbody>
				<tr>
					<td class="title list-item" data-sort="title">Title <i class="fa fa-arrow-down"></i> </td>
					<td class="projects list-item" data-sort="projects">Projects <i class="fa fa-arrow-down"></i></td>
					<td class="priority list-item" data-sort="priority">Priority <i class="fa fa-arrow-down"></i> </td>
					<td class="status list-item" data-sort="status">Status <i class="fa fa-arrow-down"></i> </td>
					<td class="assignee list-item" data-sort="assignee">Assignee <i class="fa fa-arrow-down"></i> </td>
					<td class="milestone list-item" data-sort="milestone">Milestone <i class="fa fa-arrow-down"></i> </td>
					<td class="created list-item" data-sort="created">Created <i class="fa fa-arrow-down"></i> </td>
					<td class="updated list-item" data-sort="updated">Updated <i class="fa fa-arrow-down"></i> </td>
				</tr>
			</tbody>
		</table>
	</div>

</div>