//console.log('controller.js');
var totalEmployees;
var activeEmployeeID;

$.getScript('js/user_insert.js', function(){});
$.getScript('js/user_update.js', function(){});


angular.module('controller',['angular_insert_module','angular_update_module'])
.controller('Ctrol404',['$scope', '$http', function($scope, $http){
	//console.log('Ctrol404');

}])
.controller('BlogCtrol',['$scope', '$http', function($scope, $http){
	//console.log('BlogCtrol');
}])

.controller('HomeCtrol',['$scope', '$http', function loadDataCtrl($scope, $http){
	////console.log('runController: ' + runController);
	$scope.loadData = function() {
		console.log('$scope.loadData()')
		if(runController == true){

			$.getScript('js/dragExe.js', function(){});

			$http.get('sql.php')
	//$http.get('employees.js')
	.success(function(employees_data, employees_status){
		////console.log('HomeCtrol - success');
		////console.log('success loading json')
		////console.log(employees_data.employees )
		var employees = employees_data.employees;
		// //console.log(employees[0].quote)

		$scope.employees = employees;

		totalEmployees = employees.length;
		// //console.log('totalEmployees: ' + totalEmployees)
		loadFunction();

		$scope.totalEmployees = totalEmployees;

			//replace special charter codes back into readable characters
			for (var i = 0; i<totalEmployees; i++){
				employees[i].quote = employees[i].quote.replace(/&rsquo;/g, "'")
				//$scope.employees.quote = $scope.employees.quote.replace(/>/g, "&gt;").replace(/</g, "&lt;").replace(/"/g, "&quot;");
			}

			

			$scope.setActiveEmployee = function(employee,id) {
				console.log('setActiveEmployee(), id: ' + id)
				var activeEmployee = {
					id 			: employee.id,
					fullName 	: employee.fullName,
					title		: employee.title,
					sub_title	: employee.sub_title,
					skills		: employee.skills,
					count		: employee.count,
					description	: employee.description,
					quote		: employee.quote,
					available	: employee.available,
					price		: employee.price
				}

				$scope.activeEmployee = activeEmployee;
				activeEmployeeID = activeEmployee.id;
				console.log('activeEmployee.fullName: ' + $scope.activeEmployee.fullName)
			}			

			$scope.setSearch = function(str){
				////console.log('setSearch, str: ' + str)
				////console.log('$scope.search: ' + $scope.search)
				$scope.search = str;

				//set the results to opacity 0, so we can show them using loadFunction();
				for(var i = 0; i<totalEmployees; i++){
					$('#dg_' + i).css('opacity',0);
				}

				loadFunction(); // dragExe.js
			}

		})
	.error(function(employees_data, employees_status){
		$scope.message = employees_data || "Request failed";
		$scope.status = employees_status;
			////console.log(employees_data);
		});

}
}
//initial load
$scope.loadData();
}])
