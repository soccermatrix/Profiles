
////console.log('user_insert.js');
angular.module('angular_delete_module',[])
.controller('DeleteCtrol',['$scope', '$http', function($scope, $http){
	////console.log('DeleteCtrol');
	$scope.updateActiveEmployee = function(employee,id) {
			console.log('DeleteCtrol, updateActiveEmployee()');
		$scope.setActiveEmployee(employee,id);

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

		 //populates the input fields in the update form when the card menu is clicked
		 for(var i=0; i<fields.length; i++){
		 	field[ fields[i] ] = $('#delete_' + fields[i]);
		 	field[ fields[i] ].val($scope[ fields[i] ]);
		 	field[ fields[i] ].trigger( 'change' );

		 	//disable the input fields
		 	field[ fields[i] ].prop('disabled', true);
		 }

		}
		$scope.user_delete = function () {
		console.log('user_delete()');
		$http.post("user_delete.php",{
			'id' : $scope.activeEmployee.id
		})
		.success(function(data, status, headers, config){
			console.log("deleted Successfully");
			//$scope.$emit('someEvent', args)
			$scope.loadData();
			
		})
		.error(function(data, status, headers, config){
				console.log("error deleting");
			})

	}
}])