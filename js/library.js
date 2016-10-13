// Script Library

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