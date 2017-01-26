(function ($, window, document, undefined) {

  'use strict';
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
    $('.navigation-toggler').navigationToggler();
  });

})(jQuery, window, document);
