angular.module('starter.services', [])
.factory('Show', function() {
	return {
		//employees指全体员工（在json中），是一个对象数组；employee是单个员工，是一个对象
		get: function(employeeId,employees) {
			for(var i=0;i<employees.length;i++){
				if(employees[i].id===employeeId){
					// return i;	
					return employees[i];
				}
			}
		}
	}
})
//链式法则或者叫管道法则，在名为service的服务下定义多个服务，如Show和Communicate
.factory('Communicate',function(){
	return{
		//Communicate服务下的函数，可以在Controller 中调用，格式为Communicate.dialPhone(形参)
		dialPhone: function(phoneNumber){
			alert('dialPhone function has been processed !');
		},
		//此处要注意，这个地方不像通常的函数之间不用分隔符，此处要用逗号“，”隔开，否则出现
		//“Uncaught SyntaxError: Unexpected identifier ”错误，也不能用分号
		sendMessage: function(phoneNumber){
			alert('sendMessage function has been processed !');
		},
		//上行要用逗号“，”隔开两个函数
		sendEmail: function(emailAddress){
			alert('sendEmail function has been processed !');
		}
	}
})
//.value('favPeople',[]);//这是用来存常量等永久性数据的，不适合存需要频繁存取的localStorage数据