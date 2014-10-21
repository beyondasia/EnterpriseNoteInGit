angular.module('starter.controllers', [])

.controller('HomeCtrl', function($scope,$http) {
	$scope.appName = "企业通讯录";
	$http.get('json/employees.json').success(function(data) {
		$scope.employees = data;
	});
	
})

.controller('SearchCtrl', function($scope,$http) {
	$http.get('json/employees.json').success(function(data) {
		$scope.employees = data;
	});
	$scope.data={query:''};
	$scope.cancelCondition=function(){
		$scope.data.query='';
	};
	
})

.controller('DetailCtrl', function($scope, $stateParams,$http, Show) {
	//$scope.employees=[];
	$http.get('json/employees.json').success(function(data) {
		$scope.employees = data;
		// $scope.result=$scope.employees[Show.get($stateParams.employeeId,$scope.employees)];结合service中被注释掉的那句，效果与下句一样
		$scope.result=Show.get($stateParams.employeeId,$scope.employees);
	});
})

.controller('CollectionCtrl', function($scope) {

})

.controller('AboutCtrl', function($scope) {
});
