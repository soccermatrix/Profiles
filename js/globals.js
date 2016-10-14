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