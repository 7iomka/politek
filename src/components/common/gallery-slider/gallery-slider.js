// import 'vendors/swiper/swiper.jquery.min.js';
import 'slick-carousel';

function gallerySliderActions() {

  // $(document).on('opening', '.remodal.remodal--gallery-gallery', function(e) {
  //
  //     $('.slick-slider', $(e.target)).each(function() {
  //         $(this).slick('setPosition');
  //
  //     });
  //
  // });
  var $gallerySlider = $('.gallery-slider');

  // $(document).on('afterLoad.fb', function( e, instance, slide ) {
  // 	// Your code goes here
  //   var $modalSource = $(instance.current.src);
  //   if ($modalSource.hasClass('gallery-slider')) {
  //
  //   }
  //
  // });

  $gallerySlider.each(function() {
    var $gallery = $(this),
      galleryId = '#' + $gallery.attr('id');

    var bigSliderSelector = galleryId + ' .big-image-slider',
      bigSlideSelector = galleryId + ' .gallery-slide';

    var smallSliderSelector = galleryId + ' .small-image-slider',
      smallSlideSelector = galleryId + ' .gallery-thumb';

    var $bigSlider = $(bigSliderSelector),
      $smallSlider = $(smallSliderSelector);

    var slidesLength = $(smallSlideSelector).length,
      // obligatory slidesToShow need to be %2 == 0
      slidesToShow = 4,
      centerMode = true,
      variableWidth = false;

    // if (slidesLength < slidesToShow) {
    //     slidesToShow = slidesLength;
    //     centerMode = false;
    //     variableWidth = true;
    // }

    /** LARGE IMAGE SLIDER **/
    $bigSlider.on('init beforeChange', function(event, slick, currentSlide, nextSlide) {

      var slideIndex = (typeof nextSlide !== "undefined")
        ? nextSlide
        : (typeof currentSlide !== "undefined"
          ? currentSlide
          : 0);
      var $currentSlide = $gallery.find("[data-slick-index='" + slideIndex + "']");

      // console.log('slideIndex: ', slideIndex);
      // console.log('surrentSlide: ', $currentSlide);

      // getContentOfSlide($currentSlide, $gallery);

    }).slick({
      slide: bigSlideSelector,
      asNavFor: smallSliderSelector,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      fade: true,
      // cssEase: 'cubic-bezier(0.9, 0.00, 0.1, 1.0)',
      cssEase: 'ease',
      speed: 800,
      dots: false,
      //  initialSlide: 0,
    });

    /** THUMBS SLIDER **/
    $smallSlider.slick({
      slide: smallSlideSelector,
      slidesToShow: slidesToShow,
      asNavFor: bigSliderSelector,
      slidesToScroll: 1,
      dots: false,
      // lazyLoad: 'progressive',
      arrows: true,
      centerMode: centerMode,
      centerPadding: 0,
      variableWidth: variableWidth,
      swipeToSlide: true,
      focusOnSelect: true,
      //  initialSlide: 0,
      // cssEase: 'cubic-bezier(0.9, 0.00, 0.1, 1.0)',
      cssEase: 'ease',
      // mobileFirst: true,
      inifinite: false,
      speed: 800,
      responsive: [
        {
          breakpoint: 1200,
          settings: {
            slidesToShow: slidesToShow
          }
        }, {
          breakpoint: 979,
          settings: {
            slidesToShow: slidesToShow
          }
        }, {
          breakpoint: 480,
          settings: {
            slidesToShow: 3,
          }
        }, {
          breakpoint: 375,
          settings: {
            slidesToShow: 2,
            centerMode: false
          }
        }
      ]
    });

  });

  $gallerySlider.find('.slick-slider').each(function() {
    $(this).slick('setPosition');
  });



}

domready(function() {
  exports.init = function() {
    gallerySliderActions();
  }
});
