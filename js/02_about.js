(function (MAISON, $, undefined) {
  'use strict';

  MAISON.AboutPage = (function () {
    function AboutPage() {

      var _this = this;

      this.sliderArticle = function () {

        var $item = $('.js-article');

        $item.bind("click", function() {
          var adress = $(this).attr('data-panel'),
              top = parseInt($('#'+adress).offset().top - $('header').outerHeight() );

          $('.links a').removeClass('active');
          $(this).addClass('active');

          $("html").velocity("scroll", { offset: top+'px', mobileHA: false },{
            duration: 1500,
            easing: "easeOutExpo"
          });
          if(getDocumentSize(0)<1200) {
            $('.btn-nav').removeClass('is-open');
            $('nav, .ovl-mobile').hide();
            $('header').css({ 'height' : 'auto'});
          }

        });


        var $ele = $('.section-scroll');

        $ele.bind('inview', function(event, visible) {
          if (visible) {
            var a = $(this).attr('id');
            $(this).addClass('animate-scroll');
            $('.js-article').removeClass('underline');
            $('[data-panel="'+ a +'"]').addClass('underline');
          }
        });




        // $('[data-type="content"]').each(function (index, e) {

        //   var $contentObj = $(this);
        //   var fgOffset = ( getDocumentSize(3)- $('#pHome .banner-copy').outerHeight() )/2;;
        //   var yPos;

        //   $fwindow.on('scroll resize', function (){
        //     yPos = parseInt(fgOffset - scrollTop / 2.5);
        //     $contentObj.css('top', yPos);

        //     //FIXED HEADER ON-TOP

        //     if( (fgOffset-yPos) > 100) {
        //       $('header').addClass('on-top');
        //       $('header').css({ 'position': 'fixed' });

        //     } else {
        //       $('header').removeClass('on-top');
        //       $('header').css({ 'position': 'absolute' });

        //     }

        //   });


        // });

      };


      this.init = function () {

        _this.sliderArticle();


        return this;
      };

      return this.init();
    }

    return new AboutPage();
  }());

}(window.MAISON = window.MAISON || {}, jQuery));


