<div>
	<div class="description">
		<span><span class="icon-radio-unchecked"></span> #<%=id%>: <%=name%></span>
		<p name="description"></p>

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
							<span data-priority="<%=priority%>"></span> <%=priority%>
						</span>
					</li>
					<li>
						<span class="details-table_term">Status:</span>
						<span class="details-table_description status">
							<span data-status="<%=status%>"><%=status%></span>
						</span>
					</li>
					<li>
						<span class="details-table_term">Assignee:</span>
						<span class="details-table_description"><%=assignee%></span>
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
							<span class="date-icon start"><%=date_create%></span>
						</span>
					</li>
					<li>
						<span class="details-table_term">Deadline:</span>
						<span class="details-table_description">
							<span class="date-icon finish"><%=date_finish%></span>
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

				<!--<button>Update</button>-->
			</div>
		</div>
	</div>
</div>