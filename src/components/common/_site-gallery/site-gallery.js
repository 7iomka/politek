import { PhotoSwipe, initPhotoSwipeFromDOM } from 'vendors/photoswipe-init.js';

module.exports = function () {
  if($('.site-gallery').length) {
    initPhotoSwipeFromDOM('.site-gallery');
  };
}()
