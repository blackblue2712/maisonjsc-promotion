var wScreen = getDocumentSize(0) ,
    hScreen = getDocumentSize(3);

var posCopy = ( hScreen - $('#pHome .banner-copy').outerHeight() )/2;


(function (MAISON, $, undefined) {
  'use strict';

  MAISON.global = (function () {
    function Global() {

      var _this = this;

      var menu = $('.hassub'),
          submenu = $('.submenu'),
          isMenu = false;


      this.styleHeader = function () {
        if(!$('#pHome').length ) {
          $('header').addClass('on-top');          
        } else {
          $('header').removeClass('on-top');
        }

        if( $('#pAboutus').length ) {
          $('#nav li:eq(1)').find('.submenu').addClass('show-sub');
        } else if( $('#pNews').length) {
          $('#nav li:eq(3)').find('.submenu').addClass('show-sub');
        } else if( $('#pBlogs').length) {
          $('#nav li:eq(4)').find('.submenu').addClass('show-sub');
        } else if( $('#pCareer').length) {
          $('#nav li:eq(5)').find('.submenu').addClass('show-sub');
        }

      };

      this.subMenuHandle = function () {

        $(menu).mouseenter(function(event) {

          if($(window).height() > 680){
            if($(this).hasClass('hover')) {
              if (isMenu) return;
              isMenu = true;

              $(this).find('.submenu').velocity({
                height: 60 } , {
                duration: 150,
                display: 'block',
                complete: function() {
                  $('.submenu .links a').velocity('stop').velocity({
                    opacity: 1
                  });
                  isMenu = false;
                }
              });
            }
          } else {

            if($(this).hasClass('hover')) {
              if (isMenu) return;
              isMenu = true;

              $(this).find('.submenu').velocity({
                height: 40 } , {
                duration: 150,
                display: 'block',
                complete: function() {
                  $('.submenu .links a').velocity('stop').velocity({
                    opacity: 1
                  });
                  isMenu = false;
                }
              });
            }
          }

          

        });

        $(menu).mouseleave(function(event) {
          $('.submenu .links a').velocity('stop').velocity({ opacity: 0} ,{
            duration: 100,
            complete: function() {
              $('.submenu').velocity({
                height: 0 } , {
                duration: 150,
                display: 'none'
              });
            }
          });

        });

      };

      this.languageHandle = function ()  {

        $('.js-lang').on('click', function(evt) {
          $(this).toggleClass('is-open');
          if (!$(this).hasClass('is-open')) {
            $(this).addClass('is-close');
            $('.language').removeClass('display');
          } else {

            $(this).removeClass('is-close');
            $('.language').addClass('display');
          }

        });

      };

      this.showBoxSearch = function () {
        $('.js-btn-search').on('click', function() {
          $('.wrap-box--search').show();

          $('.wrap-box--search > div').velocity({
            opacity: 1, translateX: [0, 40]
          }, {
             display: 'block'
          })
        });

        $('.js-close-search').on('click', function() {

          $('.wrap-box--search > div').velocity({
            opacity: 0, translateX: [40, 0]
          }, {
             display: 'none',
             complete: function() {
              $('.wrap-box--search').hide();
             }
          })

        });
      };


      this.init = function () {
        _this.styleHeader();
        _this.showBoxSearch();
        _this.languageHandle();
        return this;
      };

      return this.init();
    }

    return new Global();
  }());

}(window.MAISON = window.MAISON || {}, jQuery));


$(document).ready(function() {
  $('.default-usage-select').selectbox();
});

$(window).load(function () {
  //$('html').velocity("scroll", { offset: 0 });
  $('.js-h--banner').height(hScreen);
  $('.js-h--banner .banner-copy').css({ top: posCopy });

  //MAISON.Homepage.loading();
});



$(window).on('resize', function () {

  var wScreen = getDocumentSize(0) ,
      hScreen = getDocumentSize(3);
  var posCopy = ( hScreen - $('#pHome .banner-copy').outerHeight() )/2;

      

  $('.js-h--banner').height(hScreen);
  $('.js-h--banner .banner-copy').css({ top: posCopy });

});