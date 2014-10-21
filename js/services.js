angular.module('starter.services', [])
.factory('Show', function() {
	return {
		get: function(employeeId,employees) {//employees指全体员工（在json中），是一个对象数组；employee是单个员工，是一个对象
			for(var i=0;i<employees.length;i++){
				if(employees[i].id===employeeId){
					// return i;	
					return employees[i];
				}
			}
		}
	}
});
