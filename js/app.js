angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
    // setup an abstract state for the tabs directive
    .state('tab', {
      url: "/tab",
      abstract: true,
      templateUrl: "templates/tabs.html"
    })

    // Each tab has its own nav history stack:

    .state('tab.home', {
      url: '/home',
      views: {
        'tab-home': {
          templateUrl: 'templates/tab-home.html',
          controller: 'HomeCtrl'
        }
      }
    })

    .state('tab.search', {
      url: '/search',
      views: {
        'tab-search': {
          templateUrl: 'templates/tab-search.html',
          controller: 'SearchCtrl'
        }
      }
    })
	
  //是展开home页面的二级子页面的路由
  .state('tab.detail01',{
    //路径用home而不用templates或者search表示是在home页内部切换(以利用历史功能)
    url:'/home/:employeeId',
    views:{
      'tab-home':{
        templateUrl: 'templates/tab-detail.html',
        controller: 'DetailCtrl'
      }
    }
  })

  //是展开search页面的二级子页面的路由
	.state('tab.detail02',{
    //路径用search而不用templates表示是在search页内部切换,同理下边的视图也是在tab-search中
		url:'/search/:employeeId',
		views:{
			'tab-search':{
				templateUrl: 'templates/tab-detail.html',
				controller: 'DetailCtrl'
			}
		}
	})
	
  .state('tab.collection', {
    url: '/collection',
    views: {
      'tab-collection': {
        templateUrl: 'templates/tab-collection.html',
        controller: 'CollectionCtrl'
      }
    }
  })

  //是展开collection页面的二级子页面的路由
  .state('tab.detail03',{
    //路径用collection而不用templates表示是在collection页内部切换,是collection页面的二级子页面
    url:'/collection/:employeeId',
    views:{
      'tab-collection':{
        templateUrl: 'templates/tab-detail.html',
        controller: 'DetailCtrl'
      }
    }
  })

  .state('tab.about', {
    url: '/about',
    views: {
      'tab-about': {
        templateUrl: 'templates/tab-about.html',
        controller: 'AboutCtrl'
      }
    }
  })
	
	

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/home');

});

