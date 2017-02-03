(function ($, window, document, undefined) {

  'use strict';

  /**
   * Responsive HTML Table
   *
   * @desc RWD: HTML table turns into an accordion.
   * @author [HZ]
   * @dependency jQuery
   */


  // Init
  $(window).on("load",function(){
    $("a[rel='m_PageScroll2id']").mPageScroll2id({
        // highlightSelector:"#navigation-menu a[rel='m_PageScroll2id']",
        // liveSelector:"#navigation-menu a[rel='m_PageScroll2id']"
      });
  });


})(jQuery, window, document);
