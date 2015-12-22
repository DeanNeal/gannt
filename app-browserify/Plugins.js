var $ = require('jquery');

function highlight($this, $input) {
	$this.
	     find('[data-filter="' + $input.val() + '"]').
	     addClass('active').
	     siblings().
	     removeClass('active');
}

var Plugins = {
	setActiveStateAtList: function (elem) {
		var $elem  = $(elem),
		    $input = $elem.find('input');

		highlight($elem, $input);

		$elem.on('click', 'span', function () {
			$input.val($(this).data('filter')).change();
			highlight($elem, $input);
		});

		return $elem;
	}
};

module.exports = Plugins;