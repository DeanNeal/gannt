<div class="full-size">
	<div class="description">
		<div>
			<svg class="icon icon-trash close-icon">
	            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-trash"></use>
	        </svg>

			<span class="name">
				<svg class="icon icon-trash">
		            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-trash"></use>
		        </svg>
				
				#<span name="id"></span>: <span name="name"></span>
				<svg class="icon icon-trash">
		            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-trash"></use>
		        </svg>
			</span>
		</div>

		<div class="description-text">
			<span name="description"></span>
			<a href="" class="see_more">See more</a>
		</div>
	</div>

	<div class="info-container full-size">
		<div class="tabs-view">
			<div class="tabs-view_header">
				<ul>
					<li data-active="true">
						<a href="">Comments</a>
					</li>

					<li>
						<a href="">Status reports</a>
					</li>
				</ul>
			</div>

			<div class="tabs-view_content full-size">
				<div class="tabs-view_comments full-size scroll">
					<div class="tabs-view_comments-unit">
						<div class="comment clearfix">
							<div class="comment-left">
								<img class="avatar" src="build/img/avatar.png" alt="">

								<div class="files">
									<div class="count-wrap">
										<span>8</span>
									</div>

									<div class="files-preview">
										<div class="files-preview_close">
											<svg class="icon icon-trash">
									            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-trash"></use>
									        </svg>
										</div>
										<img src="build/img/avatar.png" alt="">
										<img src="build/img/avatar.png" alt="">
										<img src="build/img/avatar.png" alt="">
										<img src="build/img/avatar.png" alt="">
										<img src="build/img/avatar.png" alt="">
										<img src="build/img/avatar.png" alt="">
									</div>

									<div class="files-desc">Files</div>
								</div>
							</div>

							<div class="comment-right">
								<div class="clearfix">
									<div class="name">Peter Simon</div>
									<div class="date">16:15 2015-15-15</div>
								</div>

								<div class="text">
									Print this page to PDF for the complete set of vectors. Or to use on the desktop, install FontAwesome.otf, Print this page to PDF for the complete set of vectors. Or to use on the desktop, install FontAwesome.otf,
								</div>

								<div class="controls">
									<svg class="icon icon-trash">
							            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-trash"></use>
							        </svg>

							        <svg class="icon icon-trash">
							            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-trash"></use>
							        </svg>

							        <svg class="icon icon-trash">
							            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-trash"></use>
							        </svg>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div class="tabs-view_add-comment-form">
					<svg class="icon icon-trash add-file">
			            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-trash"></use>
			        </svg>

			        <svg class="icon icon-trash send-message">
			            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-trash"></use>
			        </svg>
					<textarea name="" id="" placeholder="Comment"></textarea>
				</div>
			</div>
		</div>

		<div class="details-view">
			<ul class="details-table">
				<li>
					<div class="details-table_term">Project:</div>

					<div class="details-table_desc">
						<div class="project-name">Pumpkin2 project</div>
						<div class="company-name">Company: Pepsi</div>
					</div>
				</li>

				<li>
					<div class="details-table_term">Priority:</div>

<!-- 					<div class="details-table_desc priority">
						<span data-priority name="priority"></span>
					</div>
 -->

					<div id="priorities-select" class="custom-select priority" data-placeholder="High">
						<input type="hidden" name="priority">
			 		</div>
				</li>

				<li>
					<div class="details-table_term">Status:</div>

					<div class="details-table_desc status">
						<span data-status="" name="processingName"></span>
					</div>
				</li>

				<li>
					<div class="details-table_term">Assignee:</div>
					<div class="details-table_desc">
						<img src="build/img/avatar.png" alt="" width="20">
						<span name="assignee"></span>
						<!-- <div>
							<span class="assignee-name">Maksim Shevchenko</span>
							<span class="assignee-status">Project owner</span>
						</div> -->
					</div>
				</li>

				<li>
					<div class="details-table_term">Type:</div>
					<div class="details-table_desc">Task</div>
				</li>

				<li>
					<div class="details-table_term">Milestones:</div>
					<div class="details-table_desc" data-id="<%=milestone_id%>"><%=milestone_name%></div>
				</li>

				<li>
					<div class="details-table_term">Start:</div>
					<div class="details-table_desc">
						<span class="date-icon start" name="date_create"></span>
					</div>
				</li>

				<li>
					<div class="details-table_term">Deadline:</div>
					<div class="details-table_desc">
						<span class="date-icon finish" name="date_finish"></span>
					</div>
				</li>

				<li>
					<div class="details-table_term">Watchers:</div>
					<div class="details-table_desc"></div>
				</li>

				<li>
					<div class="details-table_term">Spent hours:</div>
					<div class="details-table_desc">22</div>
				</li>
			</ul>

			<button class="save">Save</button>
			<button class="delete">Delete</button>
		</div>
	</div>
</div>