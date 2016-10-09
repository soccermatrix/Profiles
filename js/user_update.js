
//console.log('user_update.js');
angular.module('angular_update_module',[])
.controller('UpdateCtrol',['$scope', '$http', function($scope, $http){
	//console.log('UpdateCtrol');
	
	//if($scope.activeEmployee){
		$scope.updateActiveEmployee = function(employee,id) {
			//console.log('updateActiveEmployee()');

			$scope.setActiveEmployee(employee,id);
			//console.log ('UpdateCtrol $scope.activeEmployee.fullName: ' + $scope.activeEmployee.fullName)
			//$scope.fullName 		= '"' + $scope.activeEmployee.fullName + '"';
			var fields = ['fullName','title','sub_title','skills','count','description','quote','available','price'];
			var field = {};

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

			//console.log('$scope.id: ' + $scope.id)
		 
		 for(var i=0; i<fields.length; i++){
		 	//console.log('fields[i]: ' + fields[i])
		 	field[ fields[i] ] = $('#update_' + fields[i]);
		 	field[ fields[i] ].val($scope[ fields[i] ]);
		 	field[ fields[i] ].trigger( fields[i] );
		 }

		}
$scope.user_update = function () {
	//console.log('user_update(), $scope.id: ' + $scope.id);
	//console.log('user_update(), $scope.fullName: ' + $scope.fullName);
	//console.log('user_update(), $scope.activeEmployee.id: ' + $scope.activeEmployee.id);
	$http.post("user_update.php",{
		'id' : $scope.activeEmployee.id,
		'fullName': $scope.fullName,
		'title': $scope.title,
		'sub_title': $scope.sub_title,
		'skill': $scope.skills,
		'count': $scope.count,
		'description': $scope.description,
		'quote': $scope.quote,
		'available': $scope.available,
		'price': $scope.price
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