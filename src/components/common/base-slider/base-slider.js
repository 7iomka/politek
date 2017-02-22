import 'swiper';
// import PhotoSwipe from 'vendors/photoswipe.min.js';
// import PhotoSwipeUI_Default from 'vendors/photoswipe-ui-default.min.js';
// import { PhotoSwipe, PhotoSwipe_init } from 'vendors/photoswipe-init.js';

module.exports = function(){

  var baseSlider;

  $(function () {
    if(!$('.base-slider__instance_default').length) return;

    baseSlider = new Swiper('.base-slider__instance_default', {
          pagination: '.base-slider__instance_default .swiper-pagination',
          nextButton: '.base-slider__instance_default .swiper-button-next',
          prevButton: '.base-slider__instance_default .swiper-button-prev',
          slidesPerView: 3,
          paginationClickable: true,
          spaceBetween: 20,
          // Small screens, center to align and loop elements
          breakpoints: {
            767: {
               slidesPerView: 2
            },
            480: {
                slidesPerView: 1
            }
          }

       });

    // if swiper wrapper hasClass site-gallery - init that
    var $baseSliderinstance = $('.base-slider__instance_default');
    var $baseSliderGallery = $baseSliderinstance.find('.site-gallery');
    // console.log($('.site-gallery',$baseSliderinstance).length);
  // console.log(PhotoSwipe);
    // if($baseSliderGallery.length) {
    //   PhotoSwipe_init('.site-gallery');
    // }
  });

  return baseSlider;

}()
