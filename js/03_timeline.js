(function (MAISON, $, undefined) {
  'use strict';

  MAISON.TimeLine = (function () {

    function TimeLine() {

      var _this = this;


      this.history = function (selector) {

        var self = this;
            this.$history = $(selector);
            this.total = this.$history.find('.carousel li.items').length;
            this.current = 0;

        var items = $('.effect-bringback'),
            dot = $('.js-dot--history'),
            isRun = false;


      var year = "";

      // for ( var i = 0; i < this.total; i++)
      // year += '<li><p>2005</p><span></span></li>';
      // $('.js-dot--history').append(year);
      // $('.js-dot--history li:eq(0)').addClass('active');

          function _OnClickNextHistory(){

            if( self.current < self.total-1 ) {

              self.current++;
              $('.js-btn-prev--history').show();

              $(items).find('li').removeClass('main-pos right-pos left-pos').addClass('back-pos');
              $(items).find('li:eq('+self.current+')').removeClass('back-pos').addClass('main-pos');
              $(items).find('li:eq('+self.current+')').prev().removeClass('back-pos').addClass('left-pos');
              $(items).find('li:eq('+self.current+')').next().removeClass('back-pos').addClass('right-pos');

              $(dot).find('li').removeClass('active')
              $(dot).find('li:eq('+self.current+')').addClass('active')

              if ( self.current === self.total-1 ) {
                $(this).hide();
              }

            }

          };

          function _OnClickPrevHistory(){

            if( self.current > 0 ) {
              self.current--;
              $('.js-btn-next--history').show();
              $(items).find('li').removeClass('main-pos right-pos left-pos').addClass('back-pos');
              $(items).find('li:eq('+self.current+')').removeClass('back-pos').addClass('main-pos');
              $(items).find('li:eq('+self.current+')').prev().removeClass('back-pos').addClass('left-pos');
              $(items).find('li:eq('+self.current+')').next().removeClass('back-pos').addClass('right-pos');

              $(dot).find('li').removeClass('active')
              $(dot).find('li:eq('+self.current+')').addClass('active')

            }
            if ( self.current === 0 ) {
              $(this).hide();
            }

          };

          function _OnClickDotHistory(){

            self.current =$(this).index();

            $(items).find('li').removeClass('main-pos right-pos left-pos').addClass('back-pos');
            $(items).find('li:eq('+self.current+')').removeClass('back-pos').addClass('main-pos');
            $(items).find('li:eq('+self.current+')').prev().removeClass('back-pos').addClass('left-pos');
            $(items).find('li:eq('+self.current+')').next().removeClass('back-pos').addClass('right-pos');
            $(dot).find('li').removeClass('active')
            $(dot).find('li:eq('+self.current+')').addClass('active')


            if ( self.current === self.total-1 ) {
              $('.js-btn-next--history').hide();
              $('.js-btn-prev--history').show();
            } else if ( self.current === 0 ) {
              $('.js-btn-prev--history').hide();
              $('.js-btn-next--history').show();
            } else {
              $('.js-btn-next--history, .js-btn-prev--history').show();
            }

          };

          $('.js-btn-prev--history').hide();
          $('.js-btn-next--history').on('click', _OnClickNextHistory);
          $('.js-btn-prev--history').on('click', _OnClickPrevHistory);
          $('.js-dot--history li').on('click', _OnClickDotHistory);

      };


      this.init = function () {

        _this.history('.timeline');


        return this;
      };

      return this.init();
    }

    return new TimeLine();
  }());

}(window.MAISON = window.MAISON || {}, jQuery));






/// MAISON.CAROUSELBRAND ///

(function (MAISON, $, undefined) {
  'use strict';

  MAISON.carousel = (function () {

    function Carousel(selector) {

          var self = this;
          this.$carousel = $(selector);
          this.wWrap = this.$carousel.outerWidth();
          this.total = this.$carousel.find('.brands-carousel--list li').length;
          this.currentItem = 0;
          this.posBrand = 0;
          this.wBrand = parseInt(this.wWrap/5);

          var isBrand = false,
              posBrand = 0;

      this.setup = function () {

        $(window).bind('load resize', function () {

          self.wWrap = self.$carousel.outerWidth();
          if(getDocumentSize(0) > 415) {
            self.wBrand = parseInt(self.wWrap/5);
          } else {
            self.wBrand = parseInt(self.wWrap/3);
          }

          self.$carousel.find('.brands-carousel--list').width(self.wBrand*self.total);
          self.$carousel.find('.brands-carousel--list li').width(self.wBrand);
        });


      }

      this._onClickPrevHandler = function () {

        if(isBrand) {
          return;
        }
        isBrand = true;

        if( self.currentItem > 0 ) {

          self.currentItem--;
          self.posBrand = self.currentItem * self.wBrand;

          self.$carousel.find('.js-next--ourbrand').show();

          self.$carousel.find('.brands-carousel--list').velocity({ left: - self.posBrand },{
            duration: 300,
            ease: [0.19, 1, 0.22, 1],
            complete: function() {
              isBrand = false;
            }
          })
        } else if(self.currentItem === 0) {
          $(this).hide();
           isBrand = false;
        }
      }

      this._onClickNextHandler = function () {

        if(isBrand) {
          return;
        }
        isBrand = true;

        if(getDocumentSize(0) > 415) {

          if( self.currentItem < self.total-5 ) {

            self.currentItem ++;
            self.posBrand = self.currentItem * self.wBrand;

            console.log(self.currentItem, self.total)

            self.$carousel.find('.js-prev--ourbrand').show();

            self.$carousel.find('.brands-carousel--list').velocity({ left: - self.posBrand },{
              duration: 300,
              ease: [0.19, 1, 0.22, 1],
              complete: function() {
                isBrand = false;
              }
            })
          } else if( self.currentItem === self.total-5 ) {
             $(this).hide();
             isBrand = false;
          }
        } else {
          if( self.currentItem < self.total-3 ) {

            self.currentItem ++;
            self.posBrand = self.currentItem * self.wBrand;

            self.$carousel.find('.js-prev--ourbrand').show();

            self.$carousel.find('.brands-carousel--list').velocity({ left: - self.posBrand },{
              duration: 300,
              ease: [0.19, 1, 0.22, 1],
              complete: function() {
                isBrand = false;
              }
            })
          } else if( self.currentItem === self.total-3 ) {
             $(this).hide();
             isBrand = false;
          }
        }
      }

      this.run = function () {
        $('.js-prev--ourbrand').on('click', self._onClickPrevHandler);
        $('.js-next--ourbrand').on('click', self._onClickNextHandler);
      }

      this.init = function () {

        self.setup();
        self.run();


        return this;
      };

      return this.init();

    };
    return {
      brand: new Carousel('#brandlist')
    }
    // var carousel = new Carousel('#brandlist');
    // var carousel1 = new Carousel('#partnerlist');
    // return new Carousel('#brandlist');
    // return new Carousel('#partnerlist');

  }());

}(window.MAISON = window.MAISON || {}, jQuery));






(function (MAISON, $, undefined) {
  'use strict';

  MAISON.carousel = (function () {

    function Carousel(selector) {

          var self = this;
          this.$carousel = $(selector);
          this.wWrap = this.$carousel.outerWidth();
          this.total = this.$carousel.find('.brands-carousel--list li').length;
          this.currentItem = 0;
          this.posBrand = 0;
          this.wBrand = parseInt(this.wWrap/5);

          var isBrand = false,
              posBrand = 0;

      this.setup = function () {

        $(window).bind('load resize', function () {

          self.wWrap = self.$carousel.outerWidth();
          if(getDocumentSize(0) > 415) {
            self.wBrand = parseInt(self.wWrap/5);
          } else {
            self.wBrand = parseInt(self.wWrap/3);
          }

          self.$carousel.find('.brands-carousel--list').width(self.wBrand*self.total);
          //self.$carousel.find('.brands-carousel--list li').width(self.wBrand);
        });


      }

      this._onClickPrevHandler = function () {

        if(isBrand) {
          return;
        }
        isBrand = true;

        if( self.currentItem > 0 ) {

          self.currentItem--;
          self.posBrand = self.currentItem * self.wBrand;

          self.$carousel.find('.js-next--partner').show();

          self.$carousel.find('.brands-carousel--list').velocity({ left: - self.posBrand },{
            duration: 300,
            ease: [0.19, 1, 0.22, 1],
            complete: function() {
              isBrand = false;
            }
          })
        } else if(self.currentItem === 0) {
          $(this).hide();
           isBrand = false;
        }
      }

      this._onClickNextHandler = function () {

        if(isBrand) {
          return;
        }
        isBrand = true;

        if( self.currentItem < self.total-5 ) {

          self.currentItem ++;
          self.posBrand = self.currentItem * self.wBrand;

          self.$carousel.find('.js-prev--partner').show();

          self.$carousel.find('.brands-carousel--list').velocity({ left: - self.posBrand },{
            duration: 300,
            ease: [0.19, 1, 0.22, 1],
            complete: function() {
              isBrand = false;
            }
          })
        } else if( self.currentItem === self.total-5 ) {
           $(this).hide();
           isBrand = false;
        }
      }

      this.run = function () {
        $('.js-prev--partner').on('click', self._onClickPrevHandler);
        $('.js-next--partner').on('click', self._onClickNextHandler);
        $('.js-next--partner').trigger('click');
      }

      this.init = function () {

        self.setup();
        self.run();


        return this;
      };

      return this.init();

    };
    return {
      partner: new Carousel('#partnerlist')
    }
    // var carousel = new Carousel('#brandlist');
    // var carousel1 = new Carousel('#partnerlist');
    // return new Carousel('#brandlist');
    // return new Carousel('#partnerlist');

  }());

}(window.MAISON = window.MAISON || {}, jQuery));


