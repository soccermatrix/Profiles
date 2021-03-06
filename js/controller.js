console.log('controller.js')
var totalEmployees;
var activeEmployeeID;
var activeEmployee;
var employeesList = [];
var loadDataComplete = false;
var employees;

console.log('location.hostname: ' + location.hostname)
var httpPath = 'http://profiles.luisespinal.com/';
/*
var httpPath = '';
if (location.hostname === "127.0.0.1"){
	httpPath = 'http://profiles.luisespinal.com/';
}
*/


angular.module('controller',['angular_insert_module','angular_update_module','angular_delete_module','angular_get_module'])
.controller('Ctrol404',['$scope', '$http', function($scope, $http){
	console.log('Ctrol404');

}])
.controller('BlogCtrol',['$scope', '$http', function($scope, $http){
	console.log('BlogCtrol');
}])


.controller('HomeCtrol',['$scope', '$http', function loadDataCtrl($scope, $http){
//.controller('HomeCtrol',['$scope', '$resource', function loadDataCtrl($scope, $resource){
	console.log('HomeCtrol');
	console.log('runController: ' + runController);
	$scope.setActiveEmployee = function(employee) {
		console.log('setActiveEmployee(), userId: ' + employee.userId)
		var activeEmployee = {
			userId 		: employee.userId,
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
		activeEmployee = activeEmployee;
		activeEmployeeID = activeEmployee.userId;
		console.log('activeEmployee.fullName: ' + $scope.activeEmployee.fullName)
	}		

	$scope.$on('updateEmployee', function(){
		console.log('\nHomeCtrol');
		console.log('updateEmployee()')
		console.log($scope);
		for (var i = 0; i<totalEmployees; i++){
			if($scope.employees[i].userId == $scope.employee.userId){
				console.log('found user: ' + $scope.employees[i].fullName)
				// update every field value within the $scope
				for (var a = 0; a < fields.length; a++) {
					console.log('fields[a][0]: ' + fields[a][0])
					if([fields[a][0]] == 'sub_title' || [fields[a][0]] == 'skills'){
						//array fields need to be split back from strings
						var stringToArray = $scope.employee[fields[a][0]].split(','); 
				 		$scope.employees[i][fields[a][0]] = stringToArray;
					} else {
				 		$scope.employees[i][fields[a][0]] = $scope.employee[fields[a][0]];
					}
				}
				break;
			}
		}
	});		

	$scope.$on('deleteEmployee', function(){
		console.log('\nHomeCtrol');
		console.log('deleteEmployee()')
		console.log($scope);
		for (var i = 0; i<totalEmployees; i++){
			if($scope.employees[i].userId == $scope.employee.userId){
				console.log('found user: ' + $scope.employee.fullName)
				// update every field value within the $scope
				$('#dz_' + $scope.employee.userId).hide('slow', function(){
				});
				break;
			}
		}
	});				

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
	
	$scope.init = function(){
		console.log('init();')
		$scope.$emit('loadData', [])
	}

	$scope.$on('loadData', function(){
		console.log('$scope.$on loadData()');
	//$scope.loadData = function() {
		console.log('$scope.loadData()')
		if(runController == true){
			runController = false;
			console.log('loadData()');
			// $.getScript('js/dragExe.js', function(){});
			//MySQL version					
			//$http.get(httpPath + 'sql.php')
			//JSON version
			//$http.get('employees.js')
			//$resource.(httpPath + 'sql.php')
			$http.get(httpPath + 'sql.php')
			.success(function(employees_data, employees_status){
				console.log('HomeCtrol - success');
				console.log('mobileMode: ' + mobileMode)
				console.log('success loading json')
				//employees_data_string = JSON.stringify(employees_data);
				$scope.employees = employees_data.employees;
				$scope.totalEmployees = $scope.employees.length;
				

				//replace special charter codes back into readable characters
				for (var i = 0; i<$scope.totalEmployees; i++){
					for (var ii = 0; ii < fields.length; ii++) {
						console.log(fields[ii][0]);
						console.log($scope.employees[i][ fields[ii][0] ])
						$scope.employees[i][ fields[ii][0] ] = $scope.employees[i][ fields[ii][0] ]
								.replace(/&rsquo;/g, "'")
								.replace(/&gt;/g, ">")
								.replace(/&lt;/g, "<")
								.replace(/&quot;/g, '"')
								.replace(/&#33;/g, '!')
					}

					employeesList.push($scope.employees[i].userId);

					//split sub_title and color theme
					$scope.employees[i].sub_title = $scope.employees[i].sub_title.split(',');				
					for (var a = 0; a<$scope.employees[i].sub_title.length; a++){
						//trim() removes leading whitespace
						$scope.employees[i].sub_title[a] = $scope.employees[i].sub_title[a].trim();
						console.log('$scope.employees[i].sub_title[a]: ' + $scope.employees[i].sub_title[a])
					}

					//split skills
					$scope.employees[i].skills = $scope.employees[i].skills.split(',');
					for (var b = 0; b<$scope.employees[i].skills.length; b++){
						//trim() removes leading whitespace
						$scope.employees[i].skills[b] = $scope.employees[i].skills[b].trim();
						//$scope.employees[i].skills[b] = $scope.employees[i].skills[b].replace(/&rsquo;/g, "'")
						console.log('$scope.employees[i].skills[b]: ' + $scope.employees[i].skills[b])
					}
					//shuffle skills array using lodash.js
					$scope.employees[i].skills = _.shuffle($scope.employees[i].skills)
				}//end loop through each recordset

				employees = $scope.employees;
				totalEmployees = employees.length;
				// console.log('totalEmployees: ' + totalEmployees)

				if(mobileMode){
					$scope.skillsToDisplay = 8;
				} else {
					$scope.skillsToDisplay = 3;
				}

				loadFunction();
			})
			.error(function(employees_data, employees_status){
				console.log('error not loaded');
				$scope.message = employees_data || "Request failed";
				$scope.status = employees_status;
				});

		}//end if
		loadDataComplete = true;
	});//end of $on.loadData();

	//initial load
	//$scope.loadData();
	//$scope.$emit('loadData', [])
	//$scope.loadData();
}])