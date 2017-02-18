module.exports = ((($, window, document, undefined) => {
  // default initialisation
  if($('.accordion').length) {
    $('.accordion').each(function () {
      $(this).accordion();
    })
  }

}))( jQuery, window, document );
