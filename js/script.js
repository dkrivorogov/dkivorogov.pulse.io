$(document).ready(function(){
    // скрипт вызывающий каталог по табам    
    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
        $(this)
            .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
            .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
    });
    // карусель слайдер 
    const slider = tns({
        container: '.carousel__inner',
        items: 1,
        slideBy: 'page',
        autoplay: false,
        autoHeight: true,
        controls: false,
        nav: true,
        touch: true,
        mouseDrag: true,
        navPosition: 'bottom',
        responsive: {
            992: {
                nav: false
            }
        }
    }); 
    // стрелки навигации 
    document.querySelector('.prev').addEventListener('click', function () {
        slider.goTo('prev');
        });
    document.querySelector('.next').addEventListener('click', function () {
        slider.goTo('next');
        });
    function toggleSlide(item) {
        $(item).each(function(i){
            $(this).on('click', function(e) {
                e.preventDefault();
                $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
                $('.catalog-item__info').eq(i).toggleClass('catalog-item__info_active');            
            })
        })
    };
    toggleSlide('.catalog-item__link');
    toggleSlide('.catalog-item__back');

    // Modals 
    $('[data-modal=consultation]').on('click', function() {
        $('.overlay, #consultation').fadeIn('slow');
    });
    $('.modal__close').on('click', function(){
        $('.overlay, #consultation, #order, #thanks').fadeOut('slow');
    });
    $('.button_mini').each(function(i) {
        $(this).on('click', function() {
            $('#order .modal__discr').text($('.catalog-item__subtitle').eq(i).text());
            $('.overlay, #order').fadeIn('slow');
        })
    });

    // jquery validate
    function valideForms (form) {
        $(form).validate({
            rules: {
                name: {
                    required: true,
                    minlength: 2
                },
                phone: "required",
                email: {
                    required: true,
                email: true
                }
            },
            messages: {
                name: {
                    required: "Пожалуйста, введите свое имя",
                    minlength: jQuery.validator.format("Введите минимум {0} символа!")
                },                
                phone: "Пожалуйста, введите свой номер телефона",
                email: {
                    required: "Пожалуйста, введите свою почту",
                    email: "Неправильно введен адрес почты"
                }
            } 
        });        
    };
    valideForms('#consultation-form');
    valideForms('#consultation form');
    valideForms('#order form');
        
    // плагин маска ввода номера телефона
    $('input[name=phone]').mask("+7 (999) 999-99-99");

    // отправка данных форм на локальый хостинг
    $('form').submit(function(e){
        e.preventDefault();
        if(!$(this).valid()){
            return;
        }
        $.ajax({
            type:"POST",
            url:"mailer/smart.php",
            data:$(this).serialize()
        }).done(function(){
            $(this).find("input").val("");
            $('#consultation, #order').fadeOut();
            $('.overlay, #thanks').fadeIn('slow');

            $('form').trigger('reset');
        });
        return false;
    });

    //появлекние кнопки pageup на заданном отступе
    $(window).scroll(function() {
        if ($(this).scrollTop() > 1600) {
            $('.pageup').fadeIn();
        } else {
            $('.pageup').fadeOut();
        }
    });
    // плавный переход к якорю _href
    $("a[href^='#up']").click(function(){
        const _href = $(this).attr("href");
        $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
        return false;
    });
    new WOW().init();
}); 