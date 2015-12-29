<div class="full-size">
	<div class="description">
		<div>
			<i class="fa fa-times close-icon"></i>

			<span class="name">
				<i class="fa fa-circle-o"></i>
				#<%=id%>: <%=name%>
				<i class="fa fa-pencil"></i>
			</span>
		</div>

		<div class="description-text">
			<span name="description"></span>
			<a href="" class="see_more">See more</a>
		</div>
	</div>

	<div class="info-container full-size">
		<div class="tabs-view"></div>

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