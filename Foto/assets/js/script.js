/*******************************************
*                                          *
*        Foto Theme by MakeTheWeb          *
*                                          *
*       (http://foto.maketheweb.pl)        *
*                                          *
********************************************/

$(document).ready(function(){

    $('article').each(function(e) {
    	if (permalink == true) {
	    	if ($('article#'+this.id+' .post-text img[alt="preview-image"]').length) {
		        var img = $('<img class="featured-img">');
				img.attr('src', $('article#'+this.id+' .post-text img[alt="preview-image"]').attr('src'));
				$(img).insertBefore('article#'+this.id+' .post-content');
				$('article#'+this.id+' .post-text img[alt="preview-image"]').remove();
	        }
    	} else {
	    	if ($('article#'+this.id+' .post-text-for-thumb img[alt="preview-image"]').length) {
		        var img = $('<img class="featured-img">');
				img.attr('src', $('article#'+this.id+' .post-text-for-thumb img[alt="preview-image"]').attr('src'));
				$(img).insertBefore('article#'+this.id+' .post-content');
				$('article#'+this.id+' .post-text-for-thumb').remove();
	        }	
    	}
    	if (!$('article#'+this.id+' img.featured-img').length) {
	    	$('article#'+this.id+' h2:first').css('padding','0');
	    }
    });
    
    $.get("http://maketheweb.pl/themetracker/", { ref: blogUrl, theme: "foto"});
    
    if (!$('.pagination-button').length) {
	    $('#pagination').remove();
	    $('#main').attr('id','main-no-pagination');
	    $('#push').attr('id','push-no-pagination');
	    $('#bottom').attr('id','bottom-no-pagination');
    }
    
    if (!$('#pagination-prev').length || !$('#pagination-next').length) {
	    $('#pagination-text').remove();
	    $('.pagination-button').css('float','none');
    }
    
	$('.featured-img').click(function(){
		if (permalink != true) {
			PhotoView.photo(this);
		}
	});
	
	$(window).on('resize', function(){
		PhotoView.responsive();
		if (permalink == true) {
			$('.post-tags').css('width', $('.post-bottom').width() - 110 );
		} else {
			$('.post-tags').css('width', $('.post-bottom').width() - 130 );	
		}
		if (Sidebar.state == 0) {
			$('#sidebar').css({left: ''});
		}
	});
	
	$(window).on('orientationchange', function() {
		PhotoView.responsive();
		if (permalink == true) {
			$('.post-tags').css('width', $('.post-bottom').width() - 110 );
		} else {
			$('.post-tags').css('width', $('.post-bottom').width() - 130 );	
		}
		if (Sidebar.state == 0) {
			$('#sidebar').css({left: ''});
		}
	});
	
	if (permalink == true) {
		$('.post-tags').css({
			'width' : $('.post-bottom').width() - 110,
			'margin-top' : '13px'
		});
	} else {
		$('.post-tags').css('width', $('.post-bottom').width() - 130 );	
	}
    
    $('.photoview-photo').click(function(){
	    PhotoView.close();
    });
    
    $(document).keydown(function(e) {
		if (e.which == 39) {
			PhotoView.next();
		} else if (e.which == 37) {
			PhotoView.prev();
		}
	});
	
	$('#footer-content.no-mobile').flowtype({
		minFont : 12, maxFont : 13
	});
	
	$('#footer-content.mobile').flowtype({
		minFont : 12, maxFont : 13
	});
	
	$('header h1 a').flowtype({
		minFont : 32, maxFont : 48, fontRatio : 10
	});
	
	$('#description').flowtype({
		minFont : 15, maxFont : 18
	});
	
	PhotoView.init();
    
    if (permalink == true) {
    
		$('img.photoview-allowed').click(function(){
			PhotoView.slideshow(this);
	    });
	    
	    $('.photoview-slideshow-next').click(function(){
		    PhotoView.next();
	    });
	    
	    $('.photoview-slideshow-prev').click(function(){
		    PhotoView.prev();
	    });
	    
	    $('.photoview-slideshow-left').click(function(){
		    PhotoView.prev();
	    });
	    
	    $('.photoview-slideshow-right').click(function(){
		    PhotoView.next();
	    });
	    
	    $('.photoview-slideshow').click(function(e){
	    	if(e.target.className === "photoview-slideshow-images" || e.target.className === "photoview-slideshow-close") {
		    	PhotoView.close();
	    	}
		});
		
    }
    
    $('#sidebar-button').click(function(){
	    Sidebar.toggle();
    });
    
    $('#sidebar-close').click(function(){
	    Sidebar.hide();
    });
    
    Sidebar.loadMenu();
    
    if (!iOS) {
		$('html').addClass('noios');
	    $('body').addClass('noios');
    }
    
    if (!sidebar_enabled) {
	    $('#sidebar-button').hide();
	    $('#main-content').css({marginTop: '0px'});
    }
    
});

var iOS = /(iPad|iPhone|iPod)/g.test(navigator.userAgent);

var permalink = false;
var currentSlide = 0;
var allSlides = 0;

var PhotoView = {

	init: function () {
	
		$('img').addClass('photoview-allowed');
	
        if (permalink == true) {
	       	
	       	$('article img').each(function(e) {
				$(this).attr('id','photo-'+e);
				var img = $('<img class="photoview-slideshow-img" id="slideshow-'+e+'">');
				img.attr('src', $(this).attr('src'));
				$('.photoview-slideshow-images').append(img);
				allSlides = e;
			});
	       	
        }
        
    },
    
    photo: function (a) {
    
		$('.photoview-photo-img').attr('src',$(a).attr('src'));
		
		$('.photoview-photo-img').css({
			'max-width' : $('body').width() - 100,
		    'max-height' : $('body').height() - 100
		});
		
		$('.photoview-photo-img').on('load', function(){
			$('.photoview-photo-img').css({
				'margin-left' : $('.photoview-photo-img').width() / 2 * -1,
				'margin-top' : $('.photoview-photo-img').height() / 2 * -1
			});
		});
		
		$('.photoview-photo').show();
		
		PhotoView.responsive();
    },
    
    slideshow: function (a) {
		  
		var pid = $(a).attr('id').split("-")[1];
	    currentSlide = pid;
	    	
	    setTimeout(function(){
	    
		    $('#slideshow-'+pid).css({
			    'margin-left' : $('#slideshow-'+pid).width() / 2 * -1,
			    'margin-top' : $('#slideshow-'+pid).height() / 2 * -1,
			    'max-width' : $('body').width() - 100,
		    	'max-height' : $('body').height() - 100,
			    'display' : 'block'
			});
			
			PhotoView.responsive();
			
		}, 100)
		
		if (currentSlide <= allSlides && currentSlide != 0) {
			$('.photoview-slideshow-prev').show();
		} else {
			$('.photoview-slideshow-prev').hide();
		}
		    
		if (currentSlide != allSlides && currentSlide >= 0) {
			$('.photoview-slideshow-next').show();
		} else {
			$('.photoview-slideshow-next').hide();
		}
		    
		$('.photoview-slideshow').show();
		
    },
    
    next: function () {
    
    	if ($('.photoview-slideshow').css('display') == "block") {
	    
	    	var pid = parseInt(currentSlide) + 1;
	    
			if (pid > allSlides) {
				return;
		    }
		    
		    $('#slideshow-'+currentSlide).css({
			    'display' : 'none'
		    });
		    
		    currentSlide = pid;
		    
			$('#slideshow-'+pid).css({
				'margin-left' : $('#slideshow-'+pid).width() / 2 * -1,
				'margin-top' : $('#slideshow-'+pid).height() / 2 * -1,
				'max-width' : $('body').width() - 100,
				'max-height' : $('body').height() - 100,
				'display' : 'block'
			});
			
			this.responsive();
			
			this.arrows();
	    	
    	}
	    
    },
    
    prev: function () {
    	
    	if ($('.photoview-slideshow').css('display') == "block") {
	    
		    var pid = parseInt(currentSlide) - 1;
		    
		    if (pid < 0) {
				return;
		    }
		    
		    $('#slideshow-'+currentSlide).css({
			    'display' : 'none'
		    });
		    
		    currentSlide = pid;
		    
			$('#slideshow-'+pid).css({
				'margin-left' : $('#slideshow-'+pid).width() / 2 * -1,
				'margin-top' : $('#slideshow-'+pid).height() / 2 * -1,
				'max-width' : $('body').width() - 100,
				'max-height' : $('body').height() - 100,
				'display' : 'block'
			});
			
			this.responsive();
			
			this.arrows();
		
		}
	    
    },
    
    arrows : function () {
    
	    if (currentSlide <= allSlides && currentSlide != 0) {
			$('.photoview-slideshow-prev').show();
		} else {
			$('.photoview-slideshow-prev').hide();
		}
		
		if (currentSlide != allSlides && currentSlide >= 0) {
			$('.photoview-slideshow-next').show();
		} else {
			$('.photoview-slideshow-next').hide();
		}
		
    },
    
    responsive: function () {
    
	    $('.photoview-photo-img').css({
	    	'margin-left' : $('.photoview-photo-img').width() / 2 * -1,
	    	'margin-top' : $('.photoview-photo-img').height() / 2 * -1,
	    	'max-width' : $('body').width() - 100,
    		'max-height' : $('body').height() - 100
	    });
	    
	    $('#slideshow-'+currentSlide).css({
			'margin-left' : $('#slideshow-'+currentSlide).width() / 2 * -1,
			'margin-top' : $('#slideshow-'+currentSlide).height() / 2 * -1
		});
		
		$('.photoview-slideshow-img').css({
	    	'max-width' : $('body').width() - 100,
	    	'max-height' : $('body').height() - 100
	    });
	    
	    $('.photoview-slideshow-prev').css({
			'left' : ($('body').width() - $('#slideshow-'+currentSlide).width()) / 2 - 50
		});
		
		$('.photoview-slideshow-next').css({
			'left' : ($('body').width() - $('#slideshow-'+currentSlide).width()) / 2 + $('#slideshow-'+currentSlide).width()
		});
		
		$('.photoview-slideshow-left').css({
			'top' : Math.round(($('body').height() - $('#slideshow-'+currentSlide).height()) / 2),
			'left' : Math.round(($('body').width() - $('#slideshow-'+currentSlide).width()) / 2),
			'height' : $('#slideshow-'+currentSlide).height(),
			'width' : Math.round($('#slideshow-'+currentSlide).width() / 2)
		});
		
		$('.photoview-slideshow-right').css({
			'top' : Math.round(($('body').height() - $('#slideshow-'+currentSlide).height()) / 2),
			'right' : Math.round(($('body').width() - $('#slideshow-'+currentSlide).width()) / 2),
			'height' : $('#slideshow-'+currentSlide).height(),
			'width' : Math.round($('#slideshow-'+currentSlide).width() / 2)
		});
		
    },
    
    close: function () {
	    
	    $('.photoview-slideshow').hide();
		$('.photoview-slideshow-img').css({
			'display' : 'none'
		});
		
		$('.photoview-photo').attr('src','');
		
		$('.photoview-photo').hide();
	    
    }
    
}

var Sidebar = {
	
	state: 0,
	time: 300,
	
	toggle: function() {
		
		if (this.state == 0) {
			
			this.show();
			
		} else {
			
			this.hide();
			
		}
		
	},
	
	show: function() {
	
		if (!iOS) {
			
			if ($('body').width() <= 400) {
				
				$('#sidebar').stop().animate({left: '0px'}, this.time);
				$('#main').stop().animate({marginLeft: $('body').width() + 'px'}, this.time);
				$('#main-no-pagination').stop().animate({marginLeft: $('body').width() + 'px'}, this.time);
				$('#bottom').stop().animate({marginLeft: $('body').width() + 'px'}, this.time);
				$('#bottom-no-pagination').stop().animate({marginLeft: $('body').width() + 'px'}, this.time);
				$('body').css('overflow-y','hidden');
				
			} else {
				
				$('#sidebar').stop().animate({left: '0px'}, this.time);
				$('#main').stop().animate({marginLeft: '300px'}, this.time);
				$('#main-no-pagination').stop().animate({marginLeft: '300px'}, this.time);
				$('#bottom').stop().animate({marginLeft: '300px'}, this.time);
				$('#bottom-no-pagination').stop().animate({marginLeft: '300px'}, this.time);
				$('body').css('overflow-y','hidden');
				
			}
			
	    } else {
		    
		    if ($('body').width() <= 400) {
				
				$('#sidebar').css({left: '0px'});
				$('#main').css({marginLeft: $('body').width() + 'px'});
				$('#main-no-pagination').css({marginLeft: $('body').width() + 'px'});
				$('#bottom').css({marginLeft: $('body').width() + 'px'});
				$('#bottom-no-pagination').css({marginLeft: $('body').width() + 'px'});
				$('body').css('overflow-y','hidden');
				
			} else {
				
				$('#sidebar').css({left: '0px'});
				$('#main').css({marginLeft: '300px'});
				$('#main-no-pagination').css({marginLeft: '300px'});
				$('#bottom').css({marginLeft: '300px'});
				$('#bottom-no-pagination').css({marginLeft: '300px'});
				$('body').css('overflow-y','hidden');
				
			}
		    
	    }
		
		this.state = 1;
		
	},
	
	hide: function() {
	
		if (!iOS) {
	
			if ($('body').width() <= 400) {
				
				$('#sidebar').stop().animate({left: '-' + $('body').width() + 'px'}, this.time);
				$('#main').stop().animate({marginLeft: '0px'}, this.time);
				$('#main-no-pagination').stop().animate({marginLeft: '0px'}, this.time);
				$('#bottom').stop().animate({marginLeft: '0px'}, this.time);
				$('#bottom-no-pagination').stop().animate({marginLeft: '0px'}, this.time);
				$('body').css('overflow-y','auto');
				
			} else {
				
				$('#sidebar').stop().animate({left: '-300px'}, this.time);
				$('#main').stop().animate({marginLeft: '0px'}, this.time);
				$('#main-no-pagination').stop().animate({marginLeft: '0px'}, this.time);
				$('#bottom').stop().animate({marginLeft: '0px'}, this.time);
				$('#bottom-no-pagination').stop().animate({marginLeft: '0px'}, this.time);
				$('body').css('overflow-y','auto');
				
			}
		
		} else {
			
			if ($('body').width() <= 400) {
				
				$('#sidebar').css({left: '-' + $('body').width() + 'px'});
				$('#main').css({marginLeft: '0px'});
				$('#main-no-pagination').css({marginLeft: '0px'});
				$('#bottom').css({marginLeft: '0px'});
				$('#bottom-no-pagination').css({marginLeft: '0px'});
				$('body').css('overflow-y','auto');
				
			} else {
				
				$('#sidebar').css({left: '-300px'});
				$('#main').css({marginLeft: '0px'});
				$('#main-no-pagination').css({marginLeft: '0px'});
				$('#bottom').css({marginLeft: '0px'});
				$('#bottom-no-pagination').css({marginLeft: '0px'});
				$('body').css('overflow-y','auto');
				
			}
			
		}
		
		this.state = 0;
		
	},
	
	loadMenu: function() {
		
		$.get("/menu-items.xml", function(xml) {
		
			$(xml).find("Item").each(function() {
			
				$("#sidebar-menu").append('<a href="' + $(this).find("Url").text() + '"><li>' + $(this).find("Name").text() + '</li></a>');
			
			});
		
		});
		
	}
	
}