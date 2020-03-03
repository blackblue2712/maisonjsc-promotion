(function (MAISON, $, undefined) {
  'use strict';

  MAISON.Animate = (function () {
    function Animate() {

      var _this = this;


      this.animateScrollHandler = function()  {

        var $ele = $('.news-item');

        $ele.bind('inview', function(event, visible) {
          if (visible) {
            $(this).addClass('animate-scroll');
          }
        });

        var $bn = $('.js-animte--banner-bt h1');

        $bn.bind('inview', function(event, visible) {
          if (visible) {
            $(this).parent().parent().addClass('animate-scroll');
          }
        });

        var $btn = $('.brands .btn'),
            isBtn = false;

        $btn.bind('inview', function(event, visible) {
          if (visible) {
            if(isBtn) {
              return
            }
            isBtn = true;
            $('.js-next-carousel').trigger('click',function() {
              animateBounce(this);
            });
          }
        });

        var $item = $('.grid-brands .item');

        $item.bind('inview', function(event, visible) {
          if (visible) {
            $(this).addClass('animate-scroll');
          }
        });

        var $whyItem = $('.why-us--list li'),
            $career = $('.career-copy h2'),
            $galleryItem = $('.gallery .both'),
            $memberItem = $('.member-list'),
            $businessItem = $('.business-list'),
            $whyusItem = $('.why-us--list-bottom'),
            $whyUs = $('.why-us h2');

        $whyItem.bind('inview', function(event, visible) {
          if (visible) {
            $(this).parent().addClass('animate-scroll');
          }
        });

        $whyUs.bind('inview', function(event, visible) {
          if (visible) {
            $(this).addClass('animate-scroll');
            $(this).parent().find('.summary').addClass('animate-scroll');
          }
        });

        $career.bind('inview', function(event, visible) {
          if (visible) {
            $(this).parent().addClass('animate-scroll');
          }
        });

        $galleryItem.bind('inview', function(event, visible) {
          if (visible) {
            $(this).parent().parent().addClass('animate-scroll');
          }
        });

        $memberItem.bind('inview', function(event, visible) {
          if (visible) {
            $(this).addClass('animate-scroll');
          }
        });

        $businessItem.bind('inview', function(event, visible) {
          if (visible) {
            $(this).addClass('animate-scroll');
          }
        });

        $whyusItem.bind('inview', function(event, visible) {
          if (visible) {
            $(this).addClass('animate-scroll');
          }
        });

      };



      this.init = function () {

        _this.animateScrollHandler();

        return this;
      };

      return this.init();
    }

    return new Animate();
  }());

}(window.MAISON = window.MAISON || {}, jQuery));


