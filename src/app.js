//
// function requireAll(r) { r.keys().forEach(r); }
// requireAll(
//   require.context('./components/', true, /\.js$/)
// );

/// import actions




  import siteGallery from './components/common/_site-gallery/site-gallery.js';
  import productsGallery from './components/common/product-group-item/product-group-item.js';

  // init modal-links && fancybox set-up
	import modalActions from './components/global/modal/modal.js';
	// ajax && validation for all siteModals
	import siteModals from './components/partials/site-modals/site-modals.js';

	import './components/common/accordion/accordion.js';
	import './components/common/base-slider/base-slider.js';
	import './components/common/button/button.js';
	import './components/common/calendar/calendar.js';
	import './components/common/gallery-slider/gallery-slider.js';
	import './components/common/goup/goup.js';
	import './components/common/news-list/news-list.js';
	import tabs from './components/common/tabs/tabs.js';

	import './components/common/responsive-table/responsive-table.js';
	import './components/common/spinner/spinner.js';
	import './components/common/video-review/video-review.js';
	import './components/global/navigation/navigation.js';
	import './components/sections/about/about-reviews/about-reviews.js';
	import './components/sections/cart/cart-items/cart-items.js';
	import './components/sections/cart/cart-totals/cart-totals.js';
	import './components/sections/catalog-3/product-group-actions.js';
	import './components/sections/certificates/certificates.js';
	import './components/sections/contacts/contacts/contacts.js';
	import './components/sections/dealers/dealers/dealers.js';
	import './components/sections/gosts/gosts-list/gosts-list.js';
	import './components/sections/terms/terms-description/terms-description.js';




  import './components/common/accordion/accordion-init.js';



// init actions
domready(function () {
  const publicApi = {
    siteGallery: siteGallery.init(),
    productsGallery: productsGallery.init(),
    modalActions: modalActions.init(),
		siteModals: siteModals.init(),
    tabs: tabs.init()
  }

  exports.publicApi =  {
    ...publicApi
  };
})

  // var siteGalleryInit = siteGallery();

// var glob = require("glob")
// var path = require('path');
// var basePath = './components/';
//
// var mods = glob.sync(path.join(basePath, '**/*.js')).reduce(function (loaded, file) {
//   var mod = require(file);
//
//   // mod is a function with a name, so use it!
//   if (mod instanceof Function) {
//     loaded[mod.name] = mod;
//   } else {
//     Object.keys(mod).forEach(function (property) {
//       loaded[property] = mod.property;
//     });
//   }
//
//   return loaded;
// }, {});

// console.log(mods);
