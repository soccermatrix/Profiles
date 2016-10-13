$(document).ready(function(){
	var active_dialog = false;
	var adminMode = false;

	$('.portfolio, .photo, .name').on('click', function(e){
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
		$('.' + e.currentTarget.className).removeClass('portfolio-active');
		$('#' + e.currentTarget.id).addClass('portfolio-active');
	});

	$('#menu').on('click', function(e){
		$( "#dialog_menu" ).dialog({			
			modal: true,
			resizable: false,
			position: { my: "right top", at: "right bottom", of: this },
			show: { effect: "fade", duration: 100 },
			close: function( event, ui ) {}
		});
		active_dialog = 'dialog_menu';
		$( "#dialog_menu_main" ).css("visibility", "visible");					
		$('.ui-widget-overlay,#dialog_menu').on('click', function(){
			hideAll();
		});
	});

	$('#update_button').on('click', function(e){		
		angular.element('#dialog_form_update_main').scope().$apply();
		angular.element('#dialog_form_update_main').scope().user_update();
		hideAll();
	});
	$('#insert_button').on('click', function(e){
		angular.element('#dialog_form_insert_main').scope().$apply();
		angular.element('#dialog_form_insert_main').scope().user_insert();
		hideAll();
	});

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

	

	var dialog_name;
	$('#menu_add').on('click', function(e){
		hideAll();
		dialog_name = 'dialog_form_insert';
		dialog_modal = true;
		dialog_appendTo = $('#wrapper');
		setTimeout(show_dialog, 50);
	});

	$('.card_menu_update').on('click', function(e){
		//console.log('click(), activeEmployeeID: ' + activeEmployeeID)
		hideAll();
		dialog_name = 'dialog_form_update';
		dialog_modal = true;
		dialog_appendTo = $('#wrapper');
		setTimeout(show_dialog, 50);
	});

	$('.card_menu_delete').on('click', function(e){
		//console.log('click(), activeEmployeeID: ' + activeEmployeeID)
		hideAll();
		dialog_name = 'dialog_form_delete';
		dialog_modal = true;
		dialog_appendTo = $('#wrapper');
		setTimeout(show_dialog, 50);			
	});

	function show_dialog(){
		//console.log('show_dialog(), dialog_name: ' + dialog_name)
		if(dialog_modal){			
			$('.cards').addClass('blurEffect');
			$('.cards').fadeTo("fast", 0.5);
		}		
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
	};		


	function hideAll(){
		//console.log('hideAll()');
		//console.log('active_dialog: ' + active_dialog);
		if(active_dialog){
			$('#' + active_dialog).dialog("close");
			$('.cards').removeClass('blurEffect');
			$('.cards').fadeTo("fast", 1);
			active_dialog = false;
		}
	};

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


	//check if localhost or local server

	if (location.hostname === "localhost" || location.hostname === "127.0.0.1"){
		adminMode = true;
	}

	
	//add tooltip attributes to input fields
	var forms = ['update','insert','delete'];
	for(var i=0; i<fields.length; i++){
		 	////console.log('fields[i]: ' + fields[i])
		 	for(var a=0; a<forms.length; a++){
			 	field[ fields[i][0] ] = $('#' + forms[a] + '_' + fields[i][0]);
			 	field[ fields[i][0] ].attr('data-toggle','tooltip');
			 	field[ fields[i][0] ].attr('data-placement','top');
			 	field[ fields[i][0] ].attr('title',fields[i][1]);
			 }
	 }
	 $('[data-toggle="tooltip"]').tooltip(); 
	 field = {};
});