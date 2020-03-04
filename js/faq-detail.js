
$(document).ready(function(){
    $('.faq-ans').on('click', function() {
    
        var h = $(this).find('.copy-faq').outerHeight();
        $('.faq-ans').removeClass('display');
        $('.faq-ans .h-copy').velocity({ height: 0 } , 500);
    
        $(this).find('.h-copy').velocity({ height: h+'px' }, {
          duration: 500,
          complete: function() {
            $(this).parent().addClass('display');
            var top = parseInt($(this).offset().top -150);
             $("html").velocity("scroll", { offset: top+'px', mobileHA: false },{
                duration: 1500,
                easing: "easeOutExpo"
              });
          }
        });
    });
})