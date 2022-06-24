(function ($)
  { "use strict"
  
/* 1. Preloder (готовый код, можно использовать в любом проекте) */
    $(window).on('load', function () {
      $('#preloader-active').delay(450).fadeOut('slow');
      $('body').delay(450).css({
        'overflow': 'visible'
      });
    });

/* 2. Sticky And Scroll UP */
    $(window).on('scroll', function () {
      var scroll = $(window).scrollTop();
      if (scroll < 400) {
        $(".header-sticky").removeClass("sticky-bar");
        $('#back-top').fadeOut(500);
      } else {
        $(".header-sticky").addClass("sticky-bar");
        $('#back-top').fadeIn(500);
      }
    });

  // Scroll Up
    $('#back-top a').on("click", function () {
      $('body,html').animate({
        scrollTop: 0
      }, 800);
      return false;
    });


    /* TABS */

    $('.nav-item').on('click',function(){
       var currTab = $(this).index();
        $('.nav-item').removeClass('active');
        $(this).addClass('active');

        $('.tab-pane').removeClass('active');
        $('.tab-pane').removeClass('show');
        $('.tab-pane').eq(currTab).addClass('active');
        $('.tab-pane').eq(currTab).addClass('show');
   });
  
  /* PARALLAX */

       const scene = $('#scene').get(0);
    // const scene = document.getElementById('scene');
       const parallaxInstance = new Parallax(scene);

/* HAMBURGER */

    $('.mobile_menu').on('click',function(){
      $('.main-menu_nav').toggle();
     
})

    $('#closeMenu').on('click',function(){
      $('.main-menu_nav').hide();
});
    
/* Валидация */



$.validator.addMethod("regex", function(value, element, regexp) {
    var regExsp = new RegExp(regexp);
    return regExsp.test(value);
},"Please check your input."
);

/* Отправка форм */

$(document).ready(function() {
    $('[data-submit]').on('click', function(e) {
        e.preventDefault();
        $(this).parent('form').submit();
    })
    $.validator.addMethod(
        "regex",
        function(value, element, regexp) {
            var regExsp = new RegExp(regexp);
            return this.optional(element) || regExsp.test(value);
        },
        "Please check your input."
    );

 /* Функция валидации и вывода сообщений */
    function valEl(el) {
        el.validate({
            rules: {
                tel: {
                    required: true,
                    regex: '^([\+]+)*[0-9\x20\x28\x29\-]{5,20}$'
                },
                name: {
                    required: true
                },
                email: {
                    required: true,
                    email: true
                }
            },
            messages: {
                tel: {
                    required: 'Поле обязательно для заполнения',
                    regex: 'Телефон может содержать символы + - ()'
                },
                name: {
                    required: 'Поле обязательно для заполнения',
                },
                email: {
                    required: 'Поле обязательно для заполнения',
                    email: 'Неверный формат E-mail'
                }
            },

  /* Начинаем проверку id="" формы */
            submitHandler: function(form) {
                $('#preloader-active').fadeIn();
                var $form = $(form);
                var $formId = $(form).attr('id');
                switch ($formId) {
                    /* Если у формы id="bookform" - делаем:*/
                    case 'bookform':
                        $.ajax({
                                type: 'POST',
                                url: $form.attr('action'),
                                data: $form.serialize(),
                            })
                            .always(function() {
                                console.log('Always');
                                setTimeout(function() {
                                $form.trigger('reset');
                                $('#preloader-active').fadeIn();
                                 }, 1100);
                                 setTimeout(function() {    
                                $('#preloader-active').fadeOut();
                                $('#message-for-user').fadeIn();

                            }, 1300);
                                $('#message-for-user').on('click', function(e) {
                                    $(this).fadeOut();
                                });
                            });     
                        break;
                    /* Если у формы id="modalform" - делаем:*/
                    case 'modalform':
                        $.ajax({
                                type: 'POST',
                                url: $form.attr('action'),
                                data: $form.serialize()
                            })
                            .done(function() {
                                console.log('Fail');
                            })
                            .always(function() {
                                console.log('Always');
                                setTimeout(function() {
                                    $form.trigger('reset');
                                    $('#preloader-active').fadeIn();
                                 }, 1100);
                                setTimeout(function() {
                                  $('#preloader-active').fadeOut();
                                  $('.popup-black').fadeOut();   
                                 }, 1300);
                                });
                        break;
                }
                return false;
            }
        });
    }
    /* Запускаем механизм валидации форм, если у них есть класс .js-form*/
    $('.js-form').each(function() {
        valEl($(this));
    });
    
});


/* Modal */

     // Нажатие "Закрыть"
    $('.popup-close').click(function() {
        $(this).parents('.popup-black').fadeOut();
        return false;
    });   

    $('#popup').on('click', function(){
        $('.popup-black').fadeOut();
    });    

    $('.modal-book').children().on('click',function(e){
        e.stopPropagation();
    });
  
    // Нажатие клавиши Esc
    $(document).keydown(function(e) {
        if (e.keyCode === 27) {
            e.stopPropagation();
            $('.popup-black').fadeOut();
        }
    });
     
    // Клик по фону
    $('.popup-black').click(function(e) {
        if ($(e.target).closest('.popup').length == 0) {
            $(this).fadeOut();                 
        }
    });

     $('.header-right-btn').click(function() {
        $('.popup-black').fadeIn();
        return false;
    });
     
  /* SLIDER */
    var mySwiper = new Swiper ('.swiper-container', {
        direction : 'horizontal',
        spaceBetween : 20,
        slidesPerView: 1,
        loop : true,
        stopOnLastSlide : false,
        autoplay : {
          delay: 3000
    }
})  
   

})(jQuery);

