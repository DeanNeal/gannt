var $ = require('jquery');

var SetActiveStateAtList = function(wrapper, param){
	var self = this;
	this.wrapper  = $(wrapper),
	this.input = this.wrapper.find('input');
	this.param = param;

	this.wrapper.on('click', '.list-item', function () {
		self.input.val($(this).data(self.param)).change();
		self.highlight();
	});
};

SetActiveStateAtList.prototype.highlight = function() {
    this.wrapper.
	    find('[data-' + this.param + '="' + this.input.val() + '"]').
	    addClass('active').
	    siblings().
	    removeClass('active');
};



var Plugins = {
	setActiveStateAtList: SetActiveStateAtList
};

module.exports = Plugins;