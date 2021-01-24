

$(document).ready(function() {

    /*imgbg cover*/
    $(".imgbg-cover").each(function(index, element) {
        $(this).css("background-image", "url(\"" + $(this).children("img").eq(0).remove().attr("src") + "\")");
    });

    /*min-window-height*/
    $(".min-window-height").each(function(index, element) {
        $(this).css("min-height", $(window).height());
    });
    $(window).resize(function() {
        $(".min-window-height").each(function(index, element) {
            $(this).css("min-height", $(window).height());
        });
    });

    /*window-height*/
    $(".window-height").each(function(index, element) {
        $(this).css("height", $(window).height());
    });
    $(window).resize(function() {
        $(".window-height").each(function(index, element) {
            $(this).css("height", $(window).height());
        });
    });
    

    /*fixed footer*/
    $(".fixed_footer").each(function() {
        var e = $(this);
        e.wrap("<div class=\"fixed_footer_clone\"><div class=\"fixed_footer_bottom\"></div></div>");
        var wh = $(window).height(),
            parent = e.parent().parent(),
            parent2 = e.parent();

        parent.height(e.innerHeight());

        $(window).resize(function() {
            parent.height(e.innerHeight());
            e.css("max-height", wh = $(window).height());
            wh = $(window).height();
            parent2.height($(window).scrollTop() + wh - parent.offset().top);
        })
        $(window).load(function() {
            parent.height(e.innerHeight());
            e.css("max-height", wh = $(window).height());
            wh = $(window).height();
            parent2.height($(window).scrollTop() + wh - parent.offset().top);
        })
        e.addClass("active");
        e.css("max-height", wh = $(window).height());
        parent2.height($(window).scrollTop() + wh - parent.offset().top);

        $(window).scroll(function() {
            parent2.height($(window).scrollTop() + wh - parent.offset().top)
        })

    });

    $(".dg-bg-roll-left").each(function() {
        var e = $(this);
        e.css("background-position-x", e.width())
        $(window).resize(function() {
            e.css("background-position-x", e.width())
        })
    });
    $(".dg-bg-roll-right").each(function() {
        var e = $(this);
        e.css("background-position-x", -e.width())
        $(window).resize(function() {
            e.css("background-position-x", -e.width())
        })
    });
    $(".dg-bg-roll-top").each(function() {
        var e = $(this);
        e.css("background-position-y", e.height())
        $(window).resize(function() {
            e.css("background-position-y", e.height())
        })
    });
    $(".dg-bg-roll-bottom").each(function() {
        var e = $(this);

        e.css("background-position-y", -e.height())
        $(window).resize(function() {
            e.css("background-position-y", -e.height())
        })
    });



    /*blog categories*/
    $(".widget-categories .current,.portfolio-categories .current").show();
    $(".widget-categories li,.portfolio-categories li").each(function() {
        var e = $(this);
        if (e.children("ul").length > 0) {
            if (e.hasClass("current")) {
                e.addClass("active")
            }
            e.append("<span class=\"arrow\"></span> ")
            e.children(".arrow").on("click", function() {
                e.children("ul").stop().slideToggle().siblings().children("ul").slideUp();
                e.siblings().children("ul").stop().slideUp();

                e.toggleClass("active")
                e.siblings().removeClass("active")
            })
        }
    })

    /*search-popup*/
    $(".search-popup-box").each(function() {
        var e = $(this);
        e.children(".icon").on("click", function() {
            $(this).toggleClass("active");
            e.children(".popup-content").toggleClass("active");
            $("html").toggleClass("search-popup-box-active");
        })
        e.children(".popup-content").children(".popup-close").on("click", function() {
            e.children(".popup-content").removeClass("active");
            e.children(".icon").removeClass("active");
            $("html").removeClass("search-popup-box-active");
        })
    });
    
})

//jQuery(window).load(function() {
//    var e = $(".roll-menu");
//    if (e.length !== 0) {
//        top = e.offset().top + e.height();
//        e.rollmenu({
//            MTop: e.data("top"),
//            noroll: 992
//        });
//    }
//    //	e.roll-menu({ MTop:e.offset().top-1});
//});

/*mega menu*/
jQuery(document).ready(function ($) {


    if ($("#dng-megamenu").length !== 0) {
        $("#dng-megamenu-mobile").html($("#dng-megamenu").html());
    } else if ($("header .side-panel-menu").length !== 0) {
        $("#dng-megamenu-mobile").html($("header .side-panel-menu").html());
    }


    $("#dng-megamenu").each(function (index, element) {
        var e = $(this);
        var dnngomegamenu_default = {
            slide_speed: 200,
            delay_disappear: 500,
            popUp: "vertical", //level
            delay_show: 150,
            direction: "ltr", //rtl ltr
            megamenuwidth: "box", //full box
            WidthBoxClassName: "#megamenuWidthBox"
        }

        for (i in dnngomegamenu_default) {
            if (e.data(i) !== undefined) {
                dnngomegamenu_default[i] = e.data(i);
            } else if (e.data(i.toLowerCase()) !== undefined) {
                dnngomegamenu_default[i] = e.data(i.toLowerCase());
            }
        }
        e.dnngomegamenu(dnngomegamenu_default);

        $("li.dir>a").click(function(e) {e.preventDefault()});

        /*mobile-search*/
        animationShow({
            "#ico_search": ".mobile-search",
            //	"#ico-menu-mobile" : "#dng-megamenu-mobile"
        });
    });
    $("#ico-menu-mobile").on("click", function () {
        $(this).toggleClass("active");
        $("#dng-megamenu-mobile").stop().slideToggle(400);
        $("html").toggleClass("overflow-hidden")
    })
    $("#dng-megamenu-mobile .dir").each(function () {
        var dropdown = $('<span class="dropdown-submenu"></span>');
        dropdown.prependTo($(this));
        $(this).find('a').on("click", function (e) {
            if ($(this).parent('li').hasClass('dir')) {
                var dropdownCarret = $(this).siblings(".dropdown-submenu");
                $(this).siblings(".menuslide,.sub-menu").stop().slideToggle();
                dropdownCarret.toggleClass("active");
                if (dropdownCarret.hasClass("active")) {
                    $(this).siblings(".dir").children(".menuslide,.sub-menu").stop().slideUp();
                    $(this).siblings(".dir").children(".dropdown-submenu").removeClass("active");
                }
                e.preventDefault();
                e.stopPropagation();
            }
        });
    });

});


/*imagebox*/
jQuery(document).ready(function($) {
    $(".blog-grid-list-main .list-video .responsive-video").each(function() {
        var r = ($(".list-image").eq(0).height() / $(".list-image").eq(0).width()) * 100;
        $(this).css("padding-bottom", r + "%");
    });
});


jQuery(document).ready(function($) {
    $(".page-title-arrow").on("click", function() {
        jQuery('body,html').stop().animate({
            scrollTop: $(this).parents(".pagetitleBox").height() + $(this).parents(".pagetitleBox").offset().top
        }, 800);
    })
});
jQuery(document).ready(function($) {
    $(".side-panel-btn").each(function(index, element) {
        var e = $(this),
            pane = e.data("panel") ? $(e.data("panel")) : ".side-panel",
            box = e.data("target") ? $(e.data("target")) : "body",
            c = e.data("class") ? e.data("class") : "";
        if (c) {
            $("html").addClass("side-panel-has")
        }

        pane.appendTo(box);
        e.on("click", function() {
            $("html").toggleClass(c);
            pane.toggleClass("side-panel-active");
            e.toggleClass("active");
            if (c) {
                $("html").addClass("overflow-x").delay(500).queue(function() {
                    $("html").removeClass("overflow-x");
                    $(this).dequeue();
                })
            }
        })
        pane.find(".close-panel").on("click", function() {
            $("html").toggleClass(c);
            pane.toggleClass("side-panel-active");
            e.toggleClass("active");
            if (c) {
                $("html").addClass("overflow-x").delay(500).queue(function() {
                    $("html").removeClass("overflow-x");
                    $(this).dequeue();
                })
            }
        })

    });

});

/*Widgets*/
jQuery(document).ready(function($) {
    if ($('#datetimepicker12').length > 0) {
        $('#datetimepicker12').datetimepicker({
            inline: true,
            sideBySide: true,
            format: 'DD/MM/YYYY'
        });
    }
    var $flickr_widget = $('.widget-flickr');
    if ($flickr_widget.length > 0) {
        $flickr_widget.each(function() {
            var $elem = $(this),
                $flickrId = $elem.attr('data-flickr-id'),
                $flickrImages = $elem.attr('data-flickr-images');
            console.log($flickrId)
            console.log($flickrImages)

            $flickr_widget.jflickrfeed({
                limit: $flickrImages,
                qstrings: {
                    id: $flickrId
                },
                itemTemplate: '<ul>' + '<li>' + '<a href="{{image}}" title="{{title}}"><img src="{{image_s}}" alt="{{title}}" /></a><span class="bg bg-accent"></span>' + '</li>' + '</ul>'
            }, function() {
                $elem.magnificPopup({
                    delegate: 'a',
                    type: 'image',
                    gallery: {
                        enabled: true
                    }
                });
            });
        });
    }
    $("#comment-form").submit(function(e) {
        $.post('/Comments/Post', $('#comment-form').serialize());
        $('#comment-form')[0].reset();
        e.preventDefault();
    });
    $(".reply-btn a").click(function(e) {
        $.get('/Ajax/ConfirmComment/' + $(this).data("commentId"), function () {
            location.reload();
        });
        e.preventDefault();
    });
    $(".remove-btn a").click(function(e) {
        $.get('/Ajax/RemoveComment/' + $(this).data("commentId"), function () {
            location.reload();
        });
        e.preventDefault();
    });
});

/*back to top*/
jQuery('#to-top').on("click",function () { 
  jQuery('body,html').stop().animate({
    scrollTop : 0
  }, 800);
});	
var backtop = function () {
  Math.max.call(window.scrollTop, document.body.scrollTop, document.documentElement.scrollTop) > 245 ? jQuery('#to-top').fadeIn(300) : jQuery('#to-top').fadeOut(300)
}
$(window).load(function () {
  backtop();
})
$(window).scroll(function () {
  backtop();
})






$(function () {
    $(".home06-imglist .cont p").each(function () {
        $clamp(this, { clamp: "125px" });
    })


    $('.lazy').Lazy();
})
