import 'vendors/jquery.fancybox.min.js';

function modalActions() {
  if(!$('.modal-link').length) return;

  $('.modal-link').on('click', function(){
    var $modalTarget = $(this).data('modal-target');
    $.fancybox.close();
    $.fancybox.open({
        src  : $modalTarget,
        type : 'inline',
        opts : {
          onComplete : function() {
            console.info('done!');
          }
        }
    });
  })

  $('.modal-close').on('click', function () {
    // close current active modal
    $.fancybox.close();
  });


}



domready(function () {
  exports.init = modalActions
})
