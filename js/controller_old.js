//console.log('controller.js');
var totalEmployees;

angular.module('controller',['angular_insert_module'])
.controller('Ctrol404',['$scope', '$http', function($scope, $http){
	//console.log('Ctrol404');

}])
.controller('BlogCtrol',['$scope', '$http', function($scope, $http){
	//console.log('BlogCtrol');
}])

.controller('HomeCtrol',['$scope', '$http', function($scope, $http){
	////console.log('runController: ' + runController);
	if(runController == true){

		$.getScript('js/dragExe.js', function(){})

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

		$scope.totalEmployees = totalEmployees;

			//replace special charter codes back into readable characters
			for (var i = 0; i<totalEmployees; i++){
				employees[i].quote = employees[i].quote.replace(/&rsquo;/g, "'")
				//$scope.employees.quote = $scope.employees.quote.replace(/>/g, "&gt;").replace(/</g, "&lt;").replace(/"/g, "&quot;");
			}

			
			loadFunction();

			$scope.setActiveEmployee = function(employee,id) {
				console.log('setActiveEmployee, id: ' + id)
				var activeEmployee = {
					id 			: employee.id,
					name 		: employee.name,
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
}])
