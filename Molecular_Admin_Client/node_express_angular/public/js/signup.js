var signup = angular.module("Signup", ['ngMaterial']);

signup.controller("TopHeader", function($scope) {
	
});

signup.controller("SignupForm", function($scope,$http,$window,$timeout) {
	$scope.errMsg = "Sign Up";
	$scope.processForm = function(user) {
		if (user.name == undefined || user.password == undefined) {
			return;
		}

		if (user.password != user.repassword) {
			$scope.errMsg = "Two passwords do not match. Please type again.";
			return;
		}
		
		$scope.isProcess = true;
		console.log("in!!!");
		console.log(user);
		var userJSON = JSON.stringify(user);
		console.log(userJSON);

		$http.post('/addNewUser', userJSON)
		.success(function(data) {
			console.log("FORM: "+"200  "+data.code);
			$scope.isProcess = false;
			if (data.code == 0) {
				$scope.errMsg = "Oops! No such user.. Please sign up first.";
			}
			if (data.code == 1) {
				$scope.errMsg = "User exists. Please use another user name.";
			}
			if (data.code == 200) {
				$scope.errMsg = "Sign up successfully! Redirecting...";
				$timeout(function(){
					$window.location.href = '/users/home';
				}, 2000);	
			}
		})
		.error(function(data) {
			$scope.isProcess = false;
		});
	};
});