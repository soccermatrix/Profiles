//console.log('nav.js')

var loadNavComplete = false;
function loadNav(){
	//console.log('loadNav()');
	
	//cllick functionality anywhere in the screen
	$(document).click(function(e){
		//console.log('document click()');
		var target = e.target;
		//console.log('$(target).parents().parents(): ' + $(target).parents().parents().id)
		if (!$(target).is('#top_menu_options_list') && !$(target).is('#menu_icon_btn')) {
			$('#top_menu_options_list').hide();
		}
	});

	$(document).ready(function(){
		if(!loadNavComplete){
			loadNavComplete = true;
			var active_dialog = false;
			
			//get dimmensions of devices's screen
			var w = $(window).width();
			var h = $(window).height();

			//show the body of the document now that all dynamic js,classes are loaded.
			$('body').css('visibility','visible');

			
			//removes previous event handlers so new ones can be reset
			//this is needed as new objects are added to the list, but existing objects
			//do not get multiple event handlers
			$('#form_user_update,#form_user_insert,#form_user_delete').onsubmit = null;
			$('#form_user_update,#form_user_insert,#form_user_delete').unbind("submit");
			$('#menu_add').off();

			//elements affected only by mobile version


			//dialog calls
			$('#skills_' + activeEmployeeID).hide();
			$('.portfolio, .photo, .name').on('click', function(e){
				if(!mobileMode){
					$('.cards').addClass('blurEffect');
					$('.cards').fadeTo("fast", 0.5);
					$( "#dialog_active_user" ).dialog({
						modal: true,
						resizable: false,
						show: { effect: "fade", duration: 100 },
						close: function( event, ui ) {}
					});
					active_dialog = 'dialog_active_user';
					$( "#dialog_active_user_main" ).css("visibility", "visible");					
					$('.ui-widget-overlay,#dialog_active_user').on('click', function(){
						hideAll();
					});
					//console.log('activeEmployeeID: ' + activeEmployeeID)
					//console.log('className: ' + $('.' + e.currentTarget.className))
					$('.portfolio-active').removeClass('portfolio-active');
					$('#btn_' + activeEmployeeID).addClass('portfolio-active');
				} else {
					//only for mobile version

					//here i'm trying to link to a hash to support back button to land on scrolling spot,
					//however, with no luck, page reloads to the top as soon as it's reloaded using back button.
					//implement mechanism so on back navigation, user goes back to scrolling spot.
					//window.location.hash="test";
					if(!$('.sub_page').length){						
						setTimeout(function(){
							window.location.href = '/u?uid=' + activeEmployeeID;
						}, 50);
					}
				}
			});

			//top menu / navigation buttons
			$('#top_menu_options_list').hide();
			$('#menu_icon_btn').on('click', function(e){
				$('#top_menu_options_list').toggle();
				$('#top_menu').css('zIndex','9999')
			});

			$('#back_icon_btn, #back_icon_btn_label').on('click', function(e){
				parent.history.back();
				return false;
			});

			var dialog_name;

			// Top Menu Options-------------------------------
			$('#menu_add').on('click', function(e){
				hideAll();
				dialog_name = 'dialog_form_insert';
				dialog_modal = true;
				dialog_appendTo = $('#wrapper');
				setTimeout(show_dialog, 50);
			});
			
			var draggingMode = false;
			$('#menu_move').on('click', function(e){
				hideAll();
				if(draggingMode){
					stopDragging();
					$('#menu_move').html('Turn On Swaping');
					$('.main').mouseenter(function(){
						$(this).css('cursor','default');
					});
					draggingMode = false;
				} else {
					if(!draggingReady){setDragging()};
					startDragging();
					$('#menu_move').html('Turn Off Swaping');
					$('.main').mouseenter(function(){
						$(this).css('cursor','move');
					});
					draggingMode = true;
					
				}
			});
			// END Top Menu Options-------------------------------

			$('.card_menu_update').on('click', function(e){
				//console.log('click() update, activeEmployeeID: ' + activeEmployeeID)
				hideAll();
				dialog_name = 'dialog_form_update';
				dialog_modal = true;
				dialog_appendTo = $('#wrapper');
				setTimeout(show_dialog, 50);
			});

			$('.card_menu_delete').on('click', function(e){
				//console.log('click() delete, activeEmployeeID: ' + activeEmployeeID)
				hideAll();
				dialog_name = 'dialog_form_delete';
				dialog_modal = true;
				dialog_appendTo = $('#wrapper');
				setTimeout(show_dialog, 50);			
			});

			
			//DIALOG FUNCTIONALITY / SETTINGS---------------------
			$( "#" + dialog_name ).hide();
			function show_dialog(){
				////console.log('show_dialog(), dialog_name: ' + dialog_name)
				if(dialog_modal){			
					$('.cards').addClass('blurEffect');
					$('.cards').fadeTo("fast", 0.5);
				}		
				// $( "#" + dialog_name ).css('display','inline-block');
				
				$( "#" + dialog_name ).dialog({
					modal: dialog_modal,
					resizable: false,
					appendTo: dialog_appendTo,
					show: { effect: "fade", duration: 50 },
					close: function( event, ui ) {}
				});
				active_dialog = dialog_name;
				$( "#" + dialog_name + "_main" ).css("visibility", "visible");
				$('.ui-widget-overlay' ).on('click', function(){
					hideAll();
				});
			}//END DIALOG FUNCTIONALITY / SETTINGS---------------------

			function hideAll(){
				////console.log('hideAll()');
				////console.log('active_dialog: ' + active_dialog);
				if(active_dialog){
					$('#' + active_dialog).dialog("close");
					$('.cards').removeClass('blurEffect');
					$('.cards').fadeTo("fast", 1);
					active_dialog = false;
				}
			};

			//check if localhost or local server

			if (location.hostname === "localhost" || location.hostname === "127.0.0.1"){
				adminMode = true;
			}


			//add tooltip attributes to input fields
			var forms = ['update','insert','delete'];
			for(var i=0; i<fields.length; i++){
			 	//////console.log('fields[i]: ' + fields[i])
			 	for(var a=0; a<forms.length; a++){
			 		field[ fields[i][0] ] = $('#' + forms[a] + '_' + fields[i][0]);
			 		field[ fields[i][0] ].attr('data-toggle','tooltip');
			 		field[ fields[i][0] ].attr('data-placement','bottom');
			 		field[ fields[i][0] ].attr('title',fields[i][1]);
			 	}
			 }
			 field = {};//reset field array

			 //start tooltip on all input fields with a tooltip.
			 $('[data-toggle="tooltip"]').tooltip(); 

			 
			 //SUBMIT FUNCTIONALITY - FORMS 
			 $('#form_user_update').submit(function(){
			 	angular.element('#dialog_form_update_main').scope().$apply();
			 	angular.element('#dialog_form_update_main').scope().user_update();
			 	hideAll();
/*
			 	dialog_name = 'dialog_confirmation';
				dialog_appendTo = $('#wrapper');
				setTimeout(show_dialog, 50);
				*/

			 });

			 $('#form_user_insert').submit(function(){
			 	angular.element('#dialog_form_insert_main').scope().$apply();
			 	angular.element('#dialog_form_insert_main').scope().user_insert();
			 	hideAll();
			 });

			 $('#form_user_delete').submit(function(){
				////console.log('adminMode: ' + adminMode)
				if(adminMode=true){
					angular.element('#dialog_form_delete_main').scope().$apply();
					angular.element('#dialog_form_delete_main').scope().user_delete();
					hideAll();
				} else {
					$('#delete_message').css('visibility','visible');
					$('#delete_message').html('Not allowed on public version');
				}
			});//END SUBMIT FUNCTIONALITY - FORMS 

			
			// display window width/height in the top banner
			var winWidth = $(window).width();
			var winHeight = $(window).height();
			$('#screenRes').html(winWidth + " x " + winHeight);
			checkWindowSize();

			$(window).resize(function(e){ 
		 		checkWindowSize();
		 	});
		 	function checkWindowSize(){
		 		if($('#iframe_tools').length){
		 			resizeIframe($('#iframe_tools'));
		 		} 
		 		
				//get dimmensions of devices's screen
				winWidth = $(window).width();
				winHeight = $(window).height();
		 		$('#screenRes').html(winWidth + " x " + winHeight);
				console.log(winWidth + " x " + winHeight);

				if(winWidth < 530){
					$('.form-item-left span').hide();
					$('.form-item-left').css('margin-left','10px');

				} else {
					$('.form-item-left span').show();
					$('.form-item-left').css('margin-left','0');
				}
				if(winWidth < 400){
					$('#banner-label').hide();

				} else {
					if(!mobileMode)$('#banner-label').show();
				}
				if(winWidth < 365){
					$('.form-item-left').hide();
					$('#banner #label').hide();

				} else {
					$('.form-item-left').show();
					if(mobileMode)$('.form-item-left span').hide();
					if(mobileMode)$('.form-item-left').css('margin-left','20px');
					if(!mobileMode)$('#banner #label').show();
					$('.sub_page .form-item-left').hide();
					$('.sub_page .form-item-right').css({'float':'left','width':'50%'});
				}
		 	}

			// SCROLLING FUNCTIONALITY
			//scrolling snaping of top menu
		 	positionElements();
		 	$(window).scroll(function(e){ 
		 		positionElements()
		 	});

			 // part of scrolling functionality
			 function positionElements(){
			 	var $tm = $('#top_menu'); 
			 	var $c = $('.cards'); 
			 	var isPositionFixed = ($tm.css('position') == 'fixed');
			 	if(!mobileMode){
			 		if ($(this).scrollTop() > 10 && !isPositionFixed){ 
						// place it back top of page
						($tm).css({'position': 'fixed', 'top': '-12px', 'width': '90%', 'z-index': '3'});
						($c).css({'top': '105px'});
					}
					if ($(this).scrollTop() < 10 && isPositionFixed)
					{
						// show over the scrolling content
						($tm).css({'position': 'relative', 'top': '0px', 'width': '100%', 'z-index': '3'}); 
						($c).css({'top': '0px'});
					} 
				} else {
					if ($(this).scrollTop() > 0 && !isPositionFixed){ 
						// place it back top of page
						($tm).css({'position': 'fixed', 'top': '0px', 'width': '100%', 'z-index': '2'});
						($c).css({'top': '150px'});
					}
					if ($(this).scrollTop() < 0 && isPositionFixed)
					{
						// show over the scrolling content
						($tm).css({'position': 'relative', 'top': '0px', 'width': '100%', 'z-index': '2'}); 
						($c).css({'top': '0px'});
					} 

					// start d3 graph animations when they are visible after scrolling
					/* Check the location of each desired element */
			        $('.arc').each( function(i){
			        	if(this.ChartAnimateCompleted == undefined){
			            
				            var bottom_of_object = $(this).offset().top + $(this).outerHeight();
				            var bottom_of_window = $(window).scrollTop() + $(window).height();
				            
				            /* If the object is completely visible in the window, fade it it */
				            if( bottom_of_window > bottom_of_object ){
				                
				                // get the object's id from this class instance
				                var $f = $("#" + this.id);

								// if iframes is loaded in the viewing area right away,
								// functions will not be ready yet. 
								// check if iframe content is loaded first and functions are ready
								// returns undefined || function
								console.log(typeof $f[0].contentWindow.BeginChartAnimation)
								if(typeof $f[0].contentWindow.BeginChartAnimation != 'undefined'){
									//console.log("this.ChartAnimateCompleted: " + this.ChartAnimateCompleted)
									// prevent multiple calls to iFrame function
									// default value undefined, change it to true on first run.
							 		this.ChartAnimateCompleted = true;
							 		$f[0].contentWindow.BeginChartAnimation();  // run function
								} else {
									// prevent multiple calls to iFrame function
									// default value undefined, change it to true on first run.
									setTimeout(function(){
								 		this.ChartAnimateCompleted = true;
								 		$f[0].contentWindow.BeginChartAnimation();  // run function
									}, 500);								
								}
				                    
				            }//end bottom_of_window > bottom_of_object
				        } //end if(ChartAnimateCompleted)
			            
			        }); 
				}
			}
			 // END SCROLLING FUNCTIONALITY

			// Remove functionality from objects with '.disabled' className 
			$('.disabled').off();

			//what's this for? i forgot. needs debugging.
			$("div.ui-widget-overlay").css("height", function () {
				return $(window).height();
			});

			//MOBILE ONLY FUNCTIONALITY
			if(mobileMode){
				//hide drag/drop functionality
				$('#menu_move').hide();
			} else {
				$('#menu_move').click();
			}

			


		}//end if
		loadNavComplete = false;
	});//end document.ready
}//end loadNav
