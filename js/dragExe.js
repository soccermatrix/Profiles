
function loadFunction(){
	//console.log("loadFunction()")	
	$.getScript('js/nav.js', function(){})
	$(document).ready(function(){
		//console.log("Load Object Animations / Events")
		//console.log('totalEmployees: ' + totalEmployees)
		//console.log('employeesList: ' + employeesList);

		var active_dg;
		var active_dz;
		var orphan_dg;
		var orphan_dz = false;

		var dropZones = {};
		var active_dialog;

		$('.cards').fadeTo('fast',1,function(){
			$('#footer').fadeTo('fast',1);
			//var s helps fade in effect start at first item - top-bottom sequence.
			var s = 0;
			// for(var i = employeesList.length - 1; i>=0; i--){
			for(var i = 0; i<employeesList.length; i++){
				dropZones['dz_' + employeesList[s]] = 'dg_' + employeesList[s];
				var delay = 30 * s;
				$('#dg_' + employeesList[i]).delay( delay ).fadeTo('fast',1);
				++s
			}
		});


		$('.main').draggable({
			stack: ".main",
			start: function(e){
				active_dg = this.id;
				//console.log('drag start(), this.id: ' + this.id)
				//console.log('drag start(), active_dg: ' + active_dg)

				//this zIndexing line might not be needed.
				//$('#' + active_dg).css('z-index','10');

			},
			drag: function(e) {
				//console.log('drag drag(), this.id: ' + this.id)
			},
			stop: function(e) {
				//console.log('drag stop(), this.id: ' + this.id)
				//$('#' + active_dg).css('z-index','0');
			}
		});


		$('.dz').droppable({
			tolerance: 'pointer', //pointer, fit, intersect, touch
			drop: function(e, ui){				
				//angular.element(document.getElementById('yourControllerElementID')).injector().‌​get('$rootScope');
				//console.log('drop(), this.id: ' + this.id)
				orphan_dg = dropZones[this.id];

				// active_dz.xy = active_dz.position();				
				// active_dg.xy = active_dg.position();
				// orphan_dz.xy = orphan_dz.position();
				
				////console.log('snap active_dg to active_dz')
				$('#' + active_dz).prepend($('#' + active_dg));
				$('#' + active_dg).css('left',0);
				$('#' + active_dg).css('top',0);
				
				$('#' + orphan_dz).prepend($('#' + orphan_dg));
				$('#' + orphan_dg).css('left',0);
				$('#' + orphan_dg).css('top',0);

				////console.log('update array sequence')
				dropZones[active_dz] = active_dg;
				dropZones[orphan_dz] = orphan_dg;

				//console.log('dropZones[' + active_dz + ']: ' + dropZones[active_dz])
				//console.log('dropZones[' + orphan_dz + ']: ' + dropZones[orphan_dz])
				orphan_dz = false;
			},
			over: function(e, ui){
				//console.log('drop over(), this.id: ' + this.id)
				if(!orphan_dz){
					orphan_dz = this.id
				}
				active_dz = this.id
			},
			out: function(e, ui){
				//console.log('drop out(), this.id: ' + this.id)
			},
		});
	});
}