require('vendors/modernizr-custom.js');
var _ = require('vendors/underscore-min.js');

module.exports = function() {


  if( typeof ymaps === 'undefined' ) return;
  // При успешной загрузке API выполняется
  // соответствующая функция.
  ymaps.ready(function() {

    /**
     * MOSCOW
     */
    var mapMoscow = new ymaps.Map("map-moscow", {
      center: [
        55.671807, 37.296048
      ],
      zoom: 16,
      controls: ['zoomControl', 'typeSelector']
    }, {suppressMapOpenBlock: true});

    mapMoscow.geoObjects.add(new ymaps.GeoObject({
      geometry: {
        type: "Point",
        coordinates: [55.671686, 37.292840]
      },
      properties: {
        balloonContent: decodeURIComponent("143000%2C%20%D0%A0%D0%BE%D1%81%D1%81%D0%B8%D1%8F%2C%3Cbr%3E%20M%D0%BE%D1%81%D0%BA%D0%BE%D0%B2%D1%81%D0%BA%D0%B0%D1%8F%20%D0%BE%D0%B1%D0%BB.%2C%3Cbr%3E%20%D0%B3.%20%D0%9E%D0%B4%D0%B8%D0%BD%D1%86%D0%BE%D0%B2%D0%BE%2C%3Cbr%3E%20%D1%83%D0%BB.%20%D0%A2%D1%80%D0%B0%D0%BD%D1%81%D0%BF%D0%BE%D1%80%D1%82%D0%BD%D0%B0%D1%8F%20%D0%B4.%202"),
        iconCaption: 'ул. Транспортная д. 2',
        hintCaption: 'ул. Транспортная д. 2'
      }
    }, {
      iconLayout: 'default#image',
      iconImageHref: '/assets/icons/pin.png',
      iconImageSize: [
        30, 30
      ],
      iconImageOffset: [-15, -30]
    }));

    function calculateLayoutMoscow() {
      var mq = Modernizr.mq('(max-width: 991px)');
      if(mq) {
        mapMoscow.behaviors.disable('drag');
        mapMoscow.setCenter([55.671686, 37.292840]);
      }
      else {
        mapMoscow.behaviors.enable('drag');
        mapMoscow.setCenter([55.671807, 37.296048]);
      }
      console.log(mq);
    }
    var сhangeLayoutMoscow = _.debounce(calculateLayoutMoscow, 300);
    $(window).resize(сhangeLayoutMoscow).trigger('resize');

    mapMoscow.behaviors.disable('scrollZoom');



  /**
   * TULA
   */
    var mapTula = new ymaps.Map("map-tula", {
      center: [
        54.221640, 37.693266
      ],
      zoom: 16,
      controls: ['zoomControl', 'typeSelector']
    }, {suppressMapOpenBlock: true});

    mapTula.geoObjects.add(new ymaps.GeoObject({
      geometry: {
        type: "Point",
        coordinates: [54.221637, 37.689833]
      },
      properties: {
        balloonContent: decodeURIComponent("143000%2C%20%D0%A0%D0%BE%D1%81%D1%81%D0%B8%D1%8F%2C%3Cbr%3E%20%D0%A2%D1%83%D0%BB%D1%8C%D1%81%D0%BA%D0%B0%D1%8F%20%D0%BE%D0%B1%D0%BB.%2C%D0%B3.%D0%A2%D1%83%D0%BB%D0%B0%2C%3Cbr%3E%20%D1%83%D0%BB.%D0%A9%D0%B5%D0%B3%D0%BB%D0%BE%D0%B2%D1%81%D0%BA%D0%B0%D1%8F%3Cbr%3E%20%D0%B7%D0%B0%D1%81%D0%B5%D0%BA%D0%B0%2C%20%D0%B4.31"),
        iconCaption: 'улица Щегловская Засека, 31',
        hintCaption: 'улица Щегловская Засека, 31'
      }
    }, {
      iconLayout: 'default#image',
      iconImageHref: '/assets/icons/pin.png',
      iconImageSize: [
        30, 30
      ],
      iconImageOffset: [-15, -30]
    }));

    function calculateLayoutTula() {
      var mq = Modernizr.mq('(max-width: 991px)');
      if(mq) {
        mapTula.behaviors.disable('drag');
        mapTula.setCenter([54.221637, 37.689833]);
      }
      else {
        mapTula.behaviors.enable('drag');
        mapTula.setCenter([54.221640, 37.693266]);
      }
    }
    var сhangeLayoutTula = _.debounce(calculateLayoutTula, 300);
    $(window).resize(сhangeLayoutTula).trigger('resize');

    mapTula.behaviors.disable('scrollZoom');



  });

}()
