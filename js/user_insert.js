
console.log('user_insert.js');
angular.module('angular_insert_module',[])
.controller('InsertCtrol',['$scope', '$http', function($scope, $http){
	console.log('InsertCtrol');
	$scope.fullName 		= "Default fullName";
	$scope.title 			= "Default title";
	$scope.sub_title 		= '["Default","green"]';
	$scope.skills 			= '["Default","Default"]';
	$scope.count 			= 25;
	$scope.description 		= "Default description";
	$scope.quote 			= "Default quote";
	$scope.available 		= 1;
	$scope.price 			= 50;



	$scope.user_insert = function () {
		console.log('user_insert()');
		$http.post("user_insert.php",{
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
			console.log("inserted Successfully");
			//$scope.$emit('someEvent', args)
			$scope.loadData();
			
		})
			.error(function(data, status, headers, config){
				console.log("error inserting");
			})

		}
}])