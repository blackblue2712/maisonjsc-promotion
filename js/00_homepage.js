
var
    indexCr     = 0,
    isCr        = false,
    totalCr     = $('.brands-list li').length,
    // wItemCr     = $('.brands-list li').outerWidth(),
    wItemCr     = getDocumentSize(0),
    posCr       = 0,

    wBrand      = $('.brands-carousel--list li').outerWidth(),
    totalBrand  = $('.brands-carousel--list li').length,
    indexBr     = 0,
    isBrand     = 0,
    posBrand    = 0,

    $bgIntro    = $('.js-h--banner .bg'),
    $logo       = $('.logo'),
    MSLogo      = $logo.attr('style'),
    MSHLogo     = $logo.attr('data-hover');  




(function (MAISON, $, undefined) {
  'use strict';

  MAISON.Homepage = (function () {
    function Homepage() {

      var _this = this;



      this.intro = function () {

        var mySequence = [
          { e: $bgIntro, p: { opacity: [ 1, 0 ]   } , o: { duration: 300 ,
            complete: function() {
              $('#nav li').velocity('stop').velocity("transition.slideLeftBigIn", { stagger: 20 }, 20)
                          .velocity({opacity: 1},{
                            duration: 100,
                            complete: function() {
                              $('.hassub').addClass('hover');
                              $('.hassub').css({
                                  '-webkit-transform': 'none',
                                     '-moz-transform': 'none',
                                      '-ms-transform': 'none',
                                          'transform': 'none'
                              });
                            }
                          });
               $('.js-h--banner').addClass('animate');
            }
          }}

        ];
        $.Velocity.RunSequence(mySequence);


      };

      this.loading = function() {


        if($('#pHome').length) {
           $(window).load(function() {
              $('.loading').addClass('hide-loading');
              $('.loading').delay(1200).velocity({ opacity: 0}, 300, function() {
                 $(this).hide();
                 $('.pre-loading').velocity({ height: 0}, 300, function() {
                    MAISON.Homepage.intro();
                 })
              });
          });
        }
      };





      this.bannerParallax = function () {

        var $fwindow = $(window),
           scrollTop = window.pageYOffset || document.documentElement.scrollTop

        $fwindow.on('scroll resize', function() {
          scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        });

        $('[data-type="content"]').each(function (index, e) {
          var $contentObj = $(this);
          var fgOffset = ( getDocumentSize(3)- $('#pHome .banner-copy').outerHeight() )/2;;
          var yPos;

          $fwindow.on('scroll resize', function (){
            yPos = parseInt(fgOffset - scrollTop / 2.5);
            $contentObj.css('top', yPos);

            //FIXED HEADER ON-TOP

            if( (fgOffset-yPos) > 100) {
              $('header').addClass('on-top');
              $('header').css({ 'position': 'fixed' });

              // console.log(MSLogo+','+MSHLogo);
              $logo.css('background-image','url('+MSHLogo+')')

            } else {
              $('header').removeClass('on-top');
              $('header').css({ 'position': 'absolute' });

              $logo.attr('style',MSLogo);

            }

          });


        });


        $fwindow.on('scroll resize', function (){

          if(getDocumentSize(0) > 1025) {
            if( scrollTop > 150) {
              $('.show-sub').css({ position: 'fixed', top: 0,'z-index': 99});

              if(! $('#pBrand ,#pHome, #pContact, #pFaq, #pOther').length) {
                $('.on-top .logo').addClass('whitelogo');
              }


            } else {
              $('.show-sub').css({ position: 'absolute', top: '60px' });
              $('.on-top .logo').removeClass('whitelogo');
            }
          };


        });


        $fwindow.trigger('scroll');


      };




      this.openMobileMenu = function ()  {

         $('.btn-nav').on('click',  function(evt) {
          evt.preventDefault();
           $(this).toggleClass('is-open');
            if (!$(this).hasClass('is-open')) {
              $(this).addClass('is-close');
              $('nav, .ovl-mobile').hide();
              $('header').css({ 'height' : 'auto'});
            } else {
              $(this).removeClass('is-close');
              $('nav , .ovl-mobile').show();
              $('header').css({ 'height' : '100%'});
            }
         });
        $('.ar-mobile').on('click', function() {
          $(this).toggleClass('drop');
          $(this).next().toggleClass('show-sub');

        });

      };

      this.init = function () {
        _this.loading();
        _this.bannerParallax();
        _this.openMobileMenu();


        return this;
      };

      return this.init();
    }

    return new Homepage();
  }());

}(window.MAISON = window.MAISON || {}, jQuery));




