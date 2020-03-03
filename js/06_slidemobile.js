(function (MAISON, $, undefined) {
  'use strict';

  MAISON.Mobile = (function () {

    function slidemobile() {

      var _this = this;

      var i ,pos;
      var autoRunState = null;




      this.businessSlide = function () {

        $('.js-dot--business li').on('click', function() {
           var i  = $(this).index();
              pos = i*100;

          $('.business-list').velocity({ left: -pos+'vw' },700, 'easeOutQuart')
          $('.js-dot--business li').removeClass('display');
          $(this).addClass('display');

          clearInterval(autoRunState);
          autoRunState = setInterval(function () {
           $('.mb-busines--control').trigger('swipeleft');
          }, 5000);

        });

      }

      this.swipeSlider= function () {

        $('.mb-busines--control').on('swipeleft', function() {
            var dotWrapper = $(this).find('.js-dot--business'),
                curIndex = $(dotWrapper).find('li.display').prevAll().length,
                numLi = $(dotWrapper).find('li').length,
                nextLi = curIndex + 1;


            if (nextLi === numLi) {
              nextLi = 0;
            }

            $(dotWrapper).find('li:eq(' + nextLi + ')').click();

        });

        $('.mb-busines--control').on('swiperight', function() {
          var dotWrapper = $(this).find('.js-dot--business'),
              curIndex = $(dotWrapper).find('li.display').prevAll().length,
              numLi = $(dotWrapper).find('li').length,
              prevLi = curIndex - 1;
          if (prevLi < 0) {
            prevLi = numLi - 1;
          }

          $(dotWrapper).find('li:eq(' + prevLi + ')').click();
        });

      }

      this.autoRun = function() {
        autoRunState = setInterval(function () {
         $('.mb-busines--control').trigger('swipeleft');
        }, 5000);
      }






      this.init = function () {

        _this.businessSlide();

        _this.swipeSlider();

        //_this.autoRun();

        return this;
      };

      return this.init();
    }

    return new slidemobile();
  }());

}(window.MAISON = window.MAISON || {}, jQuery));


$(document).ready(function() {


  if( getDocumentSize(0) < 768 ) {

    $('#member').on('click', function() {
      console.log('mb');
    });
  }

});







