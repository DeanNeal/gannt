<div>
	<div class="description">
		<span class="name"><span class="icon-radio-unchecked"></span> #<%=id%>: <%=name%></span>
		<p name="description"></p>
		<div>
			<a href="">See more</a>
		</div>
		<a class="close-icon" href="#dashboard/tasks">
			<span class="icon-cross"></span>
		</a>
	</div>
	<div class="info-container">
		<div class="info">
			<div class="tabs-view">

			</div>
			<div class="details-view">
				<h3>Task Info</h3>

				<ul class="details-table">
					<li>
						<span class="details-table_term">Priority:</span>
						<span class="details-table_description priority">
							<span data-priority name="priority"></span>
						</span>
					</li>
					<li>
						<span class="details-table_term">Status:</span>
						<span class="details-table_description status">
							<span data-status name="status"></span>
						</span>
					</li>
					<li>
						<span class="details-table_term">Assignee:</span>
						<span class="details-table_description" name="assignee"></span>
					</li>
					<li>
						<span class="details-table_term">Type:</span>
						<span class="details-table_description">Task</span>
					</li>
					<li>
						<span class="details-table_term">Milestones:</span>
						<span class="details-table_description">Abra Kadabra</span>
					</li>
					<li>
						<span class="details-table_term">Start:</span>
						<span class="details-table_description">
							<span class="date-icon start" name="date_create"></span>
						</span>
					</li>
					<li>
						<span class="details-table_term">Deadline:</span>
						<span class="details-table_description">
							<span class="date-icon finish" name="date_finish"></span>
						</span>
					</li>
					<li>
						<span class="details-table_term">Watchers:</span>
						<span class="details-table_description"></span>
					</li>
					<li>
						<span class="details-table_term">Spent hours:</span>
						<span class="details-table_description">22</span>
					</li>
				</ul>

				<button class="save">Save</button>
				<button class="delete">Delete</button>
			</div>
		</div>
	</div>
</div>