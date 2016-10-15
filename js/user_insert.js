console.log('user_insert.js');
angular.module('angular_insert_module', [])
	.controller('InsertCtrol', ['$scope', '$http', function($scope, $http) {
		////console.log('InsertCtrol');
		$scope.fullName = "Default fullName";
		$scope.title = "Default title";
		$scope.sub_title = "Default,green";
		$scope.skills = "Default,Default";
		$scope.count = 25;
		$scope.description = "Default description";
		$scope.quote = "Default quote";
		$scope.available = 1;
		$scope.price = 50;
		$scope.avatar = "avatar_1";

		$scope.description = $scope.description.replace("'", "&rsquo;")
		$scope.quote = $scope.quote.replace("'", "&rsquo;")
		$scope.sub_title = $scope.sub_title.replace("'", "&rsquo;")
		$scope.skills = $scope.skills.replace("'", "&rsquo;")

		for (var i = 0; i < fields.length; i++) {
			//console.log('fields[i]: ' + fields[i])
			field[fields[i][0]] = $('#insert_' + fields[i][0]);
			field[fields[i][0]].trigger('change');
		}



		$scope.user_insert = function() {
			console.log('user_insert()');

			for (var i = 0; i < fields.length; i++) {
				////console.log('fields[i]: ' + fields[i])
				field[fields[i][0]] = $('#insert_' + fields[i][0]);
				field[fields[i][0]].trigger('change');
			}

			$scope.sub_title = $scope.sub_title.toString();
			$scope.skills = $scope.skills.toString();
			//console.log($scope.fullName)

			//replace single quotes characters to prevent sql conflict
			$scope.description = $scope.description.replace("'", "&rsquo;")
			$scope.quote = $scope.quote.replace("'", "&rsquo;")

			//$http.post("user_insert.php",{
			$http.post(httpPath + 'user_insert.php', {
					//$http.post("http://www.luisespinal.com/profiles/user_insert.php",{
					//$http.post("http://www.shiquinkira.com/profiles/user_insert.php",{
					//'headers' : {'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'},
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
				//console.log("inserted Successfully");
				//$scope.$emit('someEvent', args)
				runController = true;
				$scope.$emit('loadData', [])
				//$scope.loadData();

			})
			.error(function(data, status, headers, config) {
				//console.log("error inserting");
			})
		}
	}])