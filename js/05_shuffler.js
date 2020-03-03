(function (MAISON, $, undefined) {
  'use strict';

  MAISON.shuffle = (function () {

    function getAllImages() {
      var imgs = [];
      $('.office-gallery-all > div').each(function(index) {
        imgs.push($(this).text());
      });
      return imgs;
    }

    function shuffleGallery() {

      var _this = this;

      var allImgs = getAllImages(),

          officeGallery    = [],
          newOfficeGallery = [],
            d              = 0,
          img              = '',
          ry, p, more;

      this.changeImgHandler = function () {

        function getUsedImages() {
          var usedImgs = [];
          $('.gallery img').each(function () {
            usedImgs.push($(this).attr('src'));
          });
          return usedImgs;
        }

        function getUnusedImages() {
          var used = getUsedImages();
          //console.log('used', used);
          return allImgs.filter(function(img) { return used.indexOf(img) < 0 });
        }

        function shuffleArray(a) {
          var a_clone = a.slice();
            var j, x, i;
            for (i = a_clone.length; i; i -= 1) {
                j = Math.floor(Math.random() * i);
                x = a_clone[i - 1];
                a_clone[i - 1] = a_clone[j];
                a_clone[j] = x;
            }
            return a_clone;

        }

        function getRandom(a, n) {
          n = n || 1;
          var a_clone = a.slice();
          var a_shuf = shuffleArray(a_clone);
          return a_shuf.splice(0, n);
        }

        function loop() {
          var unUsedImages = getUnusedImages();
          var randomImages = getRandom(unUsedImages, 1),
              parent = $('.js-shuffle--img li');
              p = Math.floor((Math.random() * 5));

              $( $('.js-shuffle--img li > p')[p] ).find('img').velocity({ opacity: 0 }, {
                duration: 300,
                complete: function() {
                 // more = $(this).attr('src');
                 // newOfficeGallery.splice(newOfficeGallery, 1);
                 // newOfficeGallery.push(more);

                 $(this).attr('src', randomImages).velocity({ opacity: 1});
                }
              });
        }


        setInterval(function () {
          loop();
        }, 5000);

      }

      this.init = function () {

        _this.changeImgHandler();
        return this;
      };

      return this.init();
    }

    return new shuffleGallery();
  }());

}(window.MAISON = window.MAISON || {}, jQuery));







