$(function () {
    'use strict';
    TplEventGeneral.init();
});
const TplEventGeneral = {
    init: function () {
        Main_Event.init();
        Index_Event.init();
        Order_Event.init();
        Product_Event.init();
        News_Event.init();
        Album_Event.init();
        User_Event.init();
        Map_Event.init();
    },
}

const Main_Event = {
    init: function () {}
}
const Index_Event = {
    init: function () {
        this.homeEvent();
        this.homeCountDown();
        this.homeSlide();
        this.homeTab();
    },
    homeEvent:function () {
        $('.cat_prd').click(function (e) {
            e.preventDefault();
            $('.menu_cat').toggle();
            $('.member_menu').hide();
            $('body').toggleClass('open-menu-cat');
        });
        $('.member').click(function (e) {
            e.preventDefault();
            $('.member_menu').toggle();
            $('.menu_cat').hide();
            $('body').toggleClass('open-menu-cat');
        });
        $(".categories a").click(function () {
            $(".categories a").removeClass("active");
            $(this).addClass("active");
        });
        $(document).on('click', '.btn-login', function(e) {
            e.preventDefault();
            $('.layout-modal').hide();
            $('.layout-login').show();
        })

        $(document).on('click', '.modal-member-tab', function(e) {
            e.preventDefault();
            let tab = $(this).attr('data');
            $('.layout-modal').hide();
            $('.layout-' + tab).show();
        });
    },
    homeCountDown: function () {
        $(".count-down").each(function (e) {
            countdowwn($(this));
        });
        function countdowwn(element) {
            let x = setInterval(function () {
                let end = new Date(element.attr('data-time-end')).getTime();
                let now = new Date().getTime();
                let distance = end - now;

                let days = Math.floor(distance / (1000 * 60 * 60 * 24));
                let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                let seconds = Math.floor((distance % (1000 * 60)) / 1000);

                element.html(`
            <span>${days}</span> Ngày
            :
            <span>${hours}</span>
            :
            <span>${minutes}</span>
            :
            <span>${seconds}</span>
        `);

                if (distance < 0) {
                    clearInterval(x), element.html("Đã hết khuyến mại")
                };
            }, 1000);
        }
    },
    homeSlide: function () {
        if($('.banner-slide').length){
            $('.banner-slide').not('.slick-initialized').slick({
                lazyLoad: 'ondemand',
                slidesToShow: 1,
                slidesToScroll: 1,
                infinity: true,
                dots: true,
                arrows: true,
                fade: false
            });
            $('.banner-slide .slick-next').empty().append('<i class="fal fa-chevron-right"></i>');
            $('.banner-slide .slick-prev').empty().append('<i class="fal fa-chevron-left"></i>');
        }
        let slidesToShow = 3;
        if($(window).width() < 1100) {
            slidesToShow = 2;
        }
        let totalItems = $('.section-sale-owl a').length;
        if($('.section-sale-owl').length && totalItems >= 6){
            $('.section-sale-owl').not('.slick-initialized').slick({
                lazyLoad: 'ondemand',
                slidesToShow: slidesToShow,
                slidesToScroll: 1,
                infinity: true,
                dots: true,
                arrows: true,
                fade: false,
                centerPadding: "40px",
                rows: 2,
                respondTo: 'slider',
                loop: false,
            });
            $('.section-sale-owl .slick-next').empty().append('<i class="fal fa-chevron-right"></i>');
            $('.owl-flashsale .slick-prev').empty().append('<i class="fal fa-chevron-left"></i>');
        }
        if($('#owl-tiktok').length){
            $('#owl-tiktok').not('.slick-initialized').slick({
                lazyLoad: 'ondemand',
                slidesToShow: 1,
                slidesToScroll: 1,
                variableWidth: true,
                infinity: true,
                centerPadding: '80px',
                dots: true,
                arrows: true,
                fade: false,
                respondTo: 'slider',
                loop: true,
            });
            $('#owl-tiktok .slick-next').empty().append('<i class="fal fa-chevron-right"></i>');
            $('#owl-tiktok .slick-prev').empty().append('<i class="fal fa-chevron-left"></i>');
        }
    },
    homeTab: function () {
        $(window).scroll(function () {
            if ($(this).scrollTop() > 5) {
                $('.back_top').fadeIn();
            } else {
                $('.back_top').fadeOut();
            }
        });
        $('.back_top').click(function (event) {
            $('html,body').animate({scrollTop: 0}, 1000);
        });

        const memberModal = new bootstrap.Modal(document.getElementById("memberModal"), {});
        $(document).on('click', '.btn-login', function(e) {
            e.preventDefault();
            $('.layout-modal').hide();
            $('.layout-login').show();
            memberModal.show()
        });
        $(document).on('click', '.btn-register', function(e) {
            e.preventDefault();
            $('.layout-modal').hide();
            $('.layout-register-user').show();
            memberModal.show()
        })

        $(document).on('click', '.modal-member-tab', function(e) {
            e.preventDefault();
            let tab = $(this).attr('data');
            $('.layout-modal').hide();
            $('.layout-' + tab).show();
        });
        $('.toggle-password').click(function(e) {
            e.preventDefault();
            if ($(this).prev('input').attr('type') === 'text') {
                $(this).prev('input').attr('type', 'password');
                $(this).find('svg:nth-child(2)').hide()
                $(this).find('svg:nth-child(1)').show()
            } else {
                $(this).prev('input').attr('type', 'text');
                $(this).find('svg:nth-child(2)').show()
                $(this).find('svg:nth-child(1)').hide()
            }
        });
    }
}
const Product_Event = {
    init: function () {
        this.promotionSlideEvent();
        this.productDetailEvent();
        this.categoryEvent();
    },
    categoryEvent:function () {
        $(".priceFilter").on("click", function () {
            // var name = $(this).find('input').attr('data-link');
            window.location.href = $(this).find('input').attr('value');
        })
    },
    promotionSlideEvent: function () {
        let slidesToShow = 5;
        if($(window).width() < 1100) {
            slidesToShow = 2;
        }
        if($('.product-gallery__thumbs').length){
            $('.product-gallery__thumbs').not('.slick-initialized').slick({
                slidesToShow: slidesToShow,
                variableWidth: false,
                infinity: true,
                centerPadding: '80px',
                dots: false,
                arrows: true,
                fade: false,
                respondTo: 'slider',
                loop: true,
            });
            $('.section-categories .slick-next').empty().append('<i class="fal fa-chevron-right"></i>');
            $('.section-categories .slick-prev').empty().append('<i class="fal fa-chevron-left"></i>');
        }
    },
    productDetailEvent: function () {
        if($('.slider-for').length){
            $('.slider-for').slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: false,
                fade: false,
                asNavFor: '.slider-nav'
            }).on('afterChange', function(event, slick, currentSlide){
                // if (screen.width > 1024) {
                //     let element = $('.slider-for .slick-slide.slick-current.slick-active img');
                //     let src = element.attr('src')
                //     let zoom = element.attr('data-zoom-image')
                //
                //     // $('#ez-image').attr('src', src).attr('data-zoom-image', zoom).ezPlus();
                //
                //     let ez = $('#ez-image').data('ezPlus');
                //
                //     ez.swaptheimage(src, zoom);
                // }
            });
        }
        if($('.slider-nav').length){
            $('.slider-nav').slick({
                slidesToShow: 5,
                slidesToScroll: 1,
                asNavFor: '.slider-for',
                margin: 1,
                dots: false,
                arrows: true,
                centerMode: false,
                focusOnSelect: true,
                vertical: true,
                verticalSwiping: true,
                prevArrow: '<button class="slick-prev"><svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15 7.5L10 12.5L5 7.5" stroke="white" stroke-linecap="round" stroke-linejoin="round"/></svg></button>',
                nextArrow: '<button class="slick-next"><svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15 12.5L10 7.5L5 12.5" stroke="white" stroke-linecap="round" stroke-linejoin="round"/></svg></button>',
                responsive: [
                    {
                        breakpoint: 500,
                        settings: {
                            vertical: false,
                            verticalSwiping: false,
                        }
                    }
                ]
            });

        }
        $('.btn-more-less').click(function() {
            $(this).toggleClass('less');
            $('.description-main').toggleClass('less');
        })

        $(".plus").on("click", function () {
            let oldValue = $(this).prev('input').val();
            oldValue = oldValue ? oldValue : 1;
            let newVal = parseFloat(oldValue) + 1;
            $(this).prev('input').val(newVal);
        });
        $(".subtract").on("click", function () {
            let oldValue = $(this).next('input').val();
            oldValue = oldValue > 1 ? parseFloat(oldValue) : 2;
            let newVal = oldValue - 1;
            $(this).next('input').val(newVal);
        });
    }
}
const Order_Event = {
    init: function () {
        this.dropDownEvent();
    },
    dropDownEvent: function () {
        if($('.select2').length){
            $('.select2').each(function() {
                let $parent = $(this).parent();
                $(this).select2({
                    dropdownParent: $parent
                }).trigger('change');
            });
        }
    }
}
const News_Event = {
    init: function () {}
}
const Album_Event = {
    init: function () {
        this.slideAlbum();
    },
    slideAlbum:function () {
        if($('.list-suggest-album').length){
            $('.list-suggest-album').not('.slick-initialized').slick({
                slidesToShow: 3,
                slidesToScroll: 1,
                variableWidth: true,
                infinity: true,
                centerPadding: '80px',
                dots: false,
                arrows: true,
                fade: false,
                respondTo: 'slider',
                loop: true,
            });
            $('.list-suggest-album .slick-next').empty().append('<i class="fal fa-chevron-right"></i>');
            $('.list-suggest-album .slick-prev').empty().append('<i class="fal fa-chevron-left"></i>');
        }
    }

}
const User_Event = {
    init: function () {}
}
const Map_Event = {
    init: function () {}
}

