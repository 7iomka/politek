import 'jquery.mmenu';
module.exports = function () {

    $.fn.navigationToggler = function() {
        return this.each(function() {
            // Do something to each element here.
            var toggler = $(this);


            // remove class active
            var mmenuApi = $(".navigation--mobile").data("mmenu");
            toggler.on('click', function () {
              toggler.toggleClass('active');

            });

              mmenuApi.bind("closing", function () {
                toggler.removeClass('active');
              });

        });

    };
  $(function () {
    $('.navigation--mobile').mmenu({
    	extensions		: ['theme-dark', 'effect-menu-slide', 'pagedim-black' ],
    	navbar: {
    		title: "Меню"
    	}
    });

    $('.navigation-toggler').navigationToggler();

  });

}();
