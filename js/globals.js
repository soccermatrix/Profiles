console.log('globals.js')

var fields = [
['fullName','Full Name'],
['title','Title'],
['sub_title','Sub Title'],
['skills','Skills'],
['count','Likes'],
['description','Description'],
['quote','Personal Quote'],
['available','Available for work?'],
['price','Hourly Rate'],
['avatar','Photo / Avatar']
];
//console.log('fields.length: ' + fields.length)
//console.log('fields[0]: ' + fields[0])
//console.log('fields[0][0]: ' + fields[0][0])

var field = {};

$.getScript('js/nav.js', function(){})
$.getScript('js/dragExe.js', function(){});


$(document).ready(function(){
	positionElements();
	$(window).scroll(function(e){ 
		positionElements()
	});
});

function positionElements(){
	var $tm = $('#top_menu'); 
	var $c = $('.cards'); 
	var isPositionFixed = ($tm.css('position') == 'fixed');
	if ($(this).scrollTop() > 95 && !isPositionFixed){ 
			// place it back top of page
			($tm).css({'position': 'fixed', 'top': '48px', 'width': '90%', 'z-index': '2'});
			($c).css({'top': '75px'});
		}
		if ($(this).scrollTop() < 95 && isPositionFixed)
		{
			// show over the scrolling content
			($tm).css({'position': 'relative', 'top': '0px', 'width': '100%', 'z-index': '2'}); 
			($c).css({'top': '0px'});
		} 
	}