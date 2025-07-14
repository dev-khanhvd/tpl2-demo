$(function () {
    'use strict';
    TplEventGeneral.init();
});
const TplEventGeneral = {
    init: function () {
        Main_Event.init();
        AOS.init();
    },
};

const Main_Event = {
    init: function () {
        this.slideForAll();
        this.menuEvent();
        this.menuMobile();
        this.searchEvent();
        this.miniCart();
        this.footerEvent();
        this.popupContact();
    },
    slideForAll: function () {
        if($(".slick-callback").not('.slick-initialized').length > 0){
            $(".slick-callback").not('.slick-initialized').each(function(){
                let self = $(this),
                    obslick = {
                        autoplay: self.data('autoplay') || false,
                        infinite: self.data('infinite') || false,
                        dots: self.data('dots') || false,
                        slidesToShow: self.data('slides-md'),
                        slidesToScroll: self.data('slides-md-scroll'),
                        pauseOnHover: self.data('pauseonhover') || false,
                        autoplaySpeed: self.data('play-speed') || 4000,
                        speed: self.data('speed') || 500,
                        vertical: self.data('vertical') || false,
                        fade: self.data('fade') || false,
                        responsive: [
                            {
                                breakpoint: 1200,
                                settings: {
                                    slidesToShow: self.data('slides-tablet'),
                                    slidesToScroll: self.data('slides-sm-scroll')
                                },
                            },
                            {
                                breakpoint: 1024,
                                settings: {
                                    slidesToShow: self.data('slides-tablet'),
                                    slidesToScroll: self.data('slides-sm-scroll')
                                },
                            },
                            {
                                breakpoint: 767,
                                settings: {
                                    slidesToShow: self.data('slides-xs'),
                                    slidesToScroll: self.data('slides-xs-scroll'),
                                    vertical: self.data('vertical-mb') || false
                                },
                            },
                        ],
                        cssEase: self.data('cssease'),
                        rows: self.data('rows') || 1,
                        prevArrow: '<button type="button" class="slick-prev slick-arrow custom-style" aria-label="Previous"><i class="fa-light fa-angle-left"></i></button>',
                        nextArrow: '<button type="button" class="slick-next slick-arrow custom-style" aria-label="Next"><i class="fa-light fa-angle-right"></i></button>'
                    }
                if(self.hasClass("not-slick-mb")){
                    if($(window).width() > 767){
                        self.slick(obslick);
                    }
                }
                else{
                    self.slick(obslick);
                }
            });
        }
    },
    menuEvent: function () {
        if($(window).width() < 1024){
            $('body').on('click', '#js-click-menu', function(e){
                e.preventDefault();
                if($(this).hasClass('active')){
                    $('.header-bottom').removeClass('open');
                }else{
                    $('.header-bottom').addClass('open');
                }
                $(this).toggleClass('active');
                $('body').addClass('lock-scroll');
            });
            $('body').on('click', '.close-button button', function(e){
                e.preventDefault();
                $('.header-bottom').removeClass('open');
                $('.header-menu').removeClass('open open-sub');
                $('.header-menu-mega').hide();
                $('.header-menu-mega-item > a').removeClass('active');
                $('.header-menu-mega-sub').removeClass('open');
                $('.header-menu-mega-sub .back-menu > a').removeClass('active');
                $('.back-button').addClass('d-none');
                $('.header-icon-menu > a ').removeClass('active');
                $('body').removeClass('lock-scroll');
            });

            $('body').on('click','#js-click-search', function(e){
                e.preventDefault();
                if($(this).hasClass('active')){
                    $('.header-search').removeClass('open');
                }
                else{
                    $('.header-search').addClass('open');
                }
                $(this).toggleClass('active');
                $('body').addClass('lock-scroll');
            })
        }
    },
    menuMobile: function () {
        if($(window).width() < 1024){
            $('body').on('click', '.header-menu-list-item.has-child > a', function(e){
                e.preventDefault();
                $(this).toggleClass('active');
                $(this).siblings('.header-menu-mega').slideToggle(200);
            });
            $('body').on('click', '.header-menu-list-item.has-child > .wrap-group-menu i', function(e){
                e.preventDefault();
                $(this).parents('.wrap-group-menu').find('a').toggleClass('active');
                $(this).parents('.wrap-group-menu').siblings('.header-menu-mega').slideToggle(200);
            });
            $('body').on('click', '.header-menu-mega-item > a', function(e){
                e.preventDefault();
                if($(this).next().length > 0){
                    $('.back-button').removeClass('d-none');
                    $('.header-menu').addClass('open-sub');
                    $(this).siblings('.header-menu-mega-sub').addClass('open');
                    $(this).siblings('.header-menu-mega-sub').find('.back-menu > a').addClass('active');
                }else{
                    location.href=$(this).attr("href");
                }
            });
            $('body').on('click', '.header-menu-mega-item > .wrap-group-menu i', function(e){
                e.preventDefault();
                $('.back-button').removeClass('d-none');
                $('.header-menu').addClass('open-sub');
                $(this).parents('.wrap-group-menu').siblings('.header-menu-mega-sub').addClass('open');
                $(this).parents('.wrap-group-menu').siblings('.header-menu-mega-sub').find('.back-menu > a').addClass('active');
            });
            $('body').on('click', '.header-menu-btn .back-button button', function(e){
                $( ".back-menu > a.active" ).trigger( "click" );
            });
            $('body').on('click', '.back-menu > a.active', function(e){
                e.preventDefault();
                $('.back-button').addClass('d-none');
                $('.header-menu').removeClass('open-sub');
                $(this).parents('.header-menu-mega-sub').removeClass('open');
            });
        }
    },
    searchEvent:function () {
        $('body').click(function(evt) {
            var target = evt.target;
            if (target.id !== 'searchform-wrapper' && target.id !== 'inputSearchAuto') {
                $("#searchform-wrapper").hide();
            }
        });
        $('#inputSearchAuto').on('input', function(e) {
            if(e.target.value != '') {
                $('#searchform .btn-reset').removeClass('d-none');
            }
            else {
                $('#searchform .btn-reset').addClass('d-none');
            }
        });
        $('#searchform .btn-reset').on('click', function(){
            $(this).addClass('d-none');
            $('#inputSearchAuto').val('').blur().focus();
            $("#ajaxSearchPrResults").hide();
            $("#ajaxSearchArticleResults").hide();
            $('.resultsContent').html('');
            if($(window).width() < 1024){
                $('body').removeClass('lock-scroll');
                $('.header-search').removeClass('open');
            }
        });
        $('body').on('click', '.searchform-close', function(e){
            e.preventDefault();
            $('.header-search').removeClass('open');
            $('body').removeClass('lock-scroll');
        });
    },
    miniCart: function () {
        $(".header-main .header-actions-list .action-cart.allow-hover").on("mouseenter focusin", (function() {
            if ($('.action-cart .ajaxMinicart').length > 0){
                $(".action-cart .minicart-dropdown").addClass("show");
            }
        }));
        $(".header-main .header-actions-list .action-cart.allow-hover").on("mouseleave focusout", (function() {
            $(".action-cart .minicart-dropdown").removeClass("show");
        }));
        $(".header-main .header-actions-list .action-cart.allow-hover").on("touchstart click", (function(t) {
            $(".header-main .header-actions-list .action-cart.allow-hover").has(t.target).length <= 0 && $(".action-cart .minicart-dropdown").removeClass("show");
        }))
    },
    footerEvent: function () {
        $('.footer-item .title').click(function(e){
            e.preventDefault();
            if($(window).width() < 860){
                $(this).toggleClass('active').siblings('.content').slideToggle(400);
            }
        })
        $(document).on("click", ".button-social-contact button", function(e){
            e.preventDefault();
            $(this).parents('.button-social-contact').addClass('d-none');
            $('.list-social-chat').addClass('active');

            setTimeout(function(){
                $('.button-social-contact').removeClass('d-none');
                $('.list-social-chat').removeClass('active');
            },5000);
        });
        $(document).on("click", ".btn-close-bubble", function(e){
            e.preventDefault();
            $('.ctkm-bubble').addClass('d-none');
        });
    },
    popupContact: function(){
        setTimeout(function(){
            if(sessionStorage.mega_modal == null ){
                $('#contactModal').modal('show');
            }
        }, 5000);
        $(document).on('click','.linkbanner-modal-contact', function(){
            $('#contactModal').modal('hide');
            if(sessionStorage.mega_modal == null ){
                sessionStorage.mega_modal = 'show' ;
            }
        });
        $(document).on('click','.modal-contact .close', function(e){
            e.preventDefault();
            $('#contactModal').modal('hide');
            if(sessionStorage.mega_modal == null ){
                sessionStorage.mega_modal = 'show' ;
            }
        });
        $(".modal-contact").on('hidden.bs.modal', function(){
            if(sessionStorage.mega_modal == null ){
                sessionStorage.mega_modal = 'show' ;
            }
        });
    },


}