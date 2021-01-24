$(function () {


	/*isotope*/
	jQuery(".isotope-grid").each(function () {
		var url = window.location.search;
		if (url.indexOf("?") != -1) {
			var str = url.substr(1);
			strs = str.split("&");
			for (i = 0; i < strs.length; i++) {
				if (jQuery(this).attr("id") == strs[i].split("=")[0]) {
					$(this).find(".isotope-group a").eq(strs[i].split("=")[1] - 1).addClass("active").siblings().removeClass("active");
				}
			}
		}
		var a = jQuery(this),
			e = a.find(".isotope-main"),
			el = e.find(".isotope-item"),
			response = 0,
			item = a.data("item") ? a.data("item") : 4,
			szie = {
				MobileSmall: [item - 4, 1],
				Mobile: [479, Math.max(item - 3, 1)],
				Tablet: [768, Math.max(item - 2, Math.min(2, item))],
				DesktopSmall: [979, Math.max(item - 1, Math.min(2, item))],
				Desktop: [1199, Math.max(item - 1, Math.min(2, item))]
			},
			once = true,
			currentpage = 0,
			endData = false;

		if (item == 5 || item == 6) {
			szie = {
				MobileSmall: [1, 1],
				Mobile: [479, 1],
				Tablet: [768, 2],
				DesktopSmall: [979, Math.max(item - 2, Math.min(2, item))],
				Desktop: [1199, Math.max(item - 1, Math.min(2, item))]
			};
		}

		for (i in szie) {
			if (a.data(i) != undefined) {
				szie[i][1] = a.data(i);
			} else if (a.data(i.toLowerCase()) != undefined) {
				szie[i][1] = a.data(i.toLowerCase());
			}
		}

		function responsive(list, newitem) {
			w = $(window).width();
			f = response;
			if (w <= szie.MobileSmall[0]) {
				response = szie.MobileSmall[1];
			} else if (w <= szie.Mobile[0]) {
				response = szie.Mobile[1];
			} else if (w <= szie.Tablet[0]) {
				response = szie.Tablet[1];
			} else if (w <= szie.DesktopSmall[0]) {
				response = szie.DesktopSmall[1];
			} else if (w <= szie.Desktop[0]) {
				response = szie.Desktop[1];
			} else {
				response = item;
			}
			if (f != response || newitem) {
				list.each(function () {
					$(this).data("zoom") ? $(this).css("width", Math.min((100 / response) * $(this).data("zoom"), 100) + "%") : $(this).css("width", 100 / response + "%");
				});
			}
		}

		var filterValue = false;
		a.find(".isotope-group").each(function () {
			filterValue += $(this).find(".active").attr('data-filter') != "*" && $(this).find(".active").attr('data-filter') ? $(this).find(".active").attr('data-filter') : false;
		});
		filterValue = filterValue ? filterValue : "*";

		var sortValue = a.find('.sort-box .active').attr('href') ? a.find('.sort-box .active').attr('href').slice(1) : false;

		var ascValue = a.find('.desc-asc .active').attr("data-sort") ? a.find('.desc-asc .active').attr("data-sort") : false;

		responsive(el);


		function isotopegrid() {
			jQuery(window).resize(function () {
				responsive(el);
			});
			el.each(function (index, element) {
				if (!$(this).data("zoom")) {
					$(this).addClass("standard-size");
					return false;
				}
			});


			e.isotope({
				getSortData: {
					name: function (itemElem) {
						return jQuery(itemElem).find('.name').text().toLowerCase();
					},
					author: function (itemElem) {
						return jQuery(itemElem).find('.author').text().toLowerCase();
					},
					date: function (itemElem) {
						return parseInt(jQuery(itemElem).find('.date').attr("data-date"));
					},
					price: function (itemElem) {
						return parseFloat(jQuery(itemElem).find('.price').attr("data-price"));
					}
				},
				sortBy: sortValue,
				sortAscending: 'asc' == ascValue,
				filter: filterValue,
				percentPosition: true,
				masonry: {
					columnWidth: '.standard-size'
				}

			});

			a.children(".loading").remove();
			a.removeClass("loading");

			el.css({
				"opacity": "0"
			}).animate({
				"opacity": "1"
			});

			a.find(".isotope-group").on('click', 'a', function () {
				var filterValue = "";
				jQuery(this).addClass("active").siblings().removeClass("active");
				a.find(".isotope-group").each(function () {
					filterValue += jQuery(this).find(".active").attr('data-filter') != "*" ? jQuery(this).find(".active").attr('data-filter') : "";
				});
				e.isotope({
					filter: filterValue ? filterValue : "*"
				});
				if (jQuery(this).parent().siblings(".active_filter").length != 0) {
					jQuery(this).parent().siblings(".active_filter").html(jQuery(this).html());
					jQuery(this).parent().slideUp(200);
				}
				return false;
			});

			a.find(".isotope-group-select").on("change", function () {
				var se = $(this);
				var filterValue = "";
				a.find(".isotope-group-select").each(function (index) {
					a.find(".isotope-group").eq(index).find('a[data-filter="' + $(this).val() + '"]').addClass("active").siblings().removeClass("active");
					filterValue += $(this).val() != "*" ? $(this).val() : "";
				});
				e.isotope({
					filter: se.val()
				});
			});

			a.find('.sort-box a').click(function () {
				var sortName = jQuery(this).attr('href').slice(1);
				jQuery(this).addClass("active").siblings().removeClass("active");
				e.isotope({
					sortBy: sortName
				});
				if (jQuery(this).parent().siblings(".active_filter").length != 0) {
					jQuery(this).parent().siblings(".active_filter").html(jQuery(this).html());
					jQuery(this).parent().slideUp(200);
				}
				return false;
			});

			a.find('.desc-asc a').click(function () {
				var sorts = jQuery(this).attr("data-sort");
				jQuery(this).addClass("active").siblings().removeClass("active");
				e.isotope({
					sortAscending: 'asc' == sorts
				});
				if (jQuery(this).parent().siblings(".active_filter").length != 0) {
					jQuery(this).parent().siblings(".active_filter").html(jQuery(this).html());

					jQuery(this).parent().slideUp(200);
				}
				return false;
			});

			a.find('.filter-switch').click(function () {
				$(this).siblings("a").each(function () {
					console.log($(this).hasClass("active"))
					if (!$(this).hasClass("active")) {
						$(this).click();
						return false;
					}
				});
			});

			a.find(".active_filter").each(function () {
				jQuery(this).on("click", function () {
					jQuery(this).siblings(".filter_list").slideToggle(100);
				})
				jQuery(this).parent().on("mouseleave", function () {
					jQuery(this).find(".filter_list").slideUp(200);
				})
			});




			if (a.hasClass("isotope-ajax") && a.data("ajaxurl")) {

				var requestData = true;

				var ajaxDate = function () {
					requestData = false;
					a.find(".ajax-more").addClass("loading");
					$.ajax({
						type: "GET",
						url: a.data("ajaxurl"),
						data: "",
						dataType: "html",
						success: function (data) {
							var items = $(data);
							ImgLoad(function () {
								responsive(items, true);
								e.append(items).isotope('appended', items);
								a.find(".ajax-more").removeClass("loading");
								currentpage++;
								requestData = true;

								if (endData) {
									//   a.find(".isotope_meassage").html("");  
									a.find(".ajax-more").hide();
								}


							}, items);
						}
					});
				};

				a.find(".ajax-more").on("click", function () {
					if (requestData) {
						ajaxDate();
					}
				});
				if (a.data("infinity-scroll")) {

					var maxpage = a.data("max-scroll-page") ? a.data("max-scroll-page") : 5;


					$(window).scroll(function () {
						if ($(window).scrollTop() + $(window).height() > e.offset().top + e.innerHeight() && requestData) {
							if (currentpage < maxpage) {
								ajaxDate();
							}
						}

					});


				}

			}

			once = false;
		}

		if (a.find(".owl-carousel").length === 0) {

			ImgLoad(function () {
				isotopegrid();
			}, e);

		} else {
			c = e.find(".owl-carousel").last();
			c.on("refreshed.owl.carousel", function () {
				if (once) {
					setTimeout(function () {
						isotopegrid();
					}, 300);
				} else {
					e.isotope();
				}
			});
		}
	});
})