
module.exports = function () {

  'use strict';

  /**
   * Responsive HTML Table
   *
   * @desc RWD: HTML table turns into an accordion.
   * @author [HZ]
   * @dependency jQuery
   */
  $.fn.responsiveTable = function () {
      this.each(function () {
          $(this).find('table').each(function () {
              var trAcc = $(this).find('tr td:first-child'),
                  thHead = [];

              $(this).find('tr:first-child td, tr:first-child th').each(function () {
                  var headLines = $(this).html();
                  thHead.push(headLines);
              });

              trAcc.parent().each(function () {
                  for (var i = 0, l = thHead.length; i < l; i++) {
                      $(this).find('td').eq(i + 1).prepend('<h3>' + thHead[i + 1] + '</h3>');
                  }
              });

              trAcc.append('<i class="icon-accordion">+</i>');
              // trAcc.each(function(){
              //
              // });

              var lastTr = $(this).find("tr:last-child").addClass('last');
              trAcc.click(function (e) {

                if ($(this).parent().hasClass('accordion-opened')) {
                    var maxHeight = $(this).parent().hasClass('last') ? 62: 60;
                    $(this).parent().animate({
                        maxHeight: maxHeight + 'px'
                    }, 400).removeClass('accordion-opened').find('.icon-accordion').text('+');

                } else {
                    $(this).parent().animate({
                        maxHeight: '1000px'
                    }, 400).addClass('accordion-opened').find('.icon-accordion').html('&ndash;');
                }
              });

              // var trs = $(this).find('tr').not('tr:first-child');
              var $accordeon = $('.icon-accordion').click(function () {
                $(this).parent().find('td:first-child').click();
              });

          });
      });
  };

  // Init
  $(function () {
      $('.responsive-table').responsiveTable();
  });

}();
