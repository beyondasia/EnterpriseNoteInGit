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
	
  //��չ��homeҳ��Ķ�����ҳ���·��
  .state('tab.detail01',{
    //·����home������templates����search��ʾ����homeҳ�ڲ��л�(��������ʷ����)
    url:'/home/:employeeId',
    views:{
      'tab-home':{
        templateUrl: 'templates/tab-detail.html',
        controller: 'DetailCtrl'
      }
    }
  })

  //��չ��searchҳ��Ķ�����ҳ���·��
	.state('tab.detail02',{
    //·����search������templates��ʾ����searchҳ�ڲ��л�,ͬ���±ߵ���ͼҲ����tab-search��
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

  //��չ��collectionҳ��Ķ�����ҳ���·��
  .state('tab.detail03',{
    //·����collection������templates��ʾ����collectionҳ�ڲ��л�,��collectionҳ��Ķ�����ҳ��
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

