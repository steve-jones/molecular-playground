var signin = angular.module("Signin", ['ngMaterial']);

signin.controller("TopHeader", function($scope) {
	
});

signin.controller("SigninForm", function($scope,$http, $window) {
	$scope.errMsg = "Sign In";
	$scope.processForm = function(user) {
		if (user.name == undefined || user.password == undefined) {
			return;
		}
		$scope.isProcess = true;
		console.log("in!!!");
		console.log(user);
		var userJSON = JSON.stringify(user);
		console.log(userJSON);

		$http.post('/login/auth', userJSON)
		.success(function(data) {
			console.log("FORM: "+"200  "+data.code);
			$scope.isProcess = false;
			if (data.code == 200) {
				$window.location.href = '/users/home';
			}
			if (data.code == 0) {
				$scope.errMsg = "Oops! No such user.. Please sign up first.";
			}
		})
		.error(function(data) {
			$scope.isProcess = false;
		});
	};
});