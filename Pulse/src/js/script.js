$(document).ready(function() {
    $('.carousel_inner').slick({
        speed: 1200, 
        adaptiveHeight:false,
        autoplay: true,
        autoplaySpeed: 2500,
        prevArrow: '<button type="button" class="slick-prev"><img src="logo/left.png"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="logo/right.png"></button>', 
    });
    $('ul.catalog_tabs').on('click', 'li:not(.catalog_tab_active)', function() {
        $(this)
          .addClass('catalog_tab_active').siblings().removeClass('catalog_tab_active')
          .closest('div.container').find('div.catalog_content').removeClass('catalog_content_active').eq($(this).index()).addClass('catalog_content_active');
      });
      $('.catalog-item_link').each(function(i) {
          $(this).on('click', function(e){
                e.preventDefault();
                $('.catalog-item_content').eq(i).toggleClass('catalog-item_content_active');
                $('.catalog-item_list').eq(i).toggleClass('catalog-item_list_active');
          })
      })
      $('.catalog-item_back').each(function(i) {
        $(this).on('click', function(e){
              e.preventDefault();
              $('.catalog-item_content').eq(i).toggleClass('catalog-item_content_active');
              $('.catalog-item_list').eq(i).toggleClass('catalog-item_list_active');
        });
    });
    $('[data-modal=consultation]').on('click', function() {
        $('.overlay, #consultation').fadeIn('slow');
    });
    $('.modal_close').on('click', function() {
        $('.overlay, #consultation, #thanks, #order').fadeOut('slow')
    });
    $('.button_mini').each(function(i){
        $(this).on('click', function(){
            $('#order .modal_descr').text($('.catalog-item_subtitle').eq(i).text());
            $('.overlay, #order').fadeIn('slow');
        });
    });
    $('input[name=phone]').mask("+7 (999) 999-99-99")
    function validateForms(form){
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
                    minlength: jQuery.validator.format("Введите {0} символа!")
                  },
                phone: "Пожалуйста, введите свой номер телефона",
                email: {
                  required: "Пожалуйста, введите свою почту",
                  email: "Неправильно введен адрес почты"
                }
            }
        });
    };
    $('form').submit(function(e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "mailer/smart.php",
            data: $(this).serialize()
        }).done(function() {
            $(this).find("input").val("");
            $('#consultation, #order').fadeOut();
            $('.overlay, #thanks').fadeIn('slow');

            $('form').trigger('reset');
        });
        return false;
    });
})