domready(function () {
  exports.init = function () {
    var $tabs = $('.tabs');
    if (!$tabs.length) return;

    $tabs.each(initTabs);

    function initTabs(i, instance) {
      // cache each tabs instance
      var $instance = $(instance);

      // let tab - is navigation item - container with switcher
      var $tab = $instance.find('.tabs__navigation-item');
      var $switcher = $tab.find('.tabs__navigation-switcher');

      // container of items with content of each tab
      var $tabsContent = $instance.find('.tabs__content');
      var $tabsItem = $tabsContent.find('.tabs__item');

      // first tab => current
      $tab.eq(0).addClass('current');
      // bind toggle event
      $switcher.on('click', function(e){
        e.preventDefault();
        var $parentTab = $(this).closest($tab);
        var index = $parentTab.index();

        // active classes
        $tab.removeClass('current');
        $parentTab.addClass('current');

        $tabsItem.not($tabsItem.eq(index)).slideUp();
        $tabsItem.eq(index).slideDown();

      });
    }

  }
});
