var $ = require('jquery');
var ScrollMagic = require('scrollmagic');
module.exports = function () {

  'use strict';

  $(function () {
    // Init controller
    var controller = new ScrollMagic.Controller();

    // Change behaviour of controller
    // to animate scroll instead of jump
    controller.scrollTo(function(target) {

      TweenMax.to(window, 0.5, {
        scrollTo : {
          y : target,
          autoKill : true // Allow scroll position to change outside itself
        },
        ease : Cubic.easeInOut
      });

    });

    $(document).on("click", ".product-group__link", function(e) {
      var id = $(this).attr("href");

      if($(id).length > 0) {
        e.preventDefault();

        // trigger scroll
        controller.scrollTo(id);

        // If supported by the browser we can also update the URL
        if (window.history && window.history.pushState) {
          history.pushState("", document.title, id);
        }
      }

    });
  });

}();
