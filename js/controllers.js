angular.module('starter.controllers', [])

.controller('HomeCtrl', function($scope,$http) {
	$scope.appName = "企业通讯录";
	/*$http.get('json/employees.json').success(function(data) {
		$scope.employees = data;
	});*/
	//取出localStorage中以字符串格式存储的数据
	var favoritePeople=window.localStorage.getItem('personDetail');	
	//将字符串转换为json格式
	$scope.favoritePeople=JSON.parse(favoritePeople);
	
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

//因为在app.js 中已经将控制器'starter.controllers'和服务 'starter.services'注入了，所以下边注入时只需将
//starter.services中的show 和Communicate 注入即可，不用再注入'starter.services'了
//在DetailCtrl控制器中注入Communicate服务和Show服务，已使用其下各函数，如dialPhone（）函数等
.controller('DetailCtrl', function($scope, $stateParams,$http, Show,Communicate) {
	//$scope.employees=[];

	//从json读数据，用Show服务的get函数匹配给定id的人的详情
	$http.get('json/employees.json').success(function(data) {
		$scope.employees = data;
		// $scope.result=$scope.employees[Show.get($stateParams.employeeId,$scope.employees)];结合service中被注释掉的那句，效果与下句一样
		$scope.result=Show.get($stateParams.employeeId,$scope.employees);
	});

	//以下三个函数是通讯用，分别为打电话，发短信，发邮件
	$scope.dialPhone=function(phoneNumber){
		Communicate.dialPhone(phoneNumber);
	}
	$scope.sendMessage=function(phoneNumber){
		Communicate.sendMessage(phoneNumber);
	}
	$scope.sendEmail=function(emailAddress){
		Communicate.sendEmail(emailAddress);
	}

	//判断要加入localStorage的联系人是否重复
	$scope.readLocalStorage=function(){		
		//取出localStorage中以字符串格式存储的数据
		var favoritePeople=window.localStorage.getItem('personDetail');	
		//将字符串转换为json格式
		var favPeople=JSON.parse(favoritePeople);
		var flag=true;//设置标记，来判断是否有重复数据，true代表没有重复数据
		if(favPeople.length==0){
			flag=true;
		}else{//数组非空时，判断要添加的对象与数组中原对象不重复时再添加					
			for(var i=0;i<favPeople.length;i++){
				//alert(favPeople[i].id!=$scope.result.id);
				if(favPeople[i].id==$scope.result.id){
					flag=false;//如果有重复数据，将标志置为false					
				}
			}			
		}
		return flag;
	}


	//收藏函数
	$scope.addContact=function(){
		/*//TypeError: Cannot read property 'id' of undefined at Scope.$scope.addContact
		//用一个判断来防止刚开始数组长度为0时下边循环不能运行，即如果数组为空时直接添加
		//alert(favPeople.length);//调试语句	
		//取出localStorage中以字符串格式存储的数据
		var favoritePeople=window.localStorage.getItem('personDetail');	
		//将字符串转换为json格式
		var favPeople=JSON.parse(favoritePeople);		
		if(favPeople.length==0){
			favPeople.push($scope.result);
		}else{//数组非空时，判断要添加的对象与数组中原对象不重复时再添加
			var flag=true;//设置标记，来判断是否有重复数据，true代表没有重复数据		
			for(var i=0;i<favPeople.length;i++){
				//alert(favPeople[i].id!=$scope.result.id);
				if(favPeople[i].id==$scope.result.id){
					flag=false;//如果有重复数据，将标志置为false
					alert("您已经收藏了他！");
				}
			}
			if(flag){
				favPeople.push($scope.result);//经过判断，将不重复的联系人详情信息push到service的favPeople数组中
			}
		}		*/
		//上边这一块已经用一个独立的函数$scope.readLocalStorage()解决了


		//在添加联系人之前要先判断localStorage中personDetail是否为空，如果不为空，则可以进行添加操作
		if (localStorage.getItem('personDetail')) {
			//取出localStorage中以字符串格式存储的数据
			var favoritePeople=window.localStorage.getItem('personDetail');	
			//将字符串转换为json格式
			var favPeople=JSON.parse(favoritePeople);
			var flag=$scope.readLocalStorage();	//调用判断重复的函数	
			if(flag){
				favPeople.push($scope.result);//经过判断，将不重复的联系人详情信息push到service的favPeople数组中
			}else{
				alert("您已经收藏了他！");
			}
			//将详情页显示的某个人的详情的JSON格式转换为字符串，以便于localstorage。
			//slice（start，end）是取数组从start到end的对象，start取-1是取数组的最后一个值
			//end省略时表示取从start到数组最后一个对象
			var personInString=JSON.stringify(favPeople.slice(0));
			//用localStorage保存转化好的的字符串
			window.localStorage.setItem('personDetail',personInString);	
		//如果personalDetail不存在，要先创建该键
		}else{
			var favPeople=[];
			favPeople.push($scope.result);
			var personInString=JSON.stringify(favPeople.slice(0));
			//用localStorage保存转化好的的字符串
			window.localStorage.setItem('personDetail',personInString);
		}
				
		
	}
})


.controller('CollectionCtrl', function($scope,$http) {
	/*$http.get('json/employees.json').success(function(data){
		$scope.employees=data;
		angular.forEach($scope.employees,function(a){
			a.checked=false;
		});
	});*/
	//取出localStorage中以字符串格式存储的数据
	var favoritePeople=window.localStorage.getItem('personDetail');	
	//将字符串转换为json格式
	$scope.favoritePeople=JSON.parse(favoritePeople);
	//设置打开与关闭菜单的标志
	$scope.checkedFlag=false;
	$scope.showCheckButton=function(){
		$scope.checkedFlag=!$scope.checkedFlag;		
	}
	$scope.countSelectedPerson=function(){
		var number=0;
		angular.forEach($scope.favoritePeople,function(a){
			number+=a.checked?1:0;
		});
		return number;
	}
	$scope.selectAll=function(){
		//document.getElementsByName("setCheck").checked=true;这句话是不对滴，因为返回
		//的是一个数组，要单个设置，像下边那个循环一样
		var totalPerson=document.getElementsByName("setCheck");
		//遍历数出有几个人处于选中状态
		for(var i=0,j=0;i<totalPerson.length;i++){
			if($scope.favoritePeople[i].checked){
				j++;
			}
		}
		//判断是否处于全选状态（即全选状态下每个人的checked都应该是true，所以j等于总人数）
		//如果已经处于全选中状态，那么就将状态改为全部选
		if(j==totalPerson.length){
			for(var i=0;i<totalPerson.length;i++){
				$scope.favoritePeople[i].checked=false;
			}
		}else{//如果j不等于收藏的总人数（只可能是小于），那么就没有全选中，则应该全选
			for(var i=0;i<totalPerson.length;i++){
				$scope.favoritePeople[i].checked=true;
			}
		}		
		//$scope.countSelectedPerson();
		/*if($scope.setAllChecked){
			$scope.setAllChecked=false;
		}else{
			$scope.setAllChecked=true;
		}*/		
	}
	$scope.cancelCollection=function(){
		//alert('success');
		var totalPerson=document.getElementsByName("setCheck");
		//alert(totalPerson.length);//调试用
		//遍历数出有几个人处于未选中状态，这些人将被保留，而其他的将被从收藏中删除
		var remainedPerson=[];
		for(var i=0;i<totalPerson.length;i++){
			if(!$scope.favoritePeople[i].checked){
				remainedPerson.push($scope.favoritePeople[i]);//将未选中的添加到一个新数组中
			}
		}	
		//用新数组remainedPerson中数据更新localStorage	
		var personInString=JSON.stringify(remainedPerson.slice(0));		
		window.localStorage.setItem('personDetail',personInString);	
		//如果没有下边这两句话，页面就不会立即更新，因为从localStorage中删除数据后，在collection页面
		//要重新读取localStorage中的数据
		//取出localStorage中以字符串格式存储的数据
		var favoritePeople=window.localStorage.getItem('personDetail');	
		//将字符串转换为json格式
		$scope.favoritePeople=JSON.parse(favoritePeople);	
	}
})

//在AboutCtrl控制器中注入Communicate服务，已使用其下各函数，如dialPhone（）函数等
.controller('AboutCtrl', function($scope,$http,Communicate) {
	$http.get('json/employees.json').success(function(data) {
		$scope.employees = data;
	});//这是一句命令，要用分号结尾
	$scope.dialPhone=function(phoneNumber){
		Communicate.dialPhone(phoneNumber);
	}//这是一个函数，不用分号结尾
	$scope.sendMessage=function(phoneNumber){
		Communicate.sendMessage(phoneNumber);
	}
	$scope.sendEmail=function(emailAddress){
		Communicate.sendEmail(emailAddress);
	}
	$scope.editMyData=function(){
		alert('data has been edited!');//注意函数的定义方法
	}
});
