var $ = require('jquery');
require('jquery.mmenu');
module.exports = function () {

  $(function () {
    $('.navigation--mobile').mmenu({
    	extensions		: ['theme-dark', 'effect-menu-slide', 'pagedim-black' ],
    	navbar: {
    		title: "Меню"
    	}
    });
  });

}();
