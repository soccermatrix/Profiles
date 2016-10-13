//console.log('user_update.js');
angular.module('angular_update_module',[])
.controller('UpdateCtrol',['$scope', '$http', function($scope, $http){
	//console.log('UpdateCtrol');
	
	//if($scope.activeEmployee){
		$scope.updateActiveEmployee = function(employee,id) {
			//console.log('UpdateCtrol, updateActiveEmployee()');

			$scope.setActiveEmployee(employee,id);
			////console.log ('UpdateCtrol $scope.activeEmployee.fullName: ' + $scope.activeEmployee.fullName)
			//$scope.fullName 		= '"' + $scope.activeEmployee.fullName + '"';
			

			$scope.id 				= $scope.activeEmployee.id;
			$scope.fullName 		= $scope.activeEmployee.fullName;
			$scope.title 			= $scope.activeEmployee.title;
			$scope.sub_title 		= $scope.activeEmployee.sub_title;
			$scope.skills 			= $scope.activeEmployee.skills;
			$scope.count 			= $scope.activeEmployee.count;
			$scope.description 		= $scope.activeEmployee.description;
			$scope.quote 			= $scope.activeEmployee.quote;
			$scope.available 		= $scope.activeEmployee.available;
			$scope.price 			= $scope.activeEmployee.price;
			$scope.avatar 			= $scope.activeEmployee.avatar;

			

			////console.log('$scope.id: ' + $scope.id)

		 //populates the input fields in the update form when the card menu is clicked
		 //console.log('fields.length: ' + fields.length);
		 for(var i=0; i<fields.length; i++){
		 	//console.log('fields[i]: ' + fields[i][0])
		 	field[ fields[i][0] ] = $('#update_' + fields[i][0]);
		 	field[ fields[i][0] ].val($scope[ fields[i][0] ]);
		 	field[ fields[i][0] ].trigger( 'change' );
		 }
		 field = {};

		}
		$scope.user_update = function () {
			//console.log('UpdateCtrol, user_update()');
			
			$scope.sub_title = $scope.sub_title.toString();
			$scope.skills = $scope.skills.toString();

			//replace single quotes characters to prevent sql conflict
			$scope.description = $scope.description.replace("'","&rsquo;")
			$scope.quote = $scope.quote.replace("'","&rsquo;")
			$scope.sub_title = $scope.sub_title.replace("'","&rsquo;")
			$scope.skills = $scope.skills.replace("'","&rsquo;")

		// //console.log($scope.fullName, $scope.sub_title)
		//$http.post("user_update.php",{
		$http.post(httpPath + 'user_update.php',{
		//$http.post("user_insert_manual.php",{
	//$http.post("http://www.luisespinal.com/profiles/user_update.php",{
		'id' : $scope.activeEmployee.id,
		'fullName': $scope.fullName,
		'title': $scope.title,
		'sub_title': $scope.sub_title,
		'skills': $scope.skills,
		'count': $scope.count,
		'description': $scope.description,
		'quote': $scope.quote,
		'available': $scope.available,
		'price': $scope.price,
		'avatar': $scope.avatar
	}, {
		headers : {
			'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
		}
	})
		.success(function(data, status, headers, config){
		//console.log("updated Successfully");
			//$scope.$emit('someEvent', args)
			$scope.loadData();
			
		})
		.error(function(data, status, headers, config){
		//console.log("error inserting");
	})
	};

}])