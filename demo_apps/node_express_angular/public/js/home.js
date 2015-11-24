var home = angular.module("Home", ['ngMaterial']);

home.controller("TopHeader", function($scope) {
	
});

home.controller("AddPlannerCtrl", function($scope, $http, $window, $timeout) {
	$scope.addMsg = "Please add a Planner";
	$scope.addPlanner = function(planner) {

		if (planner === undefined || planner === "") {
			$scope.addMsg = "Please give a title to the planner";
			return;
		} else {
			$http.post('/users/addHomeModule', {"planner": planner})
			.success(function(data) {
				if (data.code == 200) {
					console.log("Planner added: " + data.code);
					$timeout(function(){
						$window.location.reload();
					}, 2000);
				} else {
					console.log("Planner exists: " + data.code);
					$timeout(function(){
						$window.location.reload();
					}, 2000);
				}
			});
		}
	};
});

home.controller("PlannerListCtrl", function($scope, $http) {
	$scope.planners = [];
	$http.get('/users/homedata').success(function(data){
		//console.log(data.plannerList);
		$scope.planners = data.plannerList;
	});
});


