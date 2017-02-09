module.exports = function () {

  $(function () {
    if(!$('.news-list--slider').length) return;
    var newsListSlider = new Swiper('.news-list--slider', {
         pagination: '.news-list--slider .swiper-pagination', 
         nextButton: '.news-list--slider .swiper-button-next',
         prevButton: '.news-list--slider .swiper-button-prev',

         slidesPerView: 3,
         paginationClickable: true,
         spaceBetween: 30,
         // Small screens, center to align and loop elements
         breakpoints: {
           1200: {
              slidesPerView: 2
           },
           576: {
               slidesPerView: 1
           }
         }

    });
  });

}();
