import "gsap";
require('gsap/src/uncompressed/plugins/ScrollToPlugin.js');

module.exports = function () {

  'use strict';
  var goUp = function() {
    return {
            init: function(el) {
                this.$el = $(el);
                if(!this.$el.length) return;

                this.$win = $(window),
                this.$body = $("body"),
                this.checkVisibility(),
                this.$el.on('click', this.onClick.bind(this)),
                this.$win.on('scroll', this.onScroll.bind(this)),
                this.$win.on('scroll', this.onScroll.bind(this))
            },
            onClick: function() {
                TweenMax.to(this.$win, 0.5, {scrollTo:0});
            },
            onScroll: function() {
                this.checkVisibility()
            },
            onResize: function() {
                this.checkVisibility()
            },
            checkVisibility: function() {
                this.scrollTop = this.$win.scrollTop();
                var t = this.scrollTop > 500;
                this.$body.toggleClass("go-up-visible", t),
                t ? this.$el.fadeIn(200) : this.$el.fadeOut(200)
            }
      }
  }();

  $(function () {
    goUp.init('.goup');

  });

}();
