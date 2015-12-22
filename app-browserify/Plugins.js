var $ = require('jquery');

function highlight($this, $input, param) {
	$this.
	     find('[data-'+param+'="' + $input.val() + '"]').
	     addClass('active').
	     siblings().
	     removeClass('active');
}

var Plugins = {
	setActiveStateAtList: function (wrapper, param) {
		var $wrapper  = $(wrapper),
		    $input = $wrapper.find('input');

		highlight($wrapper, $input, param);

		$wrapper.on('click', '.list-item', function () {
			$input.val($(this).data(param)).change();
			highlight($wrapper, $input, param);
		});

		return $wrapper;
	}

};

module.exports = Plugins;