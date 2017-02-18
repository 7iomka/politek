import Emitter from 'component-emitter';
const emitter = new Emitter;

module.exports = ((($, window, document, undefined) => {
  // Create the defaults once
  const pluginName = "accordion";

  const defaults = {
    classList: {
      instance: `.${pluginName}`,
      item:     `.${pluginName}__item`,
      control:  `.${pluginName}__contol`,
      toggler:  `.${pluginName}__toggler`,
      panel:    `.${pluginName}__panel`
    },
    activeClass: 'active',
    speed: 400,
    collapse: true,
    togglerDefaultText: 'Развернуть',
    togglerOpenedText: 'Свернуть',
    onInit() {

    },
    onOpen() {

    },
    onOpened() {

    },
    onClose() {

    },
    onClosed() {

    },
  };

  // The actual plugin constructor
  class Plugin {
    constructor(elem, opts) {
      this.elem = elem;
      this.$elem = $(elem);
      // extend defaults with user options
      this.opts = $.extend({}, defaults, opts);
      // save defaults settings and original pluginName
      this._defaults = defaults;
      this._name = pluginName;
      // init plugin
      this.init();
    }

    init() {
      // Place initialization logic here
      // You already have access to the DOM elem and
      // the options via the instance, e.g. this.elem
      // and this.options
      // you can add more functions like the one below and
      // call them like so: this.yourOtherFunction(this.elem, this.options).

      this.bindEvents(this.$elem, this.opts);
      this.opts.onInit();
    }

    bindEvents($el, opts) {
      const $control = $el.find(opts.classList.control);


      var self = this;
      $control.on('click', function () {
        self._toggle($(this), opts);
      });

      // Make an subscription to event accordion.toggle which run our callback
      emitter.on('toggle', function() {
        console.log('toggled')
      });
      // emitter.on('open', function () {
      //   self.open()
      // });
      // emitter.on('opened', function () {
      //   self.opened()
      // });
      // emitter.on('close', function () {
      //   self.close()
      // });
      // emitter.on('closed', function () {
      //   self.cloded()
      // });
      //
      // $control.on('click', function () {
      //   self._toggle($(this), opts);
      // });
    }

    _toggle($control, opts) {

      emitter.emit('toggle');
      opts.onOpen();
      // toggler elem inside the control
      const $toggler = $control.find(opts.classList.toggler);
      // parent of the control - item elem
      const $parentItem = $control.closest(opts.classList.item);
      const $parentInstance = $control.closest(opts.classList.instance);
      // Another active items in this instance of accordion (for multiple instances per page)
      const $anotherItems = $(`${opts.classList.item}.${opts.activeClass}`, $parentInstance).not($parentItem);


      /** Change text for toggler **/
      if ($parentItem.hasClass(opts.activeClass)) {
        $toggler.text(opts.togglerDefaultText);
      } else {
        $toggler.text(opts.togglerOpenedText);
      }

      // for active item toggle class (for css animation of content inside panel)
      $parentItem.toggleClass(opts.activeClass);

      // toggle with animation panel
      $control.next(opts.classList.panel).stop(false, true).slideToggle(opts.speed);


      // if collapse enabled
      if (opts.collapse) {
        $anotherItems.removeClass(opts.activeClass);
        $anotherItems.find(opts.classList.panel).stop(false, true).slideToggle(opts.speed);
        $anotherItems.find(opts.classList.toggler).text(opts.togglerDefaultText)
      }

    }

    test($el, opts) {
      console.log('i was toggled', $el, opts)
    }

  }


  // A really lightweight plugin wrapper around the constructor,
  // preventing against multiple instantiations
  $.fn[pluginName] = function ( options ) {
      return this.each(function () {
          if (!$.data(this, `plugin_${pluginName}`)) {
              // this write in dataset jquery cash - instance of initialisation
              $.data(this, `plugin_${pluginName}`, new Plugin( this, options ));
          }
      });
  };
  // Plugin defaults – added as a property on our plugin function.
  $.fn[pluginName].defaults = $.extend({}, defaults);

}))( jQuery, window, document );
