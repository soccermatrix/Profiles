//console.log('user_update.js');
angular.module('angular_update_module', [])
.controller('UpdateCtrol', ['$scope', '$http', function($scope, $http) {
	//console.log('UpdateCtrol');

	$scope.updateActiveEmployee = function(employee, id) {
		console.log('UpdateCtrol, updateActiveEmployee()');

		$scope.setActiveEmployee(employee);
		console.log ('UpdateCtrol $scope.activeEmployee.fullName: ' + $scope.activeEmployee.fullName)
		$scope.fullName 		= '"' + $scope.activeEmployee.fullName + '"';


		$scope.userId = $scope.activeEmployee.userId;
		$scope.fullName = $scope.activeEmployee.fullName;
		$scope.title = $scope.activeEmployee.title;
		$scope.sub_title = $scope.activeEmployee.sub_title;
		$scope.skills = $scope.activeEmployee.skills;
		$scope.count = $scope.activeEmployee.count;
		$scope.description = $scope.activeEmployee.description;
		$scope.quote = $scope.activeEmployee.quote;
		$scope.available = $scope.activeEmployee.available;
		$scope.price = $scope.activeEmployee.price;
		$scope.avatar = $scope.activeEmployee.avatar;



		//////console.log('$scope.id: ' + $scope.id)

		//populates the input fields in the update form when the card menu is clicked
		////console.log('fields.length: ' + fields.length);
		for (var i = 0; i < fields.length; i++) {
			////console.log('fields[i]: ' + fields[i][0])
			field[fields[i][0]] = $('#update_' + fields[i][0]);
			field[fields[i][0]].val($scope[fields[i][0]]);
			field[fields[i][0]].trigger('change');
		}
		field = {};

	}
	if (loadDataComplete == true) {
		$scope.user_update = function() {
			console.log('UpdateCtrol, user_update()');
			//console.log($scope);
			console.log($scope.$parent);
			//check if this scope value needs to match global scope updated by html form.
			//once matched, there is no need to match it each time the $scope and database are updated.
			console.log($scope.$$ChildScope)
			if(!$scope.$$ChildScope){
				console.log('$scope not equal to $scope.$parent. match them up');
				$scope = $scope.$parent;
			}
			console.log($scope);
			console.log('$scope.userId: ' + $scope.userId)
			console.log('$scope.fullName: ' + $scope.fullName)


			/*
			END OF PROJECT UNTIL FURTHER NOTICE OCT 19 2016
				- Continue improving Update/Delete/Insert capabilities
				- Conintue adding new frameworks
				- Add more bootstraps features.
			*/




			

			//replace single quotes characters to prevent sql conflict
			//replace this with a for loop of fields
			
			//console.log('fields: ' + fields)
			// for (var i = 0; i < fields.length; i++) {
			// 	console.log(fields[i][0] + ': ' + $scope.$parentScope[ fields[i][0] ])
			// 	$scope[ fields[i][0] ] = $scope.$parentScope[ fields[i][0] ]
			// }
			//$scope.id = $scope.$parentScope.id

			//convert arrays into strings before saved as json format into SQL
			$scope.sub_title = $scope.sub_title.toString();
			$scope.skills = $scope.skills.toString();


			console.log('about to push to database:')
			console.log($scope.fullName, $scope.sub_title)
			//$http.post("user_update.php",{
			$http.post(httpPath + 'user_update.php', {
				//$http.post("user_insert_manual.php",{
				//$http.post("http://www.luisespinal.com/profiles/user_update.php",{
				'id': $scope.id,
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
			}, {headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
			})
			.success(function(data, status, headers, config) {
				//console.log("updated Successfully");
				//$scope.$apply();
				//$scope.$on('someEvent', function(event,data){//console.log(data);})
				//$scope.$emit('someEvent', [1, 2, 3])
				//$scope.$broadcast -- dispatches the event downwards to all child scopes,
				//$rootScope.$broadcast -- dispatches the event downwards to all child scopes,
				//$emit -- dispatches the event upwards through the scope hierarchy.
				runController = true;
				$scope.$emit('updateEmployee', data);
				

				//push ng-model.trigger to values in the page after SQL call is made.
				//this way, there is no need to make another call to the server to reload data.
				// for (var i = 0; i < fields.length; i++) {
				// 	////console.log('#input_' + fields[i][0] + '_' + activeEmployeeID)
				// 	field[fields[i][0]] = $('#input_' + fields[i][0] + '_' + activeEmployeeID);
				// 	if(fields[i][0] == 'sub_title'){
				// 		//split json string (SQL output) into array.
				// 		//console.log('sub_title value, ' + $scope[fields[i][0]]);
						
				// 		$scope[fields[i][0]] = $scope[fields[i][0]].split(',');
				// 		field[fields[i][0]].val($scope[fields[i][0]]);
				// 		//field[fields[i][0]].trigger('change');
				// 	} else {
				// 		field[fields[i][0]].val($scope[fields[i][0]]);
				// 	field[fields[i][0]].trigger('change');
				// 	}

				// }
				// field = {};

				$('#dg_' + activeEmployeeID).animate({
					backgroundColor: "#DBFFEA"
				}, 500, function(e) {
					//console.log(this)
					$(this).animate({
						backgroundColor: "#FFFFFF"
					}, 250)
				});
			})
			.error(function(data, status, headers, config) {
				////console.log("error inserting");
			})
		};
	}

}])