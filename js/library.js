// Script Library

	$('#delete_button').on('click', function(e){	
		//console.log('adminMode: ' + adminMode)
		if(adminMode){
			angular.element('#dialog_form_delete_main').scope().$apply();
			angular.element('#dialog_form_delete_main').scope().user_delete();
			hideAll();
		} else {
			$('#delete_message').css('visibility','visible');
			$('#delete_message').html('Not allowed on public version');
		}
	});


	//get url params
	//use: $.urlParam('param1');
	$.urlParam = function(name){ 
		var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
		if (results==null){
			return null;
		}
		else{
			return results[1] || 0;
		}
	}


	//detect top scroll offset
	$(window).scroll(function(e){ 
		var $el = $('.fixedElement'); 
		var isPositionFixed = ($el.css('position') == 'fixed');
		if ($(this).scrollTop() > 200 && !isPositionFixed){ 
			$('.fixedElement').css({'position': 'fixed', 'top': '0px'}); 
		}
		if ($(this).scrollTop() < 200 && isPositionFixed)
		{
			$('.fixedElement').css({'position': 'static', 'top': '0px'}); 
		} 
	});