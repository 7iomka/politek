import PhotoSwipe from 'vendors/photoswipe.min.js';
import PhotoSwipeUI_Default from 'vendors/photoswipe-ui-default.min.js';
//PHOTOSWIPE
/* global jQuery, PhotoSwipe, PhotoSwipeUI_Default, console */


var initPhotoSwipeFromDOM = function(gallerySelector) {

  // Init empty gallery array
  var slides = [];
  var photoSwipe;
  var pswp = $(".pswp")[0];

  /** return the thumbnail's bounds for zomm-in and zoom-out animation */
  function getThumbBounds(index) {

    var slide = slides[index];

    var thumbnail   = slide.$figure.find("a img"),
        thumbOffset = thumbnail.offset(),
        thumbWidth  = thumbnail.width();

    return { x: thumbOffset.left, y: thumbOffset.top, w: thumbWidth };
  }

  // Loop over gallery items and push it to the array
  $(gallerySelector).find('figure').each(function(ix, el) {
    // parse markup and retrieve slides information from ".photoswipe-gallery figure"
    var $figure = $(this);
    var $anchor = $figure.find("a");
    var slide = {
      $figure: $figure,
      src: $anchor.attr('href'),
      w: $anchor.data('width') || 800,
      h: $anchor.data('height') || 1100,
      title: $anchor.data('caption')
    };

    slides.push(slide);

    $figure.on("click", function(evt){

      evt.preventDefault();

      var options = {
         index                 : ix,
         bgOpacity             : 0.90,
         showHideOpacity       : false,
         getThumbBoundsFn      : getThumbBounds,
        // ,showAnimationDuration : 500
        // ,hideAnimationDuration : 500,
        preload               : [5, 5],
        shareButtons: [
           {id:'download', label:'Скачать', url:'{{raw_image_url}}', download:true}
         ],
        //  thumbs:false,
        //  caption:false,

        fullscreenEl: false,
         history:false
      }


      photoSwipe = new PhotoSwipe(pswp, PhotoSwipeUI_Default, slides, options);


      // photoSwipe.listen("mouseUsed", setTransition);

      // photoSwipe.listen("pointerDown", function(){ console.log("pointerDown") });
      // photoSwipe.listen("dragStart", function(){ console.log("dragStart") });
      // photoSwipe.listen("dragEnd", function(){ console.log("dragEnd") });

      // photoSwipe.listen("beforeChange", function(){});
      // photoSwipe.listen("afterChange", function(){});

      photoSwipe.init();

      // window.photoSwipe = photoSwipe;


    });
  });


}


module.exports = {
  PhotoSwipe: PhotoSwipe,
  PhotoSwipeUI_Default: PhotoSwipeUI_Default,
  initPhotoSwipeFromDOM: initPhotoSwipeFromDOM,
};
