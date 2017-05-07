// JavaScript Document

/******************************

[Table of Contents]

1. Vars and Inits
2. Window Resize
3. Init Hero Text
4. Init Position
5. Init Panel Navigation
6. Init About Image 
7. Init Scrollbars 
8. Init Services
9. Init Team Carousel 
10. Init Contact 
11. Init Full Screen Menu 

******************************/

$(document).ready(function()
{
	"use strict";

	/* 1. Vars and Inits */

	initHeroText();
	initPosition();
	initPanelNavigation();
	initAboutImage();
	initScrollbars();
	initService();
	initTeamCarousel();
	initContact();
	initFsMenu();

	$(window).on('resize', resizingCheck);

	/* 2. Window Resize */

	function resizingCheck()
	{
		initPosition();
	}

	function getWindowWidth()
	{
		return window.innerWidth;
	}
	
	/* 3. Init Hero Text */

	function initHeroText()
	{
		var heroLines = $('.hero_lines');
		var sideLines = $('.home_text_small_content p');
		var ff = $('.ffs');
		var dot = $('#hero_line_1 span');
		var projectsJump = $('.projects_jump');

		setTimeout(function()
		{
			$('.home_content_outer').css('display', 'block');
		}, 500);

		if(getWindowWidth() < 768)
		{
			TweenMax.from(sideLines, 1,
			{
				ease: Circ.easeOut,
				top: 50,
				delay: 1.4,
				opacity: 0
			});
		}
		else
		{
			TweenMax.from(sideLines, 1,
			{
				ease: Circ.easeOut,
				top: 50,
				delay: 0.5,
				opacity: 0
			});
		}

		TweenMax.staggerFrom(heroLines, 1.5, 
		{
			ease: Circ.easeOut,
			top: 100,
			delay: 0.5,
			opacity: 0
		}, 0.4);
		TweenMax.from(dot, 0.5, 
		{
			ease: Power4.easeOut,
			opacity: 0,
			delay: 3.5
		});
		TweenMax.to(ff, 1,
		{
			ease: Circ.easeOut,
			color:"#eb2a2a",
			delay: 4.5
		});
		TweenMax.from(projectsJump, 1,
		{
			ease: Circ.easeOut,
			bottom: -50,
			delay: 1.4,
			opacity: 0
		});
	}

	/* 4. Init Position */

	function initPosition()
	{
		if(getWindowWidth() <= 480)
		{
			$('.p1').css('top', "24px");
			$('.p2').css('top', "24px");
			$('.p3').css('top', "24px");
			$('.p4').css('top', "24px");
			$('.p5').css('top', "24px");
			$('.p6').css('top', "24px");
		}
		else
		{
			var w1 = $('.p1').height() + 50;
			var w2 = $('.p2').height() + 50;
			var w3 = $('.p3').height() + 50;
			var w4 = $('.p4').height() + 50;
			var w5 = $('.p5').height() + 50;
			var w6 = $('.p6').height() + 50;
			$('.p1').css('top', w1);
			$('.p2').css('top', w2);
			$('.p3').css('top', w3);
			$('.p4').css('top', w4);
			$('.p5').css('top', w5);
			$('.p6').css('top', w6);
		}
	}

	/* 5. Init Panel Navigation */

	function initPanelNavigation()
	{
		var pages = [].slice.call(document.querySelectorAll('.pages > .page')),
		currentPage = 0,
		revealerOpts =
		{
			// the layers are the elements that move from the sides
			nmbLayers : 3,
			// bg color of each layer
			bgcolor : ['#0092DD', '#fff', '#3E3A35'],
			// effect classname
			effect : 'anim--effect-3',
			onStart : function(direction) {
				// next page gets class page--animate-[direction]
				var nextPage = pages[currentPage === 0 ? 1 : 0];
				classie.add(nextPage, 'page--animate-' + direction);
			},
			onEnd : function(direction) {
				// remove class page--animate-[direction] from next page
				var nextPage = pages[currentPage === 0 ? 1 : 0];
				nextPage.className = 'page';
			}
		};

		var revealer = new Revealer(revealerOpts);

		var arrowNext = $('.page_nav_container');
		var navLinks = $('.nav_links');

		var servicesJump = $('.projects_jump');
		var navLogo = $('.logo_container');
		
		var uiItemPosition = $('.position_inner');
		var uiItemPositionSpan = $('.position_inner span');
		var uiItemRect1 = $('.rect_1');
		var uiItemRect2 = $('.rect_2');
		var uiItemSocialText = $('.social_container div');
		var uiItemSocial = $('.social_container ul li a');
		var uiItemSocialSpan = $('.social_container span');
		var uiItemNavTriggers = $('.nav_triggers');
		var uiItemPageNavContainer = $('.page_nav_container');
		var uiItemPageNav = $('.page_nav_about');
		var uiItemPageNavArrow = $('.page_nav_about i');
		var uiItemMenu = $('.menu_container_inner');
		var uiItemMenuLines = $('.hamburger_lines');
		var uiItemLines = $('.lines');

		var clrUiNormal = "#F7F7F7";
		var clrUiSecondary = "rgba(255, 255, 255, 0.2)";
		var clrUiHover = "#F7F7F7";

		var linesColor = 'rgba(255, 255, 255, 0.05)';

		arrowNext.on('click', showNext);

		navLinks.each(function(i, z)
		{
			$(this).on('click', function()
			{
				showPanel(i);
			});
		});

		servicesJump.on('click', showServices);
		navLogo.on('click', showHome);

		function showServices()
		{
			showPanel(3);
		}

		function showHome()
		{
			showPanel(0);
		}

		/* Shows next panel after button next is clicked */
		function showNext()
		{
			setTimeout(function()
			{
				classie.remove(pages[currentPage], 'page--current');
				if(currentPage < pages.length - 1)
				{
					currentPage++;
				}
				else
				{
					currentPage = 0;
				}
				classie.add(pages[currentPage], 'page--current');
				changeUiColors();
			}, 500);
			reveal('right');
		}

		/* Shows the selected panel after side nav item is selected */
		function showPanel(i)
		{
			if(currentPage !== i)
			{
				setTimeout(function()
				{
					classie.remove(pages[currentPage], 'page--current');
					if(currentPage < pages.length)
					{
						$('.owl-stage').css('transition', "none");/*fix for the carousel transition*/
						currentPage = i;
					}
					else
					{
						currentPage = 0;
					}
					classie.add(pages[currentPage], 'page--current');
					changeUiColors();
				}, 500);
				reveal('right');
			}
		}

		function changeUiColors()
		{
			switch(currentPage)
			{
				case 0:
					clrUiNormal = "#F7F7F7";
					clrUiSecondary = "rgba(255, 255, 255, 0.2)";
					clrUiHover = "#F7F7F7";
					linesColor = 'rgba(255, 255, 255, 0.035)';
					break;
				case 1:
					clrUiNormal = "#F7F7F7";
					clrUiSecondary = "rgba(255, 255, 255, 0.4)";
					clrUiHover = "#F7F7F7";
					linesColor = 'rgba(255, 255, 255, 0.15)';
					var w = $('.p2').height() + 50;
					$('.p2').css('top', w);
					break;
				case 2:
					clrUiNormal = "#F7F7F7";
					clrUiSecondary = "rgba(255, 255, 255, 0.2)";
					clrUiHover = "#F7F7F7";
					linesColor = 'rgba(255, 255, 255, 0.05)';
					var w = $('.p3').height() + 50;
					$('.p3').css('top', w);
					break;
				case 3:
					clrUiNormal = "#F7F7F7";
					clrUiSecondary = "rgba(255, 255, 255, 0.35)";
					clrUiHover = "#F7F7F7";
					linesColor = 'rgba(255, 255, 255, 0.05)';
					var w = $('.p4').height() + 50;
					$('.p4').css('top', w);
					break;
				case 4:
					clrUiNormal = "#282727";
					clrUiSecondary = "rgba(0, 0, 0, 0.35)";
					clrUiHover = "#282727";
					linesColor = 'rgba(255, 255, 255, 0.1)';
					var w = $('.p5').height() + 50;
					$('.p5').css('top', w);
					break;
				case 5:
					clrUiNormal = "#F7F7F7";
					clrUiSecondary = "rgba(255, 255, 255, 0.2)";
					clrUiHover = "#F7F7F7";
					linesColor = 'rgba(255, 255, 255, 0.05)';
					var w = $('.p6').height() + 50;
					$('.p6').css('top', w);
				default:
					clrUiNormal = "#F7F7F7";
					clrUiSecondary = "rgba(255, 255, 255, 0.2)";
					clrUiHover = "#F7F7F7";
					linesColor = 'rgba(255, 255, 255, 0.035)';
					break;
			}

			updateUiColors();
		}

		function updateUiColors()
		{
			uiItemPosition.css('color', clrUiNormal);
			uiItemPositionSpan.css('background', clrUiNormal);
			uiItemRect1.css('border', 'solid 2px ' + clrUiSecondary);
			uiItemRect2.css('border', 'solid 2px ' + clrUiSecondary);
			uiItemSocial.css('color', clrUiNormal);
			uiItemSocialText.css('color', clrUiSecondary);
			uiItemSocialSpan.css('background', clrUiSecondary);
			uiItemPageNavContainer.css('border', 'solid 2px ' + clrUiSecondary);
			uiItemPageNav.css('color', clrUiSecondary);
			uiItemPageNavArrow.css('color', clrUiNormal);
			$('.lines_1').css('borderRight', 'solid 1px ' + linesColor);
			$('.lines_1').css('borderLeft', 'solid 1px ' + linesColor);
			$('.lines_2').css('borderRight', 'solid 1px ' + linesColor);
			$('.lines_3').css('borderRight', 'solid 1px ' + linesColor);
			$('.lines_4').css('borderRight', 'solid 1px ' + linesColor);
			uiItemMenuLines.css('background', clrUiNormal);
			uiItemMenu.css('border', 'solid 2px ' + clrUiNormal);

			if(currentPage === 2)
			{
				uiItemNavTriggers.css('background', '#F7F7F7');
				uiItemLines.css('borderRight', 'transparent');
				uiItemSocial.css('color', '#F7F7F7');
				uiItemSocialText.css('color', 'rgba(255, 255, 255, 0.3)');
				uiItemSocialSpan.css('background', 'rgba(255, 255, 255, 0.3)');
			}
			else
			{
				uiItemNavTriggers.css('background', clrUiSecondary);
			}

			initPosition();
				
		}

		/*Hover effect for the page navigation button*/
		uiItemPageNavContainer.on('mouseover', function()
		{
			uiItemPageNav.css('color', clrUiNormal);
			uiItemPageNavContainer.css('border', 'solid 2px ' + clrUiHover);
		});

		uiItemPageNavContainer.on('mouseout', function()
		{
			uiItemPageNav.css('color', clrUiSecondary);
			uiItemPageNavContainer.css('border', 'solid 2px ' + clrUiSecondary);
		});

		// triggers the effect by calling instance.reveal(direction, callbackTime, callbackFn)
		function reveal(direction)
		{
			var callbackTime = 150,
			callbackFn = function()
			{
				// classie.remove(pages[currentPage], 'page--current');
				// currentPage = currentPage === 0 ? 1 : 0;
				// classie.add(pages[currentPage], 'page--current');	
			};

			revealer.reveal(direction, callbackTime, callbackFn);
		}
	}

	/* 6. Init About Image */

	function initAboutImage()
	{
		var nav1 = $('.about_nav_1');
		var nav2 = $('.about_nav_2');
		var nav3 = $('.about_nav_3');

		var navImg1 = $('.about_background_1');
		var navImg2 = $('.about_background_2');
		var navImg3 = $('.about_background_3');

		nav1.on('click', function()
		{
			navImg2.removeClass('about_image_active');
			navImg3.removeClass('about_image_active');
			navImg1.addClass('about_image_active');
		});
		nav2.on('click', function()
		{
			navImg1.removeClass('about_image_active');
			navImg3.removeClass('about_image_active');
			navImg2.addClass('about_image_active');
		});
		nav3.on('click', function()
		{
			navImg1.removeClass('about_image_active');
			navImg2.removeClass('about_image_active');
			navImg3.addClass('about_image_active');
		});
	}

	/* 7. Init Scrollbars */

	function initScrollbars()
	{
		$(".projects_container").mCustomScrollbar(
		{
			axis: "x",
			scrollbarPosition: "outside",
			autoHideScrollbar: true,
			theme:"light-2",
			scrollInertia: 500,
			mouseWheel:{ scrollAmount: 200 },
			advanced:{autoExpandHorizontalScroll:true}
		});

		//$(".projects_panel_inner").find(".mCSB_dragger").css("max-height","none");

		$(".services_inner").mCustomScrollbar(
		{
			axis: "x",
			scrollbarPosition: "outside",
			autoHideScrollbar: true,
			theme:"light-2",
			scrollInertia: 500,
			mouseWheel:{ scrollAmount: 200 },
			advanced:{autoExpandHorizontalScroll:true}
		});
	}

	/* 8. Init Services */

	function initService()
	{
		$('.service_item_inner').on('mouseover', function()
		{
			var card = $(this).parent().children(".service_card_outer");
			//console.log($(this).parent().children(".service_card_outer"));
			card.css('visibility', "visible");
			card.css('opacity', "1");
			card.css('transform', 'scale(1)');
		});

		$('.service_item_inner').on('mouseout', function()
		{
			$('.service_card_outer').css('visibility', "hidden");
			$('.service_card_outer').css('opacity', "0");
		});
	}

	/* 9. Init Team Carousel */

	function initTeamCarousel()
	{
		var ele = $('.owl-carousel');

		ele.owlCarousel(
		{
			items:5,
			loop:true,
			dots:false,
			responsive:
			{
				0:
				{
					items:1
				},
				481:
				{
					items:2
				},
				769:
				{
					items:3
				},
				1025:
				{
					items:4
				},
				1441:
				{
					items:5
				}
			}
		});

		var names = $('.team_description_inner ul li');

		names.each(function()
		{
			var item = $(this);
			item.on('click', function()
			{
				if(item.text() !== "We are ")
				{
					ele.trigger('to.owl.carousel', item.index() - 1, 500);
				}
			});
		});

		var navLeft = $('.carousel_nav_left');
		var navRight = $('.carousel_nav_right');

		navLeft.on('click', function()
		{
			ele.trigger('prev.owl.carousel');
		});
		navRight.on('click', function()
		{
			ele.trigger('next.owl.carousel');
		});
	}

	/* 10. Init Contact */

	function initContact()
	{
		var touch = $('.touch');
		var hire = $('.hire');
		var join = $('.join');

		var touchText = "";
		var hireText = "";
		var joinText = "";

		var touchHoverText = touch.data("hover");
		var hireHoverText = hire.data("hover");
		var joinHoverText = join.data("hover");

		touch.on('mouseover', function()
		{
			touchText = touch.text();
			touch.text(touchHoverText);
		});
		touch.on('mouseout', function()
		{
			touch.text(touchText);
		});

		hire.on('mouseover', function()
		{
			hireText = hire.text();
			hire.text(hireHoverText);
		});
		hire.on('mouseout', function()
		{
			hire.text(hireText);
		});

		join.on('mouseover', function()
		{
			joinText = join.text();
			join.text(joinHoverText);
		});
		join.on('mouseout', function()
		{
			join.text(joinText);
		});
	}

	/* 11. Init Full Screen Menu */

	function initFsMenu()
	{
		var ele = $('#menu_container');
		var circle = $('.fs_menu_background');
		var menuContainer = $('.fs_menu_container');
		var menuClose = $('.fs_menu_close_container');
		var menuRecentCovers = $('.fs_recent_cover');
		var menuItemsTitle = $('.menu_items .fs_menu_title');
		var menuItems = $('.menu_items ul li');
		var menuRight = $('.fs_menu_top_right');
		var wdth = 4000;
		
		ele.on('click', function()
		{
			TweenMax.to(circle, 0.5,
			{
				ease: CustomEase.create("custom", "M0,0 C0.598,0.088 0.924,0.862 1,1"),
				width:wdth,
				height:wdth
			});
			TweenMax.to(menuClose, 0.4,
			{
				opacity:"1",
				delay:1.2
			});
			TweenMax.to(menuContainer, 0.1,
			{
				visibility:"visible",
				opacity:"1",
				delay:1
			});
			TweenMax.fromTo(menuItemsTitle, 1,
			{
				opacity:"0",
				y:30
			},
			{
				ease: Power2.easeOut,
				delay:1.1,
				opacity:"1",
				y:0
			});
			TweenMax.staggerFromTo(menuItems, 0.8,
			{
				opacity:"0",
				y:30
			},
			{
				ease: Power2.easeOut,
				opacity:"1",
				y:0,
				delay:1.2
			}, 0.2);
			TweenMax.fromTo(menuRight, 1,
			{
				opacity:"0",
				y:30
			},
			{
				ease: Power2.easeOut,
				opacity:"1",
				y:0,
				delay:2.2
			});
			TweenMax.staggerTo(menuRecentCovers, 1,
			{
				ease: Power2.easeOut,
				delay:1.5,
				height:"0%"
			}, 0.2);

			menuContainer.css('pointerEvents', 'auto');
		});

		menuClose.on('click', function()
		{
			closeMenu();
		});

		function closeMenu()
		{
			TweenMax.fromTo(menuItemsTitle, 1,
			{
				opacity:"1",
				y:0
			},
			{
				ease: Power2.easeIn,
				delay:0.2,
				opacity:"0",
				y:-30
			});
			TweenMax.staggerFromTo(menuItems, 0.6,
			{
				opacity:"1",
				y:0
			},
			{
				ease: Power2.easeIn,
				opacity:"0",
				y:-30,
				delay:0.2
			}, 0.1);
			TweenMax.fromTo(menuRight, 0.6,
			{
				opacity:"1",
				y:0
			},
			{
				ease: Power2.easeOut,
				opacity:"0",
				y:-50,
				delay:1
			});
			TweenMax.to(menuClose, 0.4,
			{
				opacity:"0",
				delay:1
			});
			TweenMax.staggerTo(menuRecentCovers, 0.8,
			{
				ease: Power2.easeOut,
				delay:1,
				height:"100%"
			}, 0.2);
			TweenMax.to(menuContainer, 0.1,
			{
				visibility:"hidden",
				opacity:"0",
				delay:2.2
			});
			TweenMax.to(circle, 0.6,
			{
				ease: CustomEase.create("custom", "M0,0 C0.598,0.088 0.924,0.862 1,1"),
				width:0,
				height:0,
				delay:1.6
			});
			
			menuContainer.css('pointerEvents', 'none');
		}
	}
});