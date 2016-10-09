$(document).ready(function(){
	$('.portfolio, .photo').on('click', function(e){
		$('.cards').addClass('blurEffect');
		$('.cards').fadeTo("fast", 0.5);
		$( "#dialog_active_user" ).dialog({
			modal: true,
			resizable: false,
			show: { effect: "fade", duration: 300 },
			close: function( event, ui ) {}
		});
		active_dialog = 'dialog_active_user';
		$( "#dialog_active_user_main" ).css("visibility", "visible");					
		$('.ui-widget-overlay,#dialog_active_user').on('click', function(){
			hideAll();
		});
		$('.' + e.currentTarget.className).removeClass('portfolio-active');
		$('#' + e.currentTarget.id).addClass('portfolio-active');
	});

	$('#menu').on('click', function(e){
		$('.cards').addClass('blurEffect');
		$('.cards').fadeTo("fast", 0.5);
		$( "#dialog_menu" ).dialog({
			modal: true,
			resizable: false,
			show: { effect: "fade", duration: 300 },
			close: function( event, ui ) {}
		});
		active_dialog = 'dialog_menu';
		$( "#dialog_menu_main" ).css("visibility", "visible");					
		$('.ui-widget-overlay,#dialog_menu').on('click', function(){
			hideAll();
		});
	});

	$('#insert_button,#update_button').on('click', function(e){
		hideAll();
	});

	

	var dialog_name;
	$('#menu_add').on('click', function(e){
		hideAll();
		dialog_name = 'dialog_form_insert';
		dialog_modal = true;
		dialog_appendTo = $('#wrapper');
		setTimeout(show_dialog, 500);
	});

	$('#menu_update').on('click', function(e){
		console.log('click(), activeEmployeeID: ' + activeEmployeeID)
		hideAll();
		dialog_name = 'dialog_form_update';
		dialog_modal = true;
		dialog_appendTo = $('#wrapper');
		setTimeout(show_dialog, 500);
	});

	function show_dialog(){
		console.log('show_dialog(), dialog_name: ' + dialog_name)
		if(dialog_modal){			
			$('.cards').addClass('blurEffect');
			$('.cards').fadeTo("fast", 0.5);
		}		
		$( "#" + dialog_name ).dialog({
			modal: dialog_modal,
			resizable: false,
			appendTo: dialog_appendTo,
			show: { effect: "fade", duration: 300 },
			close: function( event, ui ) {}
		});
		active_dialog = dialog_name;
		$( "#" + dialog_name + "_main" ).css("visibility", "visible");					
		$('.ui-widget-overlay' ).on('click', function(){
			hideAll();
		});
	};		


	function hideAll(){
		console.log('hideAll()');
		console.log('active_dialog: ' + active_dialog);
		$('#' + active_dialog).dialog("close");
		$('.cards').removeClass('blurEffect');
		$('.cards').fadeTo("fast", 1);
	};

	
	$('.card_menu').on('click', function(e){
	 	$( "#card_menu" ).dialog({	 		
	 		modal: true,
	 		resizable: false,
	 		position: { my: "left top", at: "left bottom", of: $('#card_menu_' + activeEmployeeID) },
	 		show: { effect: "fade", duration: 100 },
	 		close: function( event, ui ) {}
	 	});	 	
	 	active_dialog = 'card_menu';
	 	$( "#card_menu_main" ).css("visibility", "visible");					
	 	$('.ui-widget-overlay').on('click', function(){
	 		hideAll();
	 	});
	 });

});