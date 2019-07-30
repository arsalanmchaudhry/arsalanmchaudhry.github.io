var urlRoutes = {
	forward:{
		".work-list":"work",
		".about":"about",
		".contact":"contact"
	},
	reverse:{
		"work":".work-list",
		"about":".about",
		"contact":".contact"
	}
};

var ContentRevealer = function(clickableElement){
	var contentRevealer = {};

	contentRevealer.init = function(){
		$(document).on('click', '.main-container  .navigation li', function (event) {
			event.preventDefault();
			if(document.body.clientWidth > 768){
				var target = $(this).data("target");
				contentRevealer.reveal(target);
			}
		});
		$(document).on('click', '.hide' , function (event) {
			event.preventDefault();
			var target = $(this).parent('.main-container  .sliding-content-container');
			contentRevealer.hide(target);
		});

		// SOLOMON(click on logo takes back to original state)
		$(document).on('click', 'h1', function(){
			var target_all = $('.main-container  .sliding-content-container');
			contentRevealer.hide(target_all);
			$('.slideshow').removeClass('visible');
			$('.slideshow.home').addClass('visible');
		});
	};
	contentRevealer.reveal = function(target){
		if($('.main-container  .sliding-content-container').hasClass('open')){
			var currentlyOpen = $('.main-container  .sliding-content-container.open');
			$(target).addClass('open');
			window.location.hash = urlRoutes.forward[target];
			$(target).animate({"margin-left":"230px"},300,function(){
				currentlyOpen.animate({"margin-left":"-177px"});
				currentlyOpen.removeClass('open');
				if(!$('.main-container  .sliding-content-container').hasClass('open')){
				$('.main-container  .slideshow').animate({"margin-left":"115px"},300);
				window.location.hash = "";
				}
			});
		}else{
			$(target).addClass('open');
			$(target).animate({"margin-left":"230px"},300);
			$('.main-container  .slideshow').animate({"margin-left":"300px"},300);
			window.location.hash = urlRoutes.forward[target];
		}
	};

	contentRevealer.hide = function(target){
		window.location.hash = "";
		$(target).removeClass('open');
		$(target).animate({"margin-left":"-177px"},300);
		if(!$('.main-container .work-list').hasClass('open') && !$(target).hasClass('open')){
			$('.main-container  .slideshow').animate({"margin-left":"115px"},300);
		}
	};

	return contentRevealer;
};

var contentRevealer = ContentRevealer('#work');
contentRevealer.init();

var WorkInfoReveal = function(){
	var workInfoReveal = {};

	workInfoReveal.init = function(){
		$(document).on('click', '.main-container  .work-item', function () {
			var target = $(this).data("target");
			$(target).addClass('open');
			$(target).animate({"margin-left":"230px"},300);
		});
		$(document).on('click', '.main-container  .back a' , function () {
			var target = $(this).parent('.sliding-content-container');
			$(target).addClass('open');
			$(target).animate({"margin-left":"230px"},300);
		});
	};
	return workInfoReveal;
};


var WorkItemOverlay = function(){
	workItemOverlay = {};
	workItemOverlay.init = function(){
		$('.work-item').hover(function(){
			$('.work-item__overlay').removeClass('overlay');
			var overlay = $(this).children('.work-item__overlay');
			var info = $(this).children('.work-item__info');
			workItemOverlay.fadeIn(overlay,info);
		},function(){
			$('.work-item__overlay').removeClass('overlay');
		});
	};
	workItemOverlay.fadeIn = function(overlay){
		overlay.toggleClass('overlay');
	};

	return workItemOverlay;
}
var workItemOverlay = WorkItemOverlay();
workItemOverlay.init();

var Slider = function(target){
	var slider = {},
	sliderContainer = $('#'+target),
	sliderElements = sliderContainer.find('ul'),
	next = sliderContainer.find('.next');

	slider.init = function(){
		sliderContainer.find('.right').on('click',function(){
			slider.toggle('right');
		});
		sliderContainer.find('.left').on('click',function(){
			slider.toggle('left');
		});
	};

	slider.toggle = function(direction){
		var currentSlide = sliderElements.find('.active-slide'),
		nextSlide;
		if(direction == 'left'){
			nextSlide = currentSlide.next();
			if(nextSlide.length){
				currentSlide.removeClass('active-slide');
				nextSlide.addClass('active-slide');
			}else{
				currentSlide.removeClass('active-slide');
				sliderElements.children().first().addClass('active-slide');
			}
		}else{
			nextSlide = currentSlide.prev();
			if(nextSlide.length){
				currentSlide.removeClass('active-slide');
				nextSlide.addClass('active-slide');
			}else{
				currentSlide.removeClass('active-slide');
				sliderElements.children().last().addClass('active-slide');
			}
		}
	};

	return slider;
};

var slider_1 = Slider('slider-1');
slider_1.init();

var slider_2 = Slider('slider-2');
slider_2.init();

var slider_3 = Slider('slider-3');
slider_3.init();

var slider_4 = Slider('slider-4');
slider_4.init();

var slider_5 = Slider('slider-5');
slider_5.init();

var slider_6 = Slider('slider-6');
slider_6.init();

var ToggleSlideshow = function(){
	toggleSlideshow = {};

	toggleSlideshow.init = function(){
		$(".main-container  .work-item").on("click",function(){
			var target = $(this).data("slideshow-target");
			toggleSlideshow.toggle(target);
		});
	};

	toggleSlideshow.toggle = function(target){
		$('.slideshow').removeClass('visible');
		$('.slideshow.'+target).addClass('visible');
		var bg_color = $('.slideshow.'+target).css("background-color");
		$(".logo_border").css("background-color", bg_color);

	};

	return toggleSlideshow;
};
toggleSlideShow  = ToggleSlideshow();
toggleSlideshow.init();

var NavigationHighlight = function(){
	navigationHighlight = {};

	navigationHighlight.init = function(){
		$(document).on('click','.navigation li a',function(){
			if($(this).hasClass('active-link')){
				$(this).removeClass('active-link');
			}else{
				$('.navigation li a').removeClass('active-link');
				$(this).addClass('active-link');
			}
		});

		$(document).on('click','.close-button',function(){
			$('.navigation li a').removeClass('active-link');
		});
	}
	return navigationHighlight;
}

var navigationHighlight  = NavigationHighlight();
navigationHighlight.init();

var MobileSlidingContent = function(){
	mobileSlidingContent = {};

	mobileSlidingContent.init = function(){
		$(document).on('click','.work-item',function(){
			var currentScrollPosition = $(window).scrollTop()+82;
			var target = $(this).data('target');
			$('.sliding-content').css("top",currentScrollPosition);
			$('div[data-target='+target+']').animate({"margin-left":"0%"},{
		      duration: 340,
		      easing: 'swing',
		      complete: function() {
		      	window.scrollTo(0,0);
		      	$('.sliding-content').css("top","82");
		      	$('.work-list').hide();
		      },
		      queue: false
		    });
		});
		$(document).on('click','.go-back',function(){
			$('.work-list').show();
			$('.sliding-content').animate({"margin-left":"-100%"},340);
		});

	}
	return mobileSlidingContent;
}

var mobileSlidingContent  = MobileSlidingContent();
mobileSlidingContent.init();

var MobileMenu = function(){
	mobileMenu = {};

	mobileMenu.init = function(){
		$(document).on('click','#mMenu img',function(){
			var menuContent = $(this).parents().find('ul');
			$(menuContent).slideToggle(280);
		});
	}
	return mobileMenu;
}

var mobileMenu  = MobileMenu();
mobileMenu.init();

$(document).on('click','#mMenu #about, #mMenu #contact',function(){
	$("html, body").animate({ scrollTop: $(document).height() }, "slow");
  	return false;
});

$(window).on('resize load',function(){
	var phoneImage = $('.iphone-img');
	var phoneVideo = $('.iphone-video');
	var height = phoneImage.height();
	var width = phoneImage.width()*0.847;
	var offset = phoneImage.offset();
	var offsetLeft = offset.left+(width*0.096);
	phoneVideo.height(height);
	phoneVideo.width(width);
	phoneVideo.offset({top:offset.top,left:offsetLeft});
});

$(window).on('resize load',function(){
	var padImage = $('.ipadvid-img');
	var padVideo = $('.ipad-video');
	var height = padImage.height();
	var width = padImage.width()*0.890;
	var offset = padImage.offset();
	var offsetLeft = offset.left+(width*0.062);
	padVideo.height(height);
	padVideo.width(width);
	padVideo.offset({top:offset.top,left:offsetLeft});
});

$(window).on('load',function(){
	if(window.location.hash){
		var currentUrl = urlRoutes.reverse[window.location.hash.substring(1)];
		contentRevealer.reveal(currentUrl);
	}
});

$('.scrollable-nav').perfectScrollbar({
  wheelSpeed: 12,
  minScrollbarLength: 30
});
