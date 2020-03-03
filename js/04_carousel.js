function Slider(selector) {
  var self = this;

  self.$slider = $(selector);
  self.total = this.$slider.find('.js-brand-copy--list li').length;
  self.currenImg = 0;
  self.posCr = 0;

  var wWrap = $('.brands').outerWidth(),
      hWrap = $('.js-brand--carousel li').outerHeight(),
      wCopy = $('.brands-copy').outerWidth(),
      wSlide;

if( getDocumentSize(0) > 1200) {

    var wSlide = wWrap-wCopy;

    $('.brands-list li').width(wSlide);
    $('.brands-list').width(wSlide*totalCr);
    $('.right-ovl').css({ left:  wSlide +'px' });
    //$('.brands-slide').css({ height: 100+'%' });

  } else {

    var wSlide = wWrap;

    //$('.brands-slide').height(hWrap);
    $('.brands-list li').width(wSlide);
    $('.brands-list').width(wSlide*totalCr);

  }


  this.setup = function () {


    $(window).bind('load resize', function () {
       var wWrap = parseInt( $('.brands').outerWidth() ),
           hWrap = $('.js-brand--carousel li').outerHeight(),
           wCopy = parseInt( $('.brands-copy').outerWidth() ),
           wSlide = wWrap-wCopy;


      if( getDocumentSize(0) > 1200) {

        var wSlide = wWrap-wCopy;

        //$('.brands').height(hWrap);
        $('.brands-list li').width(wSlide);
        $('.brands-list').width(wSlide*totalCr);
        $('.right-ovl').css({ left:  wSlide +'px' });
	      //$('.brands-slide').css({ height: 100+'%' });

      } else {

        var wSlide = wWrap;
        //$('.brands').css({ height: 'auto' });
        $('.brands-list li').width(wSlide);
        $('.brands-list').width(wSlide*totalCr);
	     //$('.brands-slide').height(hWrap);

      }

      self.posCr = self.currenImg * wSlide;
      self.$slider.find('.js-brand--carousel').css({ left: -self.posCr });

    });

  }

  this.onCLickNextHandler = function () {

    self.pauseAutoRun();

    if( self.currenImg < self.total-1 ) {

      self.currenImg++;
      self.posCr = self.currenImg * wSlide;


      self.$slider.find('.js-brand-copy--list li').removeClass('display');
      self.$slider.find('.js-brand--carousel').velocity({ left: -self.posCr },{
        duration: 700,
        ease: [0.26, 1.48, 0.47, 0.96],
        complete: function() {
          self.$slider.find('.js-brand-copy--list li:eq('+self.currenImg+')').addClass('display');
        }
      })

    } else if( self.currenImg === self.total-1) {
      self.currenImg = 0;
      self.posCr = self.currenImg * wSlide;


      self.$slider.find('.js-brand-copy--list li').removeClass('display');
      self.$slider.find('.js-brand--carousel').velocity({ left: -self.posCr },{
        duration: 700,
        ease: [0.26, 1.48, 0.47, 0.96],
        complete: function() {
          self.$slider.find('.js-brand-copy--list li:eq('+self.currenImg+')').addClass('display');
        }
      })
    }

  }

  this.onCLickPrevHandler = function () {
    self.pauseAutoRun();
    if( self.currenImg > 0 ) {
      self.currenImg--;
      self.posCr = self.currenImg * wSlide;

      self.$slider.find('.js-brand-copy--list li, .js-carouel-logo li').removeClass('display');
      self.$slider.find('.js-brand--carousel').velocity({ left: -self.posCr },{
        duration: 700,
        ease: [0.26, 1.48, 0.47, 0.96],
        complete: function() {
          self.$slider.find('.js-brand-copy--list li:eq('+self.currenImg+')').addClass('display');
          self.$slider.find('.js-carouel-logo li:eq('+self.currenImg+')').addClass('display');
        }
      })
    }

  }

  this.onCLickLogoHandler = function () {

    self.currenImg = $(this).index();
    self.posCr = self.currenImg * wSlide;
    self.$slider.find('.js-brand-copy--list li, .js-carouel-logo li').removeClass('display');
    self.$slider.find('.js-brand--carousel').velocity({ left: -self.posCr },{
      duration: 700,
      ease: [0.26, 1.48, 0.47, 0.96],
      complete: function() {
        self.$slider.find('.js-brand-copy--list li:eq('+self.currenImg+')').addClass('display');
        self.$slider.find('.js-carouel-logo li:eq('+self.currenImg+')').addClass('display');
      }
    })
  }

  this.autoRun = function (autoRunTime) {

    autoRunTime = Number(autoRunTime) || 2000;

    self.autoRunState = setInterval(function () {
      self.onCLickNextHandler();
    }, autoRunTime);

  }

  this.pauseAutoRun = function () {

    clearInterval(self.autoRunState);

    self.autoRunState = setInterval(function () {
      self.onCLickNextHandler();
    }, 10000);
  }


  this.run = function () {
    self.$slider.find('.js-prev-carousel').on('click', self.onCLickPrevHandler);
    self.$slider.find('.js-next-carousel').on('click', self.onCLickNextHandler);
   // self.$slider.find('.js-carouel-logo li').on('click', self.onCLickLogoHandler);
  }

  //INIT EVENT
  self.setup();
  self.run();

};


var slider = new Slider('#news');
slider.autoRun(5000);



