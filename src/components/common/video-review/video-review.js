import "vendors/lazyYT.custom";

module.exports = function () {
  /**
   * Lazy previews for youtube (Reviews videos) with enabled controls
  */
  $(function () {
    if ($('.reviewYT').length) {
      $('.reviewYT').lazyYT('AIzaSyDTvkd_fXoqr3v0T4ad4EyV4s6vgKJmqYM', {
          youtube_parameters: 'rel=0&controls=1&showinfo=0',
      });
    }

  });
}();
