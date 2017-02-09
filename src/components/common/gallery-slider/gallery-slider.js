import 'swiper';

module.exports = function() {
  $(function () {
    if(!$('.gallery-slider__scene').length) return;

   var galleryTop = new Swiper('.gallery-slider__scene', {
        //  nextButton: '.swiper-button-next',
        //  prevButton: '.swiper-button-prev',
         spaceBetween: 10,
         slidesPerView: 1,
          centeredSlides: true,
          onSlideChangeEnd: function(swiper){
            $(".gallery-slider__thumb").eq(swiper.activeIndex).click();
          }
     });
   var galleryThumbs = new Swiper('.gallery-slider__thumbs', {
       spaceBetween: 9,
      //  centeredSlides: true,
       slidesPerView: 4,
       touchRatio: 0.2,
       slideToClickedSlide: true,
      //  resistance: true,
        // resistanceRatio: 0,
        // freeMode: true,
        // freeModeMomentumRatio: 0.5,
        // freeModeMomentumBounce: false,
        // freeModeSticky: true,
   });
     galleryTop.params.control = galleryThumbs;
     galleryThumbs.params.control = galleryTop;
     galleryThumbs.disableTouchControl();
     //  galleryTop.disableTouchControl();

     $(".gallery-slider__thumb").on('click', function(){
        // galleryThumbs.slideTo($(this).index(), 500);
        $('.swiper-slide-active', '.gallery-slider__thumbs').removeClass('swiper-slide-active');
        $(this).addClass('swiper-slide-active');
         galleryTop.slideTo($(this).index(), 500);
     });

  });
}();
