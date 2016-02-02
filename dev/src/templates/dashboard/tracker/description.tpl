<div class="full-size">
	<div class="description">
		<div>
			<svg class="icon icon-close close-panel">
            	<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-close"></use>
        	</svg>

			<div class="name">
				<span class="icon-round"></span>
				
				<div class="task-name">
					#<span name="id"></span>: <span name="name"></span>
				</div>

				<svg class="icon icon-edit open-popup">
            		<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-edit"></use>
        		</svg>
			</div>
		</div>
		
			<div class="description-text">
				<span name="description"></span>
				<span class="see_more open-popup">See more</span>
			</div>
	</div>

	<div class="info-container full-size">
		<div class="left-view">
			<div class="left-view_header"></div>
			
			<div class="left-view_content full-size"></div>
		</div>

		<div class="right-view">
			<ul class="details-table">
				<li class="details-table_project">
					<div class="details-table_term">Project:</div>

					<div class="details-table_desc">
						<div class="project-name" name="taskmaintagname">Pumpkin2 project</div>
						<div class="company-name">Company: Dummy</div>
					</div>
				</li>

				<li class="details-table_priority">
					<div class="details-table_term">Priority:</div>
					<div class="details-table_desc priorities-select custom-select custom-select-base priority">
						<span class="custom-select-value"></span>
						<input class="custom-select-input" type="hidden" name="priority">
						<input class="custom-select-input-name" type="hidden" name="priority-name">
			 		</div>
				</li>

				<li class="details-table_status">
					<div class="details-table_term">Status:</div>
					<div class="details-table_desc custom-select custom-select-status">
						<span class="custom-select-value"></span>
						<input class="custom-select-input" type="hidden" name="processing">
						<input class="custom-select-input-name" type="hidden" name="processing-name">
			 		</div>
				</li>

				<li class="details-table_assignee">
					<div class="details-table_term">Assignee:</div>
					<div class="details-table_desc open-assignee-panel open-popup">
						<img src="" alt="" width="32" height="32" name="avatar">
						<div class="info">
							<span class="name" name="taskusername"></span>
							<span name="role"></span>
						</div>
					</div>
				</li>

				<li class="details-table_task">
					<div class="details-table_term">Type:</div>
					<div class="details-table_desc">
						<span class="icon-round"></span>
						<span class="desc">Task</span>
					</div>
				</li>

				<li class="details-table_milestone">
					<div class="details-table_term">Milestones:</div>
					<div class="details-table_desc custom-select custom-select-milestones" data-search placeholder="Milestone">
						<span class="custom-select-value">Milestone</span>
						<input class="custom-select-input" type="hidden" name="modulerelation-milestonetask">
						<input class="custom-select-input-name" type="hidden" name="milestonename">
					</div>
				</li>

				<li class="details-table_date">
					<div class="details-table_term">Date:</div>
					<div class="details-table_desc">
						<div>
							<svg class="icon icon-calendar">
					            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-calendar"></use>
					        </svg>
							<input type="text" id="task-date-start" class="datepicker" name="date-start" readonly>
						</div>
						
						<div>
							<svg class="icon icon-calendar">
					            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-calendar"></use>
					        </svg>
							<input type="text" id="task-date-finish" class="datepicker" name="date-finish" readonly>
						</div>
					</div>
				</li>

				<li class="details-table_watchers">
					<div class="details-table_term">Watchers:</div>
					<div class="details-table_desc details-table_watchers_container">						
						<div class="details-table_desc custom-select custom-select-watchers" data-multiselect placeholder="Add">
							<span class="custom-select-value"></span>
							<input class="custom-select-input" type="hidden" name="modulerelation-taskwatchers">
				 		</div>
					</div>
				</li>

				<li class="details-table_hours">
					<div class="details-table_term">Estimated hours:</div>
					<div class="details-table_desc">
						<input type="text" class="show-spent-hours-popup open-popup" value="22" readonly name="spent-hours" maxlength="5">

						<svg class="icon icon-request">
				            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-request"></use>
				        </svg>

						<input type="text" value="22" readonly  maxlength="5">

						<svg class="icon icon-approve">
				            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-approve"></use>
				        </svg>
					</div>
				</li>

				<li class="details-table_tags">
					<div class="details-table_term">Tags:</div>
					<div class="details-table_desc">
						<span class="tag" title="DummyTag">DummyTag</span>
						<span class="tag" title="DummyTag">DummyTag</span>
						<span class="tag" title="DummyTag">DummyTag</span>
					</div>
				</li>
			</ul>
			
			<div class="details-table_controls">
				<div>
					<svg class="icon icon-duplicate">
			            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-duplicate"></use>
			        </svg>

			        <span>Duplicate</span>
				</div>

				<div>
					<svg class="icon icon-extend">
			            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-extend"></use>
			        </svg>

			        <span>Extend</span>
				</div>
				
				<div class="remove-btn">
					<svg class="icon icon-trash">
            			<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-trash"></use>
        			</svg>

					<span>Delete</span>
				</div>
			</div>
		</div>
	</div>
</div>