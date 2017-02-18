import { PhotoSwipe_init } from 'vendors/photoswipe-init.js';


domready(function () {
  exports.init = function () {
      var galleryInstance;
      if($('.site-gallery').length) {
        galleryInstance = PhotoSwipe_init('.site-gallery');
      };
      return galleryInstance;
  }
})
