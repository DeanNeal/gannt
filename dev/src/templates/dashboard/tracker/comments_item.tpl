<div>
	<div class="comment-left">
		<% if(avatar) { %>
			<img class="avatar" src="<%=avatar%>" alt="">
		<% } else { %>
			<img src="build/img/avatar.png" alt="" width="52">
		<% } %>
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
			<div class="name"><%=obj['postcreator-name']%></div>
			<div class="date"><%=create%></div>
		</div>

		<div class="text"><%=content%></div>

		<div class="controls">
			<svg class="icon icon-dialog">
	            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-dialog"></use>
	        </svg>

	        <svg class="icon icon-edit">
	            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-edit"></use>
	        </svg>

	        <svg class="icon icon-trash">
	            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-trash"></use>
	        </svg>
		</div>
	</div>
</div>