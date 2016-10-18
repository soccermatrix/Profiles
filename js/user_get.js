console.log('user_get.js');
angular.module('angular_get_module', [])
.controller('GetCtrol',['$scope', '$http', function loadDataCtrl($scope, $http){
	console.log('GetCtrol');

	// if (loadDataComplete == true) {
		$scope.user_get = function() {
			console.log('GetCtrol, user_get()');

			
			$scope.id = $.urlParam('uid');

			//$http.get(httpPath + 'sql.php')
			console.log('httpPath: ' + httpPath)
			$http.post(httpPath + 'user_get.php', {
				'id': $scope.id
			}, {headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
			})
			.success(function(employees_data, employees_status){
				console.log('GetCtrol - success');
				console.log('mobileMode: ' + mobileMode)
				//////console.log('success loading json')
				console.log(employees_data.employees)
				console.log('employees: ' + employees_data.employees )
				//employees_data_string = JSON.stringify(employees_data);
				var employees = employees_data.employees;
				// ////console.log(employees[0].quote)

				$scope.employees = employees;

				totalEmployees = employees.length;
				console.log('totalEmployees: ' + totalEmployees)

				
				

				$scope.totalEmployees = totalEmployees;

				//replace special charter codes back into readable characters
				for (var i = 0; i<totalEmployees; i++){
					for (var ii = 0; ii < fields.length; ii++) {
						employees[i][ fields[ii][0] ] = employees[i][ fields[ii][0] ]
								.replace(/&rsquo;/g, "'")
								.replace(/&gt;/g, ">")
								.replace(/&lt;/g, "<")
								.replace(/&quot;/g, '"')
								.replace(/&#33;/g, '!')
					}

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
						//employees[i].skills[b] = employees[i].skills[b].replace(/&rsquo;/g, "'")
						//console.log('employees[i].skills[b]: ' + employees[i].skills[b])
					}
					//shuffle skills array using lodash.js
					employees[i].skills = _.shuffle(employees[i].skills)
				}//end loop through each recordset

				loadFunction();
			})
			.error(function(data, status, headers, config) {
				console.log("error");
			})
		};
	//}

}])