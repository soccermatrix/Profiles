//console.log('controller')
var totalEmployees;
var activeEmployeeID;
var employeesList = [];
var loadDataComplete = false;

//console.log('location.hostname: ' + location.hostname)
var httpPath = '';
if (location.hostname === "127.0.0.1"){
	httpPath = 'http://www.luisespinal.com/profiles/';
}


angular.module('controller',['angular_insert_module','angular_update_module','angular_delete_module'])
.controller('Ctrol404',['$scope', '$http', function($scope, $http){
	////console.log('Ctrol404');

}])
.controller('BlogCtrol',['$scope', '$http', function($scope, $http){
	////console.log('BlogCtrol');
}])


.controller('HomeCtrol',['$scope', '$http', function loadDataCtrl($scope, $http){
//.controller('HomeCtrol',['$scope', '$resource', function loadDataCtrl($scope, $resource){
	console.log('HomeCtrol');
	console.log('runController: ' + runController);
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
			price		: employee.price,
			avatar		: employee.avatar
		}

		$scope.activeEmployee = activeEmployee;
		activeEmployeeID = activeEmployee.id;
		////console.log('activeEmployee.fullName: ' + $scope.activeEmployee.fullName)
	}			

	$scope.setSearch = function(str){
		console.log('setSearch, str: ' + str)
		console.log('$scope.search: ' + $scope.search)
		$scope.search = str;

		//set the results to opacity 0, so we can show them using loadFunction();
		for(var i = 0; i<totalEmployees; i++){
			$('#dg_' + i).css('opacity',0);
		}

		loadFunction(); // dragExe.js
		runController = true;
	}
	
	$scope.$on('loadData', function(){
		console.log('$scope.$on loadData()');
	//$scope.loadData = function() {
		//console.log('$scope.loadData()')
		if(runController == true){
			runController = false;
			// $.getScript('js/dragExe.js', function(){});
			console.log('loadData()');
			//MySQL version					
			//$http.get(httpPath + 'sql.php')
			//JSON version
			//$http.get('employees.js')
			//$resource.(httpPath + 'sql.php')
			$http.get(httpPath + 'sql.php')
			.success(function(employees_data, employees_status){
				console.log('HomeCtrol - success');
				//////console.log('success loading json')
				//////console.log(employees_data.employees )
				var employees = employees_data.employees;
				// ////console.log(employees[0].quote)

				$scope.employees = employees;		

				totalEmployees = employees.length;
				// ////console.log('totalEmployees: ' + totalEmployees)
				
				

				$scope.totalEmployees = totalEmployees;

				//replace special charter codes back into readable characters
				for (var i = 0; i<totalEmployees; i++){
					//$scope.employees.quote = $scope.employees.quote.replace(/>/g, "&gt;").replace(/</g, "&lt;").replace(/"/g, "&quot;");
					//need to get the titles of each text field from the database to auto...
					//populate this loop and target each field instead of manual.
					employees[i].quote = employees[i].quote.replace(/&rsquo;/g, "'")
					employees[i].description = employees[i].description.replace(/&rsquo;/g, "'")
					employees[i].sub_title = employees[i].sub_title.replace(/&rsquo;/g, "'")
					employeesList.push(employees[i].id);

					//split sub_title and color theme
					employees[i].sub_title = employees[i].sub_title.split(',');				
					for (var a = 0; a<employees[i].sub_title.length; a++){
						//trim() removes leading whitespace
						employees[i].sub_title[a] = employees[i].sub_title[a].trim();
						//console.log('employees[i].sub_title[a]: ' + employees[i].sub_title[a])
					}

					//split skills
					employees[i].skills = employees[i].skills.split(',');
					for (var b = 0; b<employees[i].skills.length; b++){
						//trim() removes leading whitespace
						employees[i].skills[b] = employees[i].skills[b].trim();
						employees[i].skills[b] = employees[i].skills[b].replace(/&rsquo;/g, "'")
						//console.log('employees[i].skills[b]: ' + employees[i].skills[b])
					}
				}

				loadFunction();
			})
			.error(function(employees_data, employees_status){
				$scope.message = employees_data || "Request failed";
				$scope.status = employees_status;
					//////console.log(employees_data);
				});

		}//end if
		loadDataComplete = true;
	});//end of $on.loadData();

	//initial load
	//$scope.loadData();
	$scope.$emit('loadData', [])
}])